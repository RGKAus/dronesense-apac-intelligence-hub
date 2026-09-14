-- Ensure competitor_pricing has a uniqueness constraint on competitor_id
-- This supports UPSERT by competitor_id in seeds.

BEGIN;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'competitor_pricing_unique') THEN
    ALTER TABLE competitor_pricing ADD CONSTRAINT competitor_pricing_unique UNIQUE (competitor_id);
  END IF;
END $$;

COMMIT;

-- End migration
