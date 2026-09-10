// ============================================================
// post.js — journal article
// ============================================================

import { el, ICONS, kicker } from '../core/lib/components.js';
import { postById, blogParagraphs, blogposts } from '../core/lib/data.js';
import { esc, dateIN } from '../core/lib/format.js';
import { notFoundPage } from './notfound.js';

export function title(params) {
  const b = postById(params[0]);
  return b ? `${b.title} — SS Property` : 'Journal — SS Property';
}

export default function postPage({ params }) {
  const b = postById(params[0]);
  if (!b) return notFoundPage({ params });

  const frag = document.createDocumentFragment();
  const paras = blogParagraphs(b);
  const others = blogposts().filter((x) => x._id !== b._id).slice(0, 2);

  frag.appendChild(el('div', '', `
    <div class="container" style="padding-top:28px">
      <nav class="ui-crumb" aria-label="Breadcrumb">
        <a href="/" data-nav>Home</a><span class="sep">/</span>
        <a href="/blog" data-nav>Journal</a><span class="sep">/</span>
        <span style="color:var(--ink)">${esc(String(b.title).slice(0, 40))}…</span>
      </nav>
    </div>`));

  const art = el('article', 'section', `
    <div class="container" style="max-width:820px">
      ${kicker('Journal note')}
      <h1 class="display d3" style="margin-top:16px">${esc(b.title)}</h1>
      <div class="caps muted" style="margin-top:18px;letter-spacing:0.12em">${esc(b.author || 'SS Property')} · ${esc(dateIN(b.publishDate))}</div>
      ${b.coverImage ? `
        <figure style="margin-block:40px">
          <div style="aspect-ratio:16/9;border-radius:var(--r-img);overflow:hidden">
            <img src="${esc(b.coverImage)}" alt="" style="width:100%;height:100%;object-fit:cover" data-reveal-img>
          </div>
        </figure>` : ''}
      <div class="prose" style="display:grid;gap:24px">
        ${paras.map((t, i) => i === 0
          ? `<p class="drop-cap" style="font-size:var(--fs-1);line-height:1.75">${esc(t)}</p>`
          : `<p style="line-height:1.75;color:var(--ink-3)">${esc(t)}</p>`).join('')}
      </div>
    </div>`);

  const style = el('style', '', `
    .drop-cap::first-letter{
      font-family:var(--font-display);font-size:4.2em;line-height:.8;float:left;
      padding:8px 12px 0 0;color:var(--brass);font-weight:560}
  `);
  frag.appendChild(art);
  frag.appendChild(style);

  if (others.length) {
    const more = el('section', 'section-tight band-paper2', `
      <div class="container">
        ${kicker('Keep reading')}
        <div class="grid g2" style="margin-top:32px"></div>
      </div>`);
    const g = more.querySelector('.grid');
    others.forEach((o) => {
      const c = el('a', 'ui-card', `
        <div class="ui-card-media" style="aspect-ratio:16/10">
          ${o.coverImage ? `<img src="${esc(o.coverImage)}" alt="" loading="lazy">` : ''}
        </div>
        <div class="ui-card-body">
          <span class="caps" style="color:var(--brass)">${esc(dateIN(o.publishDate))}</span>
          <h3 class="ui-card-title">${esc(o.title)}</h3>
          <span class="read caps">Read ${ICONS.arrow.replace('<svg', '<svg class="arr"')}</span>
        </div>`);
      c.href = '/blog/' + o._id;
      c.setAttribute('data-nav', '');
      c.setAttribute('data-reveal', '');
      g.appendChild(c);
    });
    frag.appendChild(more);
  }

  return frag;
}
