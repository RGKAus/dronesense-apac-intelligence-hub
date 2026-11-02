# Versaterm Intelligence Hub

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Intelligence Log - fictional notebook demonstration

`/intelligence-log` is available in shared desktop/mobile navigation. Use **New
Entry** to start writing immediately; only notes are mandatory. The date defaults
to the current local time and type defaults to General. Titles, multiple quick
tags, multiple organisation links, AU/NZ location, source/evidence and follow-up
actions are optional. Save and Cancel affect only the open entry. Finish that
entry before editing another; filtering does not discard drafts.

The directory sorts by entry date (newest first), searches entire transcripts,
and combines type, country, jurisdiction, organisation, all selected tags and
outstanding-follow-up filters. Full transcripts preserve line breaks in a
keyboard-scrollable reading area. Notes support up to 200,000 characters.

**Fictional examples only.** All nonempty free-text fields must be labelled
`Fictional:` or `Demo:`. A demonstration guard rejects common emails, phone
numbers and URLs; it cannot detect every sensitive disclosure and is **not a
security control or approval for real information**. Do not paste real notes
or transcripts, even temporarily. Save changes React memory only; reloading or
leaving the module resets entries and drafts. No database/API writes, browser
storage, AI, external transcription or ingestion are introduced.

[The domain model](./lib/intelligenceLog.ts) references existing Agency IDs and
the fixed fictional customer-directory identities. It neither creates
organisations nor infers customer relationships, geography or confirmed evidence.
Links to real Agencies are demonstration associations only, not claims that a
meeting or customer relationship exists. Customer-created temporary identities
remain scoped to the Customers module and are not available after leaving it;
this phase deliberately preserves that module's reset semantics.
`organisationIds` already supports multiple links, and
`getLogEntriesForOrganisation` supports a future customer-profile view without
changing customer records.

The model carries nullable individual-attribution fields and a revision counter
for stale-draft detection. These are preparation only, **not an audit trail**:
shared login cannot identify a user, and no authors or audit events are invented.
Before real entry/persistence, company approval, named-user authentication,
organisation/role authorization, isolated authenticated APIs, explicit RLS and
permissions, retention/deletion policy, audit history, secure transcript search
and sensitive-data handling must be designed and reviewed. Future AI summaries
or action extraction require separate approval and are not implemented.

Run `npm run test:intelligence-log` for domain tests, plus existing customer and
portfolio regression suites. Reusable UI is in
[IntelligenceLogEditor](./components/IntelligenceLogEditor.tsx) and
[IntelligenceLogBrowser](./components/IntelligenceLogBrowser.tsx).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
Production deployment test.
Deployment refresh 18 Aug.

## Versaterm portfolio and application identity

The shared sidebar, mobile header/drawer, login and root metadata use
[one application identity](./lib/branding.ts): **Versaterm Intelligence Hub**.
DroneSense remains a portfolio product and existing specialist intelligence is
preserved. The repository name, authentication, deployment configuration and
Customers & Opportunities data model are unchanged by this phase.

`/versaterm-products` replaces Hardware in shared primary navigation. It and all
six profiles consume [the canonical products](./lib/versatermProducts.ts) already
used by customer handovers:

- `/versaterm-products/iapro`
- `/versaterm-products/adashi`
- `/versaterm-products/mindbase`
- `/versaterm-products/visual-labs`
- `/versaterm-products/cad`
- `/versaterm-products/dronesense`

[The shared profile component](./components/VersatermProductProfile.tsx) covers
overview, capabilities, customers/sectors, integrations, competitors, ANZ/Europe,
documents/sources and verification status. [Typed evidence sections](./lib/versatermProductIntelligence.ts)
are deliberately empty: no product capabilities, pricing, integrations, market
availability, source URLs or verification dates were invented. All six profiles
show Research Required until primary-source review is performed. Product identity
comes from the requested catalogue, not a claim that detailed research is complete.
CAD scope/edition must be established before attributing specific capabilities.

