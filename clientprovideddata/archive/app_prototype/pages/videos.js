// ============================================================
// videos.js — "The Tours"
// ============================================================

import { el, ICONS, sectionHead } from '../core/lib/components.js';
import { videos, reels } from '../core/lib/data.js';
import { esc, tcase } from '../core/lib/format.js';

export const title = () => 'Video Tours — SS Property';

const platformOf = (u = '') => /instagram/.test(u) ? 'Instagram' : /youtube/.test(u) ? 'YouTube' : 'Watch';

export default function videosPage() {
  const frag = document.createDocumentFragment();
  const vids = videos();
  const rls = reels();

  frag.appendChild(el('section', 'section-tight', `
    <div class="container">
      ${sectionHead('The tours', 'Walk the rooms before you visit.', {
        sub: 'Real walkthroughs shot inside our listings — no music-video edits, just the space as it is.', h1: true,
      })}
    </div>`));

  const grid = el('section', 'section-tight', `<div class="container"><div class="grid g3"></div></div>`);
  const g = grid.querySelector('.grid');
  vids.forEach((v) => {
    const card = el('article', 'ui-card', `
      <div class="ui-facade" data-facade data-embed="${esc(v.embedUrl || '')}" style="border-radius:0;aspect-ratio:4/3">
        ${v.thumbnailImage ? `<img src="${esc(v.thumbnailImage)}" alt="${esc(v.location || 'Property video tour')}" loading="lazy">` : ''}
        <span class="ui-play">${ICONS.play}</span>
        <span class="ui-facade-platform"><span class="ui-chip on-dark" style="background:rgba(18,16,14,.72);color:var(--paper)">${platformOf(v.embedUrl)}</span></span>
      </div>
      <div class="ui-card-body">
        <h3 class="ui-card-title">${esc(v.propertyType ? tcase(v.propertyType) : 'Residence')}</h3>
        <span class="ui-card-loc">${ICONS.pin} ${esc(v.location || 'Kolkata')}</span>
      </div>`);
    card.setAttribute('data-reveal', '');
    g.appendChild(card);
  });
  // facades
  g.querySelectorAll('[data-facade]').forEach((facade) => {
    facade.addEventListener('click', () => {
      const u = facade.dataset.embed;
      if (!u) return;
      const iframe = document.createElement('iframe');
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      let src = u;
      if (/instagram\.com\/(reel|p)\//.test(u)) src = u.replace(/\/(reel|p)\//, '/$1/embed').replace(/\/$/, '') + '/embed/captioned/';
      facade.innerHTML = '';
      facade.appendChild(iframe);
      iframe.src = src;
    }, { once: true });
  });
  frag.appendChild(grid);

  /* reels strip */
  if (rls.length) {
    const strip = el('section', 'section band-dark', `
      <div class="container">
        ${sectionHead('From the reel archive', 'Shorter, sharper.', { onDark: true,
          cta: `<a class="ui-btn ui-btn-onDark" href="https://instagram.com/sspropertykol" target="_blank" rel="noopener">Follow on Instagram</a>` })}
        <div class="h-scroll" style="display:flex;gap:20px;padding-bottom:10px;scrollbar-width:thin">
          ${rls.map((r, i) => `
            <a class="ui-card" href="${esc(r.reelUrl || '#')}" ${String(r.reelUrl || '').startsWith('http') ? 'target="_blank" rel="noopener"' : ''}
               data-reveal style="flex:0 0 clamp(240px,26vw,340px);background:var(--ink-2)">
              <div class="ui-card-media" style="aspect-ratio:4/5">
                ${r.coverImage ? `<img src="${esc(r.coverImage)}" alt="${esc(r.title || 'Reel')}" loading="lazy">` : ''}
                <span class="ui-play" style="width:48px;height:48px">${ICONS.play}</span>
              </div>
              <div class="ui-card-body">
                <span class="caps" style="color:var(--brass-2)">${String(i + 1).padStart(2, '0')}</span>
                <h3 class="ui-card-title" style="color:var(--paper);font-size:var(--fs-1)">${esc(r.title || 'Property reel')}</h3>
              </div>
            </a>`).join('')}
        </div>
      </div>`);
    frag.appendChild(strip);
  }

  return frag;
}
