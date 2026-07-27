# Version 8C — Progressive Web App

This package turns the Intelligence Hub into an installable phone app while keeping GitHub Pages as the host.

## What is included

- `manifest.webmanifest`
- `service-worker.js`
- `offline.html`
- `assets/pwa.js`
- iPhone, Android and maskable app icons
- PWA tags already added to `updates.html`
- `install-pwa.py`, which can add the PWA tags to every HTML page in the full repository

## Safest way to add it to the complete repository

1. Back up the GitHub repository folder.
2. Copy everything in this package into the repository folder.
3. In Finder, choose **Merge** for folders and **Replace** for matching v8B files.
4. Open Terminal in the repository folder.
5. Run:

   `python3 install-pwa.py .`

6. Commit and push the changes.
7. Wait for GitHub Pages to redeploy.

## Install on iPhone

1. Open the live site in Safari.
2. Tap Share.
3. Tap **Add to Home Screen**.
4. Enable **Open as Web App** if shown.
5. Tap Add.

## Offline behaviour

- Previously visited pages and static assets can reopen offline.
- The latest successfully loaded intelligence JSON is used when the network is unavailable.
- When connected, intelligence data is requested from the network first so the feed does not become permanently stale.

## Important GitHub Pages note

The manifest, links and service worker use relative paths so the app can work under a repository subpath such as:

`https://username.github.io/repository-name/`

## Testing

After deployment:

- Open browser developer tools and confirm the service worker is registered.
- Check that `manifest.webmanifest` loads without a 404.
- Refresh the site once before testing offline.
- On iPhone, installation must be initiated through Safari's Share menu.

## Commit summary

`v8C: Convert the Intelligence Hub into an installable PWA with app icons, offline support and GitHub Pages-compatible service worker caching.`
