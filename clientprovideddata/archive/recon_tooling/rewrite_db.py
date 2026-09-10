import json, os

ROOT = r'A:\projectssproperty'
DD = os.path.join(ROOT, '__data__')
media_map = json.load(open(os.path.join(DD, 'media_map.json')))

# exact-match rewrite of DB string fields -> local absolute paths
def rewrite_str(s):
    if 'wixstatic.com/media/' not in s:
        return s
    # exact
    if s in media_map:
        return '/' + media_map[s]
    clean = s.split('#')[0]
    if clean in media_map:
        return '/' + media_map[clean]
    # ?originWidth form: base + query -> base local
    if '?' in s:
        base = s.split('?')[0]
        if base in media_map:
            return '/' + media_map[base]
    return s  # leave online (uncaptured; e.g. gallery data URIs stay as-is)

db = json.load(open(os.path.join(DD, 'db.json')))
def walk(o):
    if isinstance(o, dict):
        return {k: walk(v) for k, v in o.items()}
    if isinstance(o, list):
        return [walk(v) for v in o]
    if isinstance(o, str):
        return rewrite_str(o)
    return o

db2 = walk(db)

# count rewrites
def count_local(o):
    if isinstance(o, dict): return sum(count_local(v) for v in o.values())
    if isinstance(o, list): return sum(count_local(v) for v in o)
    if isinstance(o, str): return 1 if o.startswith('/media/') else 0
    return 0
print('strings rewritten to local:', count_local(db2))

with open(os.path.join(ROOT, '__offline__', 'data', 'db.json'), 'w', encoding='utf-8') as f:
    json.dump(db2, f, separators=(',', ':'))

# per-collection files (shim loads these)
for coll, items in db2.items():
    with open(os.path.join(ROOT, '__offline__', 'data', coll + '.json'), 'w', encoding='utf-8') as f:
        json.dump(items, f, separators=(',', ':'))
print('collections written:', list(db2.keys()))
