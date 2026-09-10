// Final screenshots: all routes, desktop + mobile, for human review.
import { spawn } from 'child_process';
import fs from 'fs'; import path from 'path';

const CHROME = 'C:/Users/roshh/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const PORT = 9235;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const ud = path.join(process.env.LOCALAPPDATA || '.', 'Temp', 'cdp-final');
fs.rmSync(ud, { recursive: true, force: true }); fs.mkdirSync(ud, { recursive: true });
const proc = spawn(CHROME, [`--remote-debugging-port=${PORT}`, `--user-data-dir=${ud}`, '--headless=new', '--disable-gpu', 'about:blank'], { stdio: 'ignore' });
async function hj(p) { for (let i = 0; i < 50; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}${p}`); if (r.ok) return await r.json(); } catch {} await sleep(250); } }
const t = await hj('/json/list');
const ws = new WebSocket(t.find(x => x.type === 'page').webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let mid = 1; const pend = new Map(); let consoleErrs = [];
ws.addEventListener('message', (ev) => { const m = JSON.parse(ev.data); if (m.id && pend.has(m.id)) { const p = pend.get(m.id); pend.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); return; } if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') consoleErrs.push(m.params.args.map(a => a.value ?? '').join(' ').slice(0, 120)); });
const send = (method, params = {}) => new Promise((res, rej) => { const id = mid++; pend.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); setTimeout(() => { if (pend.has(id)) { pend.delete(id); rej(new Error('t')); } }, 45000); });
await send('Page.enable'); await send('Runtime.enable');

const db = JSON.parse(fs.readFileSync('A:/projectssproperty/__offline__/data/properties.json', 'utf8'));
const blogs = JSON.parse(fs.readFileSync('A:/projectssproperty/__offline__/data/blogposts.json', 'utf8'));
const ROUTES = [
  ['home', '/app/'],
  ['properties', '/app/properties'],
  ['property', '/app/property/' + db[1]._id],
  ['videos', '/app/videos'],
  ['blog', '/app/blog'],
  ['post', '/app/blog/' + blogs[2]._id],
  ['work', '/app/work-with-us'],
  ['sell', '/app/sell-property'],
  ['projects', '/app/projects'],
  ['404', '/app/none'],
];

for (const [label, vp] of [['desktop', { w: 1440, h: 1000, dsf: 1, mob: false }], ['mobile', { w: 390, h: 844, dsf: 2, mob: true }]]) {
  await send('Emulation.setDeviceMetricsOverride', { width: vp.w, height: vp.h, deviceScaleFactor: vp.dsf, mobile: vp.mob });
  for (const [name, route] of ROUTES) {
    consoleErrs = [];
    await send('Page.navigate', { url: 'http://localhost:8123' + route });
    await sleep(5500);
    // scroll through to settle reveals + lazy imgs, then back to top
    await send('Runtime.evaluate', { expression: `(async()=>{const H=document.body.scrollHeight;for(let y=0;y<=H;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,140));}window.scrollTo(0,0)})()`, awaitPromise: true }).catch(() => {});
    await sleep(1800);
    const r = await send('Runtime.evaluate', { expression: `JSON.stringify({imgs:document.images.length,broken:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).length})`, returnByValue: true });
    const st = JSON.parse(r.result.value);
    const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    fs.writeFileSync(`final_shots/${label}_${name}.jpg`, Buffer.from(s.data, 'base64'));
    console.log(`${label} ${name}: imgs=${st.imgs} broken=${st.broken} errs=${consoleErrs.length}`);
    if (consoleErrs.length) console.log('  ', consoleErrs[0]);
  }
}
proc.kill(); process.exit(0);
