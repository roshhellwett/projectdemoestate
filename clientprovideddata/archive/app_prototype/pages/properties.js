// ============================================================
// properties.js — "The Portfolio": filter chips + grid
// ============================================================

import { el, ICONS, propertyCard, sectionHead } from '../core/lib/components.js';
import { filterProperties, propertyTypes, propertyStatuses, properties } from '../core/lib/data.js';
import { esc } from '../core/lib/format.js';

export const title = () => `Properties — SS Property`;

export default function propertiesPage({ query }) {
  const frag = document.createDocumentFragment();

  const f = {
    q: query.get('q') || '',
    type: query.get('type') || '',
    bhk: query.get('bhk') || '',
    status: query.get('status') || '',
    min: query.get('min') || '',
    max: query.get('max') || '',
  };

  const all = properties();
  const types = propertyTypes();
  const statuses = propertyStatuses();
  const bhks = [...new Set(all.map((p) => String(p.bhkType || '').match(/\d(\.\d)?/)?.[0]).filter(Boolean))]
    .sort((a, b) => a - b);

  /* head */
  frag.appendChild(el('section', 'section', `
    <div class="container">
      ${sectionHead('The portfolio', `${all.length} verified residences`, {
        sub: 'Filter by what matters. Every listing walked through and verified by our team.', h1: true,
      })}
    </div>`));

  /* filter bar */
  const bar = el('div', '', `
    <div class="container" style="position:sticky;top:76px;z-index:50;background:var(--paper);padding-block:14px;border-bottom:1px solid var(--line)">
      <div style="display:flex;gap:18px;flex-wrap:wrap;align-items:center">
        <div class="ui-field" style="flex:1;min-width:220px;max-width:340px">
          <input class="ui-input" id="f-q" placeholder=" " value="${esc(f.q)}" aria-label="Search">
          <label class="ui-label" for="f-q">Search area, name…</label>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap" role="group" aria-label="Type">
          <button class="ui-chip ${!f.type ? 'active' : ''}" data-filter="type" data-value="">All</button>
          ${types.map((t) => `<button class="ui-chip ${f.type === t ? 'active' : ''}" data-filter="type" data-value="${esc(t)}">${esc(t)}</button>`).join('')}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap" role="group" aria-label="BHK">
          ${bhks.map((b) => `<button class="ui-chip ${f.bhk === b ? 'active' : ''}" data-filter="bhk" data-value="${b}">${b} BHK</button>`).join('')}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap" role="group" aria-label="Status">
          ${statuses.map((s) => `<button class="ui-chip ${f.status === s ? 'active' : ''}" data-filter="status" data-value="${esc(s)}">${esc(s)}</button>`).join('')}
        </div>
      </div>
    </div>`);

  /* results */
  const resultsWrap = el('section', 'section-tight', `<div class="container"><div class="grid g3" id="grid"></div></div>`);
  const grid = resultsWrap.querySelector('#grid');

  const apply = (newF) => {
    const rows = filterProperties(newF);
    grid.innerHTML = '';
    if (!rows.length) {
      grid.innerHTML = `<div class="ui-empty" style="grid-column:1/-1">
        <span class="t">Nothing under these filters.</span>
        <p class="muted">Widen the budget or clear the filters — good addresses hide everywhere.</p>
        <a class="ui-btn ui-btn-ghost" href="/properties" data-nav>Clear filters</a>
      </div>`;
    } else {
      rows.forEach((p) => grid.appendChild(propertyCard(p)));
    }
    const count = resultsWrap.querySelector('#count');
    if (count) count.textContent = `${rows.length} residence${rows.length === 1 ? '' : 's'}`;
    const url = new URL(location.href); url.pathname = '/app/properties';
    Object.entries(newF).forEach(([k, v]) => { if (v) url.searchParams.set(k, v); else url.searchParams.delete(k); });
    history.replaceState({}, '', url);
    // re-reveal new cards
    import('../core/lib/motion.js').then((m) => m.wire(grid.parentElement));
  };

  bar.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const k = btn.dataset.filter;
      const v = btn.dataset.value;
      if (k === 'type' && !v) { f.type = ''; f.bhk = ''; f.status = ''; }
      else f[k] = f[k] === v ? '' : v;
      bar.querySelectorAll(`[data-filter="${k}"]`).forEach((b) =>
        b.classList.toggle('active', b.dataset.value === f[k] || (k === 'type' && !f[k] && !b.dataset.value)));
      apply(f);
    });
  });
  const qi = bar.querySelector('#f-q');
  let qt;
  qi.addEventListener('input', () => { clearTimeout(qt); qt = setTimeout(() => { f.q = qi.value.trim(); apply(f); }, 260); });

  frag.appendChild(bar);
  frag.appendChild(resultsWrap);
  apply(f);

  return frag;
}
