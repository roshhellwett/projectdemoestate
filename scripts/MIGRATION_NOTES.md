# Legacy Data Migration Notes

Source: `clientprovideddata/` (Wix export + offline mirror of the old
ssproperty site). Target: Supabase (project `vuvxmzrthcitfagwebgm`).

## What was audited and repaired

### properties (23 rows)
| Issue | Resolution |
|---|---|
| Duplicate `propertyId` values across listings (e.g. three listings share `PROP003`, four share `PROP001`) | Each listing keeps its Wix UUID as primary id. Slugs made unique. Galleries re-keyed per UUID (see images). |
| Mixed price formats (`7200000.0`, `1.35` meaning ₹1.35 Cr, `priceAsText: "INR 68 Lacs"`, one listing price missing) | All normalized to a single numeric `price_inr` in INR. Missing price shows "Price on Request". |
| Empty `mainImage` on 12 of 23 listings | Filled from the listing's first gallery photo (same fallback the old site used). |
| Fake/demo `instagramUrl` values (`prop350_reel`, `laketown_flat_reel`...) | Dropped; only real `instagram.com/p/<code>` posts kept. 9 real posts retained. |
| `areaSqFt` missing on one listing (371) | Kept null; UI renders "On request". |

### propertyimages (147 rows -> 89 kept -> 173 listing-image rows)
| Issue | Resolution |
|---|---|
| 132 images stored as inline base64 data URIs | Decoded to files, optimized to WebP variants (full 1600px / thumb 900px). |
| 55 image rows keyed to non-existent listings (`P001`-`P004`, `358`, `365`, `373`) | Dropped. These belonged to deleted/demo Wix collections - they never rendered on the live site (old site joined by propertyId; those ids had no live listing). |
| Duplicate listings sharing one `propertyId` all showed the same gallery | Preserved exactly: every duplicate listing keeps the shared gallery (matches old-site behaviour; no invented ownership). |
| `altText` like "Property image 1" | Kept; better than nothing for a11y. CMS allows editing. |

### propertyvideos (10 rows -> 0 kept)
All 10 embed URLs are fake placeholders (`youtube.com/embed/uvwxy012`,
`instagram.com/reel/property366reel`). The only two real reels found anywhere
in the export (codes `DbqdwlJPfz2`, `DcENruovD5A`) were attached to non-live
demo listings (366/369). Those two real reels are seeded into `reels` with
their verified cover photos. **Result: zero real property-linked video tours
exist in the legacy data.** The property detail page shows the listing's real
Instagram post (where one exists) instead.

### featuredreels (6 rows -> 2 kept)
All 6 legacy reel URLs are fake (`C1R2S3T4U5V` style codes). Only the 2
verified pairings (reel code + cover photo that the old site actually
displayed) are seeded.

### testimonials (3 rows -> kept but UNPUBLISHED)
The legacy records are Wix sample content: US names ("Emily R., Chicago"),
generic product-review text ("the product quality is exceptional") that has
nothing to do with Kolkata real estate. Publishing them would be shipping
fake reviews. They are migrated with `is_published = false` and the client
must supply real reviews through the CMS.

### blogposts (6) + faq (6) - kept as-is
Real editorial content. Slugs generated. `is_published = true`.

## Media pipeline
- 88 original photos (74.5 MB, mostly 1200px PNG) -> per-image variants:
  `originals/` (byte copy), `full/` (max 1600px WebP q82), `thumb/` (max 900px WebP q78).
- 111 unique source images processed (media/b originals + decoded base64 gallery).
- CMS uploads go to Supabase Storage bucket `media` under
  `full/` and `thumb/` (same layout), so migrated + new images share one URL scheme.

## Open items for the client
1. Testimonials: replace Wix template reviews with real client reviews (CMS).
2. Property video tours: none exist; record real walkthroughs or embed the
   business's Instagram posts per listing (9 listings already have real post links).
3. Blog authors are generic ("Jessica Adams" etc.) - replace with real names
   or the SS Property team byline.
4. Listing 371 has no price and no area - client to fill via CMS.
