-- Add stable claim_key to competitor_claims and unique index on (competitor_id, claim_key)
BEGIN;

ALTER TABLE competitor_claims
  ADD COLUMN claim_key varchar(200);

-- Backfill existing rows by deriving a safe slug from claim_type + subject when claim_key is NULL
UPDATE competitor_claims
SET claim_key = left(lower(regexp_replace(coalesce(claim_type,'') || '-' || coalesce(subject,''), '[^a-z0-9]+', '-', 'g')), 200)
WHERE claim_key IS NULL;

-- Create a uniqueness index to support idempotent upserts by stable claim_key
CREATE UNIQUE INDEX IF NOT EXISTS unique_competitor_claim_key ON competitor_claims (competitor_id, claim_key);

-- Prevent nulls for future inserts
ALTER TABLE competitor_claims
  ALTER COLUMN claim_key SET NOT NULL;

COMMIT;

-- End migration
