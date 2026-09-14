BEGIN;

-- 1) Upsert competitor
INSERT INTO competitors (slug, name, headquarters, markets, primary_offering, overview, threat_level, last_verified, confidence)
VALUES (
  'avcrm',
  'AVCRM',
  'North Wollongong, New South Wales, Australia',
  to_jsonb(ARRAY[
    'Australia','New Zealand','Government','Emergency Services','Commercial RPAS Operators','Aerodromes'
  ]),
  'RPAS compliance, operational management, risk management and live-streaming software',
  'AVCRM is an Australian aviation compliance and risk-management software provider. Its RPA Manager product combines RPAS operational planning, compliance, safety, fleet and personnel management. AVCRM Connect extends the platform into live streaming, operational oversight and media management.',
  'High in Australia',
  coalesce(nullif('2026-08-24',''),NULL)::timestamptz,
  'confirmed'::intelligence_confidence
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  headquarters = EXCLUDED.headquarters,
  markets = EXCLUDED.markets,
  primary_offering = EXCLUDED.primary_offering,
  overview = EXCLUDED.overview,
  threat_level = EXCLUDED.threat_level,
  last_verified = EXCLUDED.last_verified,
  confidence = EXCLUDED.confidence,
  updated_at = now();

-- 2) Upsert sources
INSERT INTO sources (ref, title, publisher, published_date, url, url_key, type, confidence)
VALUES
  ('S01','RPA Manager Australia','AVCRM',NULL,NULL,'AVCRM_RPA_MANAGER_AU','vendor_primary','confirmed'),
  ('S02','AVCRM RPA Manager Product Brochure','AVCRM',NULL,NULL,'AVCRM_RPA_MANAGER_BROCHURE','vendor_primary','confirmed'),
  ('S03','AVCRM Connect','AVCRM',NULL,NULL,'AVCRM_CONNECT','vendor_primary','confirmed'),
  ('S04','Automated Airspace Authorisations','Civil Aviation Safety Authority','2026-08-07',NULL,'CASA_AUTOMATED_AIRSPACE_AUTHORISATIONS','government_primary','confirmed'),
  ('S05','RPA Manager Australian Packages','AVCRM',NULL,NULL,'AVCRM_RPA_MANAGER_PRICING_AU','vendor_primary','confirmed'),
  ('S06','Provision of software - Australian Federal Police / AVCRM Products Pty Ltd','Public procurement intelligence record','2026-06-26',NULL,'AFP_AVCRM_2026_SOFTWARE_AWARD','procurement_aggregator','reported'),
  ('S07','RPAS (Operations) - Complete Management Drone Eco-system','Public procurement intelligence record','2026-07-20',NULL,'WAPOL_AVCRM_RPAS_ECOSYSTEM','procurement_aggregator','reported'),
  ('S08','Drone Safety Apps','Civil Aviation Safety Authority',NULL,NULL,'CASA_DRONE_SAFETY_APPS','government_primary','confirmed'),
  ('S09','AVCRM Products Pty Ltd - Australian Government Contract History','DataFlight Tender Search',NULL,NULL,'AVCRM_FEDERAL_CONTRACT_HISTORY','procurement_aggregator','reported'),
  ('S10','Whitsunday Regional Council Ordinary Council Meeting - AVCRM supplier listing','Whitsunday Regional Council',NULL,NULL,'WHITSUNDAY_AVCRM','government_primary','confirmed'),
  ('S11','Shire of Chapman Valley November 2025 Accounts','Shire of Chapman Valley',NULL,NULL,'CHAPMAN_VALLEY_AVCRM','government_primary','confirmed'),
  ('D01','DroneSense Platform','DroneSense',NULL,NULL,'DRONESENSE_PLATFORM','vendor_primary','confirmed'),
  ('D02','DroneSense OpsHub','DroneSense',NULL,NULL,'DRONESENSE_OPSHUB','vendor_primary','confirmed'),
  ('D03','DroneSense Web - Complete Data Management','DroneSense Support',NULL,NULL,'DRONESENSE_WEB_DATA_MANAGEMENT','vendor_primary','confirmed'),
  ('D04','DroneSense Remote - Operational Requirements','DroneSense Support',NULL,NULL,'DRONESENSE_REMOTE','vendor_primary','confirmed'),
  ('D05','DroneSense Hardware and Cloud-Streamed Hardware Support','DroneSense Support',NULL,NULL,'DRONESENSE_HARDWARE','vendor_primary','confirmed')
