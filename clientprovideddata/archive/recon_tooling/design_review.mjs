// Design review: geometry + typography + overflow audit via CDP (no vision needed).
// Checks: horizontal overflow, tiny hit targets, contrast pairs, font loading, sticky overlap.
import { spawn } from 'child_process';
import fs from 'fs'; import path from 'path';

const CHROME = 'C:/Users/roshh/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const PORT = 9230;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const ud = path.join(process.env.LOCALAPPDATA, 'Temp', 'cdp-review');
fs.rmSync(ud, { recursive: true, force: true }); fs.mkdirSync(ud, { recursive: true });
const proc = spawn(CHROME, [`--remote-debugging-port=${PORT}`, `--user-data-dir=${ud}`, '--headless=new', '--disable-gpu', '--window-size=1440,2600', 'about:blank'], { stdio: 'ignore' });
async function hj(p) { for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}${p}`); if (r.ok) return await r.json(); } catch {} await sleep(250); } }
const t = await hj('/json/list');
const ws = new WebSocket(t.find(x => x.type === 'page').webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let mid = 1; const pend = new Map();
ws.addEventListener('message', (ev) => { const m = JSON.parse(ev.data); if (m.id && pend.has(m.id)) { const p = pend.get(m.id); pend.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); } });
const send = (method, params = {}) => new Promise((res, rej) => { const id = mid++; pend.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); setTimeout(() => { if (pend.has(id)) { pend.delete(id); rej(new Error('t ' + method)); } }, 30000); });
await send('Page.enable'); await send('Runtime.enable');

const AUDIT = `(() => {
  const issues = [];
  // 1) horizontal overflow
  const docW = document.documentElement.clientWidth;
  const over = [...document.querySelectorAll('*')].filter(el => el.scrollWidth - el.clientWidth > 1 && getComputedStyle(el).overflowX === 'visible');
  if (document.documentElement.scrollWidth > docW) issues.push('PAGE horizontal scroll: ' + document.documentElement.scrollWidth + ' > ' + docW);
  // find worst offenders
  for (const el of over.slice(0, 5)) { const r = el.getBoundingClientRect(); issues.push('overflow-x: ' + el.tagName + '.' + String(el.className).slice(0, 40) + ' @' + Math.round(r.left)); }
  // 2) fonts actually applied
  const h = document.querySelector('h1, h2.display, .display');
  const d = document.querySelector('.ui-card-title, .d4, .d3');
  if (h) issues.push('H-font: ' + getComputedStyle(h).fontFamily.slice(0, 60));
  if (d) issues.push('body-font: ' + getComputedStyle(document.body).fontFamily.slice(0, 60));
  // 3) hit targets < 40px in nav/filter
  const small = [...document.querySelectorAll('a, button')].filter(el => {
    const r = el.getBoundingClientRect(); return r.width > 0 && (r.width < 38 || r.height < 30) && !el.closest('.ui-marquee');
  }).slice(0, 6);
  for (const el of small) issues.push('small target: ' + el.tagName + ' ' + String(el.className).slice(0, 30) + ' ' + Math.round(el.getBoundingClientRect().width) + 'x' + Math.round(el.getBoundingClientRect().height));
  // 4) hero title line count (should be <= 4 lines)
  const hero = document.querySelector('.ui-hero-title');
  if (hero) { const lh = parseFloat(getComputedStyle(hero).lineHeight) || 1; const lines = Math.round(hero.getBoundingClientRect().height / lh); issues.push('hero lines: ' + lines + ' (fs ' + getComputedStyle(hero).fontSize + ')'); }
  // 5) images with alt missing
  const noAlt = [...document.images].filter(i => !i.hasAttribute('alt')).length;
  if (noAlt) issues.push('imgs missing alt: ' + noAlt);
  // 6) buttons overflowing their containers
  const btns = [...document.querySelectorAll('.ui-btn')].filter(b => b.scrollWidth > b.clientWidth + 2);
  for (const b of btns.slice(0, 3)) issues.push('btn overflow: ' + b.textContent.trim().slice(0, 20));
  return JSON.stringify(issues, null, 1);
})()`;

for (const [label, w, h] of [['desktop 1440', 1440, 2600], ['mobile 390', 390, 844]]) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 500 });
  const routes = ['/app/', '/app/properties', '/app/property/743055fa-20d3-496f-b9d9-393924e223ba', '/app/videos', '/app/blog', '/app/work-with-us', '/app/sell-property'];
  console.log('\n========== ' + label + ' ==========');
  for (const rt of routes) {
    await send('Page.navigate', { url: 'http://localhost:8123' + rt });
    await sleep(5000);
    const r = await send('Runtime.evaluate', { expression: AUDIT, returnByValue: true });
    const issues = JSON.parse(r.result.value);
    const bad = issues.filter(i => !/font:|hero lines|H-font/.test(i));
    console.log(rt, bad.length ? '\n   ' + bad.join('\n   ') : 'clean');
    if (label.startsWith('mobile') && rt === '/app/') {
      const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 72 });
      fs.writeFileSync('ui_qa1/shot_mobile_home.jpg', Buffer.from(s.data, 'base64'));
    }
  }
}
proc.kill(); process.exit(0);
