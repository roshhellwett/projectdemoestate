import json, os, base64
from urllib.parse import urlparse, parse_qsl

SRC = os.path.join(os.environ['LOCALAPPDATA'], 'Temp', 'ssrecon')
ROOT = r'A:\projectssproperty'
DD = os.path.join(ROOT, '__data__')

# 1) DB: collection -> [items] (from the merged site_data.json, all fields incl. images refs)
db = json.load(open(os.path.join(DD, 'site_data.json')))

# fix: convert dict-of-items to list, preserving API field order where possible
db_list = {}
for coll, items in db.items():
    lst = list(items.values())
    # stable sort for predictable ordering: by _createdDate then id
    def created(it):
        c = it.get('_createdDate') or {}
        return c.get('$date', '') if isinstance(c, dict) else str(c)
    lst.sort(key=lambda it: (created(it), it.get('_id', '')))
    db_list[coll] = lst

json.dump(db_list, open(os.path.join(DD, 'db.json'), 'w'), indent=1)

# 2) API URL map for misc endpoints (tag-manager, public-config)
plan = json.load(open(os.path.join(SRC, 'fetch_plan.json')))
api_map = {}
for key, rec in plan['api'].items():
    if key.startswith('api:'):
        api_map[rec['url']] = rec['body']
json.dump(api_map, open(os.path.join(DD, 'api_url_map.json'), 'w'), indent=1)

# 3) Media map + HAS_LOCAL index
media_map = json.load(open(os.path.join(DD, 'media_map.json')))
has_local = {}
for local in media_map.values():
    has_local[local.split('/v1/')[0]] = True

# also mark base files that exist on disk (fonts etc.)
for dirpath, dirnames, filenames in os.walk(os.path.join(ROOT, 'media')):
    for fn in filenames:
        rel = os.path.relpath(os.path.join(dirpath, fn), ROOT).replace(os.sep, '/')
        has_local[rel] = True

json.dump(media_map, open(os.path.join(DD, 'media_map.json'), 'w'), indent=1)
json.dump(has_local, open(os.path.join(DD, 'has_local.json'), 'w'), indent=1)

# 4) captured responses keyed by canonical spec b64 (for exact replay)
resp_by_spec = {}
for key, rec in plan['api'].items():
    if key.startswith('q:'):
        b64 = key[2:]
        # store as {b64key: body}
        resp_by_spec[b64] = rec['body']
json.dump(resp_by_spec, open(os.path.join(DD, 'responses_by_spec.json'), 'w'), indent=1)

print('DB collections:', {k: len(v) for k, v in db_list.items()})
print('api url map entries:', len(api_map))
print('media map entries:', len(media_map))
print('exact spec responses:', len(resp_by_spec))
print('has_local entries:', len(has_local))
