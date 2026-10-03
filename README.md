# Apex Living · Luxury Real Estate Demo Platform

Turnkey luxury real estate website + CMS showcase. Ready to rebrand and deploy for any real estate agency or developer with their custom logo, colors, domain, and inventory.

## Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (React 19, SSR + server functions) |
| Styling | Tailwind CSS v4, custom Ivory & Brass token set |
| Fonts | Fraunces + Plus Jakarta Sans (self-hosted variable, via fontsource) |
| Database + Auth + Storage | Supabase (Postgres 17, RLS, GoTrue, Storage bucket `media`) |
| Hosting | Cloudflare Workers (wrangler + @cloudflare/vite-plugin) |
| Language | TypeScript (strict) |

## Project layout

```
(repo root - flat layout)
├── scripts/
│   ├── migrate_legacy_data.py   # Wix export -> clean seeds + image variants
│   ├── seed.mjs                 # seeds Supabase (tables + storage)
│   ├── remove_tilde_variants.py # cleanup helper
│   ├── out/                      # generated seed JSON (committed state)
│   ├── variants/                 # generated WebP variants (upload staging)
│   └── MIGRATION_NOTES.md        # what was repaired and why
├── src/
│   ├── components/          # UI (header, footer, cards, forms, admin/*)
│   ├── lib/                 # types, queries, cms mutations, format, site
│   ├── routes/               # file-based routes (public + /admin/* + /login)
│   ├── server/enquiries.ts  # server function: enquiry submission
│   └── styles/app.css       # Tailwind v4 theme (design tokens)
├── supabase/migrations/0001_initial_schema.sql   # tables, RLS, triggers
├── originals-archive/       # byte-identical source photos (local only)
├── partners/                # partner brand assets (DTC.png)
├── wrangler.jsonc            # worker name: luxury-estate-demo
└── vite.config.ts
```

## Commands

```bash
npm run dev        # local dev (vite + wrangler proxy)
npm run typecheck  # tsc --noEmit
npm run build      # production build
npm run deploy     # build + wrangler deploy
```

## Data model

- `properties` - listings (price_inr numeric, locality, slug, published/featured flags)
- `property_images` - gallery rows per property (sort_order, urls to storage)
- `reels`, `blog_posts`, `testimonials`, `faqs` - content collections
- `enquiries` - public form submissions (contact/property/sell/partner)

**RLS:** anonymous users can read published content and INSERT enquiries
(never read them). All writes require an authenticated session whose
`user_metadata.role = 'admin'`.

## CMS

- `/login` - email + password (Supabase GoTrue)
- `/admin` - listings table (publish toggle, delete) + enquiries inbox (status)
- `/admin/new`, `/admin/property/$id` - full listing editor with multi-photo
  upload (WebP variants generated in-browser), gallery reorder, cover picker

Route structure: `admin.tsx` is the guard + layout (`<Outlet />`);
`admin.index.tsx` is the dashboard; editor pages are children that render
inside the layout.

Admin account (first login): Configure your admin email via Supabase Dashboard -> Authentication.

## Media pipeline

- Uploaded photos are re-encoded client-side to WebP `full/` (1600px q82) and
  `thumb/` (900px q78) and stored in the public `media` bucket.
- Migrated images follow the same two-variant layout; the DB stores absolute
  storage URLs, so the worker ships no image payload.

## Open items for the client

1. Replace the placeholder testimonials (legacy ones were Wix template junk,
   seeded unpublished) with real client reviews via the CMS.
2. Property video tours: none existed in the legacy data. 9 listings link to
   real Instagram walkthrough posts; record proper tours when possible.
3. Blog author names are Wix defaults - replace with real bylines.
4. Listing 371 (Lake Town 4 BHK) has no price/area - fill via CMS.
5. Point a custom domain at the worker when ready.
