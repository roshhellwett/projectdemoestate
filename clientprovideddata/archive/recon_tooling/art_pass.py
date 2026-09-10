# Programmatic art-direction pass over candidate hero/cover images.
from PIL import Image
import os, glob, json

ROOT = r'A:\projectssproperty\media\b'

def analyze(path):
    im = Image.open(path).convert('RGB')
    w, h = im.size
    small = im.copy(); small.thumbnail((80, 80))
    px = list(small.getdata())
    n = len(px)
    avg = tuple(sum(c[i] for c in px)//n for i in range(3))
    # luminance
    lum = 0.299*avg[0] + 0.587*avg[1] + 0.114*avg[2]
    # palette: quantize to 5 colors
    q = small.quantize(colors=5)
    pal = [(tuple(q.getpalette()[i*3:i*3+3])) for i in range(5)]
    # contrast variance (detail)
    import statistics
    lums = [0.299*c[0]+0.587*c[1]+0.114*c[2] for c in px]
    return {
        'file': os.path.basename(path), 'w': w, 'h': h, 'ar': round(w/h, 2),
        'avg': avg, 'lum': round(lum), 'detail': round(statistics.pstdev(lums)),
        'palette': pal,
    }

# candidates: big files = hero-quality, plus blog covers and reel covers
files = []
for f in sorted(glob.glob(os.path.join(ROOT, '*'))):
    sz = os.path.getsize(f)
    if sz > 900_000:  # hero candidates
        files.append(f)

print(f'analyzing {len(files)} hero candidates\n')
rows = [analyze(f) for f in files]
rows.sort(key=lambda r: (-r['w'], -r['detail']))
for r in rows:
    avg = '#%02X%02X%02X' % r['avg']
    print(f"{r['file'][:46]:46} {r['w']}x{r['h']} ar:{r['ar']:5} lum:{r['lum']:3} detail:{r['detail']:5} avg:{avg}")

# blog covers + reel covers quality check
print('\nblog/reel covers (480-1300KB):')
covers = [f for f in glob.glob(os.path.join(ROOT, '*')) if 480_000 < os.path.getsize(f) < 1_300_000]
for f in covers[:14]:
    r = analyze(f)
    avg = '#%02X%02X%02X' % r['avg']
    print(f"{r['file'][:46]:46} {r['w']}x{r['h']} lum:{r['lum']:3} detail:{r['detail']:5} avg:{avg}")

json.dump(rows, open(r'C:\Users\roshh\AppData\Local\Temp\ssrecon\hero_analysis.json', 'w'), indent=1)
