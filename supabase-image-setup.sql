alter table public.places
  add column if not exists image_url text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'place-images',
  'place-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Place images are publicly readable" on storage.objects;
create policy "Place images are publicly readable"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'place-images');

drop policy if exists "Admins can upload place images" on storage.objects;
create policy "Admins can upload place images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'place-images' and (select public.is_admin()));

drop policy if exists "Admins can update place images" on storage.objects;
create policy "Admins can update place images"
  on storage.objects for update to authenticated
  using (bucket_id = 'place-images' and (select public.is_admin()))
  with check (bucket_id = 'place-images' and (select public.is_admin()));

drop policy if exists "Admins can delete place images" on storage.objects;
create policy "Admins can delete place images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'place-images' and (select public.is_admin()));
