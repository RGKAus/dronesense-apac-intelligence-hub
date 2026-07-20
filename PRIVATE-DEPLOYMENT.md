# Private deployment and sign-in

This package contains private commercial information, including partner contacts. Do not deploy it to public GitHub Pages.

## Recommended deployment

1. Make the GitHub repository private.
2. Connect the repository to Cloudflare Pages.
3. Add the Pages hostname or custom domain as a Cloudflare Access self-hosted application.
4. Configure Microsoft Entra ID or one-time PIN authentication.
5. Create an Access policy allowing only named users or the approved Versaterm domain.
6. Set an 8-hour session duration.
7. Test access in a private browser window before disabling the old public GitHub Pages site.

Cloudflare Access provides the real sign-in boundary. A login form inside static HTML does not protect files.

## Live intelligence

The interface reads `assets/intelligence-data.json`. For continuous updates, use a scheduled backend job to ingest approved RSS feeds, regulator pages, procurement APIs/feeds and licensed social-media sources, then overwrite this JSON or serve an authenticated API. Do not scrape LinkedIn in breach of its terms.
