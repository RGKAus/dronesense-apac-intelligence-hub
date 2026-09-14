-- Create searchable document metadata and private storage bucket for uploaded files.

BEGIN;

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  file_name text NOT NULL,
  file_path text NOT NULL UNIQUE,
  file_type varchar(120) NOT NULL,
  file_size bigint NOT NULL CHECK (file_size > 0),
  document_type varchar(80),
  country varchar(120),
  region varchar(120),
  organisation varchar(255),
  topic varchar(255),
  document_date date,
  source text,
  uploaded_by varchar(120),
  tags text[] NOT NULL DEFAULT ARRAY[]::text[],
  confidentiality varchar(24) NOT NULL DEFAULT 'Internal',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT documents_document_type_check CHECK (
    document_type IS NULL OR document_type IN (
      'Regulation',
      'Procurement',
      'Tender / RFP',
      'Competitor Intelligence',
      'Partner',
      'Hardware',
      'Training',
      'Policy',
      'Research',
      'Presentation',
      'Contract',
      'Other'
    )
  ),
  CONSTRAINT documents_confidentiality_check CHECK (
    confidentiality IN ('Public', 'Internal', 'Confidential')
  )
);

CREATE INDEX IF NOT EXISTS documents_created_at_idx
  ON documents (created_at DESC);

CREATE INDEX IF NOT EXISTS documents_document_type_idx
  ON documents (document_type);

CREATE INDEX IF NOT EXISTS documents_country_idx
  ON documents (country);

CREATE INDEX IF NOT EXISTS documents_region_idx
  ON documents (region);

CREATE INDEX IF NOT EXISTS documents_confidentiality_idx
  ON documents (confidentiality);

CREATE INDEX IF NOT EXISTS documents_tags_gin_idx
  ON documents USING gin (tags);

CREATE OR REPLACE FUNCTION touch_updated_at_documents()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS touch_documents_updated_at ON documents;
CREATE TRIGGER touch_documents_updated_at
BEFORE UPDATE ON documents
FOR EACH ROW EXECUTE PROCEDURE touch_updated_at_documents();

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  false,
  10485760,
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/csv',
    'image/jpeg',
    'image/png'
  ]
)
ON CONFLICT (id) DO NOTHING;

COMMIT;