ON CONFLICT (ref) DO UPDATE SET
  title = EXCLUDED.title,
  publisher = EXCLUDED.publisher,
  published_date = EXCLUDED.published_date,
  url = EXCLUDED.url,
  url_key = EXCLUDED.url_key,
  type = EXCLUDED.type,
  confidence = EXCLUDED.confidence;

-- 3) Insert/update capabilities for AVCRM (use competitor id by slug)
INSERT INTO competitor_capabilities (competitor_id, capability_key, description, score, last_verified, confidence)
SELECT (SELECT id FROM competitors WHERE slug = 'avcrm'), v.capability_key, v.description, NULL, NULL, v.confidence::intelligence_confidence
FROM (VALUES
  ('operations_management','RPA Manager provides job creation and approval, pre-flight and post-flight workflows, JSA/risk processes, scheduling and operational record keeping.','confirmed'),
  ('regulatory_compliance','RPA Manager is designed around Australian RPAS compliance and is listed by CASA as a participating CASA-verified drone safety app for automated airspace authorisations.','confirmed'),
  ('airspace_authorisation','Eligible ReOC operators can use AVCRM RPA Manager as a CASA-verified application for automated airspace authorisation at participating locations.','confirmed'),
  ('live_streaming','AVCRM Connect provides live streaming, operations oversight and media-management capability. AVCRM Live is its mobile companion.','confirmed'),
  ('fleet_management','RPA Manager includes aircraft records, pilot and RPA logbooks, maintenance management, defect tracking, battery management and inventory functions.','confirmed'),
  ('flight_data','AVCRM Flight Sync can synchronise DJI cloud flight telemetry into RPA Manager and use that data for flight records, analytics, maintenance tracking and configurable alerts.','confirmed'),
  ('safety_management','RPA Manager includes job safety analysis, risk assessments, hazard and incident reporting, risk registers and safety-management workflows.','confirmed'),
  ('personnel_management','RPA Manager tracks staff qualifications, inductions and assessments and can prevent assignment of personnel with expired qualifications.','confirmed'),
  ('mapping','The Smart Airspace Calculator displays operational airspace information and supports additional organisation-specific geographical layers.','confirmed'),
  ('mobile_operations','AVCRM describes RPA Manager as device responsive and AVCRM Live as a mobile application supporting Connect.','confirmed'),
  ('dfr_bvlos','Publicly available AVCRM product material reviewed for this battle card does not establish an equivalent end-to-end DFR command-and-control product. A federal contract titled ''Remote Drone Control Capability for Proprietary Compliance Platform'' indicates relevant development activity, but its technical scope requires further verification.','reported'),
  ('api_integrations','Additional research is required to establish the current breadth of AVCRM external APIs, CAD integrations and third-party public-safety integrations.','unverified'),
  ('cloud_onprem','Current public material reviewed confirms web-based delivery but does not establish an on-premises deployment option.','unverified')
) AS v(capability_key, description, confidence)
ON CONFLICT (competitor_id, capability_key) DO UPDATE SET
  description = EXCLUDED.description,
  confidence = EXCLUDED.confidence;

-- 4) Link capability sources: attach listed source refs to all capabilities for this competitor
INSERT INTO competitor_capability_sources (capability_id, source_id)
SELECT cc.id, s.id
FROM competitor_capabilities cc
JOIN sources s ON s.ref IN ('S01','S02','S03','S04','S09')
WHERE cc.competitor_id = (SELECT id FROM competitors WHERE slug = 'avcrm')
ON CONFLICT DO NOTHING;

