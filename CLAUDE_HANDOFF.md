# Versaterm DroneSense Intelligence Platform — Development Handover

## Purpose

This repository contains an internal intelligence platform being developed for Versaterm DroneSense international/APAC work.

The platform combines:

- country intelligence
- agency intelligence
- regulatory intelligence
- procurement intelligence
- market environment intelligence
- technology intelligence
- hardware knowledge
- competitor intelligence
- partner intelligence
- reports
- document/knowledge storage

The platform must prioritise credible, useful intelligence over feature quantity.

## Core Principle

ONE FACT.
ONE SOURCE OF TRUTH.
MANY VIEWS.

Information should exist once in canonical data and be reused across country pages, agency pages, reports, dashboards and specialist modules.

Do not create duplicate datasets for the same facts.

## Critical Data Rules

Never invent intelligence.

Never invent:
- customers
- integrations
- partnerships
- procurement wins
- RPAS deployments
- regulatory requirements
- funding
- competitor claims

Use official/primary sources wherever practical.

Clearly distinguish:
- verified fact
- analyst/commercial interpretation
- internal training notes

Use "Research Required" rather than guessing.

## Stack

- Next.js App Router
- TypeScript
- shared AppShell/navigation
- CSS/Tailwind/project styling
- Supabase for persistence where already implemented
- Vercel deployment

Inspect package.json and current repository before assuming versions or dependencies.

## Authentication

The application has shared prototype authentication.

Environment secrets must remain outside source control.

NEVER request, expose or commit:
- .env.local
- Supabase secret/service keys
- SESSION_SECRET
- passwords

Do not modify authentication unless explicitly requested.

## Supabase

Supabase is already used for parts of the application including:

- intelligence items
- document library
- storage

Existing migrations are under the project's migration directory.

Do NOT:
- rerun every migration
- recreate existing tables
- run destructive database operations
- push schema changes automatically

Any new migration must be explicitly justified.

Do not run supabase db push or equivalent destructive/remote commands without explicit permission.

## Completed / Stable Modules

### Dashboard

Working.

Includes real intelligence metrics and country navigation.

Do not redesign unless explicitly requested.

### Live Intelligence

Working AAUS ingestion architecture.

AAUS content can be refreshed and persisted.

Do not replace with fictional feed data.

### Countries / Australia

Australia and all 8 state/territory organisation directories exist.

Leadership/contact information is deliberately NOT displayed because Salesforce is the intended source of truth for people/contact data.

State pages include Salesforce access.

Do not reintroduce leadership information without explicit request.

### Agencies

Search/filter architecture exists.

Uses canonical organisation data.

### Regulations

REGULATIONS V1 IS COMPLETE.

Canonical regulatory data supports:
- Australia
- Canada
- United States
- United Kingdom
- New Zealand
- European Union
- South Africa

Includes comparison functionality.

Do not undertake another major regulatory redesign unless explicitly requested.

### Procurement

AUSTRALIA PROCUREMENT V1 IS COMPLETE.

Includes:
- Commonwealth
- WA
- NSW
- VIC
- QLD
- SA
- TAS
- ACT
- NT

SA/TAS exact threshold fields intentionally show verification warnings where authoritative verification was not available.

Do not invent those thresholds.

Do not undertake another major Australian procurement redesign unless explicitly requested.

### Market Environment

V1 architecture complete.

Contains 12 real Australia intelligence records covering Federal/Commonwealth, NSW, WA and Queensland.

Records distinguish:
- What Changed
- Why This Matters
- DroneSense Relevance
- sources
- confidence
- last verified
- opportunity horizon

Australia country page consumes the same canonical data.

Do not duplicate Market Environment records.

### Documents

Knowledge/document library implemented using Supabase database + private Storage.

Supports metadata, search/filtering, signed URLs, downloads and deletion.

Do not recreate this architecture.

### Technology Watch

Technology Watch V2 architecture implemented.

Current structure separates:

TECHNOLOGY ECOSYSTEM
durable company/product/reference knowledge

from

TECHNOLOGY INTELLIGENCE
time-sensitive changes and developments

Canonical models include:
- TechnologyCompany
- TechnologyProduct
- TechnologyIntelligenceItem

Company/product routes exist.

### Axon

Axon is the first populated verified Technology Ecosystem profile.

Products currently populated:
- Axon Fusus
- Axon Air
- Axon Respond
- Axon Evidence

Verified DroneSense documentation states ongoing integrations with:
- Axon Fusus
- Axon Respond
- Axon Evidence
- Axon Single Sign-On

Do not invent detailed integration mechanics beyond official documentation.

Axon Air Powered by DroneSense transition context is recorded.

## Verified DroneSense Integration / Technology Context

The project owner has identified the following as software/technology integrations relevant to DroneSense:

- Aloft
- Axon
- Esri
- Skydio
- Dedrone
- ADS-B

IMPORTANT:

OneSky must NOT be represented as a DroneSense integration.

ADS-B is a technology/data ecosystem rather than a company and should not be forced into a company model if inappropriate.

Some technology companies may also be competitors.

Example:

Skydio can legitimately appear in:
- Technology
- Hardware
- Competitors

but canonical facts should not be duplicated.

## Current Architecture Decision — NEXT TASK

