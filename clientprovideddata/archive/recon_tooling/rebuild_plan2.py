import json, os, re, glob
from urllib.parse import urlparse

SRC = os.path.join(os.environ['LOCALAPPDATA'], 'Temp', 'ssrecon')
ROOT = r'A:\projectssproperty'
DD = os.path.join(ROOT, '__data__')

all_media = {}

# 1) every URL from every capture request
for f in glob.glob(os.path.join(SRC, 'ss_*', 'req_*.json')):
    for r in json.load(open(f, encoding='utf-8')):
        u = r['url']
        if 'static.wixstatic.com' in u:
            all_media.setdefault(u.split('#')[0], None)

# 2) every URL inside site_data.json (DB fields)
def walk(o):
    if isinstance(o, dict):
        for v in o.values(): walk(v)
    elif isinstance(o, list):
        for v in o: walk(v)
    elif isinstance(o, str) and 'wixstatic.com/media/' in o:
        all_media.setdefault(o.split('#')[0], None)
walk(json.load(open(os.path.join(SRC, 'site_data.json'))))

# 3) rendered pages + bundles
variant_re = re.compile(r'https://static\.wixstatic\.com/media/[A-Za-z0-9_~.,%-]+')
for f in glob.glob(os.path.join(SRC, 'ss_*', 'page_*.html')) + glob.glob(os.path.join(SRC, '*.js')):
    try: txt = open(f, encoding='utf-8').read()
    except Exception: continue
    for m in variant_re.findall(txt):
        all_media.setdefault(m.rstrip('.,'), None)

print('total unique media URLs:', len(all_media))

media_map = {}
for u in sorted(all_media.keys()):
    p = urlparse(u).path
    if '/v1/' in p:
        base, rest = p[len('/media/'):].split('/v1/', 1)
        local = 'media/v/' + base + '/' + rest
    else:
        local = 'media/b/' + p[len('/media/'):]
    media_map[u] = local

# dedupe collision check (two URLs -> same local path is fine if both are same bytes; check)
from collections import Counter
cnt = Counter(media_map.values())
dupes = {k: v for k, v in cnt.items() if v > 1}
print('local path collisions:', len(dupes))
for k in list(dupes)[:5]: print('  ', k[:100], '->', dupes[k])

json.dump(media_map, open(os.path.join(DD, 'media_map.json'), 'w'), indent=1)

# has_local index
has_local = {}
for local in media_map.values():
    has_local[local.split('/v1/')[0]] = True
    has_local[local] = True
json.dump(has_local, open(os.path.join(DD, 'has_local.json'), 'w'), indent=1)

# download list
dl = []
for u, local in media_map.items():
    dst = os.path.join(ROOT, local.replace('/', os.sep))
    if not (os.path.exists(dst) and os.path.getsize(dst) > 0):
        dl.append(u)
json.dump(dl, open(os.path.join(SRC, 'download_urls.json'), 'w'), indent=1)
print('to download:', len(dl), 'of', len(media_map))
