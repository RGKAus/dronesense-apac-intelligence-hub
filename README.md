# DroneSense — Australian Public Safety & RPAS Intelligence Platform

## Version 2.3 — Australian Agency Intelligence Population (Release 2)

15 real, sourced agency profiles published, replacing matching placeholder
rows in the Agency Directory. Every profile uses the full 17-section
`agency-profile-template.html` structure with real Key Facts, sourced
Executive Summary/Operational Context prose, and dated Sources.

**Federal (7 new profiles + CASA, already live from Release 1):**

| Agency | File | RPAS capability | Confidence |
|---|---|---|---|
| Australian Federal Police | `agency-afp.html` | Not publicly confirmed | Partially verified |
| Australian Border Force | `agency-abf.html` | Confirmed (maritime surveillance, NT/WA) | Confirmed |
| Australian Maritime Safety Authority | `agency-amsa.html` | N/A — SAR coordinator, crewed jets | Confirmed |
| National Emergency Management Agency | `agency-nema.html` | N/A — coordination agency | Confirmed |
| Airservices Australia | `agency-airservices.html` | N/A — ANSP | Confirmed |
| Australian Transport Safety Bureau | `agency-atsb.html` | N/A — investigator | Confirmed |
| Department of Home Affairs | `agency-homeaffairs.html` | N/A — portfolio department | Confirmed |

**State & territory police (8 of 8 jurisdictions):**

| Force | File | RPAS capability | Confidence |
|---|---|---|---|
| NSW Police Force | `agency-police-nsw.html` | Confirmed (PolAir-Remote drone-in-a-box) | Confirmed |
| Victoria Police | `agency-police-vic.html` | Confirmed (140+ pilots, 130+ drones) | Confirmed |
| Queensland Police Service | `agency-police-qld.html` | Confirmed (Townsville/Cairns trial) | Confirmed |
| WA Police Force | `agency-police-wa.html` | Confirmed (negotiated Dec 2025 national BVLOS exemption) | Confirmed |
| SA Police (SAPOL) | `agency-police-sa.html` | Highly likely (best source dated 2013) | Highly likely |
| Tasmania Police | `agency-police-tas.html` | Confirmed (road-policing use case) | Confirmed |
| ACT Policing | `agency-police-act.html` | Not publicly confirmed | Unverified |
| NT Police Force | `agency-police-nt.html` | Not publicly confirmed | Unverified |

**Notable finding:** WA Police negotiated a CASA regulatory exemption in
December 2025, on behalf of Australian law enforcement generally, allowing
police drones to operate BVLOS and over populous areas — a nationally
significant regulatory development directly relevant to every other state
police force on this platform. Flagged for follow-up on the BVLOS &
AusSORA regulation page and Regulatory Alert Tracker.

**What's honest about this release:** ACT Policing and NT Police are
published as genuinely "Unverified" — no dedicated RPAS source was found
for either despite dedicated search passes, and this is stated plainly
rather than inferred from other jurisdictions or from the (separately
confirmed, but unrelated) ABF drone activity in the Northern Territory.
SAPOL is rated "Highly likely" rather than "Confirmed" specifically
because the only dateable primary source found was from 2013 — this is
flagged as an open Research Question rather than presented as current.
No agency names, RPAS platforms, fleet sizes, or capabilities were
invented; every claim traces to a cited, dated source.

**Directory changes:** `agencies-hub.html` grew from 24 to 34 rows (the
single "State/Territory Police" and "Federal law enforcement" placeholder
rows were expanded into 9 individually-linked real rows; AMSA, ATSB and
Department of Home Affairs added as new rows). CASA and Airservices rows
now link to their real profile pages instead of the Research Toolkit
anchor. Search, sort and all four filters (State/Territory, Sector, Org
type, RPAS capability) continue to work against the expanded table with
no JS changes required to the filter logic itself — only `assets/app.js`'s
`SEARCH_INDEX` (global search) and `PAGE_LABELS` (My Notebook) were
updated to point at real pages.

**Not yet in this release, still placeholder:** Fire & Rescue, Rural
Fire, Ambulance, SES, Search & Rescue (Marine Rescue/Surf Life Saving —
distinct from the now-populated AMSA), Local Government, Defence, and
all Critical Infrastructure sector rows (Energy, Utilities, Mining, Oil
& Gas, Ports, Rail, Telecommunications, Water) — 17 of 34 Agency
Directory rows remain unresearched placeholders. Recommended next
release: Fire & Rescue and SES across all 8 jurisdictions, since these
are consistently the most bushfire/flood-relevant public safety agencies
and were the most-requested category after police.

