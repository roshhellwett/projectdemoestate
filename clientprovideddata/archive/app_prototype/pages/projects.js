// ============================================================
// projects.js — "New Developments"
// ============================================================

import { el, ICONS, sectionHead, propertyCard } from '../core/lib/components.js';
import { properties, newestFirst, coverFor } from '../core/lib/data.js';
import { esc, priceOf, tcase, parseLocation } from '../core/lib/format.js';

export const title = () => 'New Projects — SS Property';

export default function projectsPage() {
  const frag = document.createDocumentFragment();
  const all = properties();
  // developer-led / new supply: buildingType or category hints
  const isProject = (p) =>
    /new|under|construction|upcoming/i.test(String(p.possessionStatus || '') + ' ' + String(p.category || '') + ' ' + String(p.buildingType || ''));
  let rows = all.filter(isProject);
  if (rows.length < 3) rows = newestFirst(all).slice(0, 6); // graceful: newest listings
  rows = rows.slice(0, 9);

  frag.appendChild(el('section', 'section-tight', `
    <div class="container">
      ${sectionHead('New developments', 'Kolkata, being built.', {
        sub: 'Upcoming and under-construction addresses worth tracking — with developer, possession and honest rate bands.', h1: true,
      })}
    </div>`));

  const sec = el('section', 'section-tight', `<div class="container"><div class="grid g3"></div></div>`);
  const g = sec.querySelector('.grid');
  rows.forEach((p) => g.appendChild(propertyCard(p)));

  if (!rows.length) {
    g.innerHTML = `<div class="ui-empty" style="grid-column:1/-1">
      <span class="t">New projects are being verified.</span>
      <p class="muted">Follow the journal or write to us — we'll flag launches before they list.</p>
    </div>`;
  }
  frag.appendChild(sec);

  frag.appendChild(el('section', 'section band-dark', `
    <div class="container center" style="display:grid;gap:24px;justify-items:center">
      <span class="kicker on-dark">Developers</span>
      <h2 class="display d3" style="max-width:22ch">Building something worth showing?</h2>
      <p style="color:var(--paper-70);max-width:48ch">We partner with developers for launch media, walkthroughs and distribution across our Kolkata audience.</p>
      <a class="ui-btn ui-btn-primary ui-btn-lg" href="/work-with-us" data-nav data-magnetic>Partner with SS Property</a>
    </div>`));

  return frag;
}
