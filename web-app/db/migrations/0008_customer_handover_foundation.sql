-- REVIEW ONLY: do not run until the identity/access design has company approval.
-- No existing tables, agency datasets or authentication are changed.
-- This schema is not an exposed PostgREST schema. There are deliberately no access policies.
BEGIN;

CREATE SCHEMA customer_intelligence;
REVOKE ALL ON SCHEMA customer_intelligence FROM PUBLIC, anon, authenticated, service_role;

-- Only organisations absent from the canonical Agencies directory belong here.
-- The future write service must match against that directory before creating an identity.
CREATE TABLE customer_intelligence.private_organisations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (length(trim(name)) BETWEEN 1 AND 255),
  country_code text NOT NULL CHECK (country_code IN ('AU', 'NZ')),
  region_key text NOT NULL CHECK (length(trim(region_key)) > 0),
  sector text NOT NULL CHECK (length(trim(sector)) > 0),
  created_by uuid NOT NULL REFERENCES auth.users(id),
  updated_by uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX private_organisations_identity_idx
  ON customer_intelligence.private_organisations (lower(trim(name)), country_code, region_key);

CREATE TABLE customer_intelligence.handovers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Existing stable IDs are resolved against the canonical TS directory, not copied.
  -- A database FK cannot reference a TypeScript record; validate this at the future write boundary.
  canonical_agency_id text UNIQUE CHECK (
    canonical_agency_id IS NULL OR
    (length(trim(canonical_agency_id)) > 0 AND canonical_agency_id NOT LIKE 'demo-%')
  ),
  private_organisation_id uuid UNIQUE REFERENCES customer_intelligence.private_organisations(id),
  classification text CHECK (classification IN ('Customer', 'Prospect')),
  classification_evidence text NOT NULL DEFAULT 'unknown'
    CHECK (classification_evidence IN ('unknown', 'reported', 'confirmed')),
  classification_source text,
  handover_status text NOT NULL DEFAULT 'Not Started'
    CHECK (handover_status IN ('Not Started', 'In Progress', 'Completed', 'Follow-up Required')),
  -- Seven typed sections, each with value, evidence and source, validated by the future service.
  -- Contacts accept names and job titles only. No emails/telephone numbers in any field.
  sections jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(sections) = 'object'),
  follow_up_actions jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(follow_up_actions) = 'array'),
  salesforce_account_url text CHECK (
    salesforce_account_url IS NULL OR salesforce_account_url ~
    '^https://[a-z0-9-]+(\.sandbox)?\.(my\.salesforce\.com|lightning\.force\.com)/(lightning/r/Account/001[A-Za-z0-9]{12}([A-Za-z0-9]{3})?/view|001[A-Za-z0-9]{12}([A-Za-z0-9]{3})?)/?$'
  ),
  source text,
  created_by uuid NOT NULL REFERENCES auth.users(id),
  updated_by uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT handover_single_identity CHECK (
    (canonical_agency_id IS NOT NULL)::integer +
    (private_organisation_id IS NOT NULL)::integer = 1
  ),
  CONSTRAINT handover_classification_evidence CHECK (
    (classification IS NULL AND classification_evidence = 'unknown' AND classification_source IS NULL)
    OR
    (classification IS NOT NULL AND classification_evidence <> 'unknown' AND classification_source IS NOT NULL AND length(trim(classification_source)) > 0)
  )
);

CREATE INDEX handovers_status_idx ON customer_intelligence.handovers (handover_status);

ALTER TABLE customer_intelligence.private_organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_intelligence.private_organisations FORCE ROW LEVEL SECURITY;
ALTER TABLE customer_intelligence.handovers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_intelligence.handovers FORCE ROW LEVEL SECURITY;

REVOKE ALL ON ALL TABLES IN SCHEMA customer_intelligence FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA customer_intelligence FROM PUBLIC, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA customer_intelligence
  REVOKE ALL ON TABLES FROM PUBLIC, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA customer_intelligence
  REVOKE ALL ON SEQUENCES FROM PUBLIC, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA customer_intelligence
  REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC, anon, authenticated, service_role;

COMMIT;
