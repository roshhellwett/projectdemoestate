import json, os, concurrent.futures as cf
import requests

SRC = os.path.join(os.environ['LOCALAPPDATA'], 'Temp', 'ssrecon')
ROOT = r'A:\projectssproperty'
urls = json.load(open(os.path.join(SRC, 'download_urls.json')))
media_map = json.load(open(os.path.join(ROOT, '__data__', 'media_map.json')))

S = requests.Session()
S.headers.update({'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'})

def local_path(u):
    if u in media_map:
        return os.path.join(ROOT, media_map[u].replace('/', os.sep))
    # font or same-origin asset
    from urllib.parse import urlparse
    p = urlparse(u).path
    return os.path.join(ROOT, *p.lstrip('/').split('/'))

def fetch(u):
    dst = local_path(u)
    if os.path.exists(dst) and os.path.getsize(dst) > 0:
        return (u, 'cached', os.path.getsize(dst))
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    for attempt in range(4):
        try:
            r = S.get(u, timeout=60)
            if r.status_code == 200 and len(r.content) > 0:
                with open(dst, 'wb') as f:
                    f.write(r.content)
                return (u, 'ok', len(r.content))
            last = f'HTTP {r.status_code}'
        except Exception as e:
            last = str(e)[:120]
    return (u, 'FAIL ' + last, 0)

ok = fail = 0
total_bytes = 0
with cf.ThreadPoolExecutor(max_workers=8) as ex:
    for u, st, sz in ex.map(fetch, urls):
        if st in ('ok', 'cached'):
            ok += 1; total_bytes += sz
        else:
            fail += 1
        print(f"{st:10} {sz:>9}B  {u[:110]}")

print(f"\nfetched {ok}/{len(urls)}  ({total_bytes/1e6:.1f} MB)  failures: {fail}")
