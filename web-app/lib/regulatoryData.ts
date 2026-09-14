export type RegulatoryConfidence = "confirmed" | "high" | "medium" | "verification-required";

export type RegulatorySource = {
  title: string;
  url: string;
  regulator: string;
  lastVerified: string;
  confidence: RegulatoryConfidence;
};

export type RegulatoryPathwayStep = {
  step: number;
  title: string;
  detail: string;
};

export type RegulatoryGlossaryItem = {
  term: string;
  meaning: string;
};

export type RegulatoryCompareProfile = {
  overview: {
    regulatoryModel: string;
    pilotQualificationModel: string;
    operatorModel: string;
    riskAssessmentFramework: string;
  };
  individual: {
    entryRoutinePilotRequirements: string;
    advancedCompetency: string;
    bvlosCompetency: string;
    radioQualification: string;
    importantDistinctions: string;
  };
  organisation: {
    operatorRegistrationCertification: string;
    manualExpositionRequirements: string;
    keyPersonnel: string;
    safetyRiskSystems: string;
    operationalAuthorisation: string;
  };
  bvlos: {
    routineBvlosAvailability: string;
    pilotCompetency: string;
    operatorRequirement: string;
    aircraftRequirement: string;
    riskAssessment: string;
    operationalApproval: string;
    majorLimitations: string;
  };
};

export type RegulatoryDetailStatus = "full" | "verification-pending";

export type RegulatoryGuide = {
  country: string;
  countrySlug: string;
  regulator: string;
  regulatorUrl: string;
  primaryFramework: string;
  regulatoryModel: string;
  terminology: string[];
  operatorApprovalModel: string;
  advancedBvlosPathway: string;
  pilotQualificationModel: string;
  vlosFramework: string;
  advancedOperationsFramework: string;
  bvlosPathway: string;
  riskAssessmentFramework: string;
  operationalApprovalRequirement: string;
  lastVerified: string;
  confidence: RegulatoryConfidence;
  detailStatus: RegulatoryDetailStatus;
  detailVerificationNote?: string;
  overviewNote?: string;
  individualPathway?: RegulatoryPathwayStep[];
  organisationPathway?: RegulatoryPathwayStep[];
  operationSpecificApprovals?: Array<{ label: string; detail: string }>;
  aircraftTechnicalRequirements?: string[];
  vlosKeyRequirements?: string[];
  bvlosComplex?: {
    summary: string;
    model: Array<{ label: string; detail: string }>;
    riskElementsHeading: string;
    riskElements: Array<{ label: string; detail: string }>;
    majorLimitations: string[];
    importantDistinction: string;
  };
  glossary?: RegulatoryGlossaryItem[];
  comparisonProfile: RegulatoryCompareProfile;
  sources: RegulatorySource[];
};

