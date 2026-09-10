#!/usr/bin/env python3
"""
SS Property - legacy Wix data -> normalized seed pipeline.

Reads the 7 raw collections from clientprovideddata/data/, repairs them,
generates optimized image variants (originals / full / thumb WebP) and writes
clean JSON seeds into scripts/out/ plus asset files into public/media/.

Repairs performed (full audit trail in scripts/MIGRATION_NOTES.md):
  properties    : stable UUID ids, unique slugs, price normalized to INR,
                  locality derived, empty main_image filled from first gallery
                  photo (same fallback the old site used), featured flag.
  images        : base64 blobs decoded to files; galleries re-keyed from
                  duplicate legacy propertyIds to per-listing UUIDs. Legacy
                  orphan images (P001-P004, 358/365/373) are dropped - they
                  belonged to demo/deleted listings that were never live.
  videos        : fake embed URLs dropped. Zero real property-linked tours
                  exist in the legacy data, so this collection seeds empty.
  reels         : all 6 legacy rows carried fake URLs; only the 2 verified
                  (reel code + cover photo) pairings are seeded.
  testimonials  : legacy records are Wix template junk (US names, generic
                  product-review text). Migrated with is_published=false;
                  the client must supply real reviews before publishing.
  blog / faq    : real editorial content, kept, slugified.

Run:  python scripts/migrate_legacy_data.py
"""

from __future__ import annotations

import base64
import json
import re
import shutil
import unicodedata
from pathlib import Path

from PIL import Image, ImageOps  # Pillow 12.x with WebP support

HERE = Path(__file__).resolve().parent
# Layout (flat): <repo>/scripts -> <repo> is the app root, client data is a sibling dir.
APP_ROOT = HERE.parents[0]
PROJECT_ROOT = HERE.parents[0]
CLIENT_DATA = PROJECT_ROOT / "clientprovideddata"
DATA = CLIENT_DATA / "data"
MEDIA = CLIENT_DATA / "media"
OUT = HERE / "out"
# Variants live only transiently; the site serves images from Supabase Storage.
VARIANTS_DIR = HERE / "variants"

# Verified (reel code -> cover image) pairs from propertyvideos.json records
# 366/369, whose Instagram URLs are real published posts of the business and
# whose thumbnails are the covers the old site actually displayed.
VERIFIED_REELS = [
    {"code": "DbqdwlJPfz2", "cover": "216404_402c7cbb5bc14fa1a454d4dcec4a68a5~mv2.png", "title": "Featured property tour"},
    {"code": "DcENruovD5A", "cover": "216404_d52b8e425a4c4ce3951de0a575d5abde~mv2.png", "title": "Site walkthrough reel"},
]

# Fake-URL fragments found in the legacy data (demo placeholders).
FAKE_URL_FRAGMENT = re.compile(
    r"(prop\d+_reel|_flat_reel|nayabad_terrace_flat|bangur_avenue_flat"
    r"|uvwxy012|abcdef123|ghijk456|lmnop789|qrsdef456|xyzabc123"
    r"|property36[69]reel|property36[69]video)"
)


def is_real_instagram(url: str) -> bool:
    if not url or "instagram.com" not in url:
        return False
    return not FAKE_URL_FRAGMENT.search(url)


# ---------------------------------------------------------------------------
# generic helpers
# ---------------------------------------------------------------------------

def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    # normalize dashes: em/en dash -> hyphen (banned char on the page)
    text = text.replace("\u2014", "-").replace("\u2013", "-")
    return re.sub(r"[^a-zA-Z0-9]+", "-", text).strip("-").lower() or "item"


def clean_text(text: str) -> str:
    """Strip em/en dashes from display strings (house style: hyphen only)."""
    return text.replace("\u2014", "-").replace("\u2013", "-")


def load_json(name: str):
    with open(DATA / f"{name}.json", encoding="utf-8") as f:
        return json.load(f)


def dump(name: str, records) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    with open(OUT / f"{name}.json", "w", encoding="utf-8") as f:
        json.dump(records, f, ensure_ascii=False, indent=1)


def resolve_media_file(path: str) -> Path | None:
    """Map a legacy /media/... reference to its file on disk."""
    if not path or not path.startswith("/media/"):
        return None
    rel = path[len("/media/"):]
    for root in (MEDIA, VARIANTS_DIR):
        cand = root / rel
        if cand.is_file():
            return cand
    return None


