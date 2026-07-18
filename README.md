# DroneSense APAC Intelligence Hub — structural prototype (unified template)

Internal operational knowledge platform for DroneSense by Versaterm. This
pass replaces the differentiated per-type templates with **one identical
17-section template** used by every content page on the platform. Content
is still placeholder — nothing below should be read as researched or
verified. Navigation and visual design from the previous pass are
unchanged.

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
last updated) sits below. Both carry over from the previous pass.

## Files

| File | Represents |
|---|---|
| `regulation-page-template.html` | Regulation pages (CASA, Part 101, MOS, licensing, AusSORA, etc.) |
| `agency-profile-template.html` | Public safety / government agency profiles |
| `company-profile-template.html` | UAS ecosystem company profiles |
| `mission-profile-template.html` | Mission profiles (DFR, SAR, disaster mapping, etc.) |
| `critical-infrastructure-template.html` | Critical infrastructure sector pages |
| `technology-template.html` | Technology / advanced operations topics |

All six were generated from one shared section skeleton
(`/home/claude/build/gen_templates.py` if you need to regenerate or add a
seventh page type) so the structure cannot drift between page types —
only the domain-specific placeholder labels differ.

Hub/landing pages (`index.html`, `*-hub.html`) are navigational index
pages, not content pages, and keep their existing card/grid layout rather
than the 17-section template.

## My Notes — how it actually works

Section 14 is a real, working feature, not just a placeholder box: it's a
`<textarea>` wired to the browser's local storage (`assets/app.js`),
keyed per page. Each researcher's notes stay on their own device/browser
and are never sent anywhere or shared with other users — it's a
scratchpad while researching, separate from the "Internal notes" field in
the standardized footer (which is meant for the page owner/team, not an
individual's working notes).

## Design system

Unchanged from the previous pass: dark operational-command theme, HUD-cyan
primary, IBM Plex Sans/Inter/IBM Plex Mono type system, and the
confidence-colour-tab signature element — now also driving the new Key
Facts and Confidence Level sections.

## Deploying to GitHub Pages

Same static-site workflow as before: push all files (all `.html` pages
plus `assets/`) to a Pages-enabled repository root, then set the source in
**Settings → Pages**. No build step required.

## Suggested next step

Structure review, then begin content research — start with CASA/Part 101
and AusSORA, since they're cross-referenced by almost every other page.