**Files changed:** `agencies-hub.html` (rows replaced/added), 15 new
agency profile files, `assets/app.js` (`SEARCH_INDEX` and `PAGE_LABELS`
updated). No other files touched — `public-safety-hub.html`,
`critical-infrastructure-hub.html` and all other hubs are unchanged in
this release and still reference the placeholder template.

---

## Version 2.2 — Regulatory Core (Release 1 content)

First real, sourced content published from the unified template. Five new
pages, all built on `regulation-page-template.html`, all 17 sections
populated, all sourced from casa.gov.au (primary) with dated verification:

| Page | File | Confidence |
|---|---|---|
| CASA (regulator) | `regulation-casa.html` | Confirmed |
| CASR Part 101 | `regulation-part-101.html` | Confirmed |
| Remote Pilot Licence (RePL) | `regulation-repl.html` | Confirmed |
| RPA Operator's Certificate (ReOC) | `regulation-reoc.html` | Confirmed |
| BVLOS & AusSORA | `regulation-aussora.html` | Confirmed |

**Why these five:** they're the regulatory spine every other page on the
platform (agencies, missions, technology, critical infrastructure) already
cross-links to. Populating them first means every future agency/mission
profile page has somewhere real to point.

**Notably current:** AusSORA (Advisory Circular 101-06) only took effect
11 May 2026, replacing the previous TMI 2024-03 ground-risk rules — this is
flagged as the platform's highest rate-of-change regulation page and has
been added to both the Regulatory Alert Tracker and the Intelligence
Watch List.

**What's honest about this release:** every "Confirmed" rating reflects an
actual primary-source citation with an access date (20 Jul 2026), not a
default. Where a specific fact (fee schedules, active licence-holder
counts, which agencies currently hold a ReOC) couldn't be pinned to a
stable, dateable source in this pass, it's listed under "Research
Questions" on the relevant page rather than stated as fact. No agency
names, dates, or figures were invented.

**Files changed:** `regulations-hub.html` (quick-reference table and
relevant card grids now link to real pages), `assets/app.js` (search
index updated), `regulatory-updates-hub.html` and `intelligence-hub.html`
(AusSORA watch-list alert added). All other pages unchanged.

**Not yet in this release:** the remaining 14 regulation topics (Manual
of Standards, AROC, EVLOS, drone registration, airspace/NOTAM topics,
etc.) and all 24 agency profiles remain structural placeholders — Agency
Directory research is the recommended next release (Release 2), since
CASA's public ReOC holder register (referenced from the ReOC page above)
is the key primary source for confirming which agencies hold in-house
RPAS capability.

---

## Version 2.1 — Agency Directory Expansion

The Agency Directory (`agencies-hub.html`) is now a single sortable,
filterable, searchable table covering all 20 requested sectors —
Police, Fire & Rescue, SES, Emergency Management, Ambulance, Search &
Rescue, Border Force, Defence, Civil Aviation, Air Navigation, Local
Government, Critical Infrastructure, Energy, Utilities, Mining, Oil &
Gas, Ports, Rail, Telecommunications, Water — 24 rows total, replacing
the previous 9-entry card grid.

