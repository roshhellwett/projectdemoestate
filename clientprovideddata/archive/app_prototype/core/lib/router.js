// ============================================================
// router.js — history router with route table + transitions
// URLs identical to the live site. No framework.
// ============================================================

import { wire } from './motion.js';

export const routes = [
  { pattern: /^\/$/, page: () => import('../../pages/home.js'), title: 'SS Property — Premium Real Estate in Kolkata' },
  { pattern: /^\/properties\/?$/, page: () => import('../../pages/properties.js'), title: 'Properties — SS Property' },
  { pattern: /^\/property\/([^/]+)\/?$/, page: () => import('../../pages/property.js'), title: 'Property — SS Property' },
  { pattern: /^\/videos\/?$/, page: () => import('../../pages/videos.js'), title: 'Video Tours — SS Property' },
  { pattern: /^\/blog\/?$/, page: () => import('../../pages/blog.js'), title: 'Journal — SS Property' },
  { pattern: /^\/blog\/([^/]+)\/?$/, page: () => import('../../pages/post.js'), title: 'Journal — SS Property' },
  { pattern: /^\/work-with-us\/?$/, page: () => import('../../pages/work.js'), title: 'Work With Us — SS Property' },
  { pattern: /^\/sell-property\/?$/, page: () => import('../../pages/sell.js'), title: 'Sell Your Property — SS Property' },
  { pattern: /^\/projects\/?$/, page: () => import('../../pages/projects.js'), title: 'New Projects — SS Property' },
  { pattern: /.*/, page: () => import('../../pages/notfound.js'), title: 'Not found — SS Property' },
];

let outlet = null;
let cleanup = null;
const hooks = { afterMount: [] };
const BASE = '/app'; // mount path; internal routes are root-relative

export function onAfterMount(fn) { hooks.afterMount.push(fn); }

/** Root-relative path: /app/properties → /properties */
export function pathOf() {
  let p = location.pathname;
  if (p.startsWith(BASE)) p = p.slice(BASE.length) || '/';
  return p;
}

function match(path) {
  for (const r of routes) {
    const m = path.match(r.pattern);
    if (m) return { r, params: m.slice(1) };
  }
  return null;
}

async function render() {
  const path = pathOf();
  const { search } = location;
  const m = match(path);
  if (!m) return;
  const mod = await m.r.page();
  const page = mod.default;

  // teardown previous page (motion listeners etc.)
  if (cleanup) { try { cleanup(); } catch {} cleanup = null; }

  // transition out
  outlet.classList.add('page-outing');
  await new Promise((r) => setTimeout(r, 150));
  outlet.innerHTML = '';

  // mount
  const frag = page({ params: m.params, query: new URLSearchParams(search) });
  outlet.appendChild(frag);
  outlet.classList.remove('page-outing');
  outlet.classList.add('page-in');
  setTimeout(() => outlet.classList.remove('page-in'), 500);

  document.title = page.title ? page.title(m.params, new URLSearchParams(search)) : m.r.title;
  scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  cleanup = wire(outlet);
  hooks.afterMount.forEach((fn) => { try { fn(path); } catch {} });
}

export function nav(to) {
  const target = BASE + (to === '/' ? '/' : to);
  if (pathOf() + location.search === to) return;
  history.pushState({}, '', target);
  render();
}

/** Intercept <a data-nav> clicks + popstate. Call once. */
export function start(el) {
  outlet = el;
  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[data-nav]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
    e.preventDefault();
    nav(href);
  });
  addEventListener('popstate', render);
  return render();
}
