import json, os

ROOT = r'A:\projectssproperty'
D = lambda c: json.load(open(os.path.join(ROOT, '__offline__', 'data', c + '.json'), encoding='utf-8'))

props = D('properties')
imgs = D('propertyimages')
vids = D('propertyvideos')
reels = D('featuredreels')
blogs = D('blogposts')
tests = D('testimonials')
faqs = D('faq')

print('== property sample (all fields of one) ==')
p = props[0]
for k, v in p.items():
    s = str(v)
    print(f'  {k}: {s[:100]}')

print('\n== which props have which media ==')
byp = {}
for im in imgs:
    byp.setdefault(im.get('propertyId'), []).append(im)
for p in props[:30]:
    pid = p.get('propertyId')
    n = len(byp.get(pid, []))
    m = p.get('mainImage')
    print(f"  {p.get('propertyId','?'):8} imgs:{n:3} mainImage:{'Y' if m else '-'} price:{p.get('price')} loc:{(p.get('location') or '')[:30]}")

print('\n== reels ==')
for r in reels:
    print('  ', r.get('displayOrder'), (r.get('title') or '')[:40], '|', (r.get('coverImage') or '')[:80])

print('\n== videos ==')
for v in vids:
    print('  ', (v.get('propertyId') or '')[:12], (v.get('location') or '')[:24], (v.get('embedUrl') or '')[:60], '| thumb:', (v.get('thumbnailImage') or '')[:60])

print('\n== blogs ==')
for b in blogs:
    print('  ', (b.get('title') or '')[:60], '| pub:', b.get('publishDate'), '| cover:', str(b.get('coverImage'))[:70])

print('\n== testimonials ==')
for t in tests:
    print('  ', t.get('clientName'), '|', t.get('rating'), '|', (t.get('reviewText') or '')[:60], '| photo:', str(t.get('clientPhoto'))[:60])

print('\n== faqs ==')
for f in faqs:
    print('  ', (f.get('question') or '')[:70])

print('\n== image item sample ==')
im = imgs[0]
for k, v in im.items():
    s = str(v)
    print(f'  {k}: {s[:80]}')

print('\n== imageData types across propertyimages ==')
types = {}
for im in imgs:
    iv = im.get('imageData')
    t = 'dataURI' if isinstance(iv, str) and iv.startswith('data:') else ('url' if isinstance(iv, str) and iv.startswith('/') else str(type(iv)))
    types[t] = types.get(t, 0) + 1
print('  ', types)

print('\n== hero candidates: properties with big local base images ==')
import glob
big = []
for f in glob.glob(os.path.join(ROOT, 'media', 'b', '*')):
    sz = os.path.getsize(f)
    big.append((sz, os.path.basename(f)))
big.sort(reverse=True)
for sz, name in big[:8]:
    print(f'  {sz/1024:.0f}KB {name}')
