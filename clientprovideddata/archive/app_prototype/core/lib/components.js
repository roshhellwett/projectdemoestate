// ============================================================
// components.js — reusable DOM builders.
// Every builder returns a real element; innerHTML only with esc().
// ============================================================

import { esc, inr, inrShort, sqft, tcase, parseLocation, priceOf, dateIN } from './format.js';
import { coverFor } from './data.js';

export const $ = (sel, root = document) => root.querySelector(sel);
export const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

/* ---------------- icons (inline, stroke 1.5) ---------------- */
const icon = (paths, vb = '0 0 24 24') =>
  `<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

export const ICONS = {
  pin: icon('<path d="M12 21s-7-5.1-7-11a7 7 0 1 1 14 0c0 5.9-7 11-7 11Z"/><circle cx="12" cy="10" r="2.6"/>'),
  arrow: icon('<path d="M4 12h16m-6-6 6 6-6 6"/>'),
  play: icon('<path d="M8 5.8v12.4l10-6.2L8 5.8Z" fill="currentColor" stroke="none"/>', '0 0 24 24'),
  check: icon('<path d="m4.5 12.5 5 5 10-11"/>'),
  phone: icon('<path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>'),
  mail: icon('<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7 8 6 8-6"/>'),
  wa: icon('<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"/><path d="M8.8 8.6c.3 2.8 3 5.4 5.8 5.8l1-1.4 2 .9v1.3c0 .8-.7 1.4-1.5 1.3C11.7 15.8 8 12 7.2 7.4c-.1-.8.5-1.5 1.3-1.5h1.3l.9 2-1.4 1Z" fill="currentColor" stroke="none"/>'),
  insta: icon('<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/>'),
  yt: icon('<rect x="2.5" y="6" width="19" height="13" rx="3.5"/><path d="M10 9.5v6l5.2-3L10 9.5Z" fill="currentColor" stroke="none"/>'),
  fb: icon('<path d="M14 8h2.5V4.5H14A4.5 4.5 0 0 0 9.5 9v2H7v3.5h2.5v7H13v-7h2.7l.6-3.5H13V9a1 1 0 0 1 1-1Z" stroke-width="1.3"/>'),
  bed: icon('<path d="M3 18v-9m0 5h18m0 4v-6a3 3 0 0 0-3-3h-8v5"/><circle cx="6.5" cy="11.5" r="1.8"/>'),
  bath: icon('<path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2Z"/><path d="M6 12V6.5A2.5 2.5 0 0 1 8.5 4c1.2 0 2.1.8 2.4 1.8M8 21l-1 1m10-1-1 1"/>'),
  area: icon('<path d="M4 4h16v16H4z" /><path d="M4 9h5V4m5 5v5h5"/>'),
  star: icon('<path d="m12 3 2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8L12 3Z" fill="currentColor" stroke="none"/>'),
  verified: icon('<circle cx="12" cy="12" r="9"/><path d="m8 12.4 2.8 2.8L16.2 9"/>'),
  home: icon('<path d="m3 11 9-8 9 8"/><path d="M5 9.5V21h14V9.5"/>'),
  x: icon('<path d="M6 6l12 12M18 6 6 18"/>'),
  burger: icon('<path d="M3.5 7h17m-17 10h17"/>'),
};

/* ---------------- header ---------------- */
const NAV = [
  ['/', 'Home'],
  ['/properties', 'Properties'],
  ['/videos', 'Video Tours'],
  ['/blog', 'Journal'],
  ['/projects', 'Projects'],
  ['/work-with-us', 'Work With Us'],
];

export function header(path = location.pathname) {
  const links = NAV.map(([href, label]) =>
    `<a href="${href}" data-nav ${path === href ? 'aria-current="page"' : ''}>${label}</a>`).join('');
  const n = el('header', 'ui-header', `
    <div class="container ui-header-in">
      <a href="/" data-nav class="ui-logo" aria-label="SS Property — home">
        <img src="/app/assets/monogram.svg" alt="" width="36" height="36">
        <span>SS Property<small>Kolkata</small></span>
      </a>
      <nav class="ui-nav" aria-label="Primary">${links}</nav>
      <a href="/sell-property" data-nav class="ui-btn ui-btn-primary ui-btn-sm" style="padding:10px 20px">List a property</a>
      <button class="ui-burger" aria-label="Open menu" aria-expanded="false">${ICONS.burger}</button>
    </div>`);
  return n;
}

export function mobileSheet(open) {
  const sheet = el('div', 'ui-sheet' + (open ? ' open' : ''), `
    <div class="container ui-header-in" style="align-items:center">
      <span class="ui-logo"><img src="/app/assets/monogram.svg" alt="" width="36" height="36" style="color:var(--brass)"><span>SS Property<small>Kolkata</small></span></span>
      <button class="ui-burger" data-close aria-label="Close menu">${ICONS.x}</button>
    </div>
    <nav>${NAV.concat([['/sell-property', 'Sell / List']]).map(([h, l]) => `<a href="${h}" data-nav>${l}</a>`).join('')}</nav>`);
  return sheet;
}

/* ---------------- footer ---------------- */
export function footer() {
  return el('footer', 'ui-footer', `
    <div class="container">
      <div class="ui-footer-grid">
        <div>
          <div class="ui-logo" style="color:var(--paper)"><img src="/app/assets/monogram.svg" alt="" width="40" height="40"><span>SS Property<small style="color:var(--paper-55)">Kolkata</small></span></div>
          <p class="muted" style="color:var(--paper-55);margin-top:20px;max-width:34ch;font-size:var(--fs--1);line-height:1.7">
            Transforming real estate discovery in Kolkata through content, technology and expertise.
          </p>
          <div style="display:flex;gap:10px;margin-top:24px">
            <a class="ui-chip on-dark" href="https://instagram.com/sspropertykol" target="_blank" rel="noopener">${ICONS.insta} Instagram</a>
            <a class="ui-chip on-dark" href="https://youtube.com/@SSProperty" target="_blank" rel="noopener">${ICONS.yt} YouTube</a>
          </div>
        </div>
        <div><h4>Explore</h4><div class="ui-footer-links">
          <a href="/" data-nav>Home</a><a href="/properties" data-nav>Properties</a>
          <a href="/videos" data-nav>Video Tours</a><a href="/blog" data-nav>Journal</a>
          <a href="/projects" data-nav>New Projects</a>
        </div></div>
        <div><h4>Services</h4><div class="ui-footer-links">
          <a href="/sell-property" data-nav>Sell a property</a>
          <a href="/work-with-us" data-nav>Work with us</a>
          <a href="/work-with-us" data-nav>Brand partnership</a>
        </div></div>
        <div><h4>Contact</h4><div class="ui-footer-links">
          <a href="tel:+919429693786">${ICONS.phone} &nbsp;94296 93786</a>
          <a href="mailto:writetous@ssproperty.in">${ICONS.mail} &nbsp;writetous@ssproperty.in</a>
          <span style="color:var(--paper-70)">${ICONS.pin} &nbsp;123 Park Street, Kolkata 700016</span>
          <span style="color:var(--paper-55)">Tue–Sun · 10 AM – 8 PM</span>
        </div></div>
      </div>
      <div class="ui-footer-bottom">
        <span>© 2026 SS Property · All rights reserved</span>
        <span class="num" style="letter-spacing:0.08em">RERA · WBRERA/A/HOW/2025/000646</span>
      </div>
    </div>`);
}

/* ---------------- property card ---------------- */
export function propertyCard(p, { featured = false, reveal = true } = {}) {
  const price = priceOf(p);
  const loc = parseLocation(p.location);
  const cover = coverFor(p);
  const area = p.areaSqFt ?? p.areaAsText;
  const bhk = tcase(p.bhkType) || tcase(p.propertyType);
  const status = tcase(p.status);
  const a = el('a', 'ui-card' + (featured ? ' featured' : '') + (reveal ? '' : ''),
    `
    <div class="ui-card-media">
      ${cover ? `<img src="${esc(cover)}" alt="${esc(p.propertyName || 'Property')}" loading="lazy">` : ''}
      ${status ? `<span class="ui-card-flag"><span class="ui-chip ui-chip-brass" style="background:rgba(235,224,200,.92)">${esc(status)}</span></span>` : ''}
    </div>
    <div class="ui-card-body">
      ${bhk ? `<span class="caps" style="color:var(--brass)">${esc(bhk)}</span>` : ''}
      <h3 class="ui-card-title">${esc(p.propertyName || p.title || 'Residence')}</h3>
      <span class="ui-card-loc">${ICONS.pin} ${esc(loc.area)}${loc.city && loc.city !== loc.area ? ', ' + esc(loc.city) : ''}</span>
      <div class="ui-card-price num">${esc(price.big)}${price.short && price.short !== price.big ? `<small>${esc(price.short)}</small>` : ''}</div>
      <div class="ui-card-meta num">
        <div>Area<b>${esc(sqft(area) || '—')}</b></div>
        <div>Baths<b>${p.numberOfBathrooms != null ? Number(p.numberOfBathrooms) : '—'}</b></div>
        <div>Balconies<b>${p.numberOfBalconies != null ? Number(p.numberOfBalconies) : '—'}</b></div>
      </div>
    </div>`);
  a.href = '/property/' + p._id;
  a.setAttribute('data-nav', '');
  if (reveal) a.setAttribute('data-reveal', '');
  return a;
}

/* ---------------- misc ---------------- */
export const kicker = (text, onDark = false) => `<span class="kicker${onDark ? ' on-dark' : ''}">${esc(text)}</span>`;

export function sectionHead(kick, title, opts = {}) {
  return `<div class="sec-head" ${opts.reveal === false ? '' : 'data-reveal'}>
    <div>
      ${kicker(kick, opts.onDark)}
      ${opts.h1 ? `<h1 class="display d3" style="margin-top:14px">${title}</h1>` : `<h2 class="display d3" style="margin-top:14px">${title}</h2>`}
      ${opts.sub ? `<p class="muted" style="margin-top:12px;max-width:56ch;${opts.onDark ? 'color:var(--paper-70)' : ''}">${opts.sub}</p>` : ''}
    </div>
    ${opts.cta || ''}
  </div>`;
}

export function toast(msg) {
  let t = $('.ui-toast');
  if (!t) { t = el('div', 'ui-toast'); document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove('show'), 2600);
}