Future research should establish product scope/version, primary documentation,
capability limits, named integrations and compatibility versions, intended users,
evidence-backed competitive analysis, Australia/New Zealand/European availability,
localization, hosting, regulation and procurement considerations. Add reviewed
claims with source references and verification dates; do not copy specialist facts
into conflicting product datasets.

Hardware is now reached through **Technology Watch > Hardware intelligence**.
`/hardware` and `/hardware/fotokite-sigma` remain unchanged URLs with compatible
links and Technology Watch breadcrumbs/active navigation. The existing hardware
record, image component and specialist profiles are preserved; no redirect is
needed. Technology Watch filters, ecosystem data and existing Axon routes remain.

Validation:

```sh
node --test tests/customers.test.mjs tests/portfolio.test.mjs
npx tsc --noEmit
npm run build
```

No dependencies, database changes or migrations are required for this phase.

## Customers & Opportunities - demonstration handover workflow

Visit `/customers` after the existing prototype login. The directory supports AU/NZ,
state/territory/region, organisation-name search, classification, handover status and
outstanding-action filters. Filters and edits survive navigation within this module.

### Demonstration boundary

- Every handover is explicitly fictional. Fictional free-text editing is available
  in memory only. Names/text must include "fictional" or "demo"; emails, telephone
  numbers and URLs are rejected in these text fields. These client-side guards
  are demonstration aids, not authorization or proof that content is non-sensitive.
  Do not enter real information, even if labelled fictional.
- Select Country and State/Region, click Add Customer, enter a fictional name and
  confirm fictional use. A new profile inherits that jurisdiction, starts blank,
  Unclassified and Not yet reviewed, with no products, contacts or contracts.
- Names are normalized for case, punctuation, spacing and the fictional label
  before matching existing country-level identities. Matches open the existing
  profile, preserving its jurisdiction. Matching real Agencies opens read-only
  profiles, with no handover or duplicate identity created.
- Every editable profile section has independent Edit/Save/Cancel. Multiple drafts
  can be open at once; a save patches only its named section into the latest state.
  Identity edits likewise do not overwrite intelligence sections.
- Products use the shared [canonical list](./lib/versatermProducts.ts): IAPro, Adashi,
  Mindbase, Visual Labs, CAD and DroneSense. Selecting catalogue entries is not
  evidence of use without an explicit review status and source.
- Competitor intelligence is flexible fictional free text with its own evidence
  and attribution. It is never automatically promoted to confirmed.
- Save changes memory only. Reloading or leaving the customer layout resets it.
  There is no customer API, server action, Supabase query, browser storage or seed.
- No real Salesforce URL was supplied, so all demo Salesforce buttons are unavailable.
  The reusable button accepts only direct HTTPS Salesforce Account-record URLs,
  rejecting login/home pages, non-Salesforce hosts, credentials, queries and fragments.
- Never replace the fictional source fixtures with customer intelligence.

### Completeness and evidence

Eight equally weighted review areas: classification, Versaterm usage, competitor intelligence,
contacts (names/job titles only), notes, opportunities/next steps, procurement and
Commercial & Contract History. The commercial section replaces the old dates-only
area rather than duplicating dates or counting contracts twice.

Not yet reviewed is separate from Reviewed Unknown. Reviewed Unknown counts fully
toward handover review completeness without implying confirmed knowledge. Reported
and confirmed values need sources. Counts remain visible separately; an inventory
section's evidence does not override individual contracts' evidence or establish
that every financial/date field is known. Salesforce is optional.

Completed requires 8/8 reviewed and no outstanding actions. Setting a reviewed area
back to unreviewed, or adding outstanding work to a Completed profile, returns it
to In Progress. Follow-up actions remain visible near the top of the profile.

### Commercial & Contract History

The section supports multiple independent contracts with canonical product IDs,
value, currency, tax treatment/details, payment arrangement, multiple invoice and
payment entries, start/expiry/renewal dates, procurement category and local legal
terminology, tender/reference, renewal plans, source and per-record evidence.

Blank amounts/dates/currency stay null (Unknown); zero is explicit, never a default.
Amounts are exact decimal strings with up to two fractional digits, not floating-point
calculations. No totals, inferred balances, tax rates, exchange rates or contract facts
are generated. All financial entries share their contract's currency and evidence.
An empty new contract has no products, amounts, dates or source.

