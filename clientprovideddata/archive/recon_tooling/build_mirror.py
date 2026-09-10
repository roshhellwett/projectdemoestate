import json, os, re, shutil, hashlib
from urllib.parse import urlparse, unquote

ROOT = r'A:\projectssproperty'
SRC = os.path.join(os.environ['LOCALAPPDATA'], 'Temp', 'ssrecon')
CAP = [os.path.join(SRC, d) for d in ('ss_capture', 'ss_details1', 'ss_details2')]

plan = json.load(open(os.path.join(SRC, 'fetch_plan.json')))
site_data = json.load(open(os.path.join(SRC, 'site_data.json')))

# ---------- helpers ----------
def mkdirs(p):
    os.makedirs(p, exist_ok=True)

def copy_from_recon(relname, dest_rel):
    src = os.path.join(SRC, relname)
    dst = os.path.join(ROOT, dest_rel)
    mkdirs(os.path.dirname(dst))
    shutil.copyfile(src, dst)
    return dst

# ---------- 1) same-origin assets (byte-exact) ----------
# shell html for every route (from captures; the shell is identical per route)
shell_routes = {}
for cap in CAP:
    if not os.path.isdir(cap): continue
    for f in os.listdir(cap):
        if f.startswith('page_') and f.endswith('.html'):
            route = f[5:-5]
            if route == '': route = '__root__'
            shell_routes[route] = os.path.join(cap, f)

# canonical shell = homepage capture
root_shell = None
for cap in CAP:
    if not os.path.isdir(cap): continue
    for f in os.listdir(cap):
        if f.startswith('page_') and f.endswith('.html'):
            route = f[5:-5]
            if route in ('', '_', '__'):
                root_shell = os.path.join(cap, f)
                shell_routes.pop(os.path.join(cap, f), None)
            else:
                shell_routes[route] = os.path.join(cap, f)
if root_shell is None:
    raise SystemExit('homepage shell capture not found')
shell_html = open(root_shell, encoding='utf-8').read()

# Every route gets the SAME shell (that's what the server does) — but keep
# per-route shells as captured too, in __data__/shells for fidelity.
mkdirs(os.path.join(ROOT, '__data__', 'shells'))
route_list = []
for route, path in shell_routes.items():
    name = route if route != '__root__' else 'index'
    safe = re.sub(r'[^\w.-]+', '_', name)
    shutil.copyfile(path, os.path.join(ROOT, '__data__', 'shells', safe + '.html'))
    route_list.append('/' if route == '__root__' else '/' + route.replace('_-_', '/').replace('__', '/').replace('_', '/', 1) if False else '/' + route.lstrip('/').replace('_-_', '/'))

# Instead of fragile name-unmangling, rebuild route list from known routes:
ROUTES = ['/', '/properties', '/videos', '/blog', '/work-with-us', '/sell-property', '/projects']
for pid in site_data['properties']:
    ROUTES.append('/property/' + pid)
for bid in site_data['blogposts']:
    ROUTES.append('/blog/' + bid)

# index.html
copy_from_recon('ss_capture/page__.html', 'index.html')

# ---------- 2) _astro bundles, css, fonts, favicon, sw.js ----------
for f, dest in [
    ('page.Da4Tm9W1.js', '_astro/page.Da4Tm9W1.js'),
    ('Router.BPj9U-nC.js', '_astro/Router.BPj9U-nC.js'),
    ('client.CWebG0_l.js', '_astro/client.CWebG0_l.js'),
    ('entry.nm0Hktb4.css', '_astro/entry.nm0Hktb4.css'),
    ('_slug_.BMRhjz4F.css', '_astro/_slug_.BMRhjz4F.css'),
    ('setup.4cZrxQ76.js', '_astro/setup.4cZrxQ76.js'),
    ('_commonjsHelpers.C0HnJYVl.js', '_astro/_commonjsHelpers.C0HnJYVl.js'),
    ('address.CihO0Mvv.js', '_astro/address.CihO0Mvv.js'),
    ('index.QbErGXhl.js', '_astro/index.QbErGXhl.js'),
    ('astro_scripts/before-hydration.js.Dh2kxll0.js', '_astro/astro_scripts/before-hydration.js.Dh2kxll0.js'),
    ('sw.js', 'sw.js'),
    ('favicon.ico', 'favicon.ico'),
]:
    copy_from_recon(f, dest)

# fonts referenced by CSS — download list (they're fetched by the media fetcher)
css_text = open(os.path.join(SRC, '_slug_.BMRhjz4F.css'), encoding='utf-8').read()
fonts = re.findall(r'url\(/_astro/([A-Za-z0-9_.-]+\.woff2)\)', css_text)
font_urls = ['https://www.ssproperty.in/_astro/' + fo for fo in fonts]
print('fonts to fetch:', len(font_urls))

# ---------- 3) media ----------
mkdirs(os.path.join(ROOT, 'media'))
# media plan: base + variants, mapped to local paths mirroring wixstatic structure
media_map = {}   # original URL -> local path
plan_media = plan['media']
for u in sorted(plan_media.keys()):
    p = urlparse(u)
    local = 'media/' + p.path.lstrip('/').replace('media/', '', 1)
    # windows-safe
    local = local.replace('\\', '/')
    media_map[u] = local

json.dump(media_map, open(os.path.join(ROOT, '__data__', 'media_map.json'), 'w'), indent=1)
# merge fonts into the download list as plain asset URLs
all_downloads = list(media_map.keys()) + font_urls
json.dump(all_downloads, open(os.path.join(SRC, 'download_urls.json'), 'w'), indent=1)

# ---------- 4) API responses ----------
mkdirs(os.path.join(ROOT, '__data__'))
json.dump(plan['api'], open(os.path.join(ROOT, '__data__', 'api_responses.json'), 'w'), indent=1)
json.dump(site_data, open(os.path.join(ROOT, '__data__', 'site_data.json'), 'w'), indent=1)
json.dump({'routes': ROUTES, 'pages': {r: 'index.html' for r in ROUTES}}, open(os.path.__file__ and os.path.join(ROOT, '__data__', 'routes.json'), 'w'), indent=1)

print('OK — skeleton written to', ROOT)
print('routes:', len(ROUTES))
print('media to fetch:', len(media_map))
print('api responses:', len(plan['api']))
