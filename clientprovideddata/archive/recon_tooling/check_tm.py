import json, os
SRC = os.path.join(os.environ['LOCALAPPDATA'], 'Temp', 'ssrecon')
ROOT = r'A:\projectssproperty'
api = json.load(open(os.path.join(ROOT, '__data__', 'api_url_map.json')))
for u in api:
    print('CAPTURED:', u)
    print()
# find the tag-manager request URL the browser actually made (from diag2 run if saved)
import glob
for f in glob.glob(os.path.join(SRC, 'ss_main2', 'req_*.json')):
    for r in json.load(open(f, encoding='utf-8')):
        if 'tag-manager' in r['url']:
            print('LIVE REQ :', r['url'][:200])
            print('  method:', r['method'], '| headers keys:', list((r.get('requestHeaders') or {}).keys())[:8])
            break
