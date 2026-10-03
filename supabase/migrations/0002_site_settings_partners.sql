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
  ('brand_name', 'Apex Living'),
  ('tagline', 'Premier Architectural Residences & Luxury Real Estate'),
  ('hero_title', 'Homes worth the grand tour.'),
  ('hero_subtitle', 'Hand-verified flats, penthouses and commercial spaces across prime localities. Every listing walked through, every paper checked.'),
  ('hero_eyebrow', 'Verified Architectural Residences'),
  ('about_intro', 'Apex Living is a premier real estate advisory and showcase platform. We curate verified residences - physical walkthroughs, clear legal titles, and architectural distinction - so buyers see only what is real, and sellers connect with qualified clientele.'),
  ('phone', '+91 98000 00000'),
  ('whatsapp_number', '919800000000'),
  ('email', 'advisory@apexliving-demo.com'),
  ('city', 'Metro Prime Corridors'),
  ('instagram_handle', 'apexliving.demo'),
  ('instagram_url', 'https://instagram.com/apexliving.demo'),
  ('facebook_url', 'https://facebook.com/apexliving.demo'),
  ('youtube_url', 'https://youtube.com/@ApexLivingDemo'),
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
  ('Auricas', 'auricas', '/images/partners/auricas.webp', 'https://auricas.com', 'Crafting Golden Spaces - Premium residential developments across Kolkata', 10),
  ('CREDAI Kolkata', 'credai', '/images/partners/credai.webp', 'https://credaibengal.in', 'Apex body for private real estate developers, setting ethical standards and construction excellence across Bengal.', 20),
  ('DTC Group', 'dtc', '/images/partners/dtc.webp', 'https://dtcgroup.in', 'Commit. Deliver. Grow - Leading infrastructure and integrated township developers in Greater Kolkata.', 30),
  ('Eden Group', 'eden', '/images/partners/eden.webp', 'https://edengroup.in', 'Distinctive architectural homes across North & South Kolkata with proven legacy.', 40),
  ('Hero Homes', 'herohomes', '/images/partners/herohomes.webp', 'https://herohomes.in', 'Sustainable luxury communities and integrated high-rise wellness enclaves.', 50),
  ('Ruchi Realty', 'ruchirealty', '/images/partners/ruchirealty.webp', 'https://ruchirealty.com', 'Iconic commercial and residential landmarks with state-of-the-art community amenities.', 60),
  ('Silver Villa', 'silvervilla', '/images/partners/silvervilla.webp', '', 'Bespoke gated villas and premium boutique residences in peaceful green corridors.', 70),
  ('Synergy Group', 'synergy', '/images/partners/synergy.webp', '', 'Modern high-rise residential towers strategically connected to Kolkata’s key transit nodes.', 80)
on conflict (slug) do update set
  name = excluded.name,
  logo_url = excluded.logo_url,
  website_url = excluded.website_url,
  description = excluded.description,
  display_order = excluded.display_order;

