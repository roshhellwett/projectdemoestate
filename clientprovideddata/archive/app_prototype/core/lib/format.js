// ============================================================
// format.js — pure formatters (single source for display rules)
// ============================================================

/** Indian-grouped currency: 7200000 → "₹72,00,000" */
export function inr(n) {
  if (n == null || isNaN(Number(n))) return null;
  n = Number(n);
  const neg = n < 0;
  const s = Math.abs(Math.round(n)).toString();
  // Indian grouping: last 3, then groups of 2
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const grouped = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3 : last3;
  return (neg ? '−' : '') + '₹' + grouped;
}

/** Short form: 7200000 → "₹72 L", 25000000 → "₹2.5 Cr" */
export function inrShort(n) {
  if (n == null || isNaN(Number(n))) return null;
  n = Number(n);
  if (n >= 1e7) {
    const cr = n / 1e7;
    return '₹' + (cr % 1 === 0 ? cr : cr.toFixed(1).replace(/\.0$/, '')) + ' Cr';
  }
  if (n >= 1e5) {
    const l = n / 1e5;
    return '₹' + (l % 1 === 0 ? l : l.toFixed(1).replace(/\.0$/, '')) + ' L';
  }
  return inr(n);
}

/** Price display: numeric price preferred; falls back to priceAsText; else "Price on request". */
export function priceOf(p) {
  if (p && p.price != null && Number(p.price) > 0) {
    // data quirk: some prices are stored in crores (e.g. 1.35 for ₹1.35 Cr commercial)
    const v = Number(p.price);
    if (v > 0 && v < 100) return { big: '₹' + String(v).replace(/\.0$/, '') + ' Cr', short: '₹' + (v * 1e7 / 1e7).toString() + ' Cr', num: v * 1e7 };
    return { big: inr(v), short: inrShort(v), num: v };
  }
  if (p && p.priceAsText) {
    const t = String(p.priceAsText).trim();
    return { big: t, short: t.replace('INR ', '₹'), num: null };
  }
  return { big: 'Price on request', short: null, num: null };
}

/** "2026-08-30" or $date → "30 Aug 2026" */
export function dateIN(d) {
  if (!d) return '';
  let s = typeof d === 'object' && d.$date ? d.$date : d;
  const dt = new Date(s);
  if (isNaN(dt)) return String(s);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`;
}

/** 980 → "980 sq.ft" */
export function sqft(v) {
  if (v == null) return null;
  const n = Number(v);
  if (isNaN(n)) return String(v); // already text
  return (n % 1 === 0 ? n.toLocaleString('en-IN') : n) + ' sq.ft';
}

/** Title Case for enums: "ready to move" → "Ready to Move" */
export function tcase(s) {
  if (!s) return '';
  return String(s).replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

/** "Kasba, Near Acropolis Mall, Kolkata" → primary area "Kasba" + city "Kolkata" */
export function parseLocation(loc) {
  if (!loc) return { area: 'Kolkata', city: 'Kolkata', full: 'Kolkata' };
  const parts = String(loc).split(',').map((s) => s.trim()).filter(Boolean);
  const city = parts.length > 1 ? parts[parts.length - 1] : 'Kolkata';
  const area = parts.slice(0, parts.length > 2 ? parts.length - 1 : 1).join(', ');
  return { area, city, full: String(loc) };
}

/** First name from client/agent name. */
export function firstName(s) { return (s || '').split(' ')[0]; }

/** escape HTML */
export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
