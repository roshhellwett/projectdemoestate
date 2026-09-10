import json, glob, hashlib, os

# Build the FINAL fetch plan from every capture:
# 1) media URLs (wixstatic, incl. /v1/fill/ variants) with exact full URLs
# 2) API responses keyed for the local shim (edge.wixapis.com items/query + wixapis endpoints)
# 3) all shell/bundle refs (relative /_astro/..., favicon, sw.js)

media = {}       # full URL -> {path: local rel path}
api_responses = {}  # key -> {url, status, mime, body}
assets = {}      # relative path -> source URL (same-origin)

for f in glob.glob('ss_capture/req_*.json') + glob.glob('ss_details1/req_*.json') + glob.glob('ss_details2/req_*.json') + glob.glob('ss_main2/req_*.json'):
    for r in json.load(open(f, encoding='utf-8')):
        u = r['url']
        if r.get('failed') and not r.get('body'):  continue
        if 'frog.wix.com' in u: continue
        if 'static.wixstatic.com' in u:
            if u not in media:
                media[u] = {'status': r.get('status'), 'mime': r.get('mime')}
        elif 'items/query' in u:
            # key by the decoded spec -> store first body found
            key = 'q:' + r['url'].split('?.r=')[1] if '.r=' in r['url'] else 'q:nospec'
            if key not in api_responses and r.get('body'):
                api_responses[key] = {'url': u, 'status': r.get('status'), 'body': r['body']}
        elif 'wixapis.com' in u:
            key = 'api:' + u.split('?')[0].replace('https://','').replace('/','-')
            if key not in api_responses and r.get('body'):
                api_responses[key] = {'url': u, 'status': r.get('status'), 'body': r['body']}
        elif u.startswith('https://www.ssproperty.in/'):
            from urllib.parse import urlparse
            p = urlparse(u).path
            if p and p != '/':
                assets.setdefault(p, u)

# bundle/CSS files from local recon too (already same set)
print('MEDIA URLs:', len(media))
print('API responses:', len(api_responses))
print('SAME-ORIGIN assets:', len(assets))
for p in sorted(assets): print('  asset', p)

json.dump({'media': media, 'api': api_responses, 'assets': assets},
          open('fetch_plan.json', 'w'), indent=1)
sizes = [m for m in media]
print('\nsample media variants:')
for u in list(media)[:5]: print(' ', u[:140])
