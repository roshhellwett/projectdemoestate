import json, os, glob, re
from urllib.parse import urlparse

SRC = os.path.join(os.environ['LOCALAPPDATA'], 'Temp', 'ssrecon')
ROOT = r'A:\projectssproperty'
DD = os.path.join(ROOT, '__data__')

# ---- 1) collect EVERY wixstatic URL variant ever seen (all captures incl. lazy-loaded) ----
all_media = {}   # full url -> {status, mime}
for f in glob.glob(os.path.join(SRC, 'ss_*', 'req_*.json')):
    for r in json.load(open(f, encoding='utf-8')):
        u = r['url']
        if 'static.wixstatic.com' in u and (r.get('body') or r.get('status')):
            if u not in all_media:
                all_media[u] = {'status': r.get('status'), 'mime': r.get('mime')}

# also render-derived: scan rendered pages + bundles + site data for variants
variant_re = re.compile(r'https://static\.wixstatic\.com/media/[A-Za-z0-9_~.,%-]+')
def is_real_url(u):
    # strip %2C-style encoding back to commas
    from urllib.parse import unquote
    u = unquote(u)
    if '/v1/' not in u:
        return u  # base file URL — fine
    seg = u.split('/v1/', 1)[1]
    first = seg.split('/')[0]
    if first.startswith('w_') or first.startswith('h_'):
        return u  # real transform
    return None  # template fragment (e.g. ends at /v1/fill) — drop

for f in glob.glob(os.path.join(SRC, 'ss_*', 'page_*.html')) + glob.glob(os.path.join(SRC, '*.js')):
    try: txt = open(f, encoding='utf-8').read()
    except Exception: continue
    for m in variant_re.findall(txt):
        m = m.rstrip('.,')  # trailing punctuation from prose
        real = is_real_url(m)
        if real and real not in all_media:
            all_media[real] = {'status': None, 'mime': None, 'from_static_analysis': True}

print('total media URLs (variants incl.):', len(all_media))

# ---- 2) map each URL to a collision-free local path ----
media_map = {}
for u in sorted(all_media.keys()):
    p = urlparse(u).path  # /media/<base>[/v1/<transform>/<base>]
    if '/v1/' in p:
        base, rest = p[len('/media/'):].split('/v1/', 1)
        local = 'media/v/' + base + '/' + rest  # keep transform segments
    else:
        local = 'media/b/' + p[len('/media/'):]
    media_map[u] = local

json.dump(media_map, open(os.path.join(DD, 'media_map.json'), 'w'), indent=1)

# ---- 3) has_local index ----
has_local = {}
for local in media_map.values():
    has_local[local.split('/v1/')[0]] = True
for dirpath, dirnames, filenames in os.walk(os.path.join(ROOT, 'media')):
    for fn in filenames:
        rel = 'media/' + os.path.relpath(os.path.join(dirpath, fn), os.path.join(ROOT, 'media')).replace(os.sep, '/')
        has_local[rel] = True
json.dump(has_local, open(os.path.join(DD, 'has_local.json'), 'w'), indent=1)

# ---- 4) exact responses by spec + api url map ----
plan = json.load(open(os.path.join(SRC, 'fetch_plan.json')))
resp_by_spec = {}
for key, rec in plan['api'].items():
    if key.startswith('q:'):
        resp_by_spec[key[2:]] = rec['body']
api_urls = {}
for key, rec in plan['api'].items():
    if key.startswith('api:'):
        api_urls[rec['url']] = {'status': rec.get('status') or 200, 'body': rec['body']}
json.dump(resp_by_spec, open(os.path.join(DD, 'responses_by_spec.json'), 'w'), indent=1)
json.dump(api_urls, open(os.path.join(DD, 'api_url_map.json'), 'w'), indent= +1 if False else 1)

# ---- 5) db.json already built; keep as is ----
print('exact responses:', len(resp_by_spec))
print('api urls:', len(api_urls))
print('media_map entries:', len(media_map))

# ---- 6) download list for missing variants ----
dl = []
for u in media_map:
    dst = os.path.join(ROOT, media_map[u].replace('/', os.sep))
    if not (os.path.exists(dst) and os.path.getsize(dst) > 0):
        dl.append(u)
json.dump(dl, open(os.path.join(SRC, 'download_urls.json'), 'w'), indent=1)
print('to download:', len(dl))