Procurement categories are handover grouping labels, not legal equivalences between
Australian jurisdictions and New Zealand. Preserve jurisdiction-specific terms/legal
basis in the separate field; do not infer thresholds or procurement legality.

### Canonical identity and unapplied database design

[The identity adapter](./lib/customerOrganisations.ts) reads IDs, names, geography
and sectors directly from the existing Agencies source. It does not copy leadership
or infer customer relationships. Canonical Agencies are an opt-in, read-only view;
demo records never attach fictional intelligence to real organisations.
User-created `demo-custom-*` identities exist only in the provider's memory. Their
route can reopen during module navigation; after reload it explains that the temporary
profile was cleared. No entered names or notes are placed in URLs or sent to a server.

[Migration 0008](./db/migrations/0008_customer_handover_foundation.sql) is a review-only
proposal, not executed or wired to the application. It contains two tables in a
non-public `customer_intelligence` schema:

1. `private_organisations`: identities not already present in Agencies.
2. `handovers`: either an existing canonical agency ID or a private organisation
   foreign key (exactly one), classification, status, seven typed JSON sections,
   follow-up actions, optional Salesforce URL and attributable change metadata.

Existing canonical identity fields are not duplicated in handovers. A TypeScript
ID cannot have a database foreign key: a future authorized service must resolve
and validate canonical IDs, deduplicate new organisations against Agencies, and
provide one identity resolver to both views before new real identities are enabled.
Private identities must never be published through Agencies by accident. An eventual
shared persistent identity registry requires a separately reviewed cutover, not a
second public organisation dataset.

No existing table is modified. Both new tables have forced RLS, no policies, explicit
revocations for PUBLIC, anon, authenticated and service_role, and restricted default
privileges. This is intentionally unusable by application roles. JSON shape, forbidden
contact information, completeness and authorization still require validated server
boundaries before any permissions are granted. Database ownership/BYPASSRLS is not
a customer authorization model.

The original review-only migration is unchanged by these UI refinements. Before any
future activation it also needs an approved review-state column/payload design for
classification and the expanded contract JSON validation. It is not a ready-to-enable
persistence implementation.

### Required before persistent customer intelligence

1. Company approval of data handling, access scope, retention and deployment.
2. Named-user authentication through approved SSO/Supabase Auth; the shared prototype
   session and displayed Administrator label are not individual authorization.
3. Reviewed membership/role/territory permissions and least-privilege RLS policies.
4. An authorized server-side repository with per-operation checks, typed payload
   validation, canonical identity resolution, conflict handling and audit history.
   Do not reuse the elevated Supabase client as the authorization boundary.
5. Reject emails/telephone numbers in **every** field, including notes, sources and
   URLs; pattern matching alone is insufficient. Contacts contain names/titles only.
6. Private/no-store responses and exclusion from static datasets, public APIs,
   telemetry/log payloads, reports, exports, public Agency views and GitHub.
7. Manual schema review/application and negative authorization/RLS tests for
   anonymous, shared-login, unapproved and out-of-scope users.
8. Independently review and approve activation; there is no real-data feature flag
   or environment switch in Phase 1.

### Validation

```sh
npm run test:customers
npx eslint app/customers components/Customer*.tsx components/CustomersDirectory.tsx \
  components/MobileNavigation.tsx components/AppShell.tsx components/navigation.ts \
  lib/customer*.ts lib/versatermProducts.ts tests/customers.test.mjs
npx tsc --noEmit
npm run build
```

The focused tests use the installed TypeScript compiler and Node's built-in runner;
no dependency is added. Compilation uses a temporary directory cleaned after tests.
Browser checks should cover jurisdiction inheritance, blank creation and duplicates,
concurrent section Save/Cancel, multi-product selection/removal, multiple contracts
and invoice/payment entries, competitor free text/evidence, reviewed unknowns,
completion guards, follow-up, reload reset, canonical read-only profiles and mobile
layouts at 390px/430px.
