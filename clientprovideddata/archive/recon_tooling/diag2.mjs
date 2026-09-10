// List every non-local request on / in the offline clone
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME = 'C:/Users/roshh/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const PORT = 9226;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const uddir = path.join(process.env.LOCALAPPDATA || '.', 'Temp', 'cdp-profile-diag2');
fs.rmSync(uddir, { recursive: true, force: true }); fs.mkdirSync(uddir, { recursive: true });
const proc = spawn(CHROME, [`--remote-debugging-port=${PORT}`, `--user-data-dir=${uddir}`, '--headless=new', '--disable-gpu', '--window-size=1440,2400', 'about:blank'], { stdio: 'ignore' });
async function hj(p) { for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}${p}`); if (r.ok) return await r.json(); } catch {} await sleep(250); } throw new Error('no devtools'); }
const t = await hj('/json/list');
const ws = new WebSocket(t.find(x => x.type === 'page').webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let mid = 1; const pend = new Map(); const requests = new Map(); let netOn = false;
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pend.has(m.id)) { const p = pend.get(m.id); pend.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); return; }
  if (!netOn) return;
  const pa = m.params || {};
  if (m.method === 'Network.requestWillBeSent') requests.set(pa.requestId, { url: pa.request.url, status: null });
  if (m.method === 'Network.responseReceived') { const r = requests.get(pa.requestId); if (r && r.status === null) r.status = pa.response.status; }
});
function send(method, params = {}) { return new Promise((res, rej) => { const id = mid++; pend.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); setTimeout(() => { if (pend.has(id)) { pend.delete(id); rej(new Error('timeout')); } }, 25000); }); }
await send('Network.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true }); await send('Page.enable'); await send('Runtime.enable');
netOn = true;
await send('Page.navigate', { url: 'http://localhost:8123/' });
await sleep(10000);
// scroll
await send('Runtime.evaluate', { expression: `(async()=>{const H=document.body.scrollHeight;for(let y=0;y<=H;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,150));}})()`, awaitPromise: true });
await sleep(4000);
const ext = [...requests.values()].filter(r => !r.url.includes('localhost'));
console.log('EXTERNAL requests on / :', ext.length);
for (const r of ext) console.log(' ', r.status ?? '?', r.url.slice(0, 130));
proc.kill(); process.exit(0);
