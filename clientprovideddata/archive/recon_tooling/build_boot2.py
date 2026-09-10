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

api_urls = {u: {'status': 200, 'body': b} for u, b in api_map.items()}
# members/my returns 403 on live too — capture that faithfully
api_urls['https://edge.wixapis.com/members/v1/members/my'] = {
    'status': 403,
    'body': '{"message":"Authorization header is malformed or missing","details":{},"errorCode":"WDE-1002"}'
}

os.makedirs(os.path.join(ROOT, '__offline__', 'data'), exist_ok=True)
for coll, items in db.items():
    with open(os.path.join(ROOT, '__offline__', 'data', coll + '.json'), 'w', encoding='utf-8') as f:
        json.dump(items, f, separators=(',', ':'))

# pristine shell (server-sent) + boot
shell = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
# if this is already a booted shell (from a previous build), strip the old boot
shell = re.split(r'<script>\s*\n?window\.__SS_DB__', shell)[0] if '__SS_DB__' in shell else shell
# clean fallback: if stripping broke it, use pristine copy from Temp
if len(shell) < 5000 or '</html>' not in shell:
    shell = open(os.path.join(os.environ['LOCALAPPDATA'], 'Temp', 'ss_home.html'), encoding='utf-8').read()

boot_head = """<script>
window.__SS_DB__ = {};
window.__SS_API_URLS__ = """ + json.dumps(api_urls, separators=(',', ':')) + """;
window.__SS_EXACT__ = """ + json.dumps(exact, separators=(',', ':')) + """;
window.__SS_MEDIA_MAP__ = """ + json.dumps(media_map, separators=(',', ':')) + """;
window.__SS_HAS_LOCAL__ = """ + json.dumps(has_local, separators=(',', ':')) + """;
</script>
<script>
(function () {
  var files = """ + json.dumps(list(db.keys()), separators=(',', ':')) + """;
  var pending = files.length;
  function done() {
    window.__SS_DB_READY__ = true;
    window.dispatchEvent(new Event('ss-db-ready'));
  }
  files.forEach(function (c) {
    var x = new XMLHttpRequest();
    x.open('GET', '/__offline__/data/' + c + '.json', true);
    x.onload = function () { try { window.__SS_DB__[c] = JSON.parse(x.responseText); } catch (e) {} if (--pending === 0) done(); };
    x.onerror = function () { if (--pending === 0) done(); };
    x.send();
  });
})();
</script>
<script src="/__offline__/offline-shim.js"></script>"""

new_shell = re.sub(r'(<head[^>]*>)', lambda m: m.group(1) + '\n' + boot_head, shell, count=1)
with open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8') as f:
    f.write(new_shell)

# per-route deep-link shells
routes = load('routes.json')['routes']
for r in routes:
    if r == '/': continue
    safe = r.strip('/').replace('/', '_')
    with open(os.path.join(ROOT, '__offline__', 'shells', safe + '.html'), 'w', encoding='utf-8') as f:
        f.write(new_shell)

print('index.html:', len(new_shell), 'bytes')
print('shells:', len(routes) - 1)
