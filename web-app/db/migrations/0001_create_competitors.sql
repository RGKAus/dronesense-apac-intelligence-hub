-- Migration: Create minimal competitor intelligence tables
-- Run this in Supabase (psql or supabase migrations) to create schema

-- Confidence enum
DO $$ BEGIN
    CREATE TYPE intelligence_confidence AS ENUM ('confirmed','reported','unverified');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Competitors core profile
CREATE TABLE IF NOT EXISTS competitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug varchar(160) NOT NULL UNIQUE,
  name varchar(255) NOT NULL,
  headquarters varchar(255),
  markets jsonb,
  primary_offering text,
  deployment_model varchar(255),
  threat_level varchar(255),
  overview text,
  last_verified timestamp with time zone,
  confidence intelligence_confidence DEFAULT 'unverified',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Competitor capabilities (one row per capability)
CREATE TABLE IF NOT EXISTS competitor_capabilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competitor_id uuid NOT NULL REFERENCES competitors(id) ON DELETE CASCADE,
  capability_key varchar(100) NOT NULL,
  description text,
  score integer,
  last_verified timestamptz,
  confidence intelligence_confidence DEFAULT 'unverified',
  created_at timestamptz DEFAULT now()
);

-- Sources table for evidence
CREATE TABLE IF NOT EXISTS sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  title text,
  publisher text,
  published_date date,
  cached_excerpt text,
  created_at timestamptz DEFAULT now()
);

-- Competitor claims (customers, contracts, markets, etc.)
CREATE TABLE IF NOT EXISTS competitor_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competitor_id uuid NOT NULL REFERENCES competitors(id) ON DELETE CASCADE,
  claim_type varchar(80) NOT NULL,
  subject text,
  subject_entity_slug varchar(160),
  note text,
  reported_date date,
  confidence intelligence_confidence DEFAULT 'unverified',
  last_verified timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Mapping table: competitor claim -> sources (many-to-many)
CREATE TABLE IF NOT EXISTS competitor_claim_sources (
  claim_id uuid NOT NULL REFERENCES competitor_claims(id) ON DELETE CASCADE,
  source_id uuid NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  PRIMARY KEY (claim_id, source_id)
);

-- Sales battlecard (single row per competitor)
CREATE TABLE IF NOT EXISTS competitor_sales_battlecards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competitor_id uuid NOT NULL REFERENCES competitors(id) ON DELETE CASCADE,
  best_positioning text,
  discovery_questions jsonb,
  traps_and_risks jsonb,
  objection_handling jsonb,
  displacement_opportunities jsonb,
  buying_signals jsonb,
  last_updated timestamptz DEFAULT now()
);

-- Pricing intelligence
CREATE TABLE IF NOT EXISTS competitor_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competitor_id uuid NOT NULL REFERENCES competitors(id) ON DELETE CASCADE,
  pricing_text text,
  contract_values jsonb,
  licensing_model text,
  confidence intelligence_confidence DEFAULT 'unverified',
  last_verified timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Mapping table: competitor_pricing -> sources
CREATE TABLE IF NOT EXISTS competitor_pricing_sources (
  pricing_id uuid NOT NULL REFERENCES competitor_pricing(id) ON DELETE CASCADE,
  source_id uuid NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  PRIMARY KEY (pricing_id, source_id)
);

-- Triggers to update updated_at timestamp
CREATE OR REPLACE FUNCTION touch_updated_at_competitors()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS touch_competitors_updated_at ON competitors;
CREATE TRIGGER touch_competitors_updated_at
BEFORE UPDATE ON competitors
FOR EACH ROW EXECUTE PROCEDURE touch_updated_at_competitors();

-- End migration