# ---------------------------------------------------------------------------
# 1. properties
# ---------------------------------------------------------------------------

def normalize_price(price, price_as_text):
    """Return (numeric_inr, display_or_None)."""
    if price_as_text and str(price_as_text).strip():
        text = str(price_as_text).replace("\u20b9", "").strip()
        m = re.match(
            r"^(?:INR\s*)?([0-9][0-9.,]*)\s*(Cr|Crore|Crores|Lac|Lacs|Lakh|Lakhs)?",
            text, re.I,
        )
        if m:
            num = float(m.group(1).replace(",", ""))
            unit = (m.group(2) or "").lower()
            if unit.startswith("cr"):
                return num * 1e7, None
            if unit.startswith(("lac", "lakh")):
                return num * 1e5, None
            return num, None
    if price is None:
        return None, "Price on Request"
    p = float(price)
    if p < 100:  # short crores form, e.g. 1.35 == Rs 1.35 Cr
        return p * 1e7, None
    return p, None


LOCALITY_MAP = [
    ("newtown", "Newtown"),
    ("rajarhat", "Rajarhat"),
    ("kasba", "Kasba"),
    ("lake town", "Lake Town"),
    ("bangur", "Bangur Avenue"),
    ("chinar park", "Chinar Park"),
    ("garia", "Garia"),
    ("konnagar", "Konnagar"),
    ("howrah", "Howrah"),
    ("nayabad", "Nayabad"),
    ("chittaranjan", "C.R. Avenue"),
    ("bow barracks", "C.R. Avenue"),
    ("south dumdum", "South Dumdum"),
]


def derive_locality(location: str) -> str:
    loc = location.lower()
    for needle, label in LOCALITY_MAP:
        if needle in loc:
            return label
    return location.split(",")[0].strip()


def _split_landmarks(raw) -> list[str]:
    if not raw:
        return []
    if isinstance(raw, str):
        return [s.strip(" |") for s in raw.split("|") if s.strip(" |")]
    return [str(s).strip() for s in raw if str(s).strip()]


def decode_inline_image(data_uri: str, out_name: str) -> str:
    """Decode a base64 data URI to a file in public/media/b, return its path."""
    header, b64 = data_uri.split(",", 1)
    ext = "jpg" if "jpeg" in header else "png"
    dest = VARIANTS_DIR / "b" / f"{out_name}.{ext}"
    dest.parent.mkdir(parents=True, exist_ok=True)
    if not dest.exists():
        dest.write_bytes(base64.b64decode(b64))
    return f"/media/b/{dest.name}"


def migrate_properties():
    raw = load_json("properties")
    out = []
    for p in raw:
        numeric, display = normalize_price(p.get("price"), p.get("priceAsText"))
        ig = p.get("instagramUrl") or ""
        main_image = p.get("mainImage") or ""
        if main_image.startswith("data:"):
            # property 371 stores its only photo as an inline base64 blob
            main_image = decode_inline_image(main_image, f"main-{p['_id'][:8]}")
        out.append({
            "id": p["_id"],
            "legacy_property_id": p["propertyId"],
            "slug": slugify(p["propertyName"]),
            "title": clean_text(p["propertyName"].strip()),
            "location": clean_text(p["location"].strip()),
            "locality": derive_locality(p["location"]),
            "price_inr": numeric,
            "price_display": display,
            "bhk_type": p["bhkType"].strip(),
            "property_type": (p.get("propertyType") or "").strip() or "Apartment",
            "possession_status": (p.get("possessionStatus") or "Available").strip(),
            "furnishing_status": (p.get("furnishingStatus") or "").strip(),
            "area_sqft": int(p["areaSqFt"]) if p.get("areaSqFt") else None,
            "bathrooms": int(p["numberOfBathrooms"]) if p.get("numberOfBathrooms") is not None else None,
            "balconies": int(p["numberOfBalconies"]) if p.get("numberOfBalconies") is not None else None,
            "floor": p.get("floor") or None,
            "facing": p.get("facing") or None,
            "parking": p.get("parking") or None,
            "amenities": [a.strip() for a in re.split(r"[,|]", p.get("amenities") or "") if a.strip()],
            "landmarks": _split_landmarks(p.get("landmarks")),
            "description": clean_text((p.get("description") or "").strip()),
            "category": (p.get("category") or "").strip() or None,
            "status": (p.get("status") or "Available").strip(),
            "main_image": main_image,
            "developer_name": (p.get("developerName") or "").strip() or None,
            "instagram_url": ig if is_real_instagram(ig) else None,
            "created_at": p.get("_createdDate", {}).get("$date"),
            "is_featured": False,
            "is_published": True,
        })

    # unique slugs: on collision append the legacy id, then a counter
    used: set[str] = set()
    for listing in out:
        base = listing["slug"]
        slug = base
        if slug in used:
            slug = f"{base}-{listing['legacy_property_id'].lower()}"
            n = 2
            while f"{slug}" in used:
                slug = f"{base}-{listing['legacy_property_id'].lower()}-{n}"
                n += 1
        listing["slug"] = slug
        used.add(slug)

    # featured: priciest listing per locality gets the hero slot
    best = {}
    for listing in out:
        if listing["price_inr"] and (
            listing["locality"] not in best
            or listing["price_inr"] > best[listing["locality"]]["price_inr"]
        ):
            best[listing["locality"]] = listing
    for listing in best.values():
        listing["is_featured"] = True
    print(f"properties: {len(out)} listings ({sum(1 for l in out if l['is_featured'])} featured)")
    return out


