// Full sweep: all 36 routes, strict offline, verify 0 broken everywhere.
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME = 'C:/Users/roshh/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const PORT = 9227;
const OUT = 'ss_full_sweep';
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const uddir = path.join(process.env.LOCALAPPDATA || '.', 'Temp', 'cdp-profile-sweep');
fs.rmSync(uddir, { recursive: true, force: true }); fs.mkdirSync(uddir, { recursive: true });
const proc = spawn(CHROME, [`--remote-debugging-port=${PORT}`, `--user-data-dir=${uddir}`, '--headless=new', '--disable-gpu', '--window-size=1440,2400', 'about:blank'], { stdio: 'ignore' });
async function hj(p) { for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}${p}`); if (r.ok) return await r.json(); } catch {} await sleep(250); } throw new Error('no devtools'); }
const t = await hj('/json/list');
const ws = new WebSocket(t.find(x => x.type === 'page').webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let mid = 1; const pend = new Map(); const requests = new Map(); let netOn = false; let consoleMsgs = [];
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pend.has(m.id)) { const p = pend.get(m.id); pend.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); return; }
  if (!netOn) return;
  const pa = m.params || {};
  if (m.method === 'Network.requestWillBeSent') {
    requests.set(pa.requestId, { url: pa.request.url, status: null });
    if (!/^https?:\/\/(localhost|127\.0\.0\.1)/.test(pa.request.url) && !pa.request.url.startsWith('data:')) {
      send('Network.failRequest', { requestId: pa.requestId, errorReason: 'BlockedByClient' }).catch(() => {});
    }
  }
  if (m.method === 'Network.responseReceived') { const r = requests.get(pa.requestId); if (r && r.status === null) r.status = pa.response.status; }
  if (m.method === 'Runtime.consoleAPICalled') { if (pa.type === 'error') consoleMsgs.push((pa.args || []).map(a => a.value ?? a.description ?? '').join(' ').slice(0, 150)); }
});
function send(method, params = {}) { return new Promise((res, rej) => { const id = mid++; pend.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); setTimeout(() => { if (pend.has(id)) { pend.delete(id); rej(new Error('timeout ' + method)); } }, 30000); }); }
await send('Network.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true }); await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 2400, deviceScaleFactor: 1, mobile: false });
netOn = true;

const db = JSON.parse(fs.readFileSync('A:/projectssproperty/__offline__/boot.json', 'utf8'));
const routes = ['/'];
for (const c of ['properties']) for (const it of JSON.parse(fs.readFileSync(`A:/projectssproperty/__offline__/data/${c}.json`, 'utf8'))) routes.push('/property/' + it._id);
for (const c of ['blogposts']) for (const it of JSON.parse(fs.readFileSync(`A:/projectssproperty/__offline__/data/${c}.json`, 'utf8'))) routes.push('/blog/' + it._id);
routes.push('/properties', '/videos', '/blog', '/work-with-us', '/sell-property', '/projects');

const report = [];
let bad = 0;
for (const route of routes) {
  requests.clear(); consoleMsgs = [];
  try { await send('Page.navigate', { url: 'http://localhost:8123' + route }); } catch (e) { console.log('NAVFAIL', route); }
  await sleep(7000);
  try {
    await send('Runtime.evaluate', { expression: `(async()=>{const H=document.body.scrollHeight;for(let y=0;y<=H;y+=800){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}})()`, awaitPromise: true });
    await sleep(2500);
  } catch {}
  let stats = {};
  try {
    const r = await send('Runtime.evaluate', { expression: `JSON.stringify({
      textLen: document.body.innerText.length,
      h1: (document.querySelector('h1')||{}).innerText || '',
      imgs: document.images.length,
      broken: [...document.images].filter(i=>!i.complete||i.naturalWidth===0).length
    })`, returnByValue: true });
    stats = JSON.parse(r.result.value);
  } catch (e) { stats = { err: e.message }; }
  const ext = [...requests.values()].filter(r => !r.url.includes('localhost') && !r.url.startsWith('data:')).length;
  const errs = consoleMsgs.filter(c => !/Instagram feed/.test(c));
  const okPage = (stats.imgsBroken === 0) !== undefined && stats.broken === 0 && errs.length === 0 && stats.textLen > 100;
  if (!okPage) bad++;
  report.push({ route, ...stats, extReq: ext, errs });
  console.log(`${okPage ? 'OK ' : 'BAD'} ${route} | text:${stats.textLen} imgs:${stats.imgs} broken:${stats.broken} ext:${ext} errs:${errs.length}${stats.h1 ? ' | ' + String(stats.h1).slice(0, 50) : ''}`);
  if (errs.length) console.log('     ', errs.slice(0, 3).join(' | ').slice(0, 250));
}
fs.writeFileSync(path.join(OUT, 'sweep_report.json'), JSON.stringify(report, null, 1));
console.log(`\nSWEEP DONE: ${routes.length} pages, bad: ${bad}`);
proc.kill(); process.exit(0);
