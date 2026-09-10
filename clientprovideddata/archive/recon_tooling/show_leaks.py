import json, glob, os
# find the newest strict verify report
cands = sorted(glob.glob('ss_verify_strict/verify_report.json') + glob.glob('ss_verify*/verify_report.json'), key=os.path.getmtime)
rep = json.load(open(cands[-1]))
print('report:', cands[-1])
for p in rep:
    print(f"\n{p['route']}  nonLocalReqs listed: {len(p.get('nonLocalReqs', []))}")
    for u in p.get('nonLocalReqs', []):
        print('   ', u)
    for c in p.get('console', [])[:6]:
        print('   console:', c[:180])