# ---------------------------------------------------------------------------
# 2. images
# ---------------------------------------------------------------------------

def migrate_images(properties):
    raw = load_json("propertyimages")
    legacy_to_uuids = {}
    for p in properties:
        legacy_to_uuids.setdefault(p["legacy_property_id"], []).append(p["id"])

    records = []
    decoded = 0
    for img in raw:
        legacy_pid = img["propertyId"]
        uuids = legacy_to_uuids.get(legacy_pid)
        if not uuids:
            continue  # orphan: image of a deleted/demo listing, never live
        src = img["imageData"]
        if src.startswith("data:"):
            header, b64 = src.split(",", 1)
            ext = "jpg" if "jpeg" in header else "png"
            fname = f"legacy-{img['_id'][:8]}.{ext}"
            dest = VARIANTS_DIR / "gallery" / fname
            dest.parent.mkdir(parents=True, exist_ok=True)
            if not dest.exists():
                dest.write_bytes(base64.b64decode(b64))
                decoded += 1
            src = f"/media/gallery/{fname}"
        records.append({
            "id": img["_id"],
            "legacy_property_id": legacy_pid,
            "order": int(img.get("order") or 0),
            "caption": (img.get("caption") or "").strip(),
            "alt_text": (img.get("altText") or "").strip(),
            "src": src,
        })

    # Legacy duplicate propertyIds shared one gallery across their duplicate
    # listings (the old site joined on propertyId). We preserve exactly what
    # the old site rendered: every duplicate listing keeps the shared gallery.
    expanded = []
    for r in records:
        for uuid in legacy_to_uuids[r["legacy_property_id"]]:
            expanded.append({**r, "property_uuid": uuid})
    print(f"images: {len(records)} source rows -> {len(expanded)} rows ({decoded} b64 decoded this run)")
    return expanded


def fill_main_images(properties, images):
    """Empty main_image falls back to the first gallery photo (old-site behaviour)."""
    filled = 0
    for p in properties:
        if p["main_image"]:
            continue
        rows = [r for r in images if r["property_uuid"] == p["id"]]
        if rows:
            p["main_image"] = min(rows, key=lambda r: r["order"])["src"]
            filled += 1
    if filled:
        print(f"main_image: filled {filled} empty covers from gallery")


# ---------------------------------------------------------------------------
# 3. videos - real Instagram embeds only
# ---------------------------------------------------------------------------

