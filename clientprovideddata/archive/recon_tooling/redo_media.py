import os, shutil, subprocess, sys
ROOT = r'A:\projectssproperty'
SRC = os.path.join(os.environ['LOCALAPPDATA'], 'Temp', 'ssrecon')

# 1) wipe old media layout (dir/file collisions)
md = os.path.join(ROOT, 'media')
if os.path.isdir(md):
    shutil.rmtree(md)
print('old media removed')

# 2) rebuild plan + fetch
for script in ('rebuild_plan.py', 'fetch_media.py'):
    r = subprocess.run([sys.executable, os.path.join(SRC, script)], capture_output=True, text=True, cwd=SRC)
    print(f'--- {script} rc={r.returncode} ---')
    print(r.stdout[-1500:])
    if r.stderr:
        print('STDERR:', r.stderr[-500:])
