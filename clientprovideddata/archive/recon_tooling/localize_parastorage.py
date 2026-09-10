import re, os

ROOT = r'A:\projectssproperty'

def localize(src, target):
    s = open(target, encoding='utf-8').read()
    n = [0]
    def repl(m):
        url = m.group(1)
        local = '/parastorage' + url.split('static.parastorage.com')[1]
        n[0] += 1
        return 'src=' + local + ' '
    s2 = re.sub(r'src=(https://static\.parastorage\.com[^\s>]+)', lambda m: 'src=' + '/parastorage' + m.group(1).split('static.parastorage.com')[1] + ' ', s)
    open(target, 'w', encoding='utf-8').write(s2)
    return n[0], len(s), len(s2)

# index + all shells
cnt, a, b = localize(None, os.path.join(ROOT, 'index.html'))
print('index.html: parastorage localized (size', a, '->', b, ')')
shd = os.path.join(ROOT, '__offline__', 'shells')
if os.path.isdir(shd):
    for f in os.listdir(shd):
        cnt, a, b = localize(None, os.path.join(shd, f))
    print('shells: all localized')
# verify
s = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
print('remaining parastorage refs:', len(re.findall(r'src=https?://static\.parastorage', s)))
print('local parastorage refs:', len(re.findall(r'src=/parastorage', s)))