def migrate_videos(properties):
    raw = load_json("propertyvideos")
    by_legacy = {}
    for p in properties:
        by_legacy.setdefault(p["legacy_property_id"], []).append(p)
    out = []
    for v in raw:
        url = v["embedUrl"]
        if not is_real_instagram(url):
            continue
        m = re.search(r"instagram\.com/(?:p|reel)/([A-Za-z0-9_-]+)", url)
        if not m:
            continue
        matches = by_legacy.get(v["propertyId"])
        if not matches:
            continue  # real reel, but references a listing that is not live
        code = m.group(1)
        for p in matches:
            out.append({
                "id": f'{v["_id"]}-{p["id"][:8]}',
                "property_uuid": p["id"],
                "embed_url": (f"https://www.instagram.com/p/{code}/embed" if "/p/" in url
                              else f"https://www.instagram.com/reel/{code}/embed"),
                "thumbnail": v.get("thumbnailImage") or "",
                "label": v["propertyType"],
            })
    print(f"videos: {len(raw)} raw -> {len(out)} property-linked rows (fake embeds dropped)")
    return out


# ---------------------------------------------------------------------------
# 4. reels - only verified pairs
# ---------------------------------------------------------------------------

def migrate_reels():
    out = []
    for idx, spec in enumerate(VERIFIED_REELS):
        out.append({
            "id": f"reel-{spec['code'].lower()}",
            "title": spec["title"],
            "reel_url": f"https://www.instagram.com/reel/{spec['code']}/",
            "embed_url": f"https://www.instagram.com/reel/{spec['code']}/embed",
            "cover_image": f"/media/b/{spec['cover']}",
            "display_order": idx + 1,
        })
    print(f"reels: {len(out)} verified reels seeded (all 6 legacy rows were fake URLs)")
    return out


# ---------------------------------------------------------------------------
# 5. testimonials - honest handling of template junk
# ---------------------------------------------------------------------------

def migrate_testimonials():
    raw = load_json("testimonials")
    out = []
    for t in raw:
        out.append({
            "id": t["_id"],
            "client_name": t["clientName"],
            "client_location": t["clientLocation"],
            "rating": int(t["rating"]),
            "review_text": t["reviewText"],
            "review_date": t["reviewDate"],
            "client_photo": t.get("clientPhoto") or "",
            "is_published": False,  # Wix template junk - client must replace before publishing
        })
    print(f"testimonials: {len(out)} records, all is_published=false (template junk, needs client review)")
    return out


# ---------------------------------------------------------------------------
# 6. blog + 7. faq
# ---------------------------------------------------------------------------

def migrate_blog():
    raw = load_json("blogposts")
    out = []
    for b in raw:
        out.append({
            "id": b["_id"],
            "slug": slugify(b["title"]),
            "title": b["title"],
            "publish_date": b["publishDate"],
            "author": b["author"],
            "cover_image": b.get("coverImage") or "",
            "content": b["content"],
            "is_published": True,
        })
    print(f"blog: {len(out)} posts")
    return out


def migrate_faq():
    raw = load_json("faq")
    out = []
    for f in raw:
        out.append({
            "id": f["_id"],
            "question": f["question"],
            "answer": f["answer"],
            "category": f["category"],
            "display_order": int(f.get("displayOrder") or 0),
            "is_published": bool(f.get("isPublished", True)),
        })
    print(f"faq: {len(out)} items")
    return out


# ---------------------------------------------------------------------------
# 8. image variants - originals / full / thumb (WebP)
# ---------------------------------------------------------------------------

def _flatten_alpha(im: Image.Image) -> Image.Image:
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
        im = Image.alpha_composite(bg, im).convert("RGB")
    return im.convert("RGB")


