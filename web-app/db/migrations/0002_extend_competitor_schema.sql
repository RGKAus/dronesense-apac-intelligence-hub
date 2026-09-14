-- Migration: Extend competitor schema for sources, comparisons, battlecard points and research gaps
-- Adds columns and new tables to support normalized evidence and comparison data

-- Add source fields for stable ids and classification
ALTER TABLE IF EXISTS sources
  ADD COLUMN IF NOT EXISTS ref varchar(32),
  ADD COLUMN IF NOT EXISTS url_key varchar(160),
  ADD COLUMN IF NOT EXISTS type varchar(80),
  ADD COLUMN IF NOT EXISTS publisher varchar(255),
  ADD COLUMN IF NOT EXISTS confidence intelligence_confidence;

-- Ensure ref is unique when present
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE tablename='sources' AND indexname='sources_ref_idx'
  ) THEN
    CREATE UNIQUE INDEX IF NOT EXISTS sources_ref_idx ON sources(ref);
  END IF;
END $$;

-- Capability -> sources mapping
CREATE TABLE IF NOT EXISTS competitor_capability_sources (
  capability_id uuid NOT NULL REFERENCES competitor_capabilities(id) ON DELETE CASCADE,
  source_id uuid NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  PRIMARY KEY (capability_id, source_id)
);

-- Comparisons
CREATE TABLE IF NOT EXISTS competitor_comparisons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competitor_id uuid NOT NULL REFERENCES competitors(id) ON DELETE CASCADE,
  capability varchar(200) NOT NULL,
  avcrm text,
  dronesense text,
  assessment text,
  analysis_type varchar(80),
  confidence intelligence_confidence DEFAULT 'unverified',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (competitor_id, capability)
);

CREATE TABLE IF NOT EXISTS competitor_comparison_sources (
  comparison_id uuid NOT NULL REFERENCES competitor_comparisons(id) ON DELETE CASCADE,
  source_id uuid NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  PRIMARY KEY (comparison_id, source_id)
);

-- Battlecard points (normalized)
CREATE TABLE IF NOT EXISTS battlecard_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competitor_id uuid NOT NULL REFERENCES competitors(id) ON DELETE CASCADE,
  point_type varchar(80) NOT NULL,
  point_text text NOT NULL,
  metadata jsonb,
  is_strategic boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE (competitor_id, point_type, point_text)
);

CREATE TABLE IF NOT EXISTS battlecard_point_sources (
  point_id uuid NOT NULL REFERENCES battlecard_points(id) ON DELETE CASCADE,
  source_id uuid NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  PRIMARY KEY (point_id, source_id)
);

-- Research gaps
CREATE TABLE IF NOT EXISTS competitor_research_gaps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competitor_id uuid NOT NULL REFERENCES competitors(id) ON DELETE CASCADE,
  gap_text text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (competitor_id, gap_text)
);

-- Pricing: allow a single pricing record per competitor; store packages JSON
ALTER TABLE IF EXISTS competitor_pricing
  ADD COLUMN IF NOT EXISTS packages jsonb,
  ADD COLUMN IF NOT EXISTS currency varchar(8),
  ADD COLUMN IF NOT EXISTS last_verified timestamptz;

-- Ensure capability uniqueness
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname='competitor_capabilities_unique'
  ) THEN
    ALTER TABLE competitor_capabilities ADD CONSTRAINT competitor_capabilities_unique UNIQUE (competitor_id, capability_key);
  END IF;
END $$;

-- Claim uniqueness (prevent duplicate claims for same subject/type)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname='competitor_claims_unique'
  ) THEN
    ALTER TABLE competitor_claims ADD CONSTRAINT competitor_claims_unique UNIQUE (competitor_id, claim_type, subject);
  END IF;
END $$;

-- Trigger to update competitor_comparisons.updated_at
CREATE OR REPLACE FUNCTION touch_updated_at_competitor_comparisons()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS touch_competitor_comparisons_updated_at ON competitor_comparisons;
CREATE TRIGGER touch_competitor_comparisons_updated_at
BEFORE UPDATE ON competitor_comparisons
FOR EACH ROW EXECUTE PROCEDURE touch_updated_at_competitor_comparisons();
