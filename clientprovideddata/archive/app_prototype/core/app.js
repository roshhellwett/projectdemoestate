// ============================================================
// app.js — entry: boot data, build chrome, start router
// ============================================================

import { boot } from './lib/data.js';
import { start, onAfterMount, pathOf } from './lib/router.js';
import { header, footer, mobileSheet, $ } from './lib/components.js';
import { headerScroll } from './lib/motion.js';

async function main() {
  // 1) data first — pages query synchronously
  await boot();

  // 2) chrome
  const app = $('#app');
  app.innerHTML = `
    <a class="skip" href="#main">Skip to content</a>
    <div id="chrome-header"></div>
    <main id="main" style="display:contents"></main>
    <div id="chrome-footer"></div>
    <div id="sheet-mount"></div>`;

  const mountHeader = (path) => {
    const h = $('#chrome-header');
    h.innerHTML = '';
    h.appendChild(header(path));
  };
  mountHeader(pathOf());

  $('#chrome-footer').appendChild(footer());

  // mobile sheet
  const sheetMount = $('#sheet-mount');
  let sheetOpen = false;
  const renderSheet = () => {
    sheetMount.innerHTML = '';
    if (sheetOpen) {
      const s = mobileSheet(true);
      sheetMount.appendChild(s);
      s.querySelector('[data-close]').addEventListener('click', () => { sheetOpen = false; renderSheet(); });
      s.querySelectorAll('a[data-nav]').forEach((a) => a.addEventListener('click', () => { sheetOpen = false; renderSheet(); }));
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  onAfterMount((path) => {
    mountHeader(path);
    if (sheetOpen) { sheetOpen = false; renderSheet(); }
  });
  document.addEventListener('click', (e) => {
    if (e.target.closest?.('.ui-burger') && e.target.closest('.ui-header')) {
      sheetOpen = true; renderSheet();
    }
  });

  // 3) router
  headerScroll($('.ui-header'));
  await start($('main'));
}

main().catch((err) => {
  console.error('[app] boot failed', err);
  document.body.innerHTML =
    `<div style="min-height:100vh;display:grid;place-items:center;font-family:Georgia,serif;padding:40px;text-align:center">
      <div><h1 style="font-size:32px">Something went wrong</h1>
      <p style="margin-top:12px;color:#6E675C">The data layer could not load. Is the offline server running?</p></div>
    </div>`;
});
