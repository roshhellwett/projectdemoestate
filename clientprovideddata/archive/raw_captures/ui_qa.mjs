// Smoke test the new /app UI across all routes, strict-ish (block external),
// report console errors, broken images, h1, textLen; screenshots for review.
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME = 'C:/Users/roshh/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const PORT = 9228;
const OUT = 'ui_qa1';
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const uddir = path.join(process.env.LOCALAPPDATA || '.', 'Temp', 'cdp-profile-uiqa');
fs.rmSync(uddir, { recursive: true, force: true }); fs.mkdirSync(uddir, { recursive: true });
const proc = spawn(CHROME, [`--remote-debugging-port=${PORT}`, `--user-data-dir=${uddir}`, '--headless=new', '--disable-gpu', '--window-size=1440,2600', 'about:blank'], { stdio: 'ignore' });
async function hj(p) { for (let i = 0; i < 50; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}${p}`); if (r.ok) return await r.json(); } catch {} await sleep(250); } throw new Error('no devtools'); }
const t = await hj('/json/list');
const ws = new WebSocket(t.find(x => x.type === 'page').webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let mid = 1; const pend = new Map(); const requests = new Map(); let netOn = false; let consoleMsgs = []; let pageErrors = [];
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pend.has(m.id)) { const p = pend.get(m.id); pend.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); return; }
  if (!netOn) return;
  const pa = m.params || {};
  if (m.method === 'Network.requestWillBeSent') {
    requests.set(pa.requestId, { url: pa.request.url, status: null });
    if (!/^(https?:\/\/(localhost|127\.0\.0\.1)|data:)/.test(pa.request.url)) {
      send('Network.failRequest', { requestId: pa.requestId, errorReason: 'BlockedByClient' }).catch(() => {});
    }
  }
  if (m.method === 'Network.responseReceived') { const r = requests.get(pa.requestId); if (r && r.status === null) r.status = pa.response.status; }
  if (m.method === 'Network.loadingFailed') { const r = requests.get(pa.requestId); if (r && r.status === null) r.status = 'FAIL:' + pa.errorText; }
  if (m.method === 'Runtime.consoleAPICalled') { if (pa.type === 'error') consoleMsgs.push((pa.args || []).map(a => a.value ?? a.description ?? '').join(' ').slice(0, 200)); }
  if (m.method === 'Runtime.exceptionThrown') pageErrors.push((pa.exceptionDetails?.exception?.description || pa.exceptionDetails?.text || '').slice(0, 200));
});
function send(method, params = {}) { return new Promise((res, rej) => { const id = mid++; pend.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); setTimeout(() => { if (pend.has(id)) { pend.delete(id); rej(new Error('timeout ' + method)); } }, 30000); }); }
await send('Network.enable', { maxPostDataSize: 65536 }); await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 2600, deviceScaleFactor: 1, mobile: false });
netOn = true;

const dataDir = fs.existsSync('A:/projectssproperty/app/data/properties.json')
  ? 'A:/projectssproperty/app/data'
  : 'A:/projectssproperty/clientprovideddata/cloned_website/__offline__/data';
const db = JSON.parse(fs.readFileSync(path.join(dataDir, 'properties.json'), 'utf8'));
const blogs = JSON.parse(fs.readFileSync(path.join(dataDir, 'blogposts.json'), 'utf8'));
const routes = [
  '/app/', '/app/properties', '/app/property/' + db[0]._id, '/app/property/' + db[5]._id,
  '/app/videos', '/app/blog', '/app/blog/' + blogs[0]._id,
  '/app/work-with-us', '/app/sell-property', '/app/projects', '/app/nope-404',
];

for (const route of routes) {
  requests.clear(); consoleMsgs = []; pageErrors = [];
  try { await send('Page.navigate', { url: 'http://localhost:8123' + route }); } catch (e) { console.log('NAVFAIL', route, e.message); continue; }
  await sleep(6500);
  try {
    await send('Runtime.evaluate', { expression: `(async()=>{const H=document.body.scrollHeight;for(let y=0;y<=H;y+=800){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}})()`, awaitPromise: true });
    await sleep(2500);
  } catch {}
  let stats = {};
  try {
    const r = await send('Runtime.evaluate', { expression: `JSON.stringify({
      textLen: document.body.innerText.length,
      title: document.title,
      h1: (document.querySelector('h1')||{}).innerText || '',
      imgs: document.images.length,
      broken: [...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src.slice(-60)),
      cards: document.querySelectorAll('.ui-card').length
    })`, returnByValue: true });
    stats = JSON.parse(r.result.value);
  } catch (e) { stats = { err: e.message }; }
  let shot = null;
  try { const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 72 }); shot = Buffer.from(s.data, 'base64'); } catch {}
  const safe = route.replace(/[^\w.-]+/g, '_');
  if (shot) fs.writeFileSync(path.join(OUT, `shot${safe}.jpg`), shot);
  const reqs = [...requests.values()];
  const bad = reqs.filter(r => r.status === null || r.status === 'FAIL:net::ERR_BLOCKED_BY_CLIENT' && r.url.includes('localhost'));
  console.log(`${route} | text:${stats.textLen} h1:"${(stats.h1 || '').slice(0, 40)}" imgs:${stats.imgs} broken:${(stats.broken || []).length} cards:${stats.cards} cErr:${consoleMsgs.length} pErr:${pageErrors.length}`);
  if (stats.broken?.length) console.log('   broken:', stats.broken.slice(0, 4));
  if (consoleMsgs.length) console.log('   console:', consoleMsgs.slice(0, 3));
  if (pageErrors.length) console.log('   pageErr:', pageErrors.slice(0, 3));
}
proc.kill(); process.exit(0);
