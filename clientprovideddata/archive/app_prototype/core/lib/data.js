// ============================================================
// data.js — collection loading + query helpers.
// Loads the 7 collections once from the clone's data dir and
// caches them module-scope. All page queries are synchronous.
// ============================================================

const CACHE = {};
const BASE = '/app/data';

export const COLLECTIONS = ['properties', 'propertyimages', 'propertyvideos', 'featuredreels', 'blogposts', 'testimonials', 'faq'];

async function loadJSON(name) {
  const res = await fetch(`${BASE}/${name}.json`);
  if (!res.ok) throw new Error(`data: ${name} → HTTP ${res.status}`);
  return res.json();
}

/** Boot the data layer. Call once before first render. */
export async function boot() {
  const results = await Promise.all(COLLECTIONS.map(loadJSON));
  COLLECTIONS.forEach((c, i) => { CACHE[c] = results[i]; });
  return CACHE;
}

const list = (c) => CACHE[c] || [];

/* ---------------- properties ---------------- */

export const properties = () => list('properties');

export function propertyById(id) {
  return properties().find((p) => p._id === id || p.propertyId === String(id));
}

/** Gallery images for a property (ordered). imageData may be local url or dataURI. */
export function imagesFor(p) {
  const pid = p?.propertyId;
  const rows = list('propertyimages').filter((im) => im.propertyId === pid);
  rows.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const out = rows.map((im) => ({
    src: typeof im.imageData === 'string' && im.imageData.startsWith('data:')
      ? im.imageData
      : im.imageData,
    alt: im.altText || im.caption || p?.propertyName || 'Property photo',
    caption: im.caption || '',
  })).filter((im) => im.src);
  if (p?.mainImage) out.unshift({ src: p.mainImage, alt: out[0]?.alt || 'Main photo', caption: '' });
  return out;
}

/** Cover image: mainImage → first gallery → placeholder token. */
export function coverFor(p) {
  if (p?.mainImage) return p.mainImage;
  const g = imagesFor(p);
  return g[0]?.src || null;
}

/** Statuses present in data (for filter chips). */
export function propertyStatuses() {
  const set = new Set(properties().map((p) => p.status).filter(Boolean));
  return [...set];
}

export function propertyTypes() {
  const set = new Set(properties().map((p) => p.propertyType).filter(Boolean));
  return [...set];
}

/** Filter properties: { type, bhk, status, min, max, q } */
export function filterProperties(f = {}) {
  let rows = properties();
  if (f.type) rows = rows.filter((p) => p.propertyType === f.type);
  if (f.bhk) rows = rows.filter((p) => String(p.bhkType || '').includes(f.bhk));
  if (f.status) rows = rows.filter((p) => p.status === f.status);
  if (f.q) {
    const q = String(f.q).toLowerCase();
    rows = rows.filter((p) =>
      [p.propertyName, p.location, p.bhkType, p.propertyType, p.description, p.status]
        .filter(Boolean).join(' ').toLowerCase().includes(q));
  }
  if (f.min != null && f.min !== '') rows = rows.filter((p) => p.price != null && Number(p.price) >= f.min);
  if (f.max != null && f.max !== '') rows = rows.filter((p) => p.price != null && Number(p.price) <= f.max);
  return rows;
}

/** Newest first by createdDate. */
export function newestFirst(rows) {
  return [...rows].sort((a, b) => String(b._createdDate?.$date || '').localeCompare(String(a._createdDate?.$date || '')));
}

/** Similar: same type or same area-keyword, excluding self. */
export function similarTo(p, n = 3) {
  const area = parseAreaKey(p);
  return properties()
    .filter((x) => x._id !== p._id)
    .map((x) => {
      let score = 0;
      if (x.propertyType === p.propertyType) score += 2;
      if (parseAreaKey(x) === area) score += 3;
      if (x.bhkType === p.bhkType) score += 1;
      return { x, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((s) => s.x);
}

function parseAreaKey(p) {
  const loc = String(p?.location || '');
  return loc.split(',')[0]?.trim().toLowerCase() || '';
}

/* ---------------- other collections ---------------- */

export const reels = () => [...list('featuredreels')].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
export const videos = () => list('propertyvideos');
export const blogposts = () => [...list('blogposts')].sort((a, b) => String(b.publishDate || '').localeCompare(String(a.publishDate || '')));
export const postById = (id) => blogposts().find((b) => b._id === id);
export const testimonials = () => list('testimonials');
export const faqs = () => [...list('faq')].filter((f) => f.isPublished !== false).sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

/** video tour for a property (by propertyId). */
export function tourFor(p) {
  return list('propertyvideos').find((v) => v.propertyId === p?.propertyId);
}

/** Parse plain-text blog content into paragraphs. */
export function blogParagraphs(post) {
  return String(post?.content || '').split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
}
