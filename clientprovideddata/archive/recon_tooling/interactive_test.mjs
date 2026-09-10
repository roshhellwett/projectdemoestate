// Interactive smoke: nav clicks, filter, gallery swap, accordion, facade, mobile sheet.
import { spawn } from 'child_process';
import fs from 'fs'; import path from 'path';

const CHROME = 'C:/Users/roshh/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const PORT = 9236;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const ud = path.join(process.env.LOCALAPPDATA || '.', 'Temp', 'cdp-ix');
fs.rmSync(ud, { recursive: true, force: true }); fs.mkdirSync(ud, { recursive: true });
const proc = spawn(CHROME, [`--remote-debugging-port=${PORT}`, `--user-data-dir=${ud}`, '--headless=new', '--disable-gpu', '--window-size=1440,1000', 'about:blank'], { stdio: 'ignore' });
async function hj(p) { for (let i = 0; i < 50; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}${p}`); if (r.ok) return await r.json(); } catch {} await sleep(250); } }
const t = await hj('/json/list');
const ws = new WebSocket(t.find(x => x.type === 'page').webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let mid = 1; const pend = new Map(); let errs = [];
ws.addEventListener('message', (ev) => { const m = JSON.parse(ev.data); if (m.id && pend.has(m.id)) { const p = pend.get(m.id); pend.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); return; } if (m.method === 'Runtime.exceptionThrown') errs.push((m.params.exceptionDetails?.exception?.description || '').slice(0, 150)); });
const send = (method, params = {}) => new Promise((res, rej) => { const id = mid++; pend.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); setTimeout(() => { if (pend.has(id)) { pend.delete(id); rej(new Error('t ' + method)); } }, 20000); });
await send('Page.enable'); await send('Runtime.enable');
const click = (sel) => send('Runtime.evaluate', { expression: `document.querySelector('${sel}')?.click(); !!document.querySelector('${sel}')` }).then(r => r.result.value);

console.log('— boot home');
await send('Page.navigate', { url: 'http://localhost:8123/app/' });
await sleep(6000);

console.log('— nav to /properties via click');
let ok = await click('a[href="/properties"][data-nav]');
await sleep(2500);
let urlNow = await send('Runtime.evaluate', { expression: 'location.pathname' }).then(r => r.result.value);
console.log('  nav ok:', ok, '| url:', urlNow, '| h1:', await send('Runtime.evaluate', { expression: `(document.querySelector('h1')||{}).innerText||''` }).then(r => r.result.value.slice(0, 40)));

console.log('— filter: click a type chip');
const chipLabel = await send('Runtime.evaluate', { expression: `(() => { const b=[...document.querySelectorAll('[data-filter="type"]')].find(x=>x.dataset.value); if(b){b.click(); return b.textContent;} return null; })()` }).then(r => r.result.value);
await sleep(1200);
const count = await send('Runtime.evaluate', { expression: 'document.querySelectorAll(".ui-card").length' }).then(r => r.result.value);
console.log('  chip:', chipLabel, '→ cards:', count, '| url:', await send('Runtime.evaluate', { expression: 'location.pathname + location.search' }).then(r => r.result.value));

console.log('— back to all, open first property');
await click('a[href="/properties"][data-nav]') /* noop on list */ ;
await send('Runtime.evaluate', { expression: `document.querySelector('.ui-card')?.click()` });
await sleep(2500);
urlNow = await send('Runtime.evaluate', { expression: 'location.pathname' }).then(r => r.result.value);
console.log('  property url:', urlNow);

console.log('— gallery: click 3rd thumb');
const swapped = await send('Runtime.evaluate', { expression: `(() => { const b=document.querySelectorAll('.ui-gallery-thumbs button')[2]; if(!b) return 'no-thumbs'; const m=document.getElementById('g-main'); const before=m.src; b.click(); return m.src!==before ? 'swapped' : 'same:'+before.slice(-30); })()` }).then(r => r.result.value);
console.log('  gallery:', swapped);

console.log('— back nav (popstate)');
await send('Page.navigate', { url: 'about:blank' }); await sleep(400);
await send('Page.navigate', { url: 'http://localhost:8123/app/' }); await sleep(5000);
const backOk = await send('Runtime.evaluate', { expression: `history.pushState({}, '', '/app/videos'); dispatchEvent(new PopStateEvent('popstate')); 'ok'` }).then(r => r.result.value);
await sleep(2000);
console.log('  popstate →', await send('Runtime.evaluate', { expression: 'location.pathname + " h1=" + ((document.querySelector("h1")||{}).innerText||"").slice(0,30)' }).then(r => r.result.value));

console.log('— home: FAQ accordion');
await send('Runtime.evaluate', { expression: `history.pushState({}, '', '/app/'); dispatchEvent(new PopStateEvent('popstate'))` });
await sleep(2500);
const acc = await send('Runtime.evaluate', { expression: `(() => { const b=document.querySelector('.ui-acc-btn'); if(!b) return 'no-acc'; b.click(); return b.closest('.ui-acc-item').classList.contains('open') ? 'opened' : 'failed'; })()` }).then(r => r.result.value);
console.log('  accordion:', acc);

console.log('— mobile sheet (emulate)');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await sleep(600);
const sheet = await send('Runtime.evaluate', { expression: `(() => { const b=document.querySelector('.ui-header .ui-burger'); if(!b) return 'no-burger'; b.click(); const s=document.querySelector('.ui-sheet'); return s && s.classList.contains('open') ? 'sheet-open' : 'failed'; })()` }).then(r => r.result.value);
console.log('  sheet:', sheet);
const sheetNav = await send('Runtime.evaluate', { expression: `(() => { const a=document.querySelector('.ui-sheet a[data-nav="/properties"]'); if(!a) return 'no-link'; a.click(); const s=document.querySelector('.ui-sheet'); return (!s || !s.classList.contains('open')) ? 'closed+nav' : 'sheet-still-open'; })()` }).then(r => r.result.value);
await sleep(1500);
console.log('  sheet nav:', sheetNav, '| url:', await send('Runtime.evaluate', { expression: 'location.pathname' }).then(r => r.result.value));

console.log('\npage errors total:', errs.length, errs.slice(0, 3));
proc.kill(); process.exit(0);
