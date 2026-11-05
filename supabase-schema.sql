create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role text not null default 'owner' check (role in ('owner', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.places (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 120),
  category text not null check (category in ('gastronomia', 'indumentaria', 'nocturnidad', 'deportes')),
  department text not null check (char_length(btrim(department)) between 1 and 100),
  description text not null check (char_length(btrim(description)) between 1 and 500),
  instagram_url text,
  website_url text,
  tags text[] not null default '{}',
  owner_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (instagram_url is null or instagram_url ~* '^https?://'),
  check (website_url is null or website_url ~* '^https?://'),
  check (instagram_url is not null or website_url is not null)
);

create table if not exists public.link_clicks (
  id bigint generated always as identity primary key,
  place_id uuid not null references public.places (id) on delete cascade,
  link_type text not null check (link_type in ('instagram', 'website')),
  created_at timestamptz not null default now()
);

create index if not exists link_clicks_place_created_idx
  on public.link_clicks (place_id, created_at desc);
create index if not exists places_owner_idx
  on public.places (owner_id);

create or replace function public.set_place_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_place_updated_at on public.places;
create trigger set_place_updated_at
  before update on public.places
  for each row execute function public.set_place_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, coalesce(new.email, ''))
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

drop trigger if exists on_auth_user_email_updated on auth.users;
create trigger on_auth_user_email_updated
  after update of email on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.track_link_click(p_place_id uuid, p_link_type text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_url text;
begin
  if p_link_type not in ('instagram', 'website') then
    raise exception 'Tipo de enlace inválido';
  end if;

  select case p_link_type
    when 'instagram' then instagram_url
    when 'website' then website_url
  end
  into target_url
  from public.places
  where id = p_place_id;

  if target_url is null then
    raise exception 'El sitio o enlace solicitado no existe';
  end if;

  insert into public.link_clicks (place_id, link_type)
  values (p_place_id, p_link_type);
end;
$$;

revoke all on function public.track_link_click(uuid, text) from public;
grant execute on function public.track_link_click(uuid, text) to anon, authenticated;

create or replace function public.get_link_click_stats()
returns table (
  place_id uuid,
  website_clicks bigint,
  instagram_clicks bigint
)
language sql
stable
security invoker
set search_path = ''
as $$
  select
    clicks.place_id,
    count(*) filter (where clicks.link_type = 'website') as website_clicks,
    count(*) filter (where clicks.link_type = 'instagram') as instagram_clicks
  from public.link_clicks as clicks
  group by clicks.place_id;
$$;

revoke all on function public.get_link_click_stats() from public;
grant execute on function public.get_link_click_stats() to authenticated;

alter table public.profiles enable row level security;
alter table public.places enable row level security;
alter table public.link_clicks enable row level security;

drop policy if exists "Profiles are visible to their owner or admins" on public.profiles;
create policy "Profiles are visible to their owner or admins"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()));

drop policy if exists "Admins can update profiles" on public.profiles;
create policy "Admins can update profiles"
  on public.profiles for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Places are public" on public.places;
create policy "Places are public"
  on public.places for select to anon, authenticated
  using (true);

drop policy if exists "Admins can insert places" on public.places;
create policy "Admins can insert places"
  on public.places for insert to authenticated
  with check ((select public.is_admin()));

drop policy if exists "Admins can update places" on public.places;
create policy "Admins can update places"
  on public.places for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Admins can delete places" on public.places;
create policy "Admins can delete places"
  on public.places for delete to authenticated
  using ((select public.is_admin()));

drop policy if exists "Owners and admins can read their clicks" on public.link_clicks;
create policy "Owners and admins can read their clicks"
  on public.link_clicks for select to authenticated
  using (
    (select public.is_admin())
    or exists (
      select 1
      from public.places
      where places.id = link_clicks.place_id
        and places.owner_id = (select auth.uid())
    )
  );

grant select on public.profiles to authenticated;
grant update (email, role) on public.profiles to authenticated;
grant select on public.places to anon, authenticated;
grant insert, update, delete on public.places to authenticated;
grant select on public.link_clicks to authenticated;
