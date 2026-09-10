// Verify the offline clone: load every route on localhost, check render + broken images + console errors.
// Blocks ALL external network at the CDP level for a strict offline proof.
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME = 'C:/Users/roshh/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const PORT = 9224;
const OUTDIR = process.argv[2] || 'ss_verify';
const STRICT = process.argv.includes('--strict');
const ROUTES = process.argv.slice(2).filter(a => a.startsWith('/'));
const BASE = 'http://localhost:8123';
fs.mkdirSync(OUTDIR, { recursive: true });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const uddir = path.join(process.env.LOCALAPPDATA || '.', 'Temp', 'cdp-profile-verify');
fs.rmSync(uddir, { recursive: true, force: true });
fs.mkdirSync(uddir, { recursive: true });
const proc = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${uddir}`,
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--window-size=1440,2400', '--lang=en-US',
  'about:blank'
], { stdio: 'ignore' });

async function httpJson(p) {
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PORT}${p}`); if (r.ok) return await r.json(); } catch {}
    await sleep(250);
  }
  throw new Error('no devtools');
}

const targets = await httpJson('/json/list');
const page = targets.find(t => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let msgId = 1;
const pending = new Map();
const requests = new Map();
let netOn = false;
let consoleMsgs = [];
let blockedExternal = 0;

ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(msg.error.message)); else resolve(msg.result);
    return;
  }
  if (!netOn) return;
  const p = msg.params || {};
  switch (msg.method) {
    case 'Network.requestWillBeSent': {
      requests.set(p.requestId, { url: p.request.url, status: null, mime: null, failed: null });
      // STRICT OFFLINE: block every non-localhost request
      if (STRICT && !/^https?:\/\/(localhost|127\.0\.0\.1)/.test(p.request.url)) {
        blockedExternal++;
        send('Network.failRequest', { requestId: p.requestId, errorReason: 'BlockedByClient' }).catch(() => {});
      }
      break;
    }
    case 'Network.responseReceived': {
      const r = requests.get(p.requestId);
      if (r && r.status === null) { r.status = p.response.status; r.mime = p.response.mimeType; }
      break;
    }
    case 'Network.loadingFailed': {
      const r = requests.get(p.requestId);
      if (r) r.failed = p.errorText;
      break;
    }
    case 'Runtime.consoleAPICalled': {
      if (p.type === 'error' || p.type === 'warning')
        consoleMsgs.push(p.type + ': ' + (p.args || []).map(a => a.value ?? a.description ?? '').join(' ').slice(0, 200));
      break;
    }
  }
});

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = msgId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); reject(new Error('timeout ' + method)); } }, 30000);
  });
}

await send('Network.enable', { maxPostDataSize: 65536 });
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 2400, deviceScaleFactor: 1, mobile: false });
netOn = true;

const DEFAULT_ROUTES = ['/', '/properties', '/videos', '/blog', '/work-with-us', '/sell-property', '/projects'];
const allRoutes = ROUTES.length ? ROUTES : DEFAULT_ROUTES;
const report = [];
let totalBroken = 0, totalPages = 0;

for (const route of allRoutes) {
  requests.clear(); consoleMsgs = [];
  const url = BASE + route;
  process.stdout.write(`\n=== ${route} `);
  try { await send('Page.navigate', { url }); } catch (e) { console.log('nav err', e.message); }
  await sleep(9000);
  try {
    await send('Runtime.evaluate', { expression: `(async () => {
      const H = document.body.scrollHeight;
      for (let y = 0; y <= H; y += 700) { window.scrollTo(0, y); await new Promise(r=>setTimeout(r,150)); }
      window.scrollTo(0, H);
    })()`, awaitPromise: true });
    await sleep(3000);
  } catch {}

  let stats = {};
  try {
    const r = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        textLen: document.body.innerText.length,
        h1: [...document.querySelectorAll('h1')].map(h=>h.innerText).slice(0,2),
        imgs: document.images.length,
        imgsBroken: [...document.images].filter(i=>!i.complete||i.naturalWidth===0).length,
        extUrls: [...document.images].filter(i=>i.src && i.src.startsWith('http') && !i.src.includes('localhost')).length
      })`, returnByValue: true
    });
    stats = JSON.parse(r.result.value);
  } catch (e) { stats = { err: e.message }; }

  let shot = null;
  try {
    const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70 });
    shot = Buffer.from(s.data, 'base64');
  } catch {}
  const safe = route === '/' ? 'root' : route.replace(/[^\w.-]+/g, '_');
  if (shot) fs.writeFileSync(path.join(OUTDIR, `shot_${safe}.jpg`), shot);

  const reqs = [...requests.values()];
  const nonLocal = reqs.filter(r => !r.url.includes('localhost')).map(r => `${r.status || r.failed} ${r.url.split('?')[0].slice(0, 100)}`);
  report.push({ route, ...stats, nonLocalReqs: nonLocal.slice(0, 10), console: consoleMsgs.slice(0, 8) });
  totalBroken += stats.imgsBroken || 0;
  totalPages++;
  console.log(`| textLen:${stats.textLen} imgs:${stats.imgs} broken:${stats.imgsBroken} extImgs:${stats.extUrls} nonLocalReqs:${nonLocal.length} console:${consoleMsgs.length}`);
  if (stats.h1) console.log('   h1:', JSON.stringify(stats.h1));
  for (const c of consoleMsgs.slice(0, 5)) console.log('   c:', c.slice(0, 150));
}

fs.writeFileSync(path.join(OUTDIR, 'verify_report.json'), JSON.stringify(report, null, 1));
console.log(`\nDONE. pages:${totalPages} totalBrokenImgs:${totalBroken} blockedExternal:${blockedExternal}`);
proc.kill();
process.exit(0);
