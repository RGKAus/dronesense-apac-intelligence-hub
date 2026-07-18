# DroneSense APAC Intelligence Hub

Internal operational knowledge platform for DroneSense by Versaterm. This
is the researcher's primary workspace for RPAS regulation, public safety,
critical infrastructure and UAS ecosystem intelligence — not a marketing
site. Content on intelligence pages is still placeholder; nothing below
should be read as researched or verified. Navigation and visual design
are unchanged from earlier passes.

## Phase 1 — Research Engine (this pass)

Phase 1 deliberately does not populate intelligence content. It builds
the framework that will support thousands of intelligence pages over
time:

| Addition | File(s) | What it does |
|---|---|---|
| Research Toolkit | `research-toolkit-hub.html` | Official government/aviation/public-safety/industry sources, procurement portals, a 6-step research methodology, trade press, and an AI research workflow — the "where to look and how to rate it" reference. |
| Prompt Library | `prompt-library-hub.html` | 30 ready-to-copy AI research prompts across 10 categories (Regulations, Agencies, Public Safety, Critical Infrastructure, Technology, Competitors, Sales Discovery, Customer Research, Procurement, Mission Profiles), with category filter chips and one-click copy. |
| Keyword Library | `keyword-library-hub.html` | Searchable starter set of acronyms/terms with related legislation, organisations and technology, live text search plus category filters. Grows as intelligence pages are added. |
| Search Library | `search-library-hub.html` | Reusable search strings for Google, `site:`, `filetype:`, government sites, procurement portals, academic search and AI prompts, all copyable. |
| Standard Intelligence Template | *(existing — formalised)* | The unified 17-section template (see below) was already built; Phase 1 treats it as the single template every future intelligence page must use, and links every hub/template to the Prompt Library and Keyword Library. |
| My Notebook | `my-notebook.html` | Aggregates every "My Notes" entry saved anywhere on the platform (same `ds-apac-notes:` localStorage prefix) onto one page, so personal research notes never get lost across dozens of pages. |
| Cross-linking | all hub + template files, `assets/app.js` | Every existing hub and template now links to the relevant Prompt Library category and/or Keyword Library; a new "Research Tools" sidebar group (always expanded, sits above the country tree) makes all five tools one click from anywhere; dashboard gained a "Research Tools" quick-nav row. |

New shared behaviours added to `assets/app.js` (no build step, same
vanilla-JS approach as before): copy-to-clipboard for prompt/search
cards, category filter chips for the Prompt and Keyword libraries,
live text search for the Keyword Library, and the notebook aggregator.
All are additive — nothing existing was removed or restructured.

## The unified 17-section template

Every content page — regulation, agency, company, mission profile,
critical infrastructure sector, technology topic — follows this exact
section order (see the on-page table of contents at the top of each
template file):

1. Executive Summary
2. Why this matters
3. Key Facts
4. Operational Context
5. Regulations *(where applicable)*
6. Agencies involved *(where applicable)*
7. Technologies involved
8. Related companies
9. Keywords and Acronyms
10. Search Strings — Google / official websites / AI research prompts
11. Research Questions
12. Official Resources
13. Related Pages
14. My Notes *(editable, saved locally in the researcher's browser only)*
15. Last Verified
16. Confidence Level
17. Sources

The enterprise metadata bar (owner, last reviewed, last verified,
confidence, source count) sits above the 17 sections as a quick-glance
strip; the standardized footer (internal notes, change history, version,
last updated) sits below.

## Files

| File | Represents |
|---|---|
| `regulation-page-template.html` | Regulation pages (CASA, Part 101, MOS, licensing, AusSORA, etc.) |
| `agency-profile-template.html` | Public safety / government agency profiles |
| `company-profile-template.html` | UAS ecosystem company profiles |
| `mission-profile-template.html` | Mission profiles (DFR, SAR, disaster mapping, etc.) |
| `critical-infrastructure-template.html` | Critical infrastructure sector pages |
| `technology-template.html` | Technology / advanced operations topics |
| `research-toolkit-hub.html` | Research Toolkit (Phase 1) |
| `prompt-library-hub.html` | Prompt Library (Phase 1) |
| `keyword-library-hub.html` | Keyword Library (Phase 1) |
| `search-library-hub.html` | Search Library (Phase 1) |
| `my-notebook.html` | My Notebook (Phase 1) |

Hub/landing pages (`index.html`, `*-hub.html`, the five Phase 1 tool
pages) are navigational/reference pages and keep the card/panel/grid
layout rather than the 17-section template, which is reserved for
individual intelligence pages (regulation, agency, company, mission
profile, sector, technology).

## My Notes — how it actually works

Section 14 of the unified template is a real, working feature: a
`<textarea>` wired to the browser's local storage (`assets/app.js`),
keyed per page. Each researcher's notes stay on their own device/browser
and are never sent anywhere or shared with other users. `my-notebook.html`
(Phase 1) reads every saved note across the site and lists them on one
page — still local-only, just aggregated for convenience.

## Design system

Unchanged: dark operational-command theme, HUD-cyan primary, IBM Plex
Sans/Inter/IBM Plex Mono type system, and the confidence-colour-tab
signature element. Phase 1 additions (prompt cards, keyword cards,
search-string cards, the notebook, the Research Tools nav group) reuse
the existing CSS variables and component patterns — no new colours,
fonts, or layout primitives were introduced.

## Deploying to GitHub Pages

Same static-site workflow as before: push all files (all `.html` pages
plus `assets/`) to a Pages-enabled repository root, then set the source in
**Settings → Pages**. No build step required.

## Suggested next phase

Phase 1 is a framework, not content. The recommended Phase 2 is to begin
populating actual intelligence pages using the research engine just
built — starting with CASA/Part 101 and AusSORA (cross-referenced by
almost every other page), then the highest-priority public safety
agencies. See the assistant's phase summary for the full recommendation.


