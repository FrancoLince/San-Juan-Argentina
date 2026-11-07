alter table public.places
  add column if not exists is_hidden boolean not null default false;

drop policy if exists "Places are public" on public.places;
drop policy if exists "Public places are visible" on public.places;
create policy "Public places are visible"
  on public.places for select to anon, authenticated
  using (not is_hidden);

drop policy if exists "Admins can read all places" on public.places;
create policy "Admins can read all places"
  on public.places for select to authenticated
  using ((select public.is_admin()));

drop policy if exists "Owners can read their places" on public.places;
create policy "Owners can read their places"
  on public.places for select to authenticated
  using (owner_id = (select auth.uid()));

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
  where id = p_place_id
    and not is_hidden;

  if target_url is null then
    raise exception 'El sitio o enlace solicitado no existe';
  end if;

  insert into public.link_clicks (place_id, link_type)
  values (p_place_id, p_link_type);
end;
$$;

revoke all on function public.track_link_click(uuid, text) from public;
grant execute on function public.track_link_click(uuid, text) to anon, authenticated;