-- 5) Insert claims (idempotent)
INSERT INTO competitor_claims (competitor_id, claim_key, claim_type, subject, note, reported_date, confidence, last_verified)
SELECT (SELECT id FROM competitors WHERE slug = 'avcrm'), v.claim_key, v.claim_type, v.subject, v.claim, coalesce(NULLIF(v.reported_date,''),NULL)::date, v.confidence::intelligence_confidence, NULL
FROM (VALUES
  ('afp-customer-relationship','customer','Australian Federal Police','The Australian Federal Police has multiple documented contracts with AVCRM Products Pty Ltd.','confirmed','2026-06-26'),
  ('afp-software-contract-2026','procurement','Australian Federal Police','A contract for provision of software was published on 26 June 2026 with a reported value of AUD 24,200 and contract commencement on 21 June 2026.','reported','2026-06-26'),
  ('afp-contract-history','procurement','Australian Federal Police','Third-party government-contract aggregation identifies three AFP contracts with AVCRM with a combined reported value of approximately AUD 141,200.','reported',NULL),
  ('dcec-contract-history','customer','Department of Climate Change, Energy, the Environment and Water','Third-party government-contract data identifies five contracts between AVCRM and the Department of Climate Change, Energy, the Environment and Water with a combined reported value of approximately AUD 744,700.','reported',NULL),
  ('dcec-contract-titles','procurement','Department of Climate Change, Energy, the Environment and Water','Reported AVCRM contract titles include Remote Drone Control Capability for Proprietary Compliance Platform, First Nations Led Drone Compliance App, Application Development for Drone Compliance Software, Drone Compliance Software and Drone Operations Compliance Software.','reported',NULL),
  ('home-affairs-support-2026','customer','Department of Home Affairs','Third-party government-contract data reports a 2026 AVCRM software support and maintenance contract with the Department of Home Affairs valued at AUD 27,852.','reported',NULL),
  ('wapol-rpas-ecosystem','customer','Western Australia Police Force','A public procurement-intelligence record reports AVCRM Products Pty Ltd as supplier for a WA Police Force requirement described as an RPAS operations complete-management drone ecosystem.','reported',NULL),
  ('wapol-procurement-estimate','procurement','Western Australia Police Force','The WA Police procurement record describes an agency-wide RPAS platform and associated licences. The procurement-intelligence source reports an estimated value of AUD 225,000 under limited sourcing.','reported',NULL),
  ('whitsunday-rpa-manager','customer','Whitsunday Regional Council','Whitsunday Regional Council documentation lists AVCRM Products Pty Ltd as a supplier used to manage RPAS operations onsite and in the office with RPA Manager.','confirmed',NULL),
  ('chapman-valley-casa-compliance','customer','Shire of Chapman Valley','A November 2025 council payment record shows AUD 627 paid to AVCRM Products Pty Ltd for access to the AVCRM system for CASA compliance for drone operations.','confirmed','2025-11-01'),
  ('casa-automated-airspace-authorisation','regulatory','CASA Automated Airspace Authorisation','CASA lists AVCRM RPA Manager as a participating CASA-verified drone safety app for automated airspace authorisations.','confirmed',NULL)
) AS v(claim_key, claim_type, subject, claim, confidence, reported_date)
ON CONFLICT (competitor_id, claim_key) DO UPDATE SET
  note = EXCLUDED.note,
  reported_date = EXCLUDED.reported_date,
  confidence = EXCLUDED.confidence,
  last_verified = now();

-- 6) Link sources to claims using source refs mapping (approximate mapping from dataset)
INSERT INTO competitor_claim_sources (claim_id, source_id)
SELECT c.id, s.id
FROM competitor_claims c
JOIN sources s ON (
  (c.subject ILIKE '%Australian Federal Police%' AND s.ref IN ('S06','S09')) OR
  (c.subject ILIKE '%Department of Climate Change%' AND s.ref = 'S09') OR
  (c.subject ILIKE '%Department of Home Affairs%' AND s.ref = 'S09') OR
  (c.subject ILIKE '%Western Australia Police%' AND s.ref = 'S07') OR
  (c.subject ILIKE '%Whitsunday Regional Council%' AND s.ref = 'S10') OR
  (c.subject ILIKE '%Shire of Chapman Valley%' AND s.ref = 'S11') OR
  (c.subject ILIKE '%CASA%' AND s.ref = 'S04')
)
WHERE c.competitor_id = (SELECT id FROM competitors WHERE slug = 'avcrm')
ON CONFLICT DO NOTHING;

