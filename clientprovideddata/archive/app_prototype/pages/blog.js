// ============================================================
// blog.js — "The Journal" list
// ============================================================

import { el, ICONS, sectionHead } from '../core/lib/components.js';
import { blogposts } from '../core/lib/data.js';
import { esc, dateIN } from '../core/lib/format.js';

export const title = () => 'Journal — SS Property';

export default function blogPage() {
  const frag = document.createDocumentFragment();
  const posts = blogposts();

  frag.appendChild(el('section', 'section-tight', `
    <div class="container">
      ${sectionHead('The journal', 'Notes from the ground.', {
        sub: 'Market sense, buyer checklists and renovation math — written by people who walk these buildings daily.', h1: true,
      })}
    </div>`));

  const list = el('section', 'section-tight', `<div class="container stack-sm" style="display:grid"></div>`);
  const wrap = list.querySelector('.container');
  posts.forEach((b) => {
    const row = el('a', 'journal-row', `
      <div class="jr-media">
        ${b.coverImage ? `<img src="${esc(b.coverImage)}" alt="" loading="lazy">` : ''}
      </div>
      <div class="jr-body">
        <div class="caps" style="color:var(--brass)">${esc(b.author || 'SS Property')} · ${esc(dateIN(b.publishDate))}</div>
        <h2 class="display d4" style="margin-top:12px;font-weight:520">${esc(b.title)}</h2>
        <p class="muted" style="margin-top:12px;max-width:56ch">${esc(String(b.content || '').split(/\n\s*\n/)[0].slice(0, 160))}…</p>
        <span class="read-more caps" style="color:var(--ink)">Read the note ${ICONS.arrow.replace('<svg', '<svg class="arr"')}</span>
      </div>`);
    row.href = '/blog/' + b._id;
    row.setAttribute('data-nav', '');
    row.setAttribute('data-reveal', '');
    wrap.appendChild(row);
  });
  frag.appendChild(list);

  const style = el('style', '', `
    .journal-row{display:grid;grid-template-columns:300px 1fr;gap:clamp(24px,4vw,56px);align-items:center;
      padding-block:44px;border-bottom:1px solid var(--line);text-decoration:none;color:inherit}
    .jr-media{aspect-ratio:4/3;border-radius:var(--r-img);overflow:hidden;background:var(--paper-3)}
    .jr-media img{width:100%;height:100%;object-fit:cover;transition:transform 640ms var(--ease)}
    .journal-row:hover .jr-media img{transform:scale(1.04)}
    .jr-body .read-more .arr{transition:transform var(--t-base) var(--ease)}
    .journal-row:hover .read-more .arr{transform:translateX(4px)}
    .journal-row:hover .read-more{color:var(--brass)}
    @media (max-width:760px){.journal-row{grid-template-columns:1fr}.jr-media{aspect-ratio:16/9}}
  `);
  frag.appendChild(style);
  return frag;
}
