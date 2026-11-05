alter table public.places
  drop constraint if exists places_category_check,
  drop constraint if exists places_category_supported_check;

alter table public.places
  add constraint places_category_check
  check (char_length(btrim(category)) between 1 and 80);
