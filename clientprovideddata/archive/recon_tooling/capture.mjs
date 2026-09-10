// CDP capture rig: drives headless Chromium, records every network request,
// response bodies (XHR/fetch + docs), rendered HTML + screenshot per route.
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME = 'C:/Users/roshh/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const PORT = 9223;
const OUTDIR = process.argv[2] || 'ss_capture';
const ROUTES = process.argv.slice(3).length ? process.argv.slice(3) : ['/'];
const BASE = 'https://www.ssproperty.in';
fs.mkdirSync(OUTDIR, { recursive: true });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ---------- launch chrome ----------
const uddir = path.join(process.env.LOCALAPPDATA || '.', 'Temp', 'cdp-profile-ss');
fs.mkdirSync(uddir, { recursive: true });
const proc = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${uddir}`,
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--disable-features=Translate', '--window-size=1440,2400', '--lang=en-US',
  'about:blank'
], { stdio: 'ignore' });

async function httpJson(pathname) {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}${pathname}`);
      if (res.ok) return await res.json();
    } catch (e) { /* retry */ }
    await sleep(250);
  }
  throw new Error('chrome devtools endpoint never came up');
}

const version = await httpJson('/json/version');
console.log('CHROME:', version.Browser);

// find the about:blank page target
let targets = await httpJson('/json/list');
let page = targets.find(t => t.type === 'page');
if (!page) throw new Error('no page target');

// ---------- websocket ----------
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let msgId = 1;
const pending = new Map();
const requests = new Map();      // requestId -> request record
let networkEnabled = false;
let consoleMsgs = [];

ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(msg.error.message)); else resolve(msg.result);
    return;
  }
  if (!networkEnabled) return;
  const p = msg.params || {};
  switch (msg.method) {
    case 'Network.requestWillBeSent': {
      requests.set(p.requestId, {
        url: p.request.url,
        method: p.request.method,
        type: p.type,
        requestHeaders: p.request.headers,
        postData: p.request.postData || null,
        status: null, mime: null, responseHeaders: null,
        body: null, bodyErr: null,
      });
      break;
    }
    case 'Network.responseReceived': {
      const r = requests.get(p.requestId);
      if (r && !r.status) {
        r.status = p.response.status;
        r.mime = p.response.mimeType;
        r.responseHeaders = p.response.headers;
        r.remoteURL = p.response.url; // after redirects
      }
      break;
    }
    case 'Network.loadingFinished': {
      const r = requests.get(p.requestId);
      if (r && r.status !== null) {
        r.finishedAt = Date.now();
        // fetch body right away for everything that's not huge
        if (!/image|font|media/.test(r.mime || '')) {
          send('Network.getResponseBody', { requestId: p.requestId })
            .then(b => { r.body = b.base64Encoded ? Buffer.from(b.body, 'base64').toString('utf8') : b.body; })
            .catch(e => { r.bodyErr = String(e).slice(0, 200); });
        }
      }
      break;
    }
    case 'Network.loadingFailed': {
      const r = requests.get(p.requestId);
      if (r) r.failed = p.errorText;
      break;
    }
    case 'Runtime.consoleAPICalled': {
      if (p.type === 'error' || p.type === 'warning')
        consoleMsgs.push(p.type + ': ' + (p.args || []).map(a => a.value ?? a.description ?? '').join(' ').slice(0, 300));
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
await send('Network.setBypassServiceWorker', { bypass: true }); // don't let SW serve stale
await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 2400, deviceScaleFactor: 1, mobile: false });
networkEnabled = true;

// ---------- visit routes ----------
const allRoutes = new Set();
const manifest = [];

async function visit(route, settleMs = 9000) {
  const url = route.startsWith('http') ? route : BASE + route;
  console.log('\n=== VISIT', url);
  requests.clear();
  consoleMsgs = [];
  const before = new Set([...requests.keys()]);
  try {
    const { frameId } = await send('Page.navigate', { url });
  } catch (e) { console.log('nav err', e.message); }
  await sleep(settleMs);

  // scroll to bottom in steps to trigger lazy-loaded images
  try {
    await send('Runtime.evaluate', { expression: `(async () => {
      const H = document.body.scrollHeight;
      for (let y = 0; y <= H; y += 700) { window.scrollTo(0, y); await new Promise(r=>setTimeout(r,180)); }
      window.scrollTo(0, H);
    })()`, awaitPromise: true });
    await sleep(3500);
  } catch (e) { console.log('scroll err', e.message); }

  // rendered HTML
  let html = '';
  try {
    const r = await send('Runtime.evaluate', { expression: 'document.documentElement.outerHTML', returnByValue: true });
    html = r.result.value;
  } catch (e) { console.log('html eval err', e.message); }

  // text content stats
  let stats = {};
  try {
    const r = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        textLen: document.body.innerText.length,
        h1: [...document.querySelectorAll('h1')].map(h=>h.innerText).slice(0,3),
        imgs: document.images.length,
        imgsBroken: [...document.images].filter(i=>!i.complete||i.naturalWidth===0).length,
        links: [...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>h&&h.startsWith('/'))
      })`, returnByValue: true
    });
    stats = JSON.parse(r.result.value);
  } catch (e) { console.log('stats eval err', e.message); }

  // screenshot
  let shot = null;
  try {
    const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70 });
    shot = Buffer.from(s.data, 'base64');
  } catch (e) { console.log('shot err', e.message); }

  // wait for any straggler bodies
  await sleep(700);
  const recs = [...requests.values()];
  for (const r of recs) {
    const u = new URL(r.url, BASE);
    if (u.pathname.startsWith('/') && !u.hostname.includes('.'))
      allRoutes.add(u.pathname.replace(/\/$/, '') || '/');
  }
  const safeName = route.replace(/^https?:\/\//, '').replace(/[^\w.-]+/g, '_');
  fs.writeFileSync(path.join(OUTDIR, `page_${safeName}.html`), html || '');
  if (shot) fs.writeFileSync(path.join(OUTDIR, `shot_${safeName}.jpg`), shot);
  fs.writeFileSync(path.join(OUTDIR, `req_${safeName}.json`), JSON.stringify(recs, null, 1));
  manifest.push({ route, url, stats, requestCount: recs.length, console: consoleMsgs.slice(0, 15) });
  console.log('  requests:', recs.length, '| textLen:', stats.textLen, '| imgs:', stats.imgs, 'broken:', stats.imgsBroken, '| h1:', JSON.stringify(stats.h1));
  const apiCalls = recs.filter(r => /_api|wixapis|instagram|auth/i.test(r.url));
  for (const a of apiCalls) console.log('  API:', a.method, (a.status||'?'), a.url.slice(0, 110), a.body ? ('body:' + a.body.length + 'B') : '');
  return recs;
}

for (const r of ROUTES) await visit(r);

fs.writeFileSync(path.join(OUTDIR, 'manifest.json'), JSON.stringify(manifest, null, 1));
fs.writeFileSync(path.join(OUTDIR, 'routes_seen.json'), JSON.stringify([...allRoutes], null, 1));
console.log('\nDONE. pages:', manifest.length, 'internal routes seen:', allRoutes.size);
proc.kill();
process.exit(0);
