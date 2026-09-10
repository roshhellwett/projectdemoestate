import json, os, re

ROOT = r'A:\projectssproperty'
DD = os.path.join(ROOT, '__data__')

def load(p):
    return json.load(open(os.path.join(DD, p), encoding='utf-8'))

db = load('db.json')
media_map = load('media_map.json')
has_local = load('has_local.json')
api_map = load('api_url_map.json')
exact = load('responses_by_spec.json')

# api url map: flatten double-wrapped bodies if present
api_urls = {}
for u, rec in api_map.items():
    body = rec['body'] if isinstance(rec, dict) else rec
    # unwrap nested {status, body}
    if isinstance(body, dict) and 'body' in body:
        body = body['body']
    api_urls[u] = {'status': (rec.get('status') if isinstance(rec, dict) else 200) or 200, 'body': body}
api_urls['https://edge.wixapis.com/members/v1/members/my'] = {
    'status': 403,
    'body': '{"message":"Authorization header is malformed or missing","details":{},"errorCode":"WDE-1002"}'
}

# slim exact replays: drop responses the local DB can synthesize faithfully
# (keep only small ones — the DB engine reproduces large collection queries exactly)
slim_exact = {}
for k, v in exact.items():
    if len(v) <= 200000:
        slim_exact[k] = v
print('exact replays kept:', len(slim_exact), 'of', len(exact), '(dropped', len(exact) - len(slim_exact), 'large DB-synthesizable)')

# ---- boot.json: everything the shim needs, in one fetch ----
boot_data = {
    'collections': sorted(db.keys()),
    'api_urls': api_urls,
    'exact': slim_exact,
    'media_map': media_map,
    'has_local': has_local,
}
with open(os.path.join(ROOT, '__offline__', 'boot.json'), 'w', encoding='utf-8') as f:
    json.dump(boot_data, f, separators=(',', ':'))

# ---- tiny boot script in index.html ----
shell = open(os.path.join(os.environ['LOCALAPPDATA'], 'Temp', 'ss_home.html'), encoding='utf-8').read()

boot_head = """<script>
(function () {
  // SS Property offline clone boot: load data before hydration starts.
  window.__SS_DB__ = {};
  var started = false;
  function start() {
    var x = new XMLHttpRequest();
    x.open('GET', '/__offline__/boot.json', true);
    x.onload = function () {
      try {
        var d = JSON.parse(x.responseText);
        window.__SS_API_URLS__ = d.api_urls;
        window.__SS_EXACT__ = d.exact;
        window.__SS_MEDIA_MAP__ = d.media_map;
        window.__SS_HAS_LOCAL__ = d.has_local;
        var files = d.collections;
        var pending = files.length;
        function done() {
          window.__SS_DB_READY__ = true;
          window.dispatchEvent(new Event('ss-db-ready'));
        }
        files.forEach(function (c) {
          var y = new XMLHttpRequest();
          y.open('GET', '/__offline__/data/' + c + '.json', true);
          y.onload = function () { try { window.__SS_DB__[c] = JSON.parse(y.responseText); } catch (e) {} if (--pending === 0) done(); };
          y.onerror = function () { if (--pending === 0) done(); };
          y.send();
        });
      } catch (e) {
        window.__SS_DB_READY__ = true;
      }
    };
    x.onerror = function () { window.__SS_DB_READY__ = true; };
    x.send();
  }
  // The Astro island hydrates on DOMContentLoaded-ish timing; XHR sync in head
  // blocks parsing, guaranteeing our shim + data are installed BEFORE any app
  // script runs. Use a synchronous request for the boot map, then async for data.
  try {
    var x = new XMLHttpRequest();
    x.open('GET', '/__offline__/boot.json', false);  // synchronous — blocks until loaded
    x.send(null);
    var d = JSON.parse(x.responseText);
    window.__SS_API_URLS__ = d.api_urls;
    window.__SS_EXACT__ = d.exact;
    window.__SS_MEDIA_MAP__ = d.media_map;
    window.__SS_HAS_LOCAL__ = d.has_local;
    // data files are small enough to load synchronously too (guarantees order)
    d.collections.forEach(function (c) {
      var y = new XMLHttpRequest();
      y.open('GET', '/__offline__/data/' + c + '.json', false);
      y.send(null);
      try { window.__SS_DB__[c] = JSON.parse(y.responseText); } catch (e) {}
    });
    window.__SS_DB_READY__ = true;
  } catch (e) {
    window.__SS_DB_READY__ = true;
  }
})();
</script>
<script src="/__offline__/offline-shim.js"></script>"""

new_shell = re.sub(r'(<head[^>]*>)', lambda m: m.group(1) + '\n' + boot_head, shell, count=1)
with open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8') as f:
    f.write(new_shell)

# per-route deep-link shells
routes = load('routes.json')['routes']
os.makedirs(os.path.join(ROOT, '__offline__', 'shells'), exist_ok=True)
for r in routes:
    if r == '/': continue
    safe = r.strip('/').replace('/', '_')
    with open(os.path.join(ROOT, '__offline__', 'shells', safe + '.html'), 'w', encoding='utf-8') as f:
        f.write(new_shell)

print('index.html:', len(new_shell), 'bytes')
print('boot.json:', os.path.getsize(os.path.join(ROOT, '__offline__', 'boot.json')), 'bytes')
print('shells:', len(routes) - 1)
