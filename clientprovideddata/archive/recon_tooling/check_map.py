import json, os
ROOT = r'A:\projectssproperty'
DD = os.path.join(ROOT, '__data__')
mm = json.load(open(os.path.join(DD, 'media_map.json')))
hl = json.load(open(os.path.join(DD, 'has_local.json')))

tests = [
    'https://static.wixstatic.com/media/216404_cdb7bfa69955412eb69f5756fe3d7ee4~mv2.jpg',
    'https://static.wixstatic.com/media/216404_33bdfc3a1e7040b6a18d74d7ffbd5e4d~mv2.png?originWidth=640&originHeight=640',
    'https://static.wixstatic.com/media/216404_33bdfc3a1e7040b6a18d74d7ffbd5e4d~mv2.png',
    'https://static.wixstatic.com/media/216404_f65cc54333d24be5a89bdcee1dc23533~mv2.png',
    'https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png',
]
for t in tests:
    clean = t.split('?')[0]
    base = clean.split('/media/')[1].split('/v1/')[0]
    print('TEST:', t[:100])
    print('  media_map[full]:', mm.get(t, 'MISS')[:80] if t in mm else 'MISS')
    print('  media_map[clean]:', mm.get(clean, 'MISS')[:80] if clean in mm else 'MISS')
    print('  has_local[media/b/base]:', hl.get('media/b/' + base, 'MISS'))
    print('  file exists:', os.path.exists(os.path.join(ROOT, 'media', 'b', base)))
    print()
print('media_map total:', len(mm), '| has_local total:', len(hl))
# boot.json parity
boot = json.load(open(os.path.join(ROOT, '__offline__', 'boot.json')))
print('boot media_map:', len(boot['media_map']), '| boot has_local:', len(boot['has_local']))
print('boot has 33bdfc3a base:', 'media/b/216404_33bdfc3a1e7040b6a18d74d7ffbd5e4d~mv2.png' in boot['has_local'])
