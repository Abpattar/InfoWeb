#!/usr/bin/env python3
"""Validate InfoWeb HTML pages for broken local links, metadata, and image alt attributes."""

import glob
import os
import re
import sys

errors = []
html_files = sorted(glob.glob("*.html"))
if not html_files:
    print("No HTML files found.")
    sys.exit(1)

for fname in html_files:
    with open(fname, encoding="utf-8") as fh:
        txt = fh.read()
    if "<title>" not in txt or "</title>" not in txt:
        errors.append(f"{fname}: missing <title>")
    if 'name="description"' not in txt:
        errors.append(f"{fname}: missing meta description")
    for m in re.finditer(r'(?:href|src)="([^"]+)"', txt):
        target = m.group(1)
        if target.startswith(("http://", "https://", "mailto:", "tel:", "#")):
            continue
        clean = target.split("#")[0].split("?")[0]
        if clean and not os.path.exists(clean):
            errors.append(f"{fname}: broken local reference '{target}'")
    for img in re.findall(r"<img\b[^>]*>", txt):
        if "alt=" not in img:
            errors.append(f"{fname}: <img> missing alt attribute")

if errors:
    for err in errors:
        print("ERROR:", err)
    sys.exit(1)

print(f"Validated {len(html_files)} HTML files with 0 errors.")
