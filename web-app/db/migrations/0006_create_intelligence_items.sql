-- Create live intelligence storage for ingested public-source items.

BEGIN;

CREATE TABLE IF NOT EXISTS intelligence_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  source varchar(120) NOT NULL,
  source_url text NOT NULL,
  source_identifier varchar(255),
  published_date timestamptz,
  intelligence_type varchar(80) NOT NULL,
  priority varchar(24),
  country varchar(120),
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  ingested_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS intelligence_items_source_url_idx
  ON intelligence_items (source_url);

CREATE INDEX IF NOT EXISTS intelligence_items_published_date_idx
  ON intelligence_items (published_date DESC NULLS LAST);

CREATE INDEX IF NOT EXISTS intelligence_items_type_idx
  ON intelligence_items (intelligence_type);

CREATE INDEX IF NOT EXISTS intelligence_items_country_idx
  ON intelligence_items (country);

CREATE OR REPLACE FUNCTION touch_updated_at_intelligence_items()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS touch_intelligence_items_updated_at ON intelligence_items;
CREATE TRIGGER touch_intelligence_items_updated_at
BEFORE UPDATE ON intelligence_items
FOR EACH ROW EXECUTE PROCEDURE touch_updated_at_intelligence_items();

COMMIT;