-- 7) DroneSense comparison entries
INSERT INTO competitor_comparisons (competitor_id, capability, avcrm, dronesense, assessment, analysis_type, confidence)
SELECT (SELECT id FROM competitors WHERE slug = 'avcrm'), v.capability, v.avcrm, v.dronesense, v.assessment, v.analysis_type, v.confidence::intelligence_confidence
FROM (VALUES
  ('RPAS compliance and program administration','Core strength','Supported','AVCRM is strongly positioned around Australian compliance, job management and administrative workflows. DroneSense also manages people, hardware, flights, policies and operational records, but its public positioning is broader public-safety operations.','analyst_inference','reported'),
  ('Australian automated airspace authorisations','CASA-verified participating application','No equivalent established','AVCRM has a specific Australian regulatory advantage for eligible automated airspace-authorisation workflows.','evidence_based_comparison','confirmed'),
  ('Live video','AVCRM Connect + AVCRM Live','OpsHub secure live video and mission sharing','Both platforms have live-video capability. Product depth and operational workflow should be evaluated during competitive discovery rather than describing AVCRM as compliance-only.','evidence_based_comparison','confirmed'),
  ('Common operating picture / situational awareness','Operations oversight advertised through Connect','Core OpsHub capability','DroneSense public product material demonstrates a broader public-safety common-operating-picture emphasis. Detailed functional comparison with Connect requires further product validation.','analyst_inference','reported'),
  ('Hardware flexibility','Fleet/device streaming promoted; DJI Flight Sync confirmed','Explicitly hardware agnostic',$$DroneSense publicly positions hardware-agnostic mission operations as a core differentiator. AVCRM's current hardware compatibility matrix requires additional research.$$,'analyst_inference','reported'),
  ('DFR / remote operations','Further verification required','DroneSense Remote provides remote-operations/DFR workflows','DroneSense has a clearly documented DFR/remote-operations product. Do not claim AVCRM lacks remote capability; a DCCEEW contract indicates remote-drone-control development that requires further investigation.','evidence_based_comparison','reported'),
  ('Public-safety focus','Serves professional RPAS operators, government and emergency services','Purpose-built for public safety',$$DroneSense's public positioning and operational tooling are explicitly public-safety focused. AVCRM serves public-sector customers but its product scope spans broader aviation/RPAS compliance markets.$$,'analyst_inference','confirmed')
) AS v(capability,avcrm,dronesense,assessment,analysis_type,confidence)
ON CONFLICT (competitor_id, capability) DO UPDATE SET
  avcrm = EXCLUDED.avcrm,
  dronesense = EXCLUDED.dronesense,
  assessment = EXCLUDED.assessment,
  analysis_type = EXCLUDED.analysis_type,
  confidence = EXCLUDED.confidence,
  updated_at = now();

-- 8) Link comparison sources to comparisons
INSERT INTO competitor_comparison_sources (comparison_id, source_id)
SELECT c.id, s.id
FROM competitor_comparisons c
JOIN sources s ON (
  (c.capability ILIKE '%automated airspace%' AND s.ref = 'S04') OR
  (c.capability ILIKE '%Live video%' AND s.ref IN ('S03','D01','D02')) OR
  (c.capability ILIKE '%RPAS compliance%' AND s.ref IN ('S01','D01','D03')) OR
  (c.capability ILIKE '%DFR%' AND s.ref IN ('S09','D04'))
)
WHERE c.competitor_id = (SELECT id FROM competitors WHERE slug = 'avcrm')
ON CONFLICT DO NOTHING;

-- 9) Pricing upsert
INSERT INTO competitor_pricing (competitor_id, pricing_text, contract_values, licensing_model, confidence, packages, currency, last_verified)
VALUES (
  (SELECT id FROM competitors WHERE slug = 'avcrm'),
  'Public RPA Manager packages (self-service) and government/enterprise pricing differ; see packages JSON',
  NULL,
  'User-based tiered subscription',
  'confirmed',
  to_jsonb(
    ARRAY[
      jsonb_build_object('package','Sole User','users',1,'monthly',57,'annual',570),
      jsonb_build_object('package','Small Business','users',5,'monthly',160,'annual',1600),
      jsonb_build_object('package','Company','users',10,'monthly',265,'annual',2650),
      jsonb_build_object('package','Enterprise','users',20,'monthly',400,'annual',4000)
    ]
  ),
  'AUD',
  coalesce(nullif('2026-08-24',''),NULL)::timestamptz
)
ON CONFLICT (competitor_id) DO UPDATE SET
  pricing_text = EXCLUDED.pricing_text,
  packages = EXCLUDED.packages,
  licensing_model = EXCLUDED.licensing_model,
  confidence = EXCLUDED.confidence,
  currency = EXCLUDED.currency,
  last_verified = EXCLUDED.last_verified;

