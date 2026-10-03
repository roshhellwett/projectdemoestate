-- =====================================================================
-- Luxury Real Estate Platform - initial schema
-- Postgres 17 / Supabase. Idempotent: safe to re-run.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- enumerations
-- ---------------------------------------------------------------------

do $$ begin
  create type property_category as enum ('budget','premium','luxury','resale','ready_to_move');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------
-- properties
-- ---------------------------------------------------------------------

create table if not exists public.properties (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  title             text not null,
  location          text not null,
  locality          text not null,
  price_inr         numeric(12,2),
  price_display     text,
  bhk_type          text not null,
  property_type     text not null default 'Apartment',
  possession_status text not null default 'Available',
  furnishing_status text default '',
  area_sqft         integer,
  bathrooms         integer,
  balconies         integer,
  floor             text,
  facing            text,
  parking           text,
  amenities         text[] not null default '{}',
  landmarks         text[] not null default '{}',
  description       text not null default '',
  category          text,
  status            text not null default 'Available',
  main_image        text default '',
  main_image_thumb  text default '',
  developer_name    text,
  instagram_url     text,
  is_featured       boolean not null default false,
  is_published      boolean not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- property images
-- ---------------------------------------------------------------------

create table if not exists public.property_images (
  id            uuid primary key default gen_random_uuid(),
  property_id   uuid not null references public.properties(id) on delete cascade,
  sort_order    integer not null default 0,
  caption       text default '',
  alt_text      text default '',
  image_url     text not null,
  thumb_url     text not null default '',
  created_at    timestamptz not null default now()
);
create index if not exists property_images_property_idx on public.property_images(property_id, sort_order);

-- ---------------------------------------------------------------------
-- property videos
-- ---------------------------------------------------------------------

create table if not exists public.property_videos (
  id            uuid primary key default gen_random_uuid(),
  property_id   uuid not null references public.properties(id) on delete cascade,
  embed_url     text not null,
  thumbnail     text default '',
  label         text default '',
  created_at    timestamptz not null default now()
);
create index if not exists property_videos_property_idx on public.property_videos(property_id);

-- ---------------------------------------------------------------------
-- reels (site-wide social reels)
-- ---------------------------------------------------------------------

create table if not exists public.reels (
  id            text primary key,
  title         text not null,
  reel_url      text not null,
  embed_url     text not null,
  cover_image   text default '',
  cover_thumb   text default '',
  display_order integer not null default 0,
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- blog posts
-- ---------------------------------------------------------------------

create table if not exists public.blog_posts (
  id            text primary key,
  slug          text unique not null,
  title         text not null,
  publish_date  date not null default current_date,
  author        text not null default 'Editorial Team',
  cover_image   text default '',
  cover_thumb   text default '',
  content       text not null,
  excerpt       text default '',
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- testimonials
-- ---------------------------------------------------------------------

create table if not exists public.testimonials (
  id              uuid primary key default gen_random_uuid(),
  client_name     text not null,
  client_location text default '',
  rating          integer not null default 5 check (rating between 1 and 5),
  review_text     text not null,
  review_date     date,
  client_photo    text default '',
  is_published    boolean not null default false,
  created_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- faqs
-- ---------------------------------------------------------------------

create table if not exists public.faqs (
  id            text primary key,
  question      text not null,
  answer        text not null,
  category      text default 'General',
  display_order integer not null default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- enquiries (public form submissions -> CMS inbox)
-- ---------------------------------------------------------------------

create table if not exists public.enquiries (
  id            uuid primary key default gen_random_uuid(),
  kind          text not null default 'contact' check (kind in ('contact','property','sell','partner')),
  property_id   uuid references public.properties(id) on delete set null,
  name          text not null,
  phone         text not null,
  email         text,
  message       text default '',
  payload       jsonb default '{}',   -- form-specific extras (budget, bhk, area...)
  status        text not null default 'new' check (status in ('new','contacted','closed','spam')),
  created_at    timestamptz not null default now()
);
create index if not exists enquiries_status_idx on public.enquiries(status, created_at desc);
create index if not exists enquiries_property_idx on public.enquiries(property_id);

-- ---------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists properties_touch on public.properties;
create trigger properties_touch before update on public.properties
  for each row execute function public.touch_updated_at();

drop trigger if exists blog_posts_touch on public.blog_posts;
create trigger blog_posts_touch before update on public.blog_posts
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------
-- helper view: published properties for the public site
-- ---------------------------------------------------------------------

create or replace view public.published_properties as
  select * from public.properties where is_published;

-- ---------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------

alter table public.properties       enable row level security;
alter table public.property_images  enable row level security;
alter table public.property_videos  enable row level security;
alter table public.reels            enable row level security;
alter table public.blog_posts       enable row level security;
alter table public.testimonials     enable row level security;
alter table public.faqs             enable row level security;
alter table public.enquiries        enable row level security;

-- public read: published content only
create policy "public read published properties" on public.properties
  for select using (is_published);
create policy "public read published images" on public.property_images
  for select using (
    exists (select 1 from public.properties p
            where p.id = property_images.property_id and p.is_published)
  );
create policy "public read published videos" on public.property_videos
  for select using (
    exists (select 1 from public.properties p
            where p.id = property_videos.property_id and p.is_published)
  );
create policy "public read reels" on public.reels
  for select using (true);
create policy "public read published blog" on public.blog_posts
  for select using (is_published);
create policy "public read published testimonials" on public.testimonials
  for select using (is_published);
create policy "public read published faqs" on public.faqs
  for select using (is_published);

-- anonymous visitors may create enquiries, but never read/update them
create policy "anyone can submit an enquiry" on public.enquiries
  for insert with check (true);

-- ---------------------------------------------------------------------
-- admin write access: authenticated CMS users (role 'admin')
-- ---------------------------------------------------------------------

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    or (auth.jwt() -> 'user_metadata'  ->> 'role') = 'admin',
    false
  );
$$;

create policy "admins manage properties" on public.properties
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage images" on public.property_images
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage videos" on public.property_videos
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage reels" on public.reels
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage blog" on public.blog_posts
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage testimonials" on public.testimonials
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage faqs" on public.faqs
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage enquiries" on public.enquiries
  for all using (public.is_admin()) with check (public.is_admin());

-- storage bucket for media
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;
