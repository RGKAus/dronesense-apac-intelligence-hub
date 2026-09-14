-- Remove legacy unique constraint that prevents multiple claims per (competitor_id, claim_type, subject)
-- This migration is safe to rerun and will preserve data.

BEGIN;

-- Drop the old named constraint if it exists
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'competitor_claims_unique') THEN
    ALTER TABLE IF EXISTS competitor_claims DROP CONSTRAINT IF EXISTS competitor_claims_unique;
  END IF;
END $$;

-- Also drop any index with the same name if it was created as an index
DROP INDEX IF EXISTS competitor_claims_unique;

COMMIT;

-- End migration