const regulatoryGuides: RegulatoryGuide[] = [
  {
    country: "Australia",
    countrySlug: "australia",
    regulator: "Civil Aviation Safety Authority (CASA)",
    regulatorUrl: "https://www.casa.gov.au/",
    primaryFramework: "Civil Aviation Safety Regulations 1998 - Part 101",
    regulatoryModel: "Category-and-approval model separating pilot competency, operator certification and operation-specific approvals.",
    terminology: ["RPA", "RPAS", "RePL", "ReOC", "AROC", "VLOS", "EVLOS", "BVLOS", "AusSORA"],
    operatorApprovalModel: "ReOC-based operator certification for applicable operations.",
    advancedBvlosPathway: "Operator framework + pilot competency + ConOps + risk assessment + CASA operational approval.",
    pilotQualificationModel: "Remote pilot qualifications are operation-dependent. RePL is required for many certified/commercial activities, but not every drone flight type.",
    vlosFramework: "Routine operations are generally conducted under VLOS rules within the applicable operating category and conditions.",
    advancedOperationsFramework: "Complex operations require the correct operator framework, defined operating procedures and specific approvals where needed.",
    bvlosPathway: "BVLOS requires organisational approval context, appropriate pilot competency and operation-specific CASA authorisation.",
    riskAssessmentFramework: "AusSORA (for relevant BVLOS and complex applications).",
    operationalApprovalRequirement: "BVLOS outcomes are tied to operation-level CASA approval, not pilot credentials alone.",
    lastVerified: "2026-09-01",
    confidence: "high",
    detailStatus: "full",
    overviewNote: "Use this guide to separate pilot competency requirements from operator certification and operation-level approvals.",
    individualPathway: [
      {
        step: 1,
        title: "Determine intended operation",
        detail: "Identify whether the activity is excluded/recreational or professional, and whether VLOS, complex or BVLOS concepts are involved.",
      },
      {
        step: 2,
        title: "Remote pilot competency",
        detail: "Confirm the competency standard required for the operation. RePL applies where required under the operational model.",
      },
      {
        step: 3,
        title: "Radio competency where applicable",
        detail: "Assess whether aeronautical radio use is required. AROC is operation-dependent, not universal for all VLOS flying.",
      },
      {
        step: 4,
        title: "Operate under organisational authority",
        detail: "Where certification is required, operations are conducted under an appropriate operator framework such as ReOC privileges.",
      },
      {
        step: 5,
        title: "Advanced or BVLOS competency",
        detail: "For advanced operations, align pilot training and accepted examination pathways to the proposed concept of operations.",
      },
      {
        step: 6,
        title: "Operational approval",
        detail: "BVLOS is authorised at operation level through CASA approval, supported by the operator framework and risk assessment.",
      },
    ],
    organisationPathway: [
      {
        step: 1,
        title: "Define intended RPAS operations",
        detail: "Set mission profiles, operating environments, airspace contexts and service outcomes.",
      },
      {
        step: 2,
        title: "Determine if ReOC is required",
        detail: "Assess whether the organisation's intended operations require operator certification under CASA rules.",
      },
      {
        step: 3,
        title: "Establish organisational structure",
        detail: "Define accountabilities, management oversight and safety governance for RPAS operations.",
      },
      {
        step: 4,
        title: "Nominate required key personnel",
        detail: "Nominate suitable personnel required for the organisational approval model and operational responsibilities.",
      },
      {
        step: 5,
        title: "Develop procedures and manuals",
        detail: "Document operating procedures, safety controls and escalation pathways.",
      },
      {
        step: 6,
        title: "Define pilot competency requirements",
        detail: "Set qualification, currency and operational competency standards for pilots based on missions.",
      },
      {
        step: 7,
        title: "Establish aircraft and maintenance controls",
        detail: "Implement airworthiness, maintenance and operational control mechanisms appropriate to fleet and mission risk.",
      },
      {
        step: 8,
        title: "Apply for ReOC",
        detail: "Submit the operator application with supporting organisational material and procedures.",
      },
      {
        step: 9,
        title: "Operate within approved privileges",
        detail: "Conduct operations within the granted scope and approved conditions.",
      },
      {
        step: 10,
        title: "Seek approvals for additional operations",
        detail: "For operations outside baseline privileges (such as certain BVLOS profiles), submit additional operational approval requests.",
      },
    ],
    operationSpecificApprovals: [
      {
        label: "Category and operation determination",
        detail: "Determine whether the operation remains within baseline permissions or requires a specific CASA approval package.",
      },
      {
        label: "ConOps and operational package",
        detail: "Document mission design, airspace interactions, operational boundaries and safety controls to support CASA assessment.",
      },
      {
        label: "CASA operation-level approval",
        detail: "Obtain operation-specific CASA authorisation where required, with conditions that are separate from pilot licence status.",
      },
    ],
    aircraftTechnicalRequirements: [
      "Aircraft suitability must match mission risk, airspace context and approved operating procedures.",
      "Maintenance and continuing airworthiness controls must align with operator governance and mission profile.",
      "Technical mitigations and containment controls may be required for complex or BVLOS approvals.",
    ],
    vlosKeyRequirements: [
      "Operate within visual line of sight and relevant category conditions.",
      "Apply airspace, people/property and location constraints from applicable CASA rules.",
      "Use appropriately competent personnel and approved organisational procedures where certification applies.",
    ],
    bvlosComplex: {
      summary: "BVLOS and complex operations require alignment between operator approval, pilot competency, risk assessment and operation-specific CASA authorisation.",
      model: [
        {
          label: "Qualified operator framework",
          detail: "An organisational operating framework (including certification where required) establishes governance and responsibilities.",
        },
        {
          label: "Remote pilot competency",
          detail: "Pilots need competency appropriate to aircraft, airspace and mission profile.",
        },
        {
          label: "Defined Concept of Operations (ConOps)",
          detail: "ConOps defines where, how and under what constraints the mission is conducted.",
        },
        {
          label: "Operational risk assessment",
          detail: "Risk identification and controls must match ground and air risk characteristics for the proposed operation.",
        },
        {
          label: "CASA assessment and approval",
          detail: "CASA reviews the operation package and may grant approvals with explicit conditions and boundaries.",
        },
      ],
      riskElementsHeading: "AusSORA components (high level)",
      riskElements: [
        {
          label: "ConOps",
          detail: "Operational narrative for mission profile, geography, airspace and system usage.",
        },
        {
          label: "Ground Risk",
          detail: "Assessment of people and property exposure, plus mitigations and containment measures.",
        },
        {
          label: "Air Risk",
          detail: "Assessment of airspace conflict risk and strategic/tactical mitigations.",
        },
        {
          label: "Mitigations",
          detail: "Technical, procedural and human safeguards to reduce residual risk.",
        },
        {
          label: "Containment",
          detail: "Measures to control operation volume and reduce unintended aircraft escape risk.",
        },
        {
          label: "Operational Safety Objectives",
          detail: "Assurance targets and performance expectations used to substantiate the operation.",
        },
      ],
      majorLimitations: [
        "Approval scope is operation-specific and conditional.",
        "Pilot credentials alone do not authorise BVLOS.",
        "Additional mitigations may be required for airspace and ground-risk complexity.",
      ],
      importantDistinction: "Pilot certificates, operator approvals and BVLOS operation approvals are different regulatory concepts and are assessed separately.",
    },
    glossary: [
      { term: "CASA", meaning: "Civil Aviation Safety Authority, Australia's national civil aviation safety regulator." },
      { term: "RPA", meaning: "Remotely Piloted Aircraft." },
      { term: "RPAS", meaning: "Remotely Piloted Aircraft System, including aircraft, control station and supporting elements." },
      { term: "RePL", meaning: "Remote Pilot Licence used for applicable certified/commercial operations." },
      { term: "ReOC", meaning: "Remote Operator's Certificate for organisations conducting applicable RPAS operations." },
      { term: "AROC", meaning: "Aeronautical Radio Operator Certificate, required when aeronautical radio use is part of the operation." },
      { term: "VLOS", meaning: "Visual Line of Sight operation." },
      { term: "EVLOS", meaning: "Extended Visual Line of Sight operation with additional observers/processes." },
      { term: "BVLOS", meaning: "Beyond Visual Line of Sight operation subject to additional controls and approvals." },
      { term: "AusSORA", meaning: "Australian implementation of the Specific Operations Risk Assessment methodology for relevant complex/BVLOS operations." },
      { term: "ConOps", meaning: "Concept of Operations describing the operational design and assumptions for the mission." },
    ],
    comparisonProfile: {
      overview: {
        regulatoryModel: "CASA framework separating pilot qualifications, operator certification (ReOC where required), and operation-specific approvals.",
        pilotQualificationModel: "Operation-dependent pilot competency model with RePL for applicable operations.",
        operatorModel: "ReOC-based organisational framework for applicable operations.",
        riskAssessmentFramework: "AusSORA for relevant complex and BVLOS applications.",
      },
      individual: {
        entryRoutinePilotRequirements: "Identify operation category and required pilot competency before flight.",
        advancedCompetency: "Advanced operations require training and competency aligned to mission and environment.",
        bvlosCompetency: "BVLOS pilot competency is necessary but not sufficient without operation approval.",
        radioQualification: "AROC where aeronautical radio use is required.",
        importantDistinctions: "RePL, ReOC and BVLOS approval are separate approvals.",
      },
      organisation: {
        operatorRegistrationCertification: "ReOC required for applicable operations.",
        manualExpositionRequirements: "Documented procedures, governance and safety controls.",
        keyPersonnel: "Accountable organisational roles and responsible operational leadership.",
        safetyRiskSystems: "Operational risk controls proportional to mission complexity.",
        operationalAuthorisation: "Specific CASA approvals for operations outside baseline privileges.",
      },
      bvlos: {
        routineBvlosAvailability: "Not a routine pilot privilege; requires operation-level approval.",
        pilotCompetency: "Mission-appropriate BVLOS competency and training.",
        operatorRequirement: "Approved operator framework and governance.",
        aircraftRequirement: "Aircraft suitability, control link resilience and safety mitigations for operation profile.",
        riskAssessment: "AusSORA-aligned risk assessment where applicable.",
        operationalApproval: "CASA operation-specific assessment and approval.",
        majorLimitations: "Approval conditions define geography, airspace, mitigation package and operating envelope.",
      },
    },
    sources: [
      {
        title: "CASA RPAS Hub",
        url: "https://www.casa.gov.au/drones",
        regulator: "CASA",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "CASR Part 101 - Legislation",
        url: "https://www.legislation.gov.au/Details/F2026C00846",
        regulator: "CASA",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "CASA - Beyond Visual Line of Sight resources",
        url: "https://www.casa.gov.au/drones/beyond-visual-line-sight-bvlos-drones",
        regulator: "CASA",
        lastVerified: "2026-09-01",
        confidence: "medium",
      },
      {
        title: "CASA - RPAS approvals and applications",
        url: "https://www.casa.gov.au/licences-and-certificates/remote-pilot-licences-and-certificates",
        regulator: "CASA",
        lastVerified: "2026-09-01",
        confidence: "medium",
      },
    ],
  },
  {
    country: "Canada",
    countrySlug: "canada",
    regulator: "Transport Canada",
    regulatorUrl: "https://tc.canada.ca/en/aviation",
    primaryFramework: "Canadian Aviation Regulations (CARs), including Part IX RPAS framework",
    regulatoryModel: "Operational tiers: microdrone, Basic, Advanced, Level 1 Complex, and Special Operations (including SFOC-RPAS pathways where applicable).",
    terminology: ["RPAS", "Microdrone", "Basic Operations", "Advanced Operations", "Level 1 Complex", "RPOC", "SFOC-RPAS", "BVLOS"],
    operatorApprovalModel: "Level 1 Complex BVLOS operations must be conducted under an RPAS Operator Certificate (RPOC) with organisational safety systems.",
    advancedBvlosPathway: "Lower-risk routine BVLOS is enabled under Level 1 Complex subject to explicit operating limitations; broader complex operations may require SFOC-RPAS or other approvals.",
    pilotQualificationModel: "Pilot certifications align to operation class: Basic and Advanced pathways, with additional Level 1 Complex pathway requirements.",
    vlosFramework: "Routine operations are primarily delivered through microdrone, Basic or Advanced pathways when their operating conditions are met.",
    advancedOperationsFramework: "Advanced and Level 1 Complex operations add competency, aircraft declaration and operator governance requirements.",
    bvlosPathway: "Routine lower-risk BVLOS may be available through Level 1 Complex; higher-complexity BVLOS generally requires additional operational authorisation such as SFOC-RPAS pathways.",
    riskAssessmentFramework: "Transport Canada operation-tier and safety-system requirements, including RPOC safety risk management for Level 1 Complex operations.",
    operationalApprovalRequirement: "Operations outside baseline permissions require operation-specific authorisation pathways, including SFOC-RPAS contexts.",
    lastVerified: "2026-09-01",
    confidence: "high",
    detailStatus: "full",
    overviewNote: "Level 1 Complex is not a blanket BVLOS approval for all operations. It enables a defined lower-risk subset under specific conditions.",
    individualPathway: [
      {
        step: 1,
        title: "Classify operation",
        detail: "Determine whether the mission is microdrone, Basic, Advanced, Level 1 Complex, or a Special Operation requiring SFOC-RPAS.",
      },
      {
        step: 2,
        title: "Basic pilot pathway",
        detail: "For Basic operations, complete the Basic exam/certification requirements and remain within Basic operating limits.",
      },
      {
        step: 3,
        title: "Advanced pilot pathway",
        detail: "For Advanced operations, complete Advanced pilot certification pathway requirements and applicable flight review requirements.",
      },
      {
        step: 4,
        title: "Level 1 Complex progression",
        detail: "Complete Advanced Operations exam, minimum 20 hours ground school through a flight school, Level 1 Complex online exam, and Level 1 Complex flight review.",
      },
      {
        step: 5,
        title: "Apply for Pilot Certificate - Level 1 Complex Operations",
        detail: "Submit application for Pilot Certificate - Level 1 Complex Operations after meeting prerequisite exam and review requirements.",
      },
      {
        step: 6,
        title: "Fly within operation approvals",
        detail: "Conduct operations only within the operation type and limitations authorised for the pilot, operator and aircraft combination.",
      },
    ],
    organisationPathway: [
      {
        step: 1,
        title: "Define intended operations",
        detail: "Confirm whether the organisation seeks Basic/Advanced support, Level 1 Complex BVLOS, or special operations outside those envelopes.",
      },
      {
        step: 2,
        title: "Determine RPOC applicability",
        detail: "For Level 1 Complex operations, establish RPAS Operator Certificate (RPOC) coverage.",
      },
      {
        step: 3,
        title: "Nominate accountable executive",
        detail: "Nominate leadership accountable for organisational RPAS safety and compliance outcomes.",
      },
      {
        step: 4,
        title: "Nominate maintenance responsibility",
        detail: "Assign a person responsible for maintenance and aircraft technical compliance.",
      },
      {
        step: 5,
        title: "Implement training program",
        detail: "Establish pilot and staff training controls aligned to operation category and aircraft class.",
      },
      {
        step: 6,
        title: "Publish SOPs",
        detail: "Create standard operating procedures for routine, abnormal and emergency operations.",
      },
      {
        step: 7,
        title: "Implement safety risk management",
        detail: "Maintain a documented safety risk management process covering hazard identification, mitigation and review.",
      },
      {
        step: 8,
        title: "Apply for required operator permissions",
        detail: "Apply for RPOC and any additional operation-specific approvals relevant to the mission set.",
      },
    ],
    operationSpecificApprovals: [
      {
        label: "Basic and Advanced eligibility",
        detail: "Operate within the conditions of the selected operational class and associated pilot credentials.",
      },
      {
        label: "Level 1 Complex lower-risk BVLOS",
        detail: "Use the Level 1 Complex pathway for eligible lower-risk BVLOS operations only, with required pilot, operator and aircraft prerequisites.",
      },
      {
        label: "Special operations pathway",
        detail: "Use SFOC-RPAS or other Transport Canada approval pathways where operations exceed Level 1 Complex limitations.",
      },
    ],
    aircraftTechnicalRequirements: [
      "Advanced and Level 1 Complex operations may require applicable RPAS Safety Assurance declarations.",
      "Aircraft class, capability and declaration status must match the operation profile.",
      "Maintenance and configuration controls should align with organisational safety systems.",
    ],
    vlosKeyRequirements: [
      "Routine operations are performed in the relevant Basic or Advanced framework where all conditions are met.",
      "Operational limits include airspace and location criteria defined by the selected category.",
      "Pilot credential, aircraft declaration status and operating environment must remain aligned.",
    ],
    bvlosComplex: {
      summary: "Canada distinguishes lower-risk routine BVLOS available under Level 1 Complex from broader complex or special BVLOS operations requiring additional authorisations.",
      model: [
        {
          label: "Level 1 Complex pilot",
          detail: "Pilot must complete the Level 1 Complex progression beyond Advanced requirements.",
        },
        {
          label: "RPOC-backed operation",
          detail: "Operation must be under an RPAS Operator Certificate and organisational safety system.",
        },
        {
          label: "Eligible airspace and geography",
          detail: "Lower-risk routine BVLOS is constrained to qualifying environments and operational limitations.",
        },
        {
          label: "Aircraft declaration alignment",
          detail: "Appropriate small/medium RPAS declaration and technical suitability are required.",
        },
        {
          label: "Special operation escalation",
          detail: "Operations beyond routine lower-risk BVLOS move into SFOC-RPAS or equivalent approval pathways.",
        },
      ],
      riskElementsHeading: "Lower-risk routine BVLOS limitations",
      riskElements: [
        {
          label: "Airspace",
          detail: "Uncontrolled airspace for routine lower-risk BVLOS eligibility.",
        },
        {
          label: "Altitude",
          detail: "400 ft AGL or below for the routine lower-risk subset.",
        },
        {
          label: "Aerodrome separation",
          detail: "More than 5 NM / 9.3 km from relevant listed aerodromes where applicable.",
        },
        {
          label: "Population-density controls",
          detail: "Applicable density restrictions must be satisfied.",
        },
      ],
      majorLimitations: [
        "Level 1 Complex does not authorise all BVLOS operations.",
        "Pilot certificate and operator certificate are both required for the eligible lower-risk subset.",
        "Higher-complexity BVLOS requires additional operation-specific approval pathways.",
      ],
      importantDistinction: "Level 1 Complex is a bounded routine lower-risk BVLOS pathway, not a universal national BVLOS licence.",
    },
    glossary: [
      { term: "RPAS", meaning: "Remotely Piloted Aircraft System." },
      { term: "Basic Operations", meaning: "Transport Canada operating pathway for lower-risk missions within Basic conditions." },
      { term: "Advanced Operations", meaning: "Operating pathway requiring additional pilot competency and compliance steps beyond Basic." },
      { term: "Level 1 Complex", meaning: "Transport Canada pathway building on Advanced certification for specified lower-risk BVLOS operations." },
      { term: "RPOC", meaning: "RPAS Operator Certificate used for qualifying operations, including Level 1 Complex organisational oversight." },
      { term: "SFOC-RPAS", meaning: "Special Flight Operations Certificate pathway for operations outside routine frameworks." },
    ],
    comparisonProfile: {
      overview: {
        regulatoryModel: "Tiered model: microdrone, Basic, Advanced, Level 1 Complex, and SFOC-RPAS for operations outside baseline pathways.",
        pilotQualificationModel: "Basic and Advanced pilot pathways with Level 1 Complex progression for specified lower-risk BVLOS.",
        operatorModel: "RPOC required for Level 1 Complex operations.",
        riskAssessmentFramework: "Safety-system and operation-tier controls under Transport Canada frameworks.",
      },
      individual: {
        entryRoutinePilotRequirements: "Basic pilot certification pathway for Basic operations.",
        advancedCompetency: "Advanced pilot certification pathway for Advanced operations.",
        bvlosCompetency: "Level 1 Complex progression with exams, ground school and flight review.",
        radioQualification: "No universal separate aeronautical radio requirement stated across all pathways; operation-dependent.",
        importantDistinctions: "Level 1 Complex builds on Advanced and only covers specified lower-risk BVLOS operations.",
      },
      organisation: {
        operatorRegistrationCertification: "RPOC required for Level 1 Complex operations.",
        manualExpositionRequirements: "SOPs and training documentation are required within the RPOC safety framework.",
        keyPersonnel: "Accountable executive and person responsible for maintenance.",
        safetyRiskSystems: "Documented safety risk management process is required.",
        operationalAuthorisation: "SFOC-RPAS or equivalent pathways for operations beyond routine envelopes.",
      },
      bvlos: {
        routineBvlosAvailability: "Available for specified lower-risk operations under Level 1 Complex limitations.",
        pilotCompetency: "Pilot Certificate - Level 1 Complex Operations.",
        operatorRequirement: "RPOC coverage required.",
        aircraftRequirement: "Applicable small/medium RPAS declaration and aircraft suitability.",
        riskAssessment: "Organisational safety risk process and operation limitations must be met.",
        operationalApproval: "Routine lower-risk through Level 1 Complex; broader BVLOS requires additional approvals such as SFOC-RPAS.",
        majorLimitations: "Uncontrolled airspace, 400 ft AGL or below, aerodrome separation and population-density restrictions.",
      },
    },
    sources: [
      {
        title: "Transport Canada - Drone safety",
        url: "https://tc.canada.ca/en/aviation/drone-safety",
        regulator: "Transport Canada",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "Transport Canada - Find your category of drone operation",
        url: "https://tc.canada.ca/en/aviation/drone-safety/find-your-category-drone-operation",
        regulator: "Transport Canada",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "Transport Canada - Special Flight Operations Certificate for drones",
        url: "https://tc.canada.ca/en/aviation/drone-safety/get-permission-special-drone-operations",
        regulator: "Transport Canada",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
    ],
  },
  {
    country: "United States",
    countrySlug: "united-states",
    regulator: "Federal Aviation Administration (FAA)",
    regulatorUrl: "https://www.faa.gov/uas",
    primaryFramework: "14 CFR Part 107 for routine civil small UAS operations",
    regulatoryModel: "Rule-and-relief model: routine operations under Part 107, with airspace authorisations and waivers for operations outside baseline limits.",
    terminology: ["UAS", "sUAS", "Part 107", "Remote Pilot Certificate", "LAANC", "Waiver", "COA", "SGI"],
    operatorApprovalModel: "No general ReOC-style organisational certificate for routine Part 107 operations; organisations operate through certificated remote pilots and compliant operations.",
    advancedBvlosPathway: "Advanced operations generally rely on Part 107 waivers or other FAA approval pathways, with separate public-safety mechanisms where applicable.",
    pilotQualificationModel: "Remote Pilot Certificate under Part 107 with recurrent requirements for currency.",
    vlosFramework: "Part 107 routine operations are conducted within baseline operating rules including VLOS-aligned requirements.",
    advancedOperationsFramework: "Operations outside baseline Part 107 limitations require FAA relief/authorisation such as waivers.",
    bvlosPathway: "BVLOS generally requires appropriate FAA relief/authorisation when operation cannot comply with VLOS requirements.",
    riskAssessmentFramework: "Safety case and mitigation evidence demonstrated through waiver/authorisation submissions.",
    operationalApprovalRequirement: "Operational relief (waiver/authorisation) is required where missions exceed Part 107 limitations.",
    lastVerified: "2026-09-01",
    confidence: "high",
    detailStatus: "full",
    overviewNote: "Part 107 does not create an Australian-style operator certificate for organisations. Operational authority comes from compliant pilots, rules, and specific approvals where needed.",
    individualPathway: [
      {
        step: 1,
        title: "Obtain Remote Pilot Certificate",
        detail: "Meet FAA requirements for Part 107 remote pilot certification before conducting applicable civil operations.",
      },
      {
        step: 2,
        title: "Maintain recurrent compliance",
        detail: "Complete recurrent requirements to maintain pilot currency under FAA expectations.",
      },
      {
        step: 3,
        title: "Confirm aircraft compliance",
        detail: "Ensure aircraft registration and Remote ID compliance where applicable for the intended mission.",
      },
      {
        step: 4,
        title: "Plan operation under Part 107 rules",
        detail: "Validate the mission against applicable operating limitations and airspace constraints.",
      },
      {
        step: 5,
        title: "Obtain additional relief where required",
        detail: "If mission exceeds Part 107 limitations, support waiver/authorisation application with appropriate mitigations.",
      },
    ],
    organisationPathway: [
      {
        step: 1,
        title: "Define organisational mission set",
        detail: "Determine whether missions fit routine Part 107 or require additional FAA relief pathways.",
      },
      {
        step: 2,
        title: "Assign certificated remote pilots",
        detail: "Use appropriately certificated remote pilots for operations requiring Part 107 pilot credentials.",
      },
      {
        step: 3,
        title: "Maintain aircraft and registration compliance",
        detail: "Ensure aircraft registration, Remote ID, and maintenance controls are appropriate to each operation.",
      },
      {
        step: 4,
        title: "Manage airspace approvals",
        detail: "Use LAANC or other FAA airspace authorisation pathways where required.",
      },
      {
        step: 5,
        title: "Apply for waivers for non-baseline missions",
        detail: "Request Part 107 waivers with alternative mitigations demonstrating acceptable safety.",
      },
      {
        step: 6,
        title: "Public-safety pathways where applicable",
        detail: "Government/public-safety entities may use additional mechanisms such as COA/public aircraft pathways and SGI for qualifying emergencies.",
      },
    ],
    operationSpecificApprovals: [
      {
        label: "Airspace authorisation",
        detail: "When operating in controlled airspace, obtain applicable FAA authorisation, including LAANC-enabled pathways where available.",
      },
      {
        label: "Part 107 waiver",
        detail: "A waiver permits operation outside a specified limitation where the applicant demonstrates an acceptable level of safety with mitigations.",
      },
      {
        label: "Public-safety emergency support",
        detail: "Qualifying public-safety operations may access FAA Special Governmental Interest (SGI) and other governmental pathways.",
      },
    ],
    aircraftTechnicalRequirements: [
      "Aircraft registration is required where applicable.",
      "Remote ID requirements apply where applicable.",
      "Aircraft capability and safety mitigations must align with the specific operation and any waiver conditions.",
    ],
    vlosKeyRequirements: [
      "Routine civil operations generally follow Part 107 baseline rules, including VLOS-aligned operation.",
      "Airspace access in controlled areas requires appropriate FAA authorisation pathways such as LAANC where available.",
      "Pilot certification, aircraft compliance and operational rule adherence are required together.",
    ],
    bvlosComplex: {
      summary: "There is no single blanket nationwide BVLOS licence for routine operations. BVLOS generally requires FAA relief/authorisation when operations exceed VLOS requirements.",
      model: [
        {
          label: "Part 107 baseline check",
          detail: "Determine whether the mission can remain inside baseline Part 107 requirements.",
        },
        {
          label: "Waiver pathway",
          detail: "Submit waiver application with alternative mitigations for operations outside baseline limits.",
        },
        {
          label: "Airspace approval alignment",
          detail: "Obtain required airspace authorisations in addition to waiver relief where relevant.",
        },
        {
          label: "Public-safety pathways",
          detail: "Government/public-safety operators may use COA/public aircraft frameworks and SGI for qualifying emergency missions.",
        },
      ],
      riskElementsHeading: "FAA waiver safety case themes",
      riskElements: [
        {
          label: "ConOps",
          detail: "Describe operational concept, route, altitude, aircraft and crew responsibilities.",
        },
        {
          label: "Hazard controls",
          detail: "Demonstrate mitigations for loss of link, airspace conflicts and people/property risk.",
        },
        {
          label: "Procedural safeguards",
          detail: "Define procedures, contingencies and limitations that maintain acceptable safety.",
        },
      ],
      majorLimitations: [
        "Relief is operation-specific, not generic to all missions.",
        "Airspace authorisation and waiver needs may stack.",
        "Public-safety pathways are distinct from standard commercial Part 107 pathways.",
      ],
      importantDistinction: "A Part 107 waiver is an operational relief instrument, not a pilot licence upgrade.",
    },
    glossary: [
      { term: "Part 107", meaning: "Primary FAA rule framework for routine civil small UAS operations." },
      { term: "Remote Pilot Certificate", meaning: "FAA pilot certification for applicable Part 107 operations." },
      { term: "LAANC", meaning: "Low Altitude Authorization and Notification Capability for qualifying airspace authorisation requests." },
      { term: "Waiver", meaning: "FAA approval to operate outside specified Part 107 limitations with accepted mitigations." },
      { term: "COA", meaning: "Certificate of Authorization used in governmental/public aircraft contexts where applicable." },
      { term: "SGI", meaning: "Special Governmental Interest process for qualifying emergency operations such as firefighting, search and rescue, law enforcement and critical infrastructure restoration." },
    ],
    comparisonProfile: {
      overview: {
        regulatoryModel: "Part 107 baseline with waivers and airspace authorisations for operations outside routine limits.",
        pilotQualificationModel: "Remote Pilot Certificate with recurrent requirements.",
        operatorModel: "No general ReOC-style certificate for routine Part 107 organisations.",
        riskAssessmentFramework: "Waiver safety case with mitigation evidence.",
      },
      individual: {
        entryRoutinePilotRequirements: "Remote Pilot Certificate under Part 107.",
        advancedCompetency: "Operation-specific competency and compliance planning for non-baseline missions.",
        bvlosCompetency: "BVLOS generally requires operational FAA relief beyond baseline pilot certification.",
        radioQualification: "No universal stand-alone aeronautical radio credential requirement across all Part 107 operations.",
        importantDistinctions: "Waiver authority is operation-specific and separate from pilot certificate status.",
      },
      organisation: {
        operatorRegistrationCertification: "No general operator certificate equivalent to ReOC for routine Part 107 operations.",
        manualExpositionRequirements: "Operational procedures and mitigations are required for waivers and internal governance.",
        keyPersonnel: "Appropriately certificated remote pilots and operational oversight roles.",
        safetyRiskSystems: "Mitigation planning and documented controls for mission risk and waiver conditions.",
        operationalAuthorisation: "LAANC/airspace authorisations and waivers where applicable.",
      },
      bvlos: {
        routineBvlosAvailability: "No blanket routine nationwide BVLOS licence in this guide's scope.",
        pilotCompetency: "Part 107 certification plus operation-specific mitigation capability.",
        operatorRequirement: "Organisation must support compliant pilots, aircraft, procedures and relief conditions.",
        aircraftRequirement: "Registered aircraft, Remote ID where applicable, and mission-appropriate technical controls.",
        riskAssessment: "Waiver safety case and mitigation evidence.",
        operationalApproval: "FAA waiver/authorisation as applicable.",
        majorLimitations: "Operation-specific approvals, airspace constraints and evolving BVLOS policy environment.",
      },
    },
    sources: [
      {
        title: "FAA Unmanned Aircraft Systems",
        url: "https://www.faa.gov/uas",
        regulator: "FAA",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "eCFR 14 CFR Part 107",
        url: "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107",
        regulator: "FAA / eCFR",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "FAA Remote ID",
        url: "https://www.faa.gov/uas/getting_started/remote_id",
        regulator: "FAA",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "FAA Public Safety and Government UAS Operations",
        url: "https://www.faa.gov/uas/public_safety_gov",
        regulator: "FAA",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
    ],
  },
  {
    country: "United Kingdom",
    countrySlug: "united-kingdom",
    regulator: "UK Civil Aviation Authority (CAA)",
    regulatorUrl: "https://www.caa.co.uk/drones/",
    primaryFramework: "UK UAS framework: Open, Specific and Certified categories",
    regulatoryModel: "Category model with Open for lower-risk operations, Specific for risk-assessed operations, and Certified where applicable.",
    terminology: ["Open Category", "Specific Category", "Certified Category", "Flyer ID", "A2 CofC", "GVC", "RPC-L1", "RPC-L2", "RPC-L3", "UK SORA", "Operational Authorisation"],
    operatorApprovalModel: "Specific Category operations generally require Operational Authorisation unless an alternative mechanism applies.",
    advancedBvlosPathway: "BVLOS is commonly managed in Specific Category through competency plus operational authorisation, not competency alone.",
    pilotQualificationModel: "Open-category competency includes Flyer ID and A2 CofC where applicable; Specific-category competency includes GVC (transition) and RPC-L1/L2/L3 pathways.",
    vlosFramework: "Open Category supports routine lower-risk VLOS operations when category conditions are met.",
    advancedOperationsFramework: "Specific Category uses risk assessment and authorisation pathways for higher-risk operations.",
    bvlosPathway: "BVLOS commonly sits in Specific Category with authorisation and competency aligned to operation risk and ARC context.",
    riskAssessmentFramework: "UK SORA is the pathway for new Specific Category Operational Authorisation applications from 23 April 2025, replacing OSC for new applications.",
    operationalApprovalRequirement: "Operational Authorisation is required for Specific-category operations where applicable.",
    lastVerified: "2026-09-01",
    confidence: "high",
    detailStatus: "full",
    overviewNote: "RPC competency demonstrates capability but does not, by itself, authorise BVLOS operations.",
    individualPathway: [
      {
        step: 1,
        title: "Determine category",
        detail: "Identify whether operation fits Open, Specific or Certified category frameworks.",
      },
      {
        step: 2,
        title: "Open-category competency",
        detail: "For eligible Open operations, complete Flyer ID and A2 CofC where applicable.",
      },
      {
        step: 3,
        title: "Specific-category competency pathway",
        detail: "Use recognised competencies applicable to operation profile, including GVC during transition and RPC-L1/RPC-L2/RPC-L3 structure.",
      },
      {
        step: 4,
        title: "RPC-L1 scope",
        detail: "RPC-L1 Part A supports VLOS competency; RPC-L1 Part B supports BVLOS with visual mitigations.",
      },
      {
        step: 5,
        title: "RPC-L2 and RPC-L3 scope",
        detail: "RPC-L2 supports appropriate BVLOS operations including ARC-a environments; RPC-L3 supports higher-level competency up to applicable ARC-c operations, each subject to authorisation requirements.",
      },
      {
        step: 6,
        title: "Operate under authorisation",
        detail: "Apply pilot competency under the approved operational authorisation framework.",
      },
    ],
    organisationPathway: [
      {
        step: 1,
        title: "Define operation",
        detail: "Describe aircraft, airspace, operating geography and mission outcomes.",
      },
      {
        step: 2,
        title: "Determine Specific Category applicability",
        detail: "Confirm whether operation requires Specific-category authorisation.",
      },
      {
        step: 3,
        title: "Prepare operational details",
        detail: "Develop procedures, roles and system controls supporting the mission profile.",
      },
      {
        step: 4,
        title: "Conduct UK SORA",
        detail: "Prepare UK SORA risk assessment including ground and air risk, mitigations and assurance claims.",
      },
      {
        step: 5,
        title: "Determine SAIL and mitigations",
        detail: "Establish risk class and required mitigation package from assessment outputs.",
      },
      {
        step: 6,
        title: "Demonstrate compliance",
        detail: "Compile evidence showing operational and technical controls satisfy safety objectives.",
      },
      {
        step: 7,
        title: "Apply for Operational Authorisation",
        detail: "Submit application to UK CAA with risk assessment and compliance evidence.",
      },
      {
        step: 8,
        title: "Operate under granted conditions",
        detail: "Operate only within approved privileges and conditions.",
      },
    ],
    operationSpecificApprovals: [
      {
        label: "Open Category",
        detail: "No operational authorisation is generally required when operation remains inside Open requirements.",
      },
      {
        label: "Specific Category",
        detail: "Operational Authorisation is required where applicable, supported by UK SORA for new applications.",
      },
      {
        label: "Certified pathways",
        detail: "Certified category applies where operation profile and regulation require that higher-assurance framework.",
      },
    ],
    aircraftTechnicalRequirements: [
      "Aircraft capabilities and technical mitigations must align with category and authorisation requirements.",
      "Technical evidence should support UK SORA/authorisation safety objectives where required.",
    ],
    vlosKeyRequirements: [
      "Open Category provides routine VLOS pathways under its applicable limitations.",
      "Specific Category may also include VLOS operations under authorisation conditions.",
      "Pilot competency pathway must match operation category and risk profile.",
    ],
    bvlosComplex: {
      summary: "BVLOS operations generally sit in Specific Category and require operational authorisation and risk evidence. Competency certificates do not independently authorise BVLOS.",
      model: [
        {
          label: "Specific Category determination",
          detail: "Confirm BVLOS operation classification and authorisation pathway.",
        },
        {
          label: "Pilot competency",
          detail: "Use applicable competency pathway, including RPC-L levels or GVC during transition where relevant.",
        },
        {
          label: "UK SORA assessment",
          detail: "Assess operation risk and required mitigations under UK SORA for new applications.",
        },
        {
          label: "CAA authorisation",
          detail: "Operate only when Operational Authorisation has been granted with conditions.",
        },
      ],
      riskElementsHeading: "UK SORA pathway (high level)",
      riskElements: [
        {
          label: "ConOps",
          detail: "Define operational concept and mission boundaries.",
        },
        {
          label: "Risk and SAIL",
          detail: "Determine risk level and assurance requirements.",
        },
        {
          label: "Mitigations and compliance evidence",
          detail: "Demonstrate operational and technical mitigations that satisfy safety objectives.",
        },
      ],
      majorLimitations: [
        "RPC qualification alone is insufficient for BVLOS authority.",
        "Authorisation scope and ARC environment constraints apply.",
        "Operational conditions are set by CAA approval outcome.",
      ],
      importantDistinction: "Competency credentials (for example RPC-L pathways) and operational authorisation are separate regulatory requirements.",
    },
    glossary: [
      { term: "Flyer ID", meaning: "UK CAA competency requirement for applicable pilots/operators in lower-risk categories." },
      { term: "A2 CofC", meaning: "Additional competency credential for applicable Open-category operations." },
      { term: "Specific Category", meaning: "Category for operations requiring risk-based assessment and authorisation." },
      { term: "GVC", meaning: "General VLOS Certificate recognised during transition where applicable." },
      { term: "RPC-L1", meaning: "Remote Pilot Competency level with Part A (VLOS) and Part B (BVLOS with visual mitigations)." },
      { term: "RPC-L2", meaning: "Remote Pilot Competency level supporting appropriate BVLOS operations including ARC-a environments, subject to authorisation." },
      { term: "RPC-L3", meaning: "Higher-level competency supporting BVLOS up to applicable ARC-c operations, subject to authorisation." },
      { term: "UK SORA", meaning: "UK risk assessment method replacing OSC for new Specific Category Operational Authorisation applications from 23 April 2025." },
    ],
    comparisonProfile: {
      overview: {
        regulatoryModel: "Open, Specific and Certified categories with risk-based authorisation in Specific.",
        pilotQualificationModel: "Flyer ID/A2 CofC for applicable Open operations; GVC and RPC-L pathways for Specific operations.",
        operatorModel: "Operational Authorisation model in Specific Category.",
        riskAssessmentFramework: "UK SORA for new Specific-category authorisation applications.",
      },
      individual: {
        entryRoutinePilotRequirements: "Flyer ID and A2 CofC where applicable in Open category.",
        advancedCompetency: "Specific-category competency via GVC transition and RPC-L pathways.",
        bvlosCompetency: "RPC-L1 Part B, RPC-L2 or RPC-L3 may support BVLOS competency depending on operation profile.",
        radioQualification: "No universal standalone radio qualification across all pathways; operation and airspace dependent.",
        importantDistinctions: "RPC competency does not itself authorise BVLOS; Operational Authorisation remains required.",
      },
      organisation: {
        operatorRegistrationCertification: "Specific-category operations require Operational Authorisation where applicable.",
        manualExpositionRequirements: "Operational documentation and risk evidence are required for authorisation submissions.",
        keyPersonnel: "Responsible organisational roles must support competence, procedures and compliance.",
        safetyRiskSystems: "Risk management and mitigations demonstrated through UK SORA and supporting evidence.",
        operationalAuthorisation: "CAA assessment and approval with conditions.",
      },
      bvlos: {
        routineBvlosAvailability: "Generally in Specific Category, not routine Open-category privilege.",
        pilotCompetency: "Appropriate RPC/GVC competency aligned to operation profile.",
        operatorRequirement: "Specific-category organisational authorisation pathway.",
        aircraftRequirement: "Technical capability and mitigations consistent with authorisation evidence.",
        riskAssessment: "UK SORA risk assessment for new applications.",
        operationalApproval: "CAA Operational Authorisation with conditions.",
        majorLimitations: "ARC and approval conditions constrain operations.",
      },
    },
    sources: [
      {
        title: "UK CAA Drones",
        url: "https://www.caa.co.uk/drones/",
        regulator: "UK CAA",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "UK CAA UK SORA overview",
        url: "https://www.caa.co.uk/commercial-industry/airspace/unmanned-aircraft-systems-uas/uk-specific-operations-risk-assessment-sora/",
        regulator: "UK CAA",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
    ],
  },
  {
    country: "New Zealand",
    countrySlug: "new-zealand",
    regulator: "Civil Aviation Authority of New Zealand",
    regulatorUrl: "https://www.aviation.govt.nz/drones/",
    primaryFramework: "Civil Aviation Rules Part 101 and Part 102",
    regulatoryModel: "Dual-rule model: Part 101 for routine lower-risk operations and Part 102 certification for operations outside Part 101 conditions.",
    terminology: ["Part 101", "Part 102", "Unmanned Aircraft Operator Certificate", "JARUS SORA", "VLOS", "BVLOS"],
    operatorApprovalModel: "Part 102 certification is generally required when intended operations cannot comply with Part 101.",
    advancedBvlosPathway: "Qualifying BVLOS can be conducted under Part 101 in accordance with CATI: 101-1; where the operation cannot comply with Part 101/CATI conditions, Part 102 certification is generally required.",
    pilotQualificationModel: "No single mandatory universal commercial remote-pilot licence equivalent to RePL is represented here; competency is operation- and certification-context dependent.",
    vlosFramework: "Part 101 defines baseline operating conditions and normally requires visual contact, except for permitted mechanisms including qualifying BVLOS operations conducted in accordance with CATI: 101-1.",
    advancedOperationsFramework: "Part 102 framework supports deviations from Part 101 through certified organisational controls and approved operations specifications.",
    bvlosPathway: "A qualifying BVLOS operation may be conducted under Part 101 where all relevant Part 101 requirements and CATI: 101-1 conditions are satisfied. If not, Part 102 certification/approval is generally required.",
    riskAssessmentFramework: "Part 102 risk management and, for some very complex applications, CAA NZ may request JARUS SORA.",
    operationalApprovalRequirement: "If operation does not comply with Part 101, Part 102 certification and approved operations specification are generally required.",
    lastVerified: "2026-09-01",
    confidence: "high",
    detailStatus: "full",
    overviewNote: "Part 101 and Part 102 are distinct pathways. Not every Part 102 application automatically requires SORA.",
    individualPathway: [
      {
        step: 1,
        title: "Assess if operation fits Part 101",
        detail: "Confirm mission can meet all applicable Part 101 requirements for routine lower-risk operations.",
      },
      {
        step: 2,
        title: "Meet Part 101 pilot responsibilities",
        detail: "Operate safely with required situational awareness, airspace compliance and operational discipline under Part 101 rules, including visual-contact expectations unless a permitted mechanism applies.",
      },
      {
        step: 3,
        title: "Use qualifying Part 101 BVLOS pathway where applicable",
        detail: "Where the operation qualifies, conduct BVLOS in accordance with CATI: 101-1 and all relevant Part 101 conditions.",
      },
      {
        step: 4,
        title: "Escalate to Part 102 where needed",
        detail: "If mission cannot remain compliant with Part 101 or applicable CATI conditions, operate under an organisation with Part 102 certification.",
      },
      {
        step: 5,
        title: "Align competency to certified operation",
        detail: "Pilot competency requirements are set by the Part 102 operator exposition and approved operating model.",
      },
    ],
    organisationPathway: [
      {
        step: 1,
        title: "Define intended operation",
        detail: "Describe mission profiles, aircraft and operating environments.",
      },
      {
        step: 2,
        title: "Identify deviations from Part 101",
        detail: "Document exactly which Part 101 conditions the operation cannot meet.",
      },
      {
        step: 3,
        title: "Assess operational risks",
        detail: "Analyse hazards and risk controls for the proposed operation profile.",
      },
      {
        step: 4,
        title: "Develop operator exposition/operational manual",
        detail: "Document how operations are actually conducted, managed and supervised.",
      },
      {
        step: 5,
        title: "Nominate person with primary responsibility",
        detail: "Nominate accountable leadership for operational compliance and safety management.",
      },
      {
        step: 6,
        title: "Create hazard and risk-management processes",
        detail: "Define ongoing hazard identification, mitigation and continuous-improvement controls.",
      },
      {
        step: 7,
        title: "Complete Part 102 application",
        detail: "Submit the application and supporting exposition material to CAA NZ.",
      },
      {
        step: 8,
        title: "Complete compliance matrix",
        detail: "Provide compliance mapping demonstrating how rules and safety outcomes are met.",
      },
      {
        step: 9,
        title: "CAA assessment",
        detail: "Support regulator assessment and provide clarifications as required.",
      },
      {
        step: 10,
        title: "Operate under approved certificate/specifications",
        detail: "Use granted operations specification and conditions if approved.",
      },
    ],
    operationSpecificApprovals: [
      {
        label: "Part 101 pathway",
        detail: "Use when all baseline Part 101 rules are met, including qualifying BVLOS operations conducted in accordance with CATI: 101-1.",
      },
      {
        label: "Part 102 certification",
        detail: "Use when mission requires deviations from Part 101 or cannot comply with the applicable Part 101/CATI pathway.",
      },
      {
        label: "Very complex applications",
        detail: "CAA NZ may request additional structured risk evidence such as JARUS SORA for some very complex cases (for example some BVLOS/large-drone scenarios).",
      },
    ],
    aircraftTechnicalRequirements: [
      "Aircraft suitability must align with Part 101 or Part 102 operation profile.",
      "Technical and maintenance controls are defined in the Part 102 exposition where certification applies.",
      "Very complex missions may require additional technical evidence.",
    ],
    vlosKeyRequirements: [
      "Part 101 governs routine lower-risk operations when all applicable rules are met.",
      "Part 101 normally requires remote pilots to maintain visual contact, except where permitted mechanisms apply, including qualifying BVLOS operations conducted in accordance with CATI: 101-1.",
      "Operational limitations include aircraft mass, safe operation, people/property protection, airspace and altitude controls, aerodrome considerations and applicable Part 101/CATI conditions.",
      "If these cannot be met, transition to Part 102 pathway.",
    ],
    bvlosComplex: {
      summary: "New Zealand has a qualifying Part 101 BVLOS pathway under CATI: 101-1. Where an operation cannot comply with Part 101/CATI conditions, Part 102 certification and approval remain the pathway.",
      model: [
        {
          label: "Part 101 and CATI fit assessment",
          detail: "Confirm whether operation can be conducted under Part 101, including qualifying BVLOS conditions in CATI: 101-1.",
        },
        {
          label: "Part 101 BVLOS pathway",
          detail: "If all relevant conditions are satisfied, conduct qualifying BVLOS under Part 101 in accordance with CATI: 101-1.",
        },
        {
          label: "Part 102 certified pathway",
          detail: "Use certified operator framework when operation cannot comply with Part 101/CATI conditions.",
        },
        {
          label: "Risk evidence scaling",
          detail: "Provide risk evidence and mitigations proportionate to operation complexity.",
        },
        {
          label: "CAA NZ determination",
          detail: "CAA NZ may request additional methods such as JARUS SORA for some very complex operations.",
        },
      ],
      riskElementsHeading: "Complex-application assessment themes",
      riskElements: [
        {
          label: "Part 101/CATI eligibility",
          detail: "Show whether operation can be run under qualifying Part 101/CATI conditions or needs Part 102.",
        },
        {
          label: "Risk controls",
          detail: "Operational and technical safeguards proportional to complexity.",
        },
        {
          label: "Assurance evidence",
          detail: "Evidence supporting safe conduct of the proposed complex mission.",
        },
      ],
      majorLimitations: [
        "Part 101 BVLOS pathway is conditional and not unrestricted/general BVLOS.",
        "Part 102 certification is generally required where operation cannot comply with Part 101/CATI conditions.",
        "Not every Part 102 application requires SORA.",
        "CAA NZ determines additional evidence requirements case-by-case.",
      ],
      importantDistinction: "BVLOS in New Zealand is not automatically Part 102: qualifying BVLOS can occur under Part 101 via CATI: 101-1, while non-qualifying operations use Part 102 pathways.",
    },
    glossary: [
      { term: "Part 101", meaning: "Rule set for routine lower-risk unmanned aircraft operations when all applicable conditions are met." },
      { term: "CATI: 101-1", meaning: "Civil Aviation Technical Instruction pathway referenced by CAA NZ for qualifying BVLOS operations under Part 101." },
      { term: "Part 102", meaning: "Certification framework for operations that cannot fully comply with Part 101." },
      { term: "Exposition", meaning: "Documented description of how the operator conducts operations and manages risk." },
      { term: "Compliance Matrix", meaning: "Structured mapping showing how the operator meets applicable regulatory requirements." },
      { term: "JARUS SORA", meaning: "Risk assessment methodology that CAA NZ may request for some very complex applications." },
    ],
    comparisonProfile: {
      overview: {
        regulatoryModel: "Part 101 routine pathway plus Part 102 certification pathway for operations outside Part 101.",
        pilotQualificationModel: "No single universal RePL-equivalent requirement in this guide scope; competency tied to operation/certification context.",
        operatorModel: "Part 102 operator certification when operations cannot comply with Part 101.",
        riskAssessmentFramework: "Part 102 risk framework; JARUS SORA may be requested for very complex cases.",
      },
      individual: {
        entryRoutinePilotRequirements: "Part 101 operational competency responsibilities for routine operations.",
        advancedCompetency: "Competency for advanced missions is defined within Part 102 certified operation framework.",
        bvlosCompetency: "BVLOS competency is operation-specific: qualifying BVLOS may be conducted under Part 101/CATI: 101-1, otherwise under Part 102 approvals where required.",
        radioQualification: "No universal stand-alone radio credential stated here across all pathways; operation dependent.",
        importantDistinctions: "Part 101 can include qualifying BVLOS under CATI: 101-1; Part 102 remains the pathway when Part 101/CATI conditions cannot be met. Part 102 is not an automatic SORA requirement.",
      },
      organisation: {
        operatorRegistrationCertification: "Part 102 Unmanned Aircraft Operator Certificate pathway.",
        manualExpositionRequirements: "Operator exposition/operational manual and compliance matrix are core requirements.",
        keyPersonnel: "Person with primary responsibility and defined operational accountabilities.",
        safetyRiskSystems: "Documented hazard and risk-management process.",
        operationalAuthorisation: "CAA NZ assessment and approved operations specification/certificate where granted.",
      },
      bvlos: {
        routineBvlosAvailability: "Qualifying BVLOS can occur under Part 101 in accordance with CATI: 101-1; not unrestricted/general BVLOS.",
        pilotCompetency: "Competency must align to the applicable pathway: Part 101/CATI conditions for qualifying operations, or Part 102-approved framework for non-qualifying operations.",
        operatorRequirement: "Part 102 certified operator is generally required where operation cannot comply with Part 101/CATI pathway.",
        aircraftRequirement: "Aircraft capability and controls must satisfy applicable Part 101/CATI conditions or Part 102 approval conditions.",
        riskAssessment: "Part 102 risk controls apply when using Part 102 pathway; CAA NZ may request JARUS SORA for some very complex applications.",
        operationalApproval: "Part 101 qualifying BVLOS is condition-based under CATI: 101-1; non-qualifying operations use Part 102 certification/approval.",
        majorLimitations: "Part 101 BVLOS is conditional, and Part 102/SORA requirements are case-dependent for more complex operations.",
      },
    },
    sources: [
      {
        title: "CAA New Zealand - Part 101 rules for drones",
        url: "https://www.aviation.govt.nz/drones/regulations/part-101-rules-for-drones/",
        regulator: "CAA NZ",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "CAA New Zealand - Drones",
        url: "https://www.aviation.govt.nz/drones/",
        regulator: "CAA NZ",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "CAA New Zealand - Advisory Circular AC101-1",
        url: "https://www.aviation.govt.nz/rules/advisory-circulars/show/AC101-1/",
        regulator: "CAA NZ",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "CAA New Zealand - Part 102 Certification",
        url: "https://www.aviation.govt.nz/drones/part-102-certification/",
        regulator: "CAA NZ",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
    ],
  },
  {
    country: "European Union",
    countrySlug: "european-union",
    regulator: "EASA and National Aviation Authorities",
    regulatorUrl: "https://www.easa.europa.eu/en/domains/civil-drones-rpas",
    primaryFramework: "Regulation (EU) 2019/947 and Regulation (EU) 2019/945",
    regulatoryModel: "EU framework coordinated by EASA with many operational authorisations handled by National Aviation Authorities (NAA).",
    terminology: ["Open", "Specific", "Certified", "A1", "A2", "A3", "STS", "PDRA", "SORA", "LUC", "NAA"],
    operatorApprovalModel: "Operators follow category-specific obligations. Specific-category authorisations are usually handled through national authorities under the EU framework.",
    advancedBvlosPathway: "BVLOS is commonly Specific category, with pathway chosen from STS, PDRA, SORA or LUC privileges depending on the operation.",
    pilotQualificationModel: "Pilot competency and training depend on category and operation profile under EU and national implementation.",
    vlosFramework: "Open category supports lower-risk routine operations in A1/A2/A3 without operational authorisation when requirements are met.",
    advancedOperationsFramework: "Specific category covers higher-risk operations outside Open limits and requires declaration/authorisation pathways.",
    bvlosPathway: "BVLOS generally falls within Specific category, but does not always require full SORA because STS/PDRA/LUC pathways may apply.",
    riskAssessmentFramework: "Specific-category risk pathways include STS declarations, PDRA-based authorisation, SORA where appropriate, and LUC privileges.",
    operationalApprovalRequirement: "Specific-category operations require declaration or authorisation through the relevant NAA pathway.",
    lastVerified: "2026-09-01",
    confidence: "high",
    detailStatus: "full",
    overviewNote: "EU is a multi-authority model. EASA sets common framework; National Aviation Authorities grant many operational authorisations.",
    individualPathway: [
      {
        step: 1,
        title: "Determine operational category",
        detail: "Identify whether operation is Open, Specific or Certified under EU framework.",
      },
      {
        step: 2,
        title: "Open-category competency",
        detail: "For A1/A2/A3 operations, complete applicable competency/training under national implementation of EU rules.",
      },
      {
        step: 3,
        title: "Specific-category competency",
        detail: "For operations outside Open, align pilot competency with STS/PDRA/SORA/LUC pathway requirements.",
      },
      {
        step: 4,
        title: "Operate under approved pathway",
        detail: "Pilot activities must remain inside conditions of the declared or authorised operation.",
      },
    ],
    organisationPathway: [
      {
        step: 1,
        title: "Register operator where applicable",
        detail: "Complete operator registration requirements relevant to operation and jurisdiction.",
      },
      {
        step: 2,
        title: "Define operation",
        detail: "Document mission profile, location, airspace and aircraft use-case.",
      },
      {
        step: 3,
        title: "Determine category",
        detail: "Classify mission as Open, Specific or Certified.",
      },
      {
        step: 4,
        title: "Select Specific-category pathway where needed",
        detail: "Choose STS declaration, PDRA authorisation, SORA authorisation or LUC privilege route as applicable.",
      },
      {
        step: 5,
        title: "Prepare operations manual and evidence",
        detail: "Prepare documentation, risk evidence and compliance artefacts required by the selected pathway.",
      },
      {
        step: 6,
        title: "Apply to relevant NAA",
        detail: "Submit declaration or authorisation package to the responsible National Aviation Authority.",
      },
      {
        step: 7,
        title: "Operate under granted privileges",
        detail: "Operate within approved scope, limitations and ongoing compliance requirements.",
      },
    ],
    operationSpecificApprovals: [
      {
        label: "Open category",
        detail: "No operational authorisation is generally required when fully inside Open-category requirements.",
      },
      {
        label: "Specific category",
        detail: "Use STS declaration, PDRA authorisation, SORA authorisation or LUC privileges depending on operation profile.",
      },
      {
        label: "Certified category",
        detail: "Certified pathway applies for operations that meet higher-assurance thresholds under EU framework.",
      },
    ],
    aircraftTechnicalRequirements: [
      "Aircraft and product requirements map to EU framework obligations and category/pathway selection.",
      "Containment and technical mitigations are part of Specific-category evidence where required.",
      "National authority expectations may vary in implementation details under EU framework.",
    ],
    vlosKeyRequirements: [
      "Open category A1/A2/A3 supports lower-risk operations without operational authorisation when all requirements are met.",
      "Operations outside Open limitations transition to Specific-category mechanisms.",
      "Pilot competency and operator compliance obligations scale with category and pathway.",
    ],
    bvlosComplex: {
      summary: "BVLOS is usually managed in Specific category through the mechanism that fits the operation: STS, PDRA, SORA, or LUC privileges.",
      model: [
        {
          label: "Category fit",
          detail: "Confirm BVLOS operation is treated under Specific category pathway.",
        },
        {
          label: "Pathway selection",
          detail: "Select STS, PDRA, SORA or LUC route based on operation profile and national process.",
        },
        {
          label: "Risk and compliance evidence",
          detail: "Prepare evidence required by selected pathway, including operations documentation and mitigations.",
        },
        {
          label: "NAA authorisation",
          detail: "Submit to relevant NAA and operate within authorised privileges.",
        },
      ],
      riskElementsHeading: "SORA-style assessment themes (where SORA pathway is used)",
      riskElements: [
        {
          label: "ConOps",
          detail: "Define mission concept, environment and operating boundaries.",
        },
        {
          label: "Ground risk and air risk",
          detail: "Assess both ground exposure and airspace interaction risk.",
        },
        {
          label: "Mitigations and SAIL",
          detail: "Define mitigations and operational safety objectives linked to assessed SAIL.",
        },
        {
          label: "Containment and technical controls",
          detail: "Provide containment and technical evidence supporting claimed risk reductions.",
        },
      ],
      majorLimitations: [
        "EU authorisation is not issued by a single central national-style authority.",
        "Not all BVLOS operations require full SORA; STS/PDRA/LUC may apply.",
        "National implementation and privileges can vary across member states.",
      ],
      importantDistinction: "EU uses a multi-pathway Specific-category model for BVLOS, not a single one-size-fits-all licence route.",
    },
    glossary: [
      { term: "Open Category", meaning: "Lower-risk operations framework including A1, A2 and A3 subcategories." },
      { term: "Specific Category", meaning: "Risk-based category for operations outside Open limits, including many BVLOS missions." },
      { term: "STS", meaning: "Standard Scenario declaration pathway under EU framework where conditions are met." },
      { term: "PDRA", meaning: "Pre-Defined Risk Assessment pathway for eligible operations requiring authorisation." },
      { term: "SORA", meaning: "Specific Operations Risk Assessment method used where appropriate to support authorisation." },
      { term: "LUC", meaning: "Light UAS Operator Certificate with privileges that can include defined self-authorisation capabilities." },
      { term: "NAA", meaning: "National Aviation Authority responsible for many operator authorisations under EU framework." },
    ],
    comparisonProfile: {
      overview: {
        regulatoryModel: "EASA-administered EU framework with NAA-delivered authorisations.",
        pilotQualificationModel: "Category-dependent competency requirements under EU/national implementation.",
        operatorModel: "Registration plus category/pathway obligations with NAA oversight.",
        riskAssessmentFramework: "STS, PDRA, SORA or LUC privileges depending on operation.",
      },
      individual: {
        entryRoutinePilotRequirements: "Open-category competency aligned to A1/A2/A3 requirements.",
        advancedCompetency: "Specific-category competency aligned to selected pathway and operation profile.",
        bvlosCompetency: "BVLOS competency is linked to Specific-category pathway conditions.",
        radioQualification: "No universal EU-wide standalone radio credential across all categories; operation and national context dependent.",
        importantDistinctions: "EU is multi-authority and pathway-driven; BVLOS route depends on STS/PDRA/SORA/LUC context.",
      },
      organisation: {
        operatorRegistrationCertification: "Operator registration where applicable; authorisation via NAA when required.",
        manualExpositionRequirements: "Operations documentation and evidence required for chosen Specific-category pathway.",
        keyPersonnel: "Organisational accountability roles defined per national implementation and pathway.",
        safetyRiskSystems: "Risk and mitigation evidence matched to pathway (STS/PDRA/SORA/LUC).",
        operationalAuthorisation: "NAA declaration/authorisation process for Specific-category operations.",
      },
      bvlos: {
        routineBvlosAvailability: "Generally Specific-category, pathway-dependent.",
        pilotCompetency: "Competency requirements defined by selected pathway and operation profile.",
        operatorRequirement: "Registered/authorised operator under relevant NAA process.",
        aircraftRequirement: "Aircraft and technical controls aligned to category and pathway obligations.",
        riskAssessment: "STS/PDRA/SORA/LUC-dependent risk framework.",
        operationalApproval: "NAA declaration/authorisation or LUC privileges as applicable.",
        majorLimitations: "Member-state implementation differences and pathway conditions apply.",
      },
    },
    sources: [
      {
        title: "EASA Civil Drones",
        url: "https://www.easa.europa.eu/en/domains/civil-drones-rpas",
        regulator: "EASA",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "Regulation (EU) 2019/947",
        url: "https://eur-lex.europa.eu/eli/reg_impl/2019/947/oj",
        regulator: "European Union",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "Regulation (EU) 2019/945",
        url: "https://eur-lex.europa.eu/eli/reg_del/2019/945/oj",
        regulator: "European Union",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
    ],
  },
  {
    country: "South Africa",
    countrySlug: "south-africa",
    regulator: "South African Civil Aviation Authority",
    regulatorUrl: "https://www.caa.co.za/Pages/Unmanned-Aircraft-Systems.aspx",
    primaryFramework: "Civil Aviation Regulations - Part 101 RPAS framework",
    regulatoryModel: "SACAA Part 101 framework with operator and pilot pathways under regulator-controlled approvals.",
    terminology: ["RPAS", "RPA", "RPL", "ROC", "VLOS", "EVLOS", "BVLOS", "Part 101"],
    operatorApprovalModel: "Organisation/operator requirements are regulated by SACAA Part 101 pathways; specific detailed process elements remain under verification in this guide.",
    advancedBvlosPathway: "Advanced and BVLOS operations are regulator-controlled and require explicit SACAA approval pathways.",
    pilotQualificationModel: "RPL terminology is used in the South African framework; detailed pilot pathway sequencing is marked where verification is still required.",
    vlosFramework: "Part 101 includes baseline VLOS operation concepts; full condition matrix is verification-required in this guide version.",
    advancedOperationsFramework: "Advanced operations are managed through SACAA approvals with supporting compliance evidence.",
    bvlosPathway: "BVLOS pathways exist under SACAA oversight; detailed routine-versus-complex segmentation remains verification-required.",
    riskAssessmentFramework: "Verification required",
    operationalApprovalRequirement: "Operation-level SACAA approvals are required for advanced profiles; detailed procedural sequence is verification-required.",
    lastVerified: "2026-08-31",
    confidence: "verification-required",
    detailStatus: "full",
    detailVerificationNote: "Some South African pathway detail is still verification-required and is explicitly marked below.",
    overviewNote: "This guide intentionally avoids assumptions where primary-source detail has not yet been validated.",
    individualPathway: [
      {
        step: 1,
        title: "Confirm operation classification",
        detail: "Identify whether intended operation remains within routine VLOS profile or requires advanced approval pathways.",
      },
      {
        step: 2,
        title: "Pilot credential alignment",
        detail: "Align pilot credentialing (including RPL-related concepts) to operation profile. Detailed sequence: Verification required.",
      },
      {
        step: 3,
        title: "Operate within approved privileges",
        detail: "Pilot must operate within permissions tied to approved operation type and organisational authority.",
      },
    ],
    organisationPathway: [
      {
        step: 1,
        title: "Define operation and risk profile",
        detail: "Document intended operation profile and whether advanced approvals are required.",
      },
      {
        step: 2,
        title: "Operator certification pathway",
        detail: "ROC terminology applies in the framework. Detailed document sequence and submission workflow: Verification required.",
      },
      {
        step: 3,
        title: "Safety governance controls",
        detail: "Implement operational procedures and safety controls suitable for mission risk and SACAA requirements.",
      },
      {
        step: 4,
        title: "Apply for operation-level approval",
        detail: "Seek operation-specific approvals for advanced or BVLOS operations.",
      },
    ],
    operationSpecificApprovals: [
      {
        label: "Routine VLOS",
        detail: "Part 101 baseline VLOS concepts apply; detailed operating-condition matrix in this guide is Verification required.",
      },
      {
        label: "Advanced and BVLOS",
        detail: "Advanced profiles require SACAA operation-specific approval pathways.",
      },
      {
        label: "Complex approval details",
        detail: "Detailed process sequencing, criteria and evidence thresholds: Verification required.",
      },
    ],
    aircraftTechnicalRequirements: [
      "Aircraft and technical controls must meet SACAA expectations for operation type.",
      "Detailed aircraft declaration/classification requirements: Verification required.",
    ],
    vlosKeyRequirements: [
      "Part 101 VLOS framework applies for routine operations.",
      "Detailed altitude/airspace/location condition matrix in this guide: Verification required.",
    ],
    bvlosComplex: {
      summary: "BVLOS is not treated as a simple pilot licence progression. It is an operation-level approval context under SACAA oversight.",
      model: [
        {
          label: "Pilot competency",
          detail: "Pilot competency must align to operation profile; detailed competency matrix: Verification required.",
        },
        {
          label: "Operator approval",
          detail: "Organisation must hold the applicable approval framework; detailed ROC process specifics: Verification required.",
        },
        {
          label: "Operational safety case",
          detail: "Operation-level submission and regulator assessment is required for advanced profiles.",
        },
      ],
      riskElementsHeading: "BVLOS and complex-operation evidence",
      riskElements: [
        {
          label: "Operational concept",
          detail: "Verification required for detailed SACAA-accepted format requirements.",
        },
        {
          label: "Risk controls",
          detail: "Verification required for detailed mandated control framework in this guide version.",
        },
        {
          label: "Approval conditions",
          detail: "Verification required for full conditional matrix by operation type.",
        },
      ],
      majorLimitations: [
        "Several detailed SACAA pathway specifics are still verification-required.",
        "No assumptions are made where official source detail has not yet been validated.",
      ],
      importantDistinction: "BVLOS approval requirements are operation-specific and cannot be represented as a single pilot-licence-only pathway.",
    },
    glossary: [
      { term: "SACAA", meaning: "South African Civil Aviation Authority." },
      { term: "RPAS", meaning: "Remotely Piloted Aircraft System." },
      { term: "RPL", meaning: "Remote Pilot Licence terminology used in South African context." },
      { term: "ROC", meaning: "Remote Operator Certificate terminology used in South African context." },
      { term: "BVLOS", meaning: "Beyond Visual Line of Sight operations requiring operation-level regulatory oversight." },
    ],
    comparisonProfile: {
      overview: {
        regulatoryModel: "SACAA Part 101 framework with operation-level approvals for advanced profiles.",
        pilotQualificationModel: "RPL-based competency concepts with some detailed sequencing verification-required.",
        operatorModel: "ROC-based organisational pathway with some detailed process elements verification-required.",
        riskAssessmentFramework: "Verification required.",
      },
      individual: {
        entryRoutinePilotRequirements: "Part 101-aligned routine operation context.",
        advancedCompetency: "Advanced competency detail: Verification required.",
        bvlosCompetency: "Operation-linked competency requirements; detailed matrix verification-required.",
        radioQualification: "Verification required.",
        importantDistinctions: "Guide intentionally flags unverified details rather than inferring requirements.",
      },
      organisation: {
        operatorRegistrationCertification: "ROC pathway under SACAA framework; detailed sequence verification-required.",
        manualExpositionRequirements: "Verification required.",
        keyPersonnel: "Verification required.",
        safetyRiskSystems: "Verification required.",
        operationalAuthorisation: "Operation-level approval required for advanced profiles; detailed criteria verification-required.",
      },
      bvlos: {
        routineBvlosAvailability: "Verification required.",
        pilotCompetency: "Verification required.",
        operatorRequirement: "ROC context applies; detailed requirement matrix verification-required.",
        aircraftRequirement: "Verification required.",
        riskAssessment: "Verification required.",
        operationalApproval: "SACAA operation-level pathway applies; detailed process verification-required.",
        majorLimitations: "Multiple detailed elements remain verification-required in this version.",
      },
    },
    sources: [
      {
        title: "SACAA Unmanned Aircraft Systems",
        url: "https://www.caa.co.za/Pages/Unmanned-Aircraft-Systems.aspx",
        regulator: "SACAA",
        lastVerified: "2026-08-31",
        confidence: "verification-required",
      },
    ],
  },
];

export function listRegulatoryGuides(): RegulatoryGuide[] {
  return regulatoryGuides;
}

export function getRegulatoryGuideBySlug(countrySlug: string): RegulatoryGuide | undefined {
  return regulatoryGuides.find((item) => item.countrySlug === countrySlug);
}
