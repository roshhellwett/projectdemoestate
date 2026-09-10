import json, os
SRC = os.path.join(os.environ['LOCALAPPDATA'], 'Temp', 'ssrecon')
for u in json.load(open(os.path.join(SRC, 'download_urls.json'))):
    print(u)
