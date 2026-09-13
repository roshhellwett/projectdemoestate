-- =====================================================================
-- 0002 - CMS expansion: site settings, partners wall, reels publication
-- (Already applied LIVE to the production Supabase project via MCP on
--  2026-09-12; this file mirrors it for fresh-clone reproducibility.)
-- =====================================================================

create table if not exists public.site_settings (
  key         text primary key,
  value       text not null default '',
  updated_at  timestamptz not null default now()
);

create table if not exists public.partners (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text unique not null,
  logo_url      text not null default '',
  website_url   text default '',
  description   text default '',
  display_order integer not null default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now()
);
create index if not exists partners_order_idx on public.partners(display_order);

alter table public.reels
  add column if not exists is_published boolean not null default true;

alter table public.site_settings enable row level security;
alter table public.partners enable row level security;

create policy "public read settings" on public.site_settings
  for select using (true);
create policy "public read partners" on public.partners
  for select using (true);

create policy "admins manage settings" on public.site_settings
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage partners" on public.partners
  for all using (public.is_admin()) with check (public.is_admin());

insert into public.site_settings(key, value) values
  ('brand_name', 'SS Property'),
  ('tagline', 'Premium Real Estate in Kolkata'),
  ('hero_title', 'Homes worth the grand tour.'),
  ('hero_subtitle', 'Hand-verified flats, penthouses and commercial spaces across Kolkata. Every listing walked through, every paper checked.'),
  ('hero_eyebrow', 'Kolkata · Verified Listings'),
  ('about_intro', 'SS Property is a Kolkata-based real estate advisory. We verify every listing in person - structure, papers, neighbourhood - so buyers see only what is real, and sellers deal only with serious people.'),
  ('phone', '+91 94296 93786'),
  ('whatsapp_number', '919429693786'),
  ('email', 'writetous@ssproperty.in'),
  ('city', 'Kolkata, West Bengal'),
  ('instagram_handle', 'sspropertykol'),
  ('instagram_url', 'https://instagram.com/sspropertykol'),
  ('facebook_url', 'https://facebook.com/sspropertykol'),
  ('youtube_url', 'https://youtube.com/@SSProperty'),
  ('footer_note', 'Verified listings. Transparent pricing. No hidden charges.'),
  ('cta_title', 'Selling? We put your property in front of the right buyers.'),
  ('cta_subtitle', 'Fair valuation, verified footfalls, zero pressure.'),
  ('sell_intro', 'Thousands of qualified buyers search with us every month. We verify, photograph and market your listing so serious people come to you.'),
  ('partner_intro', 'Developers, interior brands and financial services - reach Kolkata''s qualified property buyers.'),
  ('journal_intro', 'Buyer guides, market notes and honest advice on Kolkata real estate.'),
  ('properties_intro', 'Filter by locality, configuration and budget - every listing verified in person.'),
  ('about_stat_1_value', '100%'),
  ('about_stat_1_label', 'Papers checked'),
  ('about_stat_1_note', 'Title, dues and approvals verified before listing.'),
  ('about_stat_2_value', '1:1'),
  ('about_stat_2_label', 'Dedicated advisor'),
  ('about_stat_2_note', 'One person owns your search end to end.'),
  ('about_stat_3_value', 'Local'),
  ('about_stat_3_label', 'Kolkata born and based'),
  ('about_stat_3_note', 'We know these streets, blocks and builders by name.')
on conflict (key) do nothing;

insert into public.partners(name, slug, logo_url, website_url, description, display_order) values
  ('Auricas', 'auricas', '/images/partners/auricas.webp', '', '', 10),
  ('CREDAI', 'credai', '/images/partners/credai.webp', '', '', 20),
  ('DTC', 'dtc', '/images/partners/dtc.webp', '', '', 30),
  ('Eden', 'eden', '/images/partners/eden.webp', '', '', 40),
  ('Hero Homes', 'herohomes', '/images/partners/herohomes.webp', '', '', 50),
  ('Ruchi Realty', 'ruchirealty', '/images/partners/ruchirealty.webp', '', '', 60),
  ('Silver Villa', 'silvervilla', '/images/partners/silvervilla.webp', '', '', 70),
  ('Synergy', 'synergy', '/images/partners/synergy.webp', '', '', 80)
on conflict (slug) do nothing;
