// ============================================================
// notfound.js — "Wrong floor"
// ============================================================

import { el, ICONS } from '../core/lib/components.js';

export const title = () => 'Not found — SS Property';

export function notFoundPage() {
  const frag = document.createDocumentFragment();
  const n = el('section', 'section', `
    <div class="container" style="display:grid;place-items:center;text-align:center;min-height:60vh;gap:20px">
      <span class="display num" style="font-size:clamp(120px,22vw,240px);line-height:1;color:var(--brass);font-weight:380" data-reveal>404</span>
      <h1 class="display d3" data-reveal>This address doesn't exist.</h1>
      <p class="muted" data-reveal style="max-width:40ch">The page you're looking for was moved, sold, or never built. The portfolio is still worth a look.</p>
      <div data-reveal style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center">
        <a class="ui-btn ui-btn-primary" href="/" data-nav>${ICONS.home} Take me home</a>
        <a class="ui-btn ui-btn-ghost" href="/properties" data-nav>Browse properties</a>
      </div>
    </div>`);
  frag.appendChild(n);
  return frag;
}

export default notFoundPage;
