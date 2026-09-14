-- Seed template for AVCRM competitor (do NOT populate with unverified claims)
-- Use this file as a starting point for inserting verified data.

-- Example: create competitor profile (replace placeholders with real data)
-- INSERT INTO competitors (slug, name, headquarters, markets, primary_offering, deployment_model, threat_level, overview, last_verified, confidence)
-- VALUES ('avcrm', 'AVCRM', NULL, '[]'::jsonb, NULL, NULL, NULL, NULL, NULL, 'unverified');

-- Example: add capability
-- INSERT INTO competitor_capabilities (competitor_id, capability_key, description, score, confidence)
-- VALUES ('<competitor-uuid>', 'operations_management', 'Research required', NULL, 'unverified');

-- Example: insert source and link to a claim
-- INSERT INTO sources (url, title, publisher, published_date, cached_excerpt)
-- VALUES ('https://example.com', 'Example source', 'Publisher', '2024-01-01', 'Excerpt');

-- INSERT INTO competitor_claims (competitor_id, claim_type, subject, note, reported_date, confidence)
-- VALUES ('<competitor-uuid>', 'customer', 'Research required', 'Research required', NULL, 'unverified');

-- After inserting claim and source, link them in competitor_claim_sources
-- INSERT INTO competitor_claim_sources (claim_id, source_id) VALUES ('<claim-uuid>','<source-uuid>');
