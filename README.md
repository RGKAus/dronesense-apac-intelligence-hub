# DroneSense APAC Intelligence Hub — structural prototype (redesign)

Internal operational knowledge platform for DroneSense by Versaterm. This
pass redesigns the earlier "AU RPAS Intel" prototype into the DroneSense
APAC Intelligence Hub: new IA, new visual identity, and enterprise
knowledge-management fields on every intelligence page. **Content is still
placeholder** — nothing below should be read as researched or verified.

## Information architecture

Left sidebar is country-first. Australia is live and expanded by default
with nine sections; every other APAC and European market is listed
collapsed as "Coming soon" (New Zealand, Singapore, Japan, South Korea,
Malaysia, Indonesia, Thailand, Philippines, Taiwan, Hong Kong, Europe,
United Kingdom — matching the brief's expansion roadmap). US and Canada are
intentionally excluded.

Australia's nine sections, each a hub page plus a reusable template:

| Hub page | Template |
|---|---|
| `index.html` (Dashboard) | — |
| `regulations-hub.html` | `regulation-page-template.html` |
| `public-safety-hub.html` | (uses agency + mission templates) |
| `critical-infrastructure-hub.html` | `critical-infrastructure-template.html` |
| `agencies-hub.html` | `agency-profile-template.html` |
| `uas-ecosystem-hub.html` | `company-profile-template.html` |
| `mission-profiles-hub.html` | `mission-profile-template.html` |
| `technology-hub.html` | `technology-template.html` |
| `regulatory-updates-hub.html` | — |

`assets/app.js` renders the sidebar and topbar from one data source
(`NAV_TREE`) on every page, so adding a market or section later means
editing one file, not fifteen.

## Design system

Direction: operational command console — dark ground, HUD-cyan primary,
public-safety/aviation status colour coding. Entirely original palette and
type; no DroneSense or Versaterm proprietary branding, logos or graphics
are used.

- **Palette**: near-black ink ground (`#0A0F16`), HUD cyan primary
  (`#2FD1D9`), and the same confirmed-green / amber / red / slate status
  system as before, now tuned for dark surfaces.
- **Type**: IBM Plex Sans (headings — technical, not institutional-serif),
  Inter (body), IBM Plex Mono (data: codes, dates, metadata, status chips).
- **Signature element retained and extended**: the confidence-colour tab
  system now also drives the homepage's confidence status overview
  (stacked bar + legend) — a real read of how much of the library is
  verified, not decoration.

## Enterprise knowledge-management structure

Every intelligence page (regulation, agency, company, mission profile,
critical infrastructure sector, technology topic) includes:

- A **metadata bar**: page owner, last reviewed, last verified, confidence
  rating, source count.
- A **related content** block: related pages, regulations, agencies and
  companies (mission/technology templates substitute the most relevant
  four categories).
- A **change history** table and future review date.
- A **standardized footer**: primary sources, supporting references, an
  internal notes placeholder (clearly marked staff-only, not for
  publication), version number, and last updated date.

## Deploying to GitHub Pages

Same static-site workflow as before:

1. Push all files (all `.html` pages plus `assets/`) to a Pages-enabled
   repository root.
2. In **Settings → Pages**, set the source branch and root folder.
3. Site publishes at `https://<username>.github.io/<repo>/`.

No build step required.

## Suggested next step

Structure review, then begin content research — start with CASA/Part 101
and AusSORA (cross-referenced by almost every other section), then
Agencies and UAS Ecosystem in parallel since they cross-link heavily.
