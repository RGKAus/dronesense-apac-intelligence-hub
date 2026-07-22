# Version 7.1 — Stable Local Maps

This maintenance release fixes the map that appeared briefly and then disappeared.

## Fix

- Removed runtime calls to geoBoundaries and Leaflet map tiles.
- Removed the Leaflet CDN dependency.
- Added locally stored SVG country maps.
- Australia, Canada, the United Kingdom and South Africa now use real Natural Earth country outlines with clickable geographic markers.
- The European Union uses real member-state outlines with clickable countries.
- A complete clickable location directory remains visible below every map.
- Maps remain available even when external GIS services, APIs or CDNs are unavailable.

The existing Version 7 agency profiles, Report Generator, Competitor Platform, Technology Watch, political tracker and live-update workflow are preserved.

## Installation

Replace the Version 7 files with this package, commit and redeploy GitHub Pages.

## Commit

`Version 7.1: replace unstable external maps with locally hosted interactive SVG geography`

# DroneSense Global Public Safety RPAS Intelligence Platform — Version 7

Version 7 replaces approximate rectangle maps with real interactive geographic maps and turns each market into a structured intelligence portal.

## Included

- Real Leaflet maps using geoBoundaries administrative polygons for Australia, Canada, the United Kingdom and South Africa.
- Clickable state, province, territory and nation polygons.
- EU member-state directory and prepared GISCO GeoJSON integration point.
- Country dashboards with nationwide agencies below each map.
- Regional dashboards with clickable principal public-safety agencies.
- A consistent intelligence profile for every listed agency.
- Report Generator with country, region, agency and report-type selection.
- Competitor Platform.
- Technology Watch.
- Political and Election Tracker, separated by country.
- Live Updates for:
  - regulations;
  - drone news;
  - public-safety budgets and procurement;
  - public-safety announcements.
- GitHub Actions workflow that refreshes country news feeds every six hours.
- Mobile-responsive interface and printable reports.

## Important research boundary

The platform now contains a complete structural record for every target country and first-level jurisdiction, with principal public-safety organisations represented and clickable. It does not claim that every municipal police, volunteer fire brigade or local rescue unit has already been researched. Agency profile fields deliberately say when no confirmed information has been entered.

For European Union member states, several public-safety functions are decentralised. Version 7 uses national-level functional records where a single agency name cannot safely be asserted without country-specific verification.

## EU real map

The EU page is ready to use `assets/eu-member-states.geojson`. Populate that file with an official GISCO member-state GeoJSON FeatureCollection. The page retains a complete clickable member-state directory when the polygon file is empty.

## Live updates

The workflow `.github/workflows/update-intelligence.yml` runs `scripts/update_feeds.py` every six hours and updates `data/updates.json`.

Repository Settings → Actions → General must permit GitHub Actions to write repository contents.

## Installation

1. Create a branch: `version-7-intelligence-platform`.
2. Back up the current site.
3. Copy this package into the repository root.
4. Preserve any deeper sourced intelligence from the existing repository by merging it into the Version 7 data records.
5. Test country maps and all agency links.
6. Enable GitHub Actions write permissions.
7. Run **Update Intelligence Feeds** manually once.
8. Preview on GitHub Pages.
9. Merge to main.

## Recommended commit

`Version 7: launch real geographic maps, agency intelligence profiles, report generator and country-specific live intelligence modules`