**What's real vs. what's not:** every row is an honest, generic
placeholder (`[Placeholder] …`, "Unverified" chips, blank fields where
unknown) — no specific named agency was invented for this pass. The two
exceptions are CASA and Airservices Australia, marked "Confirmed"
because they're already independently verified elsewhere on the
platform (Research Toolkit → Official Sources), with real links.
Individual agency research — actual names, RPAS capability, contacts —
is the next milestone, using the `agency-profile-template.html` full
record (now expanded to a 9-field Key Facts set + Notes, matching the
directory's field list from the spec).

**Search & filtering:** free-text search across every column, plus four
combinable filters (State/Territory, Sector, Organisation Type, RPAS
capability), plus an A→Z / Z→A sort toggle on the Agency column.
Overview page's existing `?type=Police` style deep links still work —
matching is now case-insensitive against the Sector filter.

**Files changed:** `agencies-hub.html` (full rebuild), `assets/app.js`
(filter/search/sort logic rebuilt for the table), `agency-profile-template.html`
(Key Facts expanded to 9 fields + Notes). No other pages touched.

---

# Prior release notes

## Version 2.0 — Information Architecture Restructure

The platform has moved from a country-library layout to a flat,
task-oriented structure. Primary focus: Australia. New Zealand remains
included but secondary. No other APAC countries are present — none were
added as placeholders.

**New top-level navigation** (`assets/app.js`): Overview · Intelligence ·
Agency Directory · Regulations · Reports, plus two collapsible groups —
**Research** (Research Toolkit, Prompt Library, Keyword Library, Search
Library, Source Directory, My Notebook) and **Countries** (Australia,
New Zealand only — the old 12-country "coming soon" list is gone).

**New pages:**
- `intelligence-hub.html` — Political, Budget, Procurement, Regulatory,
  Public Safety, Critical Infrastructure and Market Intelligence, plus
  a Current Watch List. Political/Budget content is structural only
  (no fabricated ministers, dates, or figures) — same "unverified"
  convention used everywhere else on the platform.
- `reports-hub.html` — 10 report templates (Agency, Country, Regulatory,
  Public Safety, Critical Infrastructure, Procurement Opportunity,
  Political & Budget Impact, Competitor, Customer Brief, Meeting Brief)
  plus a working client-side **Report Builder**: pick a type, jurisdiction,
  subject and date range, and it generates a formatted section scaffold
  with Copy and Print buttons. No backend — GitHub Pages compatible.

**Enhanced in place (not rebuilt):**
- `agencies-hub.html` (now "Agency Directory") — real, working text
  search and jurisdiction/agency-type filters (previously decorative),
  a new "Other sectors" reference table (Civil Aviation, Air Navigation,
  Border & Federal, Defence, Energy, Utilities, Mining, Oil & Gas, Ports,
  Rail, Telecommunications, Local Government), and URL query-param
  pre-selection (e.g. `agencies-hub.html?type=Police`) used by the
  Overview page's quick-access cards.
- `regulations-hub.html` — added a compact quick-reference table (CASA,
  Part 101, ReOC, RePL, AROC, BVLOS, EVLOS, AusSORA, FIMS, Remote ID,
  ADS-B, etc.) above the existing detailed content, which is unchanged.
- `index.html` (now "Overview") — trimmed to a minimal, scannable set of
  quick-access cards per the v2.0 spec, plus Current Coverage badges.

**Global search** — a real, client-side search (`SEARCH_INDEX` in
`assets/app.js`) now backs both the topbar search and the Overview page
search. It indexes agencies, regulations, intelligence sections,
research tools, report templates and official sources, and shows a
dropdown of `{type, title}` results as you type. No backend.

**Preserved, not deleted:** `public-safety-hub.html`,
`critical-infrastructure-hub.html`, `uas-ecosystem-hub.html`,
`mission-profiles-hub.html`, `technology-hub.html`,
`regulatory-updates-hub.html`, all 6 content templates, and every
Research tool page — all still exist with their original content, now
reachable via cross-links from Overview / Intelligence / Agency
Directory rather than the old country-nested sidebar.

**Frontend-only / no backend, by design:**
- Report Builder generates a text scaffold only — it does not
  auto-populate facts from a database (none exists yet).
- Global search indexes page/section labels, not full-text content.
- Agency Directory filters/search operate on the placeholder entries
  currently in the page; they will scale to real entries as research
  is added.
- All personal data (My Notes) remains browser-local storage only.

---

## Phase 1 — Research Engine (earlier release)

Phase 1 deliberately does not populate intelligence content. It builds
the framework that will support thousands of intelligence pages over
time:

| Addition | File(s) | What it does |
|---|---|---|
| Research Toolkit | `research-toolkit-hub.html` | Official government/aviation/public-safety/industry sources, procurement portals, a 6-step research methodology, trade press, and an AI research workflow — the "where to look and how to rate it" reference. |
| Prompt Library | `prompt-library-hub.html` | 50 ready-to-copy AI research prompts across 10 categories (Regulations, Agencies, Public Safety, Critical Infrastructure, Technology, Competitor Analysis, Customer Research, Sales Discovery, Procurement, Mission Profiles), with category filter chips, a keyword search field, and one-click copy. Written to work in any AI assistant with web access (Claude, ChatGPT, Perplexity, etc.). |
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