def build_asset_variants(properties, images, videos, reels, blog, testimonials):
    """Generate storage-bound variants for every referenced image.

    Writes into public/media/:
      full/<stem>.webp     max 1600px wide, q82  (lightbox / detail pages)
      thumb/<stem>.webp    max 900px wide,  q78  (cards / grids)
    Filenames are normalized (no '~' - Supabase storage keys reject it).
    Returns {legacy /media/... path -> {"full": ..., "thumb": ...}}
    """
    refs: dict[str, Path] = {}

    def add(path: str):
        if not path or path in refs:
            return
        src = resolve_media_file(path)
        if src:
            refs[path] = src

    for p in properties:
        add(p["main_image"])
    for r in images:
        add(r["src"])
    for r in reels:
        add(r["cover_image"])
    for v in videos:
        add(v["thumbnail"])
    for b in blog:
        add(b["cover_image"])
    for t in testimonials:
        add(t["client_photo"])

    def safe_stem(name: str) -> str:
        # storage keys must avoid '~' (Supabase rejects it); keep the wix
        # hash meaningful but legal
        return re.sub(r"[^a-zA-Z0-9_-]+", "-", name).strip("-").lower()

    mapping: dict[str, dict[str, str]] = {}
    for path, src in refs.items():
        stem = safe_stem(src.stem)          # e.g. '216404_abc123-mv2'
        full = VARIANTS_DIR / "full" / f"{stem}.webp"
        thumb = VARIANTS_DIR / "thumb" / f"{stem}.webp"
        for d in (full, thumb):
            d.parent.mkdir(parents=True, exist_ok=True)
        if not (full.exists() and thumb.exists()):
            im = ImageOps.exif_transpose(Image.open(src))
            im = _flatten_alpha(im)
            if im.width > 1600:
                im_full = im.resize((1600, int(im.height * 1600 / im.width)), Image.Resampling.LANCZOS)
            else:
                im_full = im
            im_full.save(full, "WEBP", quality=82, method=6)
            if im.width > 900:
                im_thumb = im.resize((900, int(im.height * 900 / im.width)), Image.Resampling.LANCZOS)
            else:
                im_thumb = im
            im_thumb.save(thumb, "WEBP", quality=78, method=6)
        mapping[path] = {"full": f"full/{stem}.webp", "thumb": f"thumb/{stem}.webp"}

    missing = [p for p in (
        [r["src"] for r in images]
        + [p["main_image"] for p in properties if p["main_image"]]
    ) if p not in refs]
    if missing:
        print(f"WARNING: {len(missing)} referenced images have no file on disk:")
        for m in missing[:10]:
            print(f"  - {m}")
    print(f"variants: {len(mapping)} source images -> full/thumb in public/media")
    return mapping


# ---------------------------------------------------------------------------
# main
# ---------------------------------------------------------------------------

def main():
    properties = migrate_properties()
    images = migrate_images(properties)
    fill_main_images(properties, images)
    videos = migrate_videos(properties)
    reels = migrate_reels()
    testimonials = migrate_testimonials()
    blog = migrate_blog()
    faq = migrate_faq()

    mapping = build_asset_variants(properties, images, videos, reels, blog, testimonials)

    # rewrite image rows first (they carry legacy src until here)
    for r in images:
        legacy_src = r.pop("src")
        r["image_url"] = mapping.get(legacy_src, {}).get("full", "")
        r["thumb_url"] = mapping.get(legacy_src, {}).get("thumb", "")
    for p in properties:
        main = p.pop("main_image")
        p["main_image"] = mapping.get(main, {}).get("full", "")
        p["main_image_thumb"] = mapping.get(main, {}).get("thumb", "")
    for r in reels:
        cover = r.pop("cover_image")
        r["cover_image"] = mapping.get(cover, {}).get("full", "")
        r["cover_thumb"] = mapping.get(cover, {}).get("thumb", "")
    for v in videos:
        thumb = v.pop("thumbnail")
        v["thumbnail"] = mapping.get(thumb, {}).get("full", "")
    for b in blog:
        cover = b.pop("cover_image")
        b["cover_image"] = mapping.get(cover, {}).get("full", "")
        b["cover_thumb"] = mapping.get(cover, {}).get("thumb", "")
    for t in testimonials:
        photo = t.pop("client_photo")
        t["client_photo"] = mapping.get(photo, {}).get("thumb", "")

    dump("properties", properties)
    dump("property_images", images)
    dump("property_videos", videos)
    dump("reels", reels)
    dump("testimonials", testimonials)
    dump("blog_posts", blog)
    dump("faqs", faq)

    print(f"\nseeds written to {OUT}")
    uuids_with_images = {r["property_uuid"] for r in images}
    no_gallery = [p["slug"] for p in properties if p["id"] not in uuids_with_images]
    print(f"properties without any gallery: {len(no_gallery)}")
    for s in no_gallery:
        print(f"  - {s}")
    no_main = [p["slug"] for p in properties if not p["main_image"]]
    print(f"properties without main_image: {len(no_main)}")
    for s in no_main:
        print(f"  - {s}")
    broken = [r for r in images if not r["image_url"]]
    print(f"image rows with empty url: {len(broken)}")


if __name__ == "__main__":
    main()
