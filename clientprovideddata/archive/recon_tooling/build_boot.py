import json, os, re

ROOT = r'A:\projectssproperty'
DD = os.path.join(ROOT, '__data__')

def load(p):
    return json.load(open(os.path.join(DD, p), encoding='utf-8'))

db = load('db.json')
media_map = load('media_map.json')
has_local = load('has_local.json')
api_map = load('api_url_map.json')

# api_url_map: url -> body. Convert to url -> {status:200, body}
api_urls = {u: {'status': 200, 'body': b} for u, b in api_map.items()}

# Split DB into per-collection boot files to keep index.html small
os.makedirs(os.path.join(ROOT, '__offline__', 'data'), exist_ok=True)
for coll, items in db.items():
    p = os.path.join(ROOT, '__offline__', 'data', coll + '.json')
    with open(p, 'w', encoding='utf-8') as f:
        json.dump(items, f, separators=(',', ':'))

# ---- index.html: inject boot before everything else ----
shell = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()

boot = """<script>
window.__SS_DB__ = {};
window.__SS_API_URLS__ = %s;
window.__SS_MEDIA_MAP__ = %s;
window.__SS_HAS_LOCAL__ = %s;
</script>
<script>
(function loadDB() {
  var files = %s;
  var pending = files.length;
  files.forEach(function (c) {
    var x = new XMLHttpRequest();
    x.open('GET', '__offline__/data/' + c + '.json', true);
    x.onload = function () {
      try { window.__SS_DB__[c] = JSON.parse(x.responseText); } catch (e) {}
      if (--pending === 0) window.__SS_DB_READY__ = true;
    };
    x.onerror = function () { if (--pending === 0) window.__SS_DB_READY__ = true; };
    x.send();
  });
})();
</script>
<script src="__offline__/offline-shim.js"></script>""" % (
    json.dumps(api_urls, separators=(',', ':')),
    json.dumps(media_map, separators=(',', ':')),
    json.dumps(has_local, separators=(',', ':')),
    json.dumps(list(db.keys()), separators=(',', ':')),
)

# insert boot right after <head> opening (must run before astro island hydration)
new_shell = re.sub(r'(<head[^>]*>)', r'\1\n' + boot.replace('\\', '\\\\'), shell, count=1)

with open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8') as f:
    f.write(new_shell)

print('index.html size:', len(new_shell))
print('boot collections:', list(db.keys()))

# ---- per-route deep-link shells (same shell for all) ----
routes = load('routes.json')['routes']
os.makedirs(os.path.join(ROOT, '__offline__', 'shells'), exist_ok=True)
for r in routes:
    if r == '/':
        continue
    safe = r.strip('/').replace('/', '_')
    # e.g. property/<id> -> property_<id>.html
    p = os.path.join(ROOT, '__offline__', 'shells', safe + '.html')
    with open(p, 'w', encoding='utf-8') as f:
        f.write(new_shell)
print('route shells written:', len(routes) - 1)
