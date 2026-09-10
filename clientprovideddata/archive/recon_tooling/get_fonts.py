import os, re, requests, shutil

SRC = r'C:\Users\roshh\AppData\Local\Temp\ssrecon'
APP = r'A:\projectssproperty\app'
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'}

fdir = os.path.join(APP, 'assets', 'fonts')
os.makedirs(fdir, exist_ok=True)

css = open(os.path.join(SRC, 'fraunces.css'), encoding='utf-8').read()

# download each woff2 + rewrite CSS to local paths
urls = sorted(set(re.findall(r'url\((https://fonts\.gstatic\.com/[^)]+\.woff2)\)', css)))
print('font files:', len(urls))
names = {}
for i, u in enumerate(urls):
    # identify subset + style from unicode-range order; simpler: sequential naming with mapping recorded
    r = requests.get(u, headers=UA, timeout=60)
    r.raise_for_status()
    fname = 'fraunces-' + u.split('/')[-1][:24].replace('_','-') + '.woff2'
    # ensure unique
    base, ext = os.path.splitext(fname)
    j = 2
    while os.path.exists(os.path.join(fdir, fname)):
        fname = f"{base}-{j}{ext}"; j += 1
    with open(os.path.join(fdir, fname), 'wb') as f:
        f.write(r.content)
    names[u] = fname
    print(' ', fname, len(r.content)//1024, 'KB')

css_local = css
for u, fname in names.items():
    css_local = css_local.replace(u, 'fonts/' + fname)

# strip comments/google fonts header lines, keep only @font-face rules
faces = re.findall(r'/\* [^*]+\*/\s*(@font-face\{[^}]+\})', css_local)
if not faces:
    faces = re.findall(r'(@font-face\{[^}]+\})', css_local)
with open(os.path.join(fdir, 'fraunces.css'), 'w', encoding='utf-8') as f:
    f.write('\n'.join(faces))
print('fraunces.css faces:', len(faces))