The project owner wants to simplify the sidebar and consolidate technology information.

CURRENT INTENDED CHANGE:

Rename:

Technology Watch

to:

Technology

Remove standalone:

Hardware

from the left navigation.

Technology should become the parent intelligence area for:

### Software & Integrations

Examples:
- Axon
- Aloft
- Esri
- Dedrone
- Skydio
- ADS-B / technology data feeds

Only assign integration/relationship badges where verified.

### Hardware

Move the existing Hardware capability into Technology.

Preserve existing verified hardware information and routes/data where possible.

Existing Fotokite Sigma information must not be lost.

Future hardware library should catalogue hardware supported by DroneSense using official DroneSense support documentation.

### Technology Intelligence

Continue the existing Technology Intelligence model for:
- new products
- software/platform updates
- integrations
- partnerships
- acquisitions
- public-safety deployments
- DFR/dock developments
- certifications
- connectivity/edge technology
- end-of-life/product changes
- strategic developments

## Technology vs Competitors

Technology answers:

"What is this company/product/technology, how does it relate to DroneSense, and what is changing?"

Competitors answers:

"How do we compete against this company/product?"

A company can appear in both views.

Do not duplicate canonical company/product facts.

Competitor-specific analysis should reference shared technology/company identity where practical.

## Technology vs Partners

Technology relationships are not automatically commercial/channel partnerships.

An integration does NOT automatically mean a company should be labelled a Partner.

Partner pages describe verified commercial/channel relationships.

## Technology vs Hardware

Hardware should now be a view/category INSIDE Technology rather than a standalone top-level navigation section.

Do not delete existing hardware information during migration.

## Intended Navigation

Target left navigation:

Dashboard
Live Intelligence
Market Environment
Countries
Agencies
Regulations
Procurement
Technology
Competitors
Partners
Reports
Documents
Administration

Use ONE canonical shared navigation source for desktop and mobile.

Do not create page-specific navigation arrays.

## Mobile Navigation

A recent mobile navigation bug was fixed.

The mobile menu should:
- use the same canonical navigation as desktop
- open as a proper drawer
- remain above page content
- be scrollable
- close after navigation
- work around 390px and 430px widths
- have no horizontal overflow

Do not regress this.

## Hardware Existing Work

An existing Hardware section/profile architecture exists.

Fotokite Sigma has a populated profile.

Preserve it when moving Hardware into Technology.

Do not silently delete hardware data or images.

## Competitors

Competitor architecture exists.

AVCRM has substantial evidence-backed research/data work.

Future competitor redesign should emphasise battle-card intelligence:

- overview
- products
- capabilities
- customers/deployments
- pricing
- partnerships
- procurement wins
- regulatory position
- strengths
- weaknesses/gaps
- DroneSense differentiation
- recent intelligence
- sources

Future manual "Add Intelligence" capability is planned.

Do not present unverified field intelligence as verified fact.

## Partners

Existing partner work includes PSTR.

Future profiles planned include RocketDNA and The Drone Institute.

Partner pages should explain:
- what the company normally does
- verified relationship with DroneSense
- relevant products/services
- geography
- useful commercial context

Do not invent partnerships.

## Reports

Reports is not yet a mature working report builder.

Future objective:

Generate reports using canonical platform data.

Potential examples:
- latest Australia intelligence
- weekly market intelligence
- US vs Canada regulatory comparison
- agency briefing
- competitor briefing

Do not duplicate source data inside Reports.

## Source Philosophy

Prefer:

1. official regulator
2. official government
3. official agency
4. official company/product documentation
5. DroneSense / Versaterm documentation
6. primary procurement source

Secondary reporting can supplement but should not replace available primary evidence.

## Development Rules

Before changing anything:

1. inspect existing implementation
2. identify canonical source
3. preserve verified data
4. avoid duplicate architecture
5. make focused changes
6. browser-test
7. run npm run build

Do not casually redesign completed modules.

Do not add unrelated features.

Do not manufacture placeholder intelligence.

Do not commit or push unless explicitly requested.

Do not deploy unless explicitly requested.

## Current Next Task

The immediate intended development task is:

TECHNOLOGY CONSOLIDATION

1. Rename Technology Watch → Technology.
2. Remove Hardware from top-level navigation.
3. Make Technology contain:
   - Software & Integrations
   - Hardware
   - Technology Intelligence
4. Preserve existing Axon profiles.
5. Preserve existing Fotokite/hardware information.
6. Preserve Technology Intelligence architecture.
7. Preserve old URLs using redirects or backwards-compatible routing where sensible.
8. Prepare architecture for cross-linking companies such as Skydio into Competitors without duplicating canonical facts.
9. Keep mobile navigation working.
10. Do not populate new integration companies until their content has been researched/verified.

After consolidation, expected research/population sequence:

- Aloft
- Esri
- Dedrone
- Skydio
- ADS-B

Verify each integration individually before describing its mechanics.

## Before Starting Work

Read this document.

Then inspect:
- package.json
- AppShell/navigation implementation
- app routes
- canonical lib/data files
- technologyWatchData.ts
- existing Hardware implementation
- competitor architecture
- Supabase usage
- globals.css

Do not assume this handover document is more current than the code for implementation details.

If the code and this document conflict:

identify the conflict before making destructive changes.