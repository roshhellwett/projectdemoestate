import json, glob, base64, re
from urllib.parse import urlparse, parse_qsl, unquote

# Decode the .r= base64 request specs on items/query calls and pair with responses
pairs = []
for f in glob.glob('ss_details1/req_*.json') + glob.glob('ss_capture/req_*.json'):
    for r in json.load(open(f, encoding='utf-8')):
        if 'items/query' not in r['url'] or not r.get('body'):
            continue
        u = urlparse(r['url'])
        qs = dict(parse_qsl(u.query))
        spec_b64 = qs.get('.r', '')
        spec = None
        if spec_b64:
            pad = spec_b64 + '=' * (-len(spec_b64) % 4)
            try: spec = json.loads(base64.urlsafe_b64decode(pad))
            except Exception as e: spec = f'DECODE-ERR {e}'
        pairs.append({
            'file': f, 'route': re.search(r'req_(.*).json', f).group(1),
            'method': r['method'], 'spec': spec,
            'postData': (r.get('postData') or '')[:400],
            'status': r['status'],
            'bodyLen': len(r.get('body') or ''),
            'body': r['body'],
        })

print('total items/query calls with bodies:', len(pairs))
seen_specs = {}
for p in pairs:
    key = json.dumps(p['spec'], sort_keys=True) if isinstance(p['spec'], (dict, list)) else str(p['spec'])
    if key in seen_specs: continue
    seen_specs[key] = p

print('unique query specs:', len(seen_specs))
for i, (k, p) in enumerate(seen_specs.items()):
    print(f"\n--- spec #{i} (from {p['route']}, body {p['bodyLen']}B) ---")
    print('SPEC:', json.dumps(p['spec'], indent=1)[:600])
    if p['postData']:
        print('POSTDATA:', p['postData'][:300])

json.dump([{k2: p[k2] for k2 in ('route','spec','postData','status','bodyLen')} for p in seen_specs.values()],
          open('api_specs.json','w'), indent=1)
