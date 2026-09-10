// Diagnostic: list external image srcs + broken imgs on key routes (strict-ish, but allow net)
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME = 'C:/Users/roshh/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const PORT = 9225;
const OUT = 'ss_diag';
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const uddir = path.join(process.env.LOCALAPPDATA || '.', 'Temp', 'cdp-profile-diag');
fs.rmSync(uddir, { recursive: true, force: true }); fs.mkdirSync(uddir, { recursive: true });
const proc = spawn(CHROME, [`--remote-debugging-port=${PORT}`, `--user-data-dir=${uddir}`, '--headless=new', '--disable-gpu', '--window-size=1440,2400', 'about:blank'], { stdio: 'ignore' });
async function hj(p) { for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}${p}`); if (r.ok) return await r.json(); } catch {} await sleep(250); } throw new Error('no devtools'); }
const t = await hj('/json/list');
const ws = new WebSocket(t.find(x => x.type === 'page').webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let mid = 1; const pend = new Map();
ws.addEventListener('message', (ev) => { const m = JSON.parse(ev.data); if (m.id && pend.has(m.id)) { const p = pend.get(m.id); pend.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); } });
function send(method, params = {}) { return new Promise((res, rej) => { const id = mid++; pend.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); setTimeout(() => { if (pend.has(id)) { pend.delete(id); rej(new Error('timeout ' + method)); } }, 25000); }); }
await send('Page.enable'); await send('Runtime.enable');

for (const route of ['/', '/blog/47ea5159-5508-4052-b1fb-a66a72c23994', '/properties']) {
  await send('Page.navigate', { url: 'http://localhost:8123' + route });
  await sleep(9000);
  const r = await send('Runtime.evaluate', { expression: `JSON.stringify({
    ext: [...document.images].filter(i=>i.src.startsWith('http') && !i.src.includes('localhost')).map(i=>({src:i.src.slice(0,150), complete:i.complete, nw:i.naturalWidth})),
    broken: [...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>({src:i.src.slice(0,150), alt:i.alt})),
    bg: [...document.querySelectorAll('[style*="wixstatic"]')].length
  })`, returnByValue: true });
  console.log('\n===', route, '===');
  console.log(r.result.value);
}
proc.kill(); process.exit(0);
