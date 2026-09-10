#!/usr/bin/env python3
"""One-off cleanup: delete tilde-named variant files no longer referenced.

The first migration run produced '216404_xxx~mv2.webp' filenames, which
Supabase Storage rejects ('~' is invalid in keys). The pipeline now
normalizes names; this script removes the stale tilde files from
public/media so no dead weight ships or re-uploads.

Run:  python scripts/remove_tilde_variants.py
"""

from pathlib import Path

MEDIA = Path(__file__).resolve().parent / "variants"

def main():
    removed = 0
    for sub in ("full", "thumb"):
        d = MEDIA / sub
        if not d.is_dir():
            continue
        for f in d.iterdir():
            if "~" in f.name:
                f.unlink()
                removed += 1
    print(f"removed {removed} stale tilde-named files")
    for sub in ("full", "thumb"):
        d = MEDIA / sub
        n = len(list(d.glob("*"))) if d.is_dir() else 0
        print(f"{sub}: {n} files")

if __name__ == "__main__":
    main()
