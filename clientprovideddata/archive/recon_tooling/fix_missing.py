import json, os, requests
from urllib.parse import urlparse

SRC = os.path.join(os.environ['LOCALAPPDATA'], 'Temp', 'ssrecon')
ROOT = r'A:\projectssproperty'
media_map = json.load(open(os.path.join(ROOT, '__data__', 'media_map.json')))

S = requests.Session()
S.headers.update({'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'})

# find failures: mapped URLs missing on disk
missing = []
for u, local in media_map.items():
    dst = os.path.join(ROOT, local.replace('/', os.sep))
    if not (os.path.exists(dst) and os.path.getsize(dst) > 0):
        missing.append((u, local))
print('missing:', len(missing))
for u, local in missing:
    print(' ', u[:130], '->', local[:80])
    for attempt in range(3):
        try:
            r = S.get(u, timeout=60)
            if r.status_code == 200 and r.content:
                os.makedirs(os.path.dirname(dst := os.path.join(ROOT, local.replace('/', os.sep))), exist_ok=True)
                open(dst, 'wb').write(r.content)
                print('   RETRIED OK', len(r.content), 'B')
                break
            print('   HTTP', r.status_code)
        except Exception as e:
            print('   ERR', str(e)[:100])