-- 10) Link pricing sources (S05)
INSERT INTO competitor_pricing_sources (pricing_id, source_id)
SELECT p.id, s.id
FROM competitor_pricing p
JOIN sources s ON s.ref = 'S05'
WHERE p.competitor_id = (SELECT id FROM competitors WHERE slug = 'avcrm')
ON CONFLICT DO NOTHING;

-- 11) Sales battlecard points - competitor strengths
INSERT INTO battlecard_points (competitor_id, point_type, point_text, is_strategic)
SELECT (SELECT id FROM competitors WHERE slug = 'avcrm'), 'competitor_strength', v.point, false
FROM (VALUES
  ('Australian regulatory and compliance workflow'),
  ('Established Australian government footprint'),
  ('Low entry price and transparent licensing'),
  ('Deep administrative RPAS program functionality'),
  ('DJI telemetry synchronisation')
) AS v(point)
ON CONFLICT (competitor_id, point_type, point_text) DO NOTHING;

-- 12) Link sources for competitor strengths based on refs
INSERT INTO battlecard_point_sources (point_id, source_id)
SELECT bp.id, s.id
FROM battlecard_points bp
JOIN sources s ON (
  (bp.point_text ILIKE '%regulatory%' AND s.ref IN ('S01','S04')) OR
  (bp.point_text ILIKE '%government footprint%' AND s.ref IN ('S06','S09','S10','S11')) OR
  (bp.point_text ILIKE '%pricing%' AND s.ref = 'S05') OR
  (bp.point_text ILIKE '%DJI%' AND s.ref = 'S01')
)
WHERE bp.competitor_id = (SELECT id FROM competitors WHERE slug = 'avcrm')
ON CONFLICT DO NOTHING;

-- 13) Where DroneSense has advantage (battlecard points)
INSERT INTO battlecard_points (competitor_id, point_type, point_text, is_strategic)
SELECT (SELECT id FROM competitors WHERE slug = 'avcrm'), 'dronesense_advantage', v.point, true
FROM (VALUES
  ('Public-safety mission operations'),
  ('Common operating picture'),
  ('DFR and remote operations'),
  ('Hardware-agnostic operational ecosystem'),
  ('Operational collaboration and external sharing')
) AS v(point)
ON CONFLICT (competitor_id, point_type, point_text) DO NOTHING;

-- 14) Link DroneSense sources (D01..D05)
INSERT INTO battlecard_point_sources (point_id, source_id)
SELECT bp.id, s.id
FROM battlecard_points bp
JOIN sources s ON s.ref IN ('D01','D02','D04','D05')
WHERE bp.competitor_id = (SELECT id FROM competitors WHERE slug = 'avcrm') AND bp.point_type = 'dronesense_advantage'
ON CONFLICT DO NOTHING;

-- 15) Discovery questions, traps, objections, displacement, buying_signals as strategic points
INSERT INTO battlecard_points (competitor_id, point_type, point_text, is_strategic)
SELECT (SELECT id FROM competitors WHERE slug = 'avcrm'), 'discovery_question', v.q, true FROM (VALUES
  ('Is your primary requirement compliance administration, live operational command, or both?'),
  ('How is live drone video currently shared beyond the pilot and controller?'),
  ('Can command staff see multiple simultaneous aircraft and other operational assets in one common picture?')
) AS v(q)
ON CONFLICT DO NOTHING;

-- 16) Insert research gaps
INSERT INTO competitor_research_gaps (competitor_id, gap_text)
SELECT (SELECT id FROM competitors WHERE slug = 'avcrm'), v.gap FROM (VALUES
  ('Current AVCRM Connect pricing and agency-scale licensing model.'),
  ('Full current hardware compatibility matrix for Connect and AVCRM Live.'),
  ('Current API documentation and CAD/public-safety integrations.'),
  ('Hosting architecture, data residency options and any on-premises deployment capability.'),
  ('Technical scope and operational status of the DCCEEW Remote Drone Control Capability contract.'),
  ('Original WA Government procurement source for the reported WA Police AUD 225,000 award and whether that figure is final or estimated.'),
  ('Exact AVCRM products/modules currently used by AFP.'),
  ('Whether WA Police uses RPA Manager only, Connect, custom functionality or a combination.'),
  ('Extent of current BVLOS/DFR capability.'),
  ('Current public-safety customer references beyond those established in this research.')
) AS v(gap)
ON CONFLICT DO NOTHING;

COMMIT;

-- End of seed/upsert (idempotent)
