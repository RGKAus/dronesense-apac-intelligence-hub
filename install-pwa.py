#!/usr/bin/env python3
"""Inject the DS Intelligence Hub PWA tags into every HTML page in a repository."""

from pathlib import Path
import re
import shutil
import sys

SOURCE_DIR = Path(__file__).resolve().parent
TARGET_DIR = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path.cwd().resolve()

HEAD = """  <link rel="manifest" href="./manifest.webmanifest">
  <meta name="theme-color" content="#071824">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="DS Intel">
  <meta name="mobile-web-app-capable" content="yes">
  <link rel="apple-touch-icon" href="./icons/icon-180.png">
"""
BODY = '  <script src="./assets/pwa.js" defer></script>\n'

for name in ("manifest.webmanifest", "service-worker.js", "offline.html"):
    shutil.copy2(SOURCE_DIR / name, TARGET_DIR / name)

for folder in ("icons",):
    shutil.copytree(SOURCE_DIR / folder, TARGET_DIR / folder, dirs_exist_ok=True)

(TARGET_DIR / "assets").mkdir(exist_ok=True)
shutil.copy2(SOURCE_DIR / "assets" / "pwa.js", TARGET_DIR / "assets" / "pwa.js")

updated = 0
for page in TARGET_DIR.rglob("*.html"):
    if page.name == "offline.html" or ".git" in page.parts:
        continue
    text = page.read_text(encoding="utf-8")
    original = text
    if 'rel="manifest"' not in text:
        text = re.sub(r"</head>", HEAD + "</head>", text, count=1, flags=re.I)
    if "assets/pwa.js" not in text:
        text = re.sub(r"</body>", BODY + "</body>", text, count=1, flags=re.I)
    if text != original:
        page.write_text(text, encoding="utf-8")
        updated += 1

print(f"PWA files installed. Updated {updated} HTML page(s) in {TARGET_DIR}")
