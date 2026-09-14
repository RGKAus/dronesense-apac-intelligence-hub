export type ProcurementConfidence = "confirmed" | "high" | "medium" | "verification-required";

export type ProcurementDetailStatus = "full" | "verification-pending";

export type ProcurementSource = {
  title: string;
  url: string;
  authority: string;
  lastVerified: string;
  confidence: ProcurementConfidence;
};

export type OpportunityPortal = {
  name: string;
  url: string;
  jurisdiction: string;
  whatAppears: string;
  searchGuidance: string;
};

export type ProcurementMethod = {
  name: string;
  detail: string;
};

export type ProcurementThreshold = {
  label: string;
  valueRange: string;
  method: string;
  detail: string;
};

export type TypicalTimescale = {
  label: string;
  range: string;
  note: string;
};

export type ProcurementLifecycleStep = {
  step: number;
  title: string;
  procurementView: string;
  salesView: string;
  preTender: boolean;
  commercialRelevance?: string;
};

export type GlossaryItem = {
  term: string;
  meaning: string;
};

export type StateOrRegionSummary = {
  name: string;
  slug: string;
  detailStatus: ProcurementDetailStatus;
  note: string;
};

export type ProcurementGuide = {
  country: string;
  countrySlug: string;
  procurementAuthority: string;
  framework: string;
  frameworkUrl?: string;
  procurementModel: string;
  detailStatus: ProcurementDetailStatus;
  detailVerificationNote?: string;
  opportunityPortals: OpportunityPortal[];
  procurementMethods: ProcurementMethod[];
  thresholds: ProcurementThreshold[];
  procurementLifecycle: ProcurementLifecycleStep[];
  supplierEngagement: string[];
  panelsAndFrameworks: string[];
  localSupplierRules: string[];
  typicalTimescales: TypicalTimescale[];
  terminology: GlossaryItem[];
  sources: ProcurementSource[];
  lastVerified: string;
  confidence: ProcurementConfidence;
  statesOrRegions: StateOrRegionSummary[];
};

export type CommonwealthGuide = {
  name: string;
  authority: string;
  framework: string;
  frameworkUrl: string;
  opportunityPortal: OpportunityPortal;
  thresholds: ProcurementThreshold[];
  procurementMethods: ProcurementMethod[];
  localSupplierConsideration: string;
  journey: string[];
  transparencyNote: string;
  typicalTimescales: TypicalTimescale[];
  sources: ProcurementSource[];
  lastVerified: string;
  confidence: ProcurementConfidence;
};

export type WesternAustraliaGuide = {
  name: string;
  authority: string;
  framework: string;
  frameworkUrl: string;
  frameworkEffectiveDate: string;
  opportunityPortal: OpportunityPortal;
  thresholds: ProcurementThreshold[];
  approachToMarketRequirements: string[];
  contractFormGuidance: string[];
  waipsCallout: string;
  procurementMethods: ProcurementMethod[];
  journey: string[];
  typicalTimescales: TypicalTimescale[];
  sources: ProcurementSource[];
  lastVerified: string;
  confidence: ProcurementConfidence;
};

export type AustralianStateProcurementGuide = {
  name: string;
  slug: string;
  authority: string;
  framework: string;
  frameworkUrl?: string;
  opportunityPortal: OpportunityPortal;
  procurementModel: string;
  howItWorks: string[];
  procurementMethods: ProcurementMethod[];
  thresholds: ProcurementThreshold[];
  decisionFactors: string[];
  panelsAndArrangements: string[];
  localIndustryPolicies: string[];
  earlyIntelligenceNotes: string[];
  suggestedSubmissionPeriods?: string[];
  internationalAgreementThresholds?: ProcurementThreshold[];
  approachToMarketRequirements?: string[];
  contractFormGuidance?: string[];
  procurementLifecycle: ProcurementLifecycleStep[];
  typicalTimescales: TypicalTimescale[];
  terminology: GlossaryItem[];
  sources: ProcurementSource[];
  lastVerified: string;
  confidence: ProcurementConfidence;
  detailStatus: ProcurementDetailStatus;
  verificationNotes?: string[];
};

export const procurementIntelligenceTypes: string[] = [
  "Upcoming Tender",
  "Open Tender",
  "Contract Award",
  "Contract Extension",
  "Panel Opportunity",
  "Standing Offer",
  "Market Sounding",
  "Request for Information",
  "Expression of Interest",
  "Budget Allocation",
  "Procurement Plan",
  "Expiring Contract",
];

const australiaLifecycle: ProcurementLifecycleStep[] = [
  {
    step: 1,
    title: "Need Identified",
    procurementView: "Agency identifies an operational requirement, capability gap or risk that may require procurement.",
    salesView: "Potential early opportunity. Understand the operational pain point, likely stakeholders and existing capability constraints.",
    preTender: true,
    commercialRelevance: "Early supplier education, problem framing and contextual capability discussions may be possible under agency probity rules.",
  },
  {
    step: 2,
    title: "Internal Planning",
    procurementView: "Agency explores initial scope, governance, risk and whether existing arrangements could meet the need.",
    salesView: "Map decision-makers, internal sponsors and incumbent relationships. Position relevant evidence from comparable deployments.",
    preTender: true,
    commercialRelevance: "Relevant engagement can include technical briefings and capability awareness without influencing formal outcomes.",
  },
  {
    step: 3,
    title: "Business Case / Funding",
    procurementView: "Agency validates value, options and affordability before committing to a procurement pathway.",
    salesView: "Track funding signals, investment cycles and expected commercial model to estimate realistic timing.",
    preTender: true,
    commercialRelevance: "Pilots or trials may inform feasibility where agencies permit market engagement.",
  },
  {
    step: 4,
    title: "Market Research / Early Engagement",
    procurementView: "Agency may test market capability and gather information to refine approach-to-market planning.",
    salesView: "Strong stage for demonstrations, technical workshops, proof-of-concept discussions and partner coordination, subject to agency rules.",
    preTender: true,
    commercialRelevance: "Focus on legitimate supplier education and capability validation, not exclusionary requirement-shaping.",
  },
  {
    step: 5,
    title: "Procurement Strategy",
    procurementView: "Agency sets procurement method, risk controls and documentation approach.",
    salesView: "Opportunity profile becomes clearer: likely route, competitors, compliance burden and partner strategy.",
    preTender: true,
    commercialRelevance: "Commercial teams can prepare compliant value propositions aligned to probable method and timeline.",
  },
  {
    step: 6,
    title: "Approach to Market",
    procurementView: "Formal approach begins through open, limited or arrangement-based method as applicable.",
    salesView: "Opportunity is now structured. Focus shifts to compliant response quality, evidence and commercial terms.",
    preTender: false,
  },
  {
    step: 7,
    title: "Supplier Response",
    procurementView: "Suppliers submit responses aligned to stated requirements and conditions.",
    salesView: "Execution discipline matters: response quality, traceability to requirements and clear differentiation.",
    preTender: false,
  },
  {
    step: 8,
    title: "Evaluation",
    procurementView: "Agency evaluates offers against published criteria and value-for-money considerations.",
    salesView: "Influence should be limited. Engage only through formal channels and timely clarifications.",
    preTender: false,
  },
  {
    step: 9,
    title: "Negotiation / Preferred Supplier",
    procurementView: "Agency may undertake clarifications, due diligence and negotiation with preferred respondent(s).",
    salesView: "Prepare implementation confidence, contractual responsiveness and risk-reduction commitments.",
    preTender: false,
  },
  {
    step: 10,
    title: "Contract Award",
    procurementView: "Contract is executed and reporting obligations apply where required.",
    salesView: "Transition to onboarding, delivery governance and future expansion/renewal positioning.",
    preTender: false,
  },
  {
    step: 11,
    title: "Implementation",
    procurementView: "Solution rollout, acceptance and operational integration occurs.",
    salesView: "Delivery quality now drives reference value, stakeholder trust and downstream growth opportunities.",
    preTender: false,
  },
  {
    step: 12,
    title: "Contract Management / Renewal",
    procurementView: "Agency manages performance, variations, extensions and re-procurement planning.",
    salesView: "Track performance metrics, upcoming expiry windows and options for renewal or competitive rebid.",
    preTender: false,
  },
];

function createStateLifecycle(overrides: Partial<Record<number, string>>): ProcurementLifecycleStep[] {
  return australiaLifecycle.map((step) => {
    const override = overrides[step.step];
    if (!override) return step;
    return {
      ...step,
      salesView: override,
    };
  });
}

const australiaTimescales: TypicalTimescale[] = [
  {
    label: "Direct/simple purchase",
    range: "Days to several weeks",
    note: "Indicative only - varies by agency, complexity, value and procurement method.",
  },
  {
    label: "Limited sourcing / RFQ",
    range: "Several weeks to a few months",
    note: "Indicative only - varies by agency, complexity, value and procurement method.",
  },
  {
    label: "Open tender / RFT",
    range: "Often several months",
    note: "Indicative only - varies by agency, complexity, value and procurement method.",
  },
  {
    label: "Complex strategic procurement",
    range: "Potentially 6-12+ months",
    note: "Indicative only - varies by agency, complexity, value and procurement method.",
  },
];

const australiaTerminology: GlossaryItem[] = [
  { term: "ATM", meaning: "Approach to Market; the formal process for seeking supplier responses." },
  { term: "RFT", meaning: "Request for Tender." },
  { term: "RFQ", meaning: "Request for Quote." },
  { term: "EOI", meaning: "Expression of Interest." },
  { term: "ROI", meaning: "Registration of Interest." },
  { term: "Panel", meaning: "A pre-established arrangement of suppliers approved for defined goods/services." },
  { term: "Standing Offer", meaning: "An arrangement under which agencies may procure from one or more approved suppliers." },
  { term: "Limited Tender", meaning: "Agency approaches one or more suppliers under applicable rule conditions." },
  { term: "Open Tender", meaning: "Open approach to market inviting submissions." },
  { term: "Direct Sourcing", meaning: "Procurement pathway allowing direct approach in applicable value/rule circumstances." },
  { term: "Limited Sourcing", meaning: "Competitive sourcing to selected suppliers in applicable value/rule circumstances." },
  { term: "Open Advertisement", meaning: "Publicly advertised opportunity process for higher-value procurements." },
  { term: "AusTender", meaning: "Commonwealth procurement information and opportunity portal." },
  { term: "Tenders WA", meaning: "Western Australian Government opportunities portal." },
  { term: "CPRs", meaning: "Commonwealth Procurement Rules." },
  { term: "WAIPS", meaning: "Western Australian Industry Participation Strategy." },
  { term: "Value for Money", meaning: "Assessment principle balancing cost and non-cost factors over the procurement outcome." },
  { term: "Probity", meaning: "Fair, ethical and accountable conduct in procurement activities." },
  { term: "Total Estimated Value", meaning: "Estimated total contract value including relevant options/extensions and GST as defined by applicable rules." },
];

const commonwealthGuide: CommonwealthGuide = {
  name: "Commonwealth / Federal",
  authority: "Australian Government Department of Finance",
  framework: "Commonwealth Procurement Rules (effective 17 November 2025)",
  frameworkUrl: "https://www.finance.gov.au/government/procurement/commonwealth-procurement-rules",
  opportunityPortal: {
    name: "AusTender",
    url: "https://www.tenders.gov.au/",
    jurisdiction: "Commonwealth",
    whatAppears: "Approaches to market, standing offers and contract notices in applicable circumstances.",
    searchGuidance: "Track relevant agencies, incumbent suppliers, contract values and recurring categories.",
  },
  thresholds: [
    {
      label: "Non-corporate Commonwealth entities (non-construction)",
      valueRange: "AUD $125,000",
      method: "Division 2 threshold",
      detail: "Threshold indicates when additional Division 2 CPR rules apply; it is not an automatic direct-purchase permission below this value.",
    },
    {
      label: "Prescribed corporate Commonwealth entities (non-construction)",
      valueRange: "AUD $400,000",
      method: "Division 2 threshold",
      detail: "Threshold determines additional rule obligations for procurements at/above this level in applicable circumstances.",
    },
    {
      label: "Construction services",
      valueRange: "AUD $7.5 million",
      method: "Division 2 threshold",
      detail: "Construction procurements use a distinct threshold and may follow different process settings.",
    },
  ],
  procurementMethods: [
    {
      name: "Open Tender",
      detail: "Open approach to market inviting submissions. Can include one-stage RFT, multi-stage procurement, or EOI followed by RFT.",
    },
    {
      name: "Limited Tender",
      detail: "Agency approaches one or more suppliers. At/above relevant thresholds, use is restricted to applicable CPR conditions/exemptions.",
    },
    {
      name: "Standing Offers / Panels",
      detail: "Agencies may procure through existing arrangements. Supplier route can depend on admission to the arrangement rather than open ATM participation.",
    },
  ],
  localSupplierConsideration:
    "For relevant non-panel procurements from AUD $10,000 up to below the applicable procurement threshold, current CPR settings (effective 17 November 2025) require Australian businesses to be prioritised/invited in circumstances defined by the CPRs.",
  journey: [
    "Operational requirement",
    "Procurement planning",
    "Estimate total procurement value",
    "Determine applicable CPR settings",
    "Market research / industry engagement",
    "Determine procurement method",
    "Prepare approach-to-market documentation",
    "Publish/open approach where applicable",
    "Supplier submissions",
    "Evaluation",
    "Clarification / negotiation where applicable",
    "Preferred supplier",
    "Contract",
    "AusTender reporting where required",
    "Implementation / contract management",
  ],
  transparencyNote:
    "Commonwealth contracts and standing offers are subject to AusTender reporting requirements in applicable circumstances, supporting analysis of prior suppliers, values, incumbency and buying patterns.",
  typicalTimescales: australiaTimescales,
  lastVerified: "2026-09-01",
  confidence: "high",
  sources: [
    {
      title: "Department of Finance - Commonwealth Procurement Rules",
      url: "https://www.finance.gov.au/government/procurement/commonwealth-procurement-rules",
      authority: "Australian Government Department of Finance",
      lastVerified: "2026-09-01",
      confidence: "high",
    },
    {
      title: "AusTender",
      url: "https://www.tenders.gov.au/",
      authority: "Australian Government",
      lastVerified: "2026-09-01",
      confidence: "high",
    },
  ],
};

const westernAustraliaGuide: WesternAustraliaGuide = {
  name: "Western Australia",
  authority: "WA Government procurement framework",
  framework: "Western Australian Procurement Rules",
  frameworkUrl: "https://www.wa.gov.au/organisation/department-of-finance/western-australian-procurement-rules",
  frameworkEffectiveDate: "1 July 2025",
  opportunityPortal: {
    name: "Tenders WA",
    url: "https://www.tenders.wa.gov.au/",
    jurisdiction: "Western Australia",
    whatAppears: "Open advertised opportunities and procurement notices within Tenders WA scope.",
    searchGuidance: "Track categories, buying agencies, contract notices and recurring capability needs.",
  },
  thresholds: [
    {
      label: "Up to $50,000",
      valueRange: "Up to AUD $50,000",
      method: "Direct Sourcing",
      detail: "Minimum competitive requirement category under WA rules. This is not permission to split procurement to avoid thresholds.",
    },
    {
      label: "$50,000 to $250,000",
      valueRange: "AUD $50,000 to $250,000",
      method: "Limited Sourcing",
      detail: "Competitive sourcing from selected suppliers under applicable WA rule settings.",
    },
    {
      label: "$250,000 and above",
      valueRange: "AUD $250,000+",
      method: "Open Advertisement",
      detail: "Procurement approach is openly advertised in applicable circumstances.",
    },
  ],
  approachToMarketRequirements: [
    "Up to AUD $50,000: minimum approach may be verbal quotation where applicable.",
    "AUD $50,000 and above: written approach-to-market documentation is required.",
    "Written documentation may include RFQ, RFT, EOI, or other appropriate request documentation.",
  ],
  contractFormGuidance: [
    "Below AUD $50,000: Very Simple Contract Terms where applicable.",
    "AUD $50,000 to below AUD $250,000: Simple Contract Terms.",
    "AUD $250,000 and above: General Conditions of Contract.",
  ],
  waipsCallout:
    "Where WAIPS applies for goods/services procurements, suppliers may need to submit an industry participation plan. Current WAIPS thresholds: Metropolitan WA AUD $1 million+ and Regional WA AUD $500,000+ (subject to applicable requirements/exemptions).",
  procurementMethods: [
    {
      name: "Direct Sourcing",
      detail: "Applies up to AUD $50,000 under WA minimum competitive requirements.",
    },
    {
      name: "Limited Sourcing",
      detail: "Applies from AUD $50,000 to AUD $250,000 under WA rules.",
    },
    {
      name: "Open Advertisement",
      detail: "Applies at AUD $250,000 and above under WA rules.",
    },
  ],
  journey: [
    "Agency identifies requirement",
    "Determine total estimated procurement value",
    "Procurement planning",
    "Check Common Use Arrangements / standing offers / existing arrangements",
    "Determine sourcing method",
    "Direct / limited / open approach based on applicable rules",
    "Prepare request documentation",
    "Supplier response",
    "Evaluation",
    "Approvals / negotiation as applicable",
    "Contract formation",
    "Award",
    "Implementation",
  ],
  typicalTimescales: australiaTimescales,
  lastVerified: "2026-09-01",
  confidence: "high",
  sources: [
    {
      title: "WA Government - Western Australian Procurement Rules",
      url: "https://www.wa.gov.au/organisation/department-of-finance/western-australian-procurement-rules",
      authority: "Government of Western Australia",
      lastVerified: "2026-09-01",
      confidence: "high",
    },
    {
      title: "WA Government - WAIPS",
      url: "https://www.wa.gov.au/government/document-collections/wa-industry-participation-strategy-waips",
      authority: "Government of Western Australia",
      lastVerified: "2026-09-01",
      confidence: "high",
    },
    {
      title: "Tenders WA",
      url: "https://www.tenders.wa.gov.au/",
      authority: "Government of Western Australia",
      lastVerified: "2026-09-01",
      confidence: "high",
    },
  ],
};

const australianStates: StateOrRegionSummary[] = [
  {
    name: "Western Australia",
    slug: "western-australia",
    detailStatus: "full",
    note: "Detailed WA procurement pathway available.",
  },
  {
    name: "New South Wales",
    slug: "new-south-wales",
    detailStatus: "full",
    note: "Detailed NSW procurement pathway available.",
  },
  {
    name: "Victoria",
    slug: "victoria",
    detailStatus: "full",
    note: "Detailed Victorian procurement pathway available.",
  },
  {
    name: "Queensland",
    slug: "queensland",
    detailStatus: "full",
    note: "Detailed Queensland procurement pathway available.",
  },
  {
    name: "South Australia",
    slug: "south-australia",
    detailStatus: "full",
    note: "Guide available with threshold verification markers.",
  },
  {
    name: "Tasmania",
    slug: "tasmania",
    detailStatus: "full",
    note: "Guide available with threshold verification markers.",
  },
  {
    name: "Australian Capital Territory",
    slug: "australian-capital-territory",
    detailStatus: "full",
    note: "Detailed ACT procurement pathway available.",
  },
  {
    name: "Northern Territory",
    slug: "northern-territory",
    detailStatus: "full",
    note: "Detailed NT procurement pathway available.",
  },
];

const nswLifecycle = createStateLifecycle({
  2: "Check accreditation level, financial delegation and mandated whole-of-government arrangements before deciding likely route-to-market.",
  5: "Do not assume value alone determines method. Direction settings, accreditation, risk and enforceable provisions can change the path.",
  6: "From 1 January 2026, NSW open tender opportunities are published on buy NSW irrespective of value under current direction settings.",
});

const victoriaLifecycle = createStateLifecycle({
  1: "Use published Procurement Activity Plans to identify likely future opportunities 12-24 months ahead of market release.",
  4: "Complexity quadrant and market analysis strongly shape engagement timing and route-to-market planning.",
  6: "Approach format can vary by complexity and strategy: quotation, selective process, open invitation or multi-stage approach.",
});

const queenslandLifecycle = createStateLifecycle({
  3: "Map funding and category strategy early; significant procurement settings affect governance and assurance expectations.",
  5: "Confirm whether the opportunity is routine or significant procurement and align response plan with agency category strategy.",
  6: "Open market approaches are published on QTenders through the Queensland procurement platform.",
});

const saLifecycle = createStateLifecycle({
  2: "Review agency governance settings, existing arrangements and policy requirements before forecasting likely sourcing route.",
  6: "Market approach method should be treated as policy-and-context driven until detailed threshold settings are fully verified.",
});

const tasLifecycle = createStateLifecycle({
  2: "Check Tasmanian procurement governance, agency delegations and common-use arrangements before route assumptions.",
  6: "Quotation vs tender pathway should be treated as context-specific until threshold details are fully verified in this guide version.",
});

const actLifecycle = createStateLifecycle({
  5: "Below open-tender settings, ACT limited-tender mechanisms for local/SME/Aboriginal and Torres Strait Islander suppliers can materially affect go-to-market strategy.",
  6: "For goods/services at AUD $500,000 and above (incl GST), open tender pathway applies under the current framework.",
});

const ntLifecycle = createStateLifecycle({
  2: "From the October 2025 reform, confirm current tier and category settings before selecting the sourcing path.",
  5: "Territory business participation and local delivery capability can be commercially significant in pathway planning.",
  6: "Supplier-facing guidance distinguishes lower-value quoting pathways from over-AUD-200,000 tendering pathways.",
});

const australianStateGuides: Record<string, AustralianStateProcurementGuide> = {
  "western-australia": {
    name: "Western Australia",
    slug: "western-australia",
    authority: "WA Government procurement framework",
    framework: "Western Australian Procurement Rules",
    frameworkUrl: "https://www.wa.gov.au/organisation/department-of-finance/western-australian-procurement-rules",
    opportunityPortal: westernAustraliaGuide.opportunityPortal,
    procurementModel: "Threshold-linked minimum competitive requirements with separate approach-to-market documentation requirements and WAIPS overlays where applicable.",
    howItWorks: westernAustraliaGuide.journey,
    procurementMethods: westernAustraliaGuide.procurementMethods,
    thresholds: westernAustraliaGuide.thresholds,
    decisionFactors: [
      "Total Estimated Value including relevant options/extensions and GST under WA definitions.",
      "Applicable procurement category, risk and agency process controls.",
      "Existing Common Use Arrangements and standing arrangements.",
    ],
    panelsAndArrangements: [
      "Common Use Arrangements and standing offers can change supplier access route.",
      "Agencies may need to buy through existing arrangements before opening new market processes.",
    ],
    localIndustryPolicies: [westernAustraliaGuide.waipsCallout],
    earlyIntelligenceNotes: [
      "Monitor Tenders WA and arrangement usage patterns to identify recurring demand and incumbent positions.",
    ],
    approachToMarketRequirements: westernAustraliaGuide.approachToMarketRequirements,
    contractFormGuidance: westernAustraliaGuide.contractFormGuidance,
    procurementLifecycle: createStateLifecycle({
      2: "Check existing Common Use Arrangements and agency controls before assuming a new open market process.",
      5: "Threshold category, risk and arrangement availability determine likely sourcing route.",
      6: "Direct, limited or open approach is selected under WA minimum competitive requirements and documentation rules.",
    }),
    typicalTimescales: westernAustraliaGuide.typicalTimescales,
    terminology: australiaTerminology,
    sources: westernAustraliaGuide.sources,
    lastVerified: westernAustraliaGuide.lastVerified,
    confidence: westernAustraliaGuide.confidence,
    detailStatus: "full",
  },
  "new-south-wales": {
    name: "New South Wales",
    slug: "new-south-wales",
    authority: "NSW Procurement Board",
    framework: "NSW Government Procurement Policy Framework (updated 26 August 2026)",
    frameworkUrl: "https://www.info.buy.nsw.gov.au/policy-library/procurement-policy-framework",
    opportunityPortal: {
      name: "buy NSW",
      url: "https://www.buy.nsw.gov.au/",
      jurisdiction: "New South Wales",
      whatAppears: "Open tenders and procurement information under current NSW procurement arrangements.",
      searchGuidance: "Track agency categories, incumbent suppliers, scheme usage and open opportunities published on buy NSW.",
    },
    procurementModel: "Accreditation- and risk-informed model. Route depends on agency accreditation, risk, value, delegation, mandatory arrangements and applicable directions.",
    howItWorks: [
      "Define requirement and check mandated whole-of-government arrangements first.",
      "Confirm agency accreditation level, delegation and risk profile.",
      "Determine whether unaccredited-agency controls or covered-procurement provisions apply.",
      "Select endorsed market process and publish open opportunities on buy NSW where required.",
      "Evaluate, negotiate where applicable and contract under relevant framework controls.",
    ],
    procurementMethods: [
      {
        name: "Open tender",
        detail: "From 1 January 2026, NSW Government open tender opportunities are published on buy NSW irrespective of value under current PBD-2025-04 settings.",
      },
      {
        name: "Quotation-based approaches for unaccredited agencies",
        detail: "Unaccredited controls can include one written quotation (AUD $10,000-$30,000) and minimum three quotations or approved alternative process (AUD $30,000-$680,000).",
      },
      {
        name: "Other endorsed procurement processes",
        detail: "For higher-value or covered procurements, use endorsed process settings under applicable directions and enforceable procurement provisions.",
      },
    ],
    thresholds: [
      {
        label: "Unaccredited agencies: AUD $10,000-$30,000",
        valueRange: "AUD $10,000 to $30,000",
        method: "At least one written quotation",
        detail: "Applies to unaccredited agencies. Not a universal NSW purchasing threshold for all agencies.",
      },
      {
        label: "Unaccredited agencies: AUD $30,000-$680,000",
        valueRange: "AUD $30,000 to $680,000",
        method: "Minimum three quotations or another approved procurement process",
        detail: "Applies to unaccredited agencies under relevant authority approvals.",
      },
      {
        label: "Covered procurement threshold (goods/services)",
        valueRange: "AUD $680,000 excluding GST",
        method: "Enforceable procurement provisions",
        detail: "Applies to covered agencies/procurements under the relevant direction. Not universal to every NSW procurement.",
      },
      {
        label: "Covered procurement threshold (construction)",
        valueRange: "AUD $9.584 million excluding GST",
        method: "Enforceable procurement provisions",
        detail: "Construction threshold shown separately for covered procurement context.",
      },
    ],
    decisionFactors: [
      "Agency accreditation level (Level 1 or Level 2) and authority limits.",
      "Level 1 accredited agencies have a maximum procurement authority that varies with risk/value and approvals.",
      "Level 2 accredited agencies have no prescribed maximum contract value under accreditation settings, subject to financial delegations/approvals.",
      "Procurement risk and complexity profile.",
      "Financial delegation, mandated arrangements and procurement board directions.",
      "Enforceable procurement provisions where covered-procurement settings apply.",
    ],
    panelsAndArrangements: [
      "Mandatory whole-of-government arrangements must be used where required, subject to exemptions.",
      "If agency procurement exceeds accreditation authority, concurrence may be required.",
    ],
    localIndustryPolicies: [
      "Commercial intelligence note: unaccredited agencies can generally use one written quote up to AUD $30,000 for goods/services in applicable circumstances.",
      "Current NSW settings can allow direct procurement from eligible regional businesses up to AUD $150,000 in applicable circumstances.",
      "Current NSW settings can allow direct procurement from eligible SMEs up to AUD $250,000 in applicable circumstances.",
      "Current NSW settings can allow direct negotiation with eligible Aboriginal businesses up to AUD $250,000 in applicable circumstances.",
      "All mechanisms remain subject to eligibility conditions, approvals, value-for-money and applicable policy limits.",
    ],
    earlyIntelligenceNotes: [
      "Check agency accreditation, mandated schemes and existing arrangements before assuming an open market approach will occur.",
      "Current NSW contracting framework includes Core& for low-risk goods/services and contract value up to AUD $1 million ex GST.",
      "Current NSW contracting framework includes MICTA/ICTA for applicable higher-risk goods/services or contract value of AUD $1 million or more ex GST.",
    ],
    procurementLifecycle: nswLifecycle,
    typicalTimescales: australiaTimescales,
    terminology: australiaTerminology,
    sources: [
      {
        title: "NSW Procurement Policy Framework",
        url: "https://www.info.buy.nsw.gov.au/policy-library/procurement-policy-framework",
        authority: "NSW Government / NSW Procurement Board",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "buy NSW",
        url: "https://www.buy.nsw.gov.au/",
        authority: "NSW Government",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "NSW Procurement Board Directions",
        url: "https://www.info.buy.nsw.gov.au/policy-library/procurement-board-directions",
        authority: "NSW Procurement Board",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
    ],
    lastVerified: "2026-09-01",
    confidence: "high",
    detailStatus: "full",
    verificationNotes: [
      "NSW is not represented as a universal dollar-threshold-only model.",
      "Core& and MICTA/ICTA note is intentionally concise and not a full contracting manual.",
    ],
  },
  victoria: {
    name: "Victoria",
    slug: "victoria",
    authority: "Victorian Government goods and services procurement framework (Minister for Government Services governance from 2026)",
    framework: "Victorian Government goods and services procurement policies (former VGPB policies continue until replaced)",
    frameworkUrl: "https://www.buyingfor.vic.gov.au/",
    opportunityPortal: {
      name: "Buying for Victoria",
      url: "https://www.buyingfor.vic.gov.au/",
      jurisdiction: "Victoria",
      whatAppears: "Policy guidance, sourcing information, state purchasing arrangements and activity-plan context.",
      searchGuidance: "Use procurement activity planning signals and category context to prepare pre-tender engagement and resource planning.",
    },
    procurementModel: "Principle-based and scalable framework driven by complexity, risk, market dynamics, capability and total cost of ownership.",
    howItWorks: [
      "Define procurement need and governance context.",
      "Assess complexity/capability and map procurement quadrant (Transactional, Leveraged, Focused, Strategic).",
      "Undertake market analysis and determine appropriate market approach.",
      "Run process, evaluate value-for-money and probity outcomes, then manage contract and disclosure obligations.",
    ],
    procurementMethods: [
      {
        name: "Market approach pathways",
        detail: "Potential pathways include quotation, open invitation/tender, selective/limited invitation, multi-stage tender and registers.",
      },
      {
        name: "Standing arrangements",
        detail: "State Purchase Contracts and standing arrangements may be used where applicable.",
      },
    ],
    thresholds: [
      {
        label: "Framework operation",
        valueRange: "Complexity, risk and capability-based",
        method: "Scalable procurement model",
        detail: "Victoria is not represented as a universal fixed-dollar quotation-versus-tender model in this guide.",
      },
      {
        label: "International agreement threshold (goods/services)",
        valueRange: "AUD $727,000 including GST",
        method: "International agreement threshold",
        detail: "Current threshold from 1 January 2026; not a universal tender trigger for every procurement.",
      },
      {
        label: "International agreement threshold (construction)",
        valueRange: "AUD $10.243 million including GST",
        method: "International agreement threshold",
        detail: "Construction threshold shown separately from routine goods/services procurement planning.",
      },
    ],
    decisionFactors: [
      "Value for money, accountability, probity and scalability principles.",
      "Complexity quadrant classification: Transactional, Leveraged, Focused, Strategic.",
      "Risk profile, market dynamics, agency capability and total cost of ownership.",
    ],
    panelsAndArrangements: [
      "State Purchase Contracts and other standing arrangements can change route-to-market.",
    ],
    localIndustryPolicies: [
      "Local Jobs First policy thresholds include regional procurements at AUD $1 million+ and metro/state-wide procurements at AUD $3 million+ where applicable.",
      "Relevant requirements can include local content clauses, evaluation weightings and Local Industry Development Plans.",
      "Fair Jobs Code applies to relevant procurement contracts from AUD $1 million and to standing offer arrangements under the applicable framework.",
    ],
    earlyIntelligenceNotes: [
      "Procurement Activity Plans can provide early visibility of anticipated opportunities approximately 12-24 months before a formal approach.",
      "VGPB was discontinued in 2026; governance functions are now with the Minister for Government Services while existing policies continue until replaced.",
    ],
    suggestedSubmissionPeriods: [
      "Low-risk / transactional: approximately 8 working days.",
      "Medium risk: approximately 15 working days.",
      "Higher-risk focused/strategic: approximately 20-25+ working days.",
      "These are suggested submission periods, not end-to-end procurement timescales.",
    ],
    internationalAgreementThresholds: [
      {
        label: "Goods and services",
        valueRange: "AUD $727,000 including GST",
        method: "International agreement threshold",
        detail: "Current from 1 January 2026.",
      },
      {
        label: "Construction",
        valueRange: "AUD $10.243 million including GST",
        method: "International agreement threshold",
        detail: "Current from 1 January 2026.",
      },
    ],
    procurementLifecycle: victoriaLifecycle,
    typicalTimescales: australiaTimescales,
    terminology: australiaTerminology,
    sources: [
      {
        title: "Buying for Victoria",
        url: "https://www.buyingfor.vic.gov.au/",
        authority: "Victorian Government",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "Victorian procurement policy and guidance",
        url: "https://www.buyingfor.vic.gov.au/procurement-policies-and-guidance",
        authority: "Victorian Government",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
    ],
    lastVerified: "2026-09-01",
    confidence: "high",
    detailStatus: "full",
  },
  queensland: {
    name: "Queensland",
    slug: "queensland",
    authority: "Queensland Government Procurement",
    framework: "Queensland Procurement Policy 2026",
    frameworkUrl: "https://www.forgov.qld.gov.au/procurement",
    opportunityPortal: {
      name: "QTenders",
      url: "https://www.qtenders.qld.gov.au/",
      jurisdiction: "Queensland",
      whatAppears: "Open market tender opportunities published via the Queensland procurement platform.",
      searchGuidance: "Track category opportunities, agency buying patterns and significant procurement themes on QTenders.",
    },
    procurementModel: "Policy-and-strategy model using value, risk, category strategy and local/social/economic outcomes under QPP 2026.",
    howItWorks: [
      "Define requirement and classify procurement context (routine or significant).",
      "Align category strategy, risk profile and market approach.",
      "Use open or selective offer mechanisms with standing arrangements where applicable.",
      "Evaluate value and broader policy outcomes, then transition to contract delivery and performance management.",
    ],
    procurementMethods: [
      {
        name: "Open offer / open market",
        detail: "Open market tenders issued through the procurement platform are published on QTenders.",
      },
      {
        name: "Selective offer",
        detail: "Selective approaches may be used where permitted under framework and strategy conditions.",
      },
      {
        name: "Routine vs significant procurement",
        detail: "Agencies apply governance settings based on their classification and procurement strategy.",
      },
      {
        name: "Standing offers / procurement arrangements",
        detail: "Existing arrangements can change route-to-market where applicable.",
      },
    ],
    thresholds: [
      {
        label: "Whole-of-government minimum significant procurement threshold",
        valueRange: "AUD $500,000 including GST",
        method: "Significant procurement definition floor",
        detail: "Agency-specific significant procurement thresholds may be higher. This is not an automatic open-tender trigger.",
      },
    ],
    decisionFactors: [
      "Value and risk profile.",
      "Agency procurement strategy and category strategy.",
      "Local, social and economic outcomes under QPP settings.",
      "Supplier capability, compliance and due-diligence requirements.",
    ],
    panelsAndArrangements: [
      "Standing offer and procurement arrangement use can influence market approach choice.",
    ],
    localIndustryPolicies: [
      "Buy Queensland policy focus includes economic, social and environmental benefits.",
      "Queensland supplier and Queensland SME participation considerations can influence route-to-market and response strategy.",
      "Ethical Supplier Threshold concepts apply within current framework settings.",
      "Where Australian business-register checks are not available for international suppliers, due-diligence mechanisms can apply.",
    ],
    earlyIntelligenceNotes: [
      "Map agency and category strategy before expecting a specific approach-to-market method.",
      "Open market opportunities are visible via QTenders publication pathways.",
    ],
    procurementLifecycle: queenslandLifecycle,
    typicalTimescales: australiaTimescales,
    terminology: australiaTerminology,
    sources: [
      {
        title: "Queensland Government Procurement",
        url: "https://www.forgov.qld.gov.au/procurement",
        authority: "Queensland Government",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "QTenders",
        url: "https://www.qtenders.qld.gov.au/",
        authority: "Queensland Government",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
    ],
    lastVerified: "2026-09-01",
    confidence: "high",
    detailStatus: "full",
  },
  "south-australia": {
    name: "South Australia",
    slug: "south-australia",
    authority: "South Australian Government procurement authority",
    framework: "South Australian Government procurement framework",
    frameworkUrl: "https://www.treasury.sa.gov.au/procurement",
    opportunityPortal: {
      name: "SA Tenders and Contracts",
      url: "https://www.tenders.sa.gov.au/",
      jurisdiction: "South Australia",
      whatAppears: "South Australian procurement opportunities and contract notices within portal scope.",
      searchGuidance: "Track agency opportunities and prior award patterns through official SA procurement channels.",
    },
    procurementModel: "Policy-and-process model using agency governance, procurement context and approved market approaches.",
    howItWorks: [
      "Define requirement and confirm whether existing arrangements can satisfy demand.",
      "Plan procurement approach under South Australian governance settings.",
      "Select market approach and run evaluation/contract award process under applicable policy controls.",
    ],
    procurementMethods: [
      {
        name: "Open and selective market approaches",
        detail: "Approach type is selected under applicable policy, risk and governance settings.",
      },
      {
        name: "Existing arrangements",
        detail: "Panels, contracts and whole-of-government arrangements may influence supplier access path.",
      },
    ],
    thresholds: [
      {
        label: "Threshold setting",
        valueRange: "Threshold verification required",
        method: "Verification required",
        detail: "Current threshold details are intentionally flagged as verification required in this version.",
      },
    ],
    decisionFactors: [
      "Agency governance and delegation settings.",
      "Risk and complexity of procurement.",
      "Availability of existing whole-of-government arrangements.",
    ],
    panelsAndArrangements: [
      "Whole-of-government contracts and panels can shape route-to-market.",
    ],
    localIndustryPolicies: [
      "Local industry participation policy settings are relevant; detailed threshold mechanics remain verification required.",
    ],
    earlyIntelligenceNotes: [
      "Monitor SA Tenders and Contracts plus agency forward-planning signals for pre-tender visibility.",
    ],
    procurementLifecycle: saLifecycle,
    typicalTimescales: australiaTimescales,
    terminology: australiaTerminology,
    sources: [
      {
        title: "SA Treasury Procurement",
        url: "https://www.treasury.sa.gov.au/procurement",
        authority: "Government of South Australia",
        lastVerified: "2026-08-31",
        confidence: "medium",
      },
      {
        title: "SA Tenders and Contracts",
        url: "https://www.tenders.sa.gov.au/",
        authority: "Government of South Australia",
        lastVerified: "2026-08-31",
        confidence: "medium",
      },
    ],
    lastVerified: "2026-08-31",
    confidence: "medium",
    detailStatus: "full",
    verificationNotes: [
      "Threshold verification required.",
    ],
  },
  tasmania: {
    name: "Tasmania",
    slug: "tasmania",
    authority: "Tasmanian Government procurement authority / Treasury",
    framework: "Tasmanian Government procurement framework",
    frameworkUrl: "https://www.treasury.tas.gov.au/procurement",
    opportunityPortal: {
      name: "Tenders Tasmania",
      url: "https://www.tenders.tas.gov.au/",
      jurisdiction: "Tasmania",
      whatAppears: "Tasmanian Government opportunity notices and procurement documentation within portal scope.",
      searchGuidance: "Track buyer entities, recurrent categories and timing signals via official Tasmanian portals.",
    },
    procurementModel: "Framework and process model shaped by agency controls, market approach selection and use of whole-of-government arrangements.",
    howItWorks: [
      "Define requirement and check common-use arrangements first.",
      "Plan procurement method under applicable Tasmanian governance settings.",
      "Run quotation/tender process, evaluation and contract award.",
    ],
    procurementMethods: [
      {
        name: "Quotation and tender pathways",
        detail: "Quotation or open-market approach is selected under the applicable policy setting and procurement context.",
      },
      {
        name: "Panels and common-use arrangements",
        detail: "Existing arrangements can materially alter route-to-market.",
      },
    ],
    thresholds: [
      {
        label: "Threshold setting",
        valueRange: "Threshold verification required",
        method: "Verification required",
        detail: "Current threshold details are intentionally flagged as verification required in this version.",
      },
    ],
    decisionFactors: [
      "Agency procurement governance and delegation settings.",
      "Risk, complexity and market conditions.",
      "Use of established arrangements before new market approach.",
    ],
    panelsAndArrangements: [
      "Common-use contracts and standing arrangements can influence supplier access.",
    ],
    localIndustryPolicies: [
      "Local Tasmanian supplier participation remains commercially relevant; detailed threshold settings are verification required.",
    ],
    earlyIntelligenceNotes: [
      "Use Tenders Tasmania and agency procurement updates to identify early opportunities and recurring categories.",
    ],
    procurementLifecycle: tasLifecycle,
    typicalTimescales: australiaTimescales,
    terminology: australiaTerminology,
    sources: [
      {
        title: "Tasmanian Treasury Procurement",
        url: "https://www.treasury.tas.gov.au/procurement",
        authority: "Tasmanian Government",
        lastVerified: "2026-08-31",
        confidence: "medium",
      },
      {
        title: "Tenders Tasmania",
        url: "https://www.tenders.tas.gov.au/",
        authority: "Tasmanian Government",
        lastVerified: "2026-08-31",
        confidence: "medium",
      },
    ],
    lastVerified: "2026-08-31",
    confidence: "medium",
    detailStatus: "full",
    verificationNotes: [
      "Threshold verification required.",
    ],
  },
  "australian-capital-territory": {
    name: "Australian Capital Territory",
    slug: "australian-capital-territory",
    authority: "Procurement ACT",
    framework: "Government Procurement Act 2001 and Government Procurement Regulation 2007 (current rules from 1 July 2026)",
    frameworkUrl: "https://www.procurement.act.gov.au/",
    opportunityPortal: {
      name: "Tenders ACT",
      url: "https://www.tenders.act.gov.au/",
      jurisdiction: "Australian Capital Territory",
      whatAppears: "ACT Government procurement opportunities and notices under current framework settings.",
      searchGuidance: "Track open tenders, limited-tender opportunities and category activity through official ACT channels.",
    },
    procurementModel: "Rule-based threshold model for goods/services with local supplier participation mechanisms in limited tender pathways.",
    howItWorks: [
      "Classify procurement as goods/services or construction and determine value including GST.",
      "Apply current threshold method and minimum quotation/tender requirements.",
      "Use limited or open tender pathways with value-for-money and applicable local participation mechanisms.",
      "Evaluate and award contract via Procurement ACT framework controls.",
    ],
    procurementMethods: [
      {
        name: "Oral or written quotation",
        detail: "Below AUD $25,000 (incl GST), oral or written quotation minimums apply according to threshold bands.",
      },
      {
        name: "Limited Tender",
        detail: "AUD $25,000 to below AUD $500,000 (incl GST), normally with three written quotations or one written quotation under the local/SME/Aboriginal and Torres Strait Islander mechanism where applicable.",
      },
      {
        name: "Open Tender",
        detail: "AUD $500,000 and above (incl GST) for non-construction goods/services.",
      },
    ],
    thresholds: [
      {
        label: "Non-construction goods/services below $500 incl GST",
        valueRange: "Below AUD $500 (incl GST)",
        method: "Minimum one oral quotation",
        detail: "Apply current ACT quotation controls under post-1 July 2026 settings.",
      },
      {
        label: "Non-construction goods/services $500 to below $25,000 incl GST",
        valueRange: "AUD $500 to below $25,000 (incl GST)",
        method: "Minimum one written quotation",
        detail: "Written quotation pathway under ACT goods/services settings.",
      },
      {
        label: "Non-construction goods/services $25,000 to below $500,000 incl GST",
        valueRange: "AUD $25,000 to below $500,000 (incl GST)",
        method: "Limited Tender",
        detail: "Normally three written quotations, or one written quotation may be used under the local/SME/Aboriginal and Torres Strait Islander supplier mechanism where applicable.",
      },
      {
        label: "Non-construction goods/services $500,000 and above incl GST",
        valueRange: "AUD $500,000+ (incl GST)",
        method: "Open Tender",
        detail: "Open tender for goods/services at or above this threshold.",
      },
    ],
    decisionFactors: [
      "Goods/services vs construction classification.",
      "Value including GST under the ACT framework.",
      "Value for money, supplier eligibility and applicable local-participation mechanisms.",
    ],
    panelsAndArrangements: [
      "Standing arrangements may influence route-to-market where available.",
    ],
    localIndustryPolicies: [
      "From 1 July 2026, framework amendments support easier participation by ACT/regional SMEs and certified Aboriginal or Torres Strait Islander businesses in limited-tender procurements where applicable.",
      "Value-for-money requirements remain explicit across these mechanisms.",
    ],
    earlyIntelligenceNotes: [
      "For procurements below open-tender settings, local supplier mechanisms can materially influence partnership and engagement strategy.",
    ],
    internationalAgreementThresholds: [
      {
        label: "Construction open tender threshold",
        valueRange: "AUD $1 million including GST",
        method: "Construction threshold",
        detail: "Shown separately from ordinary goods/services cards.",
      },
    ],
    procurementLifecycle: actLifecycle,
    typicalTimescales: australiaTimescales,
    terminology: australiaTerminology,
    sources: [
      {
        title: "Procurement ACT",
        url: "https://www.procurement.act.gov.au/",
        authority: "ACT Government",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "Tenders ACT",
        url: "https://www.tenders.act.gov.au/",
        authority: "ACT Government",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
    ],
    lastVerified: "2026-09-01",
    confidence: "high",
    detailStatus: "full",
  },
  "northern-territory": {
    name: "Northern Territory",
    slug: "northern-territory",
    authority: "Northern Territory Government procurement framework",
    framework: "Northern Territory Government procurement framework (including reforms from 1 October 2025)",
    frameworkUrl: "https://business.nt.gov.au/procurement",
    opportunityPortal: {
      name: "Quoting and Tendering Online",
      url: "https://quotingandtendering.nt.gov.au/",
      jurisdiction: "Northern Territory",
      whatAppears: "NT Government quoting and tendering opportunities and notices.",
      searchGuidance: "Monitor quoting and tender opportunities, contract categories and agency demand trends.",
    },
    procurementModel: "Tiered and policy-driven model with reformed purchasing caps, quoting/tendering bands and strong Territory business participation focus.",
    howItWorks: [
      "Define requirement and confirm if existing contracts or arrangements apply.",
      "Classify value against current tier and spending-band guidance.",
      "Apply quoting pathway up to AUD $200,000 or tendering pathway above AUD $200,000, subject to category and rule settings.",
      "Evaluate responses and award contract under NT governance controls.",
    ],
    procurementMethods: [
      {
        name: "Quoting / lower-value procurement",
        detail: "Current supplier-facing guidance describes lower-value procurement in the up-to-AUD-200,000 band.",
      },
      {
        name: "Tendering",
        detail: "Current supplier-facing guidance describes tendering for procurements over AUD $200,000.",
      },
      {
        name: "Simplified direct purchasing pathway",
        detail: "Post-2025 reform allows simplified direct purchasing for commonly used, low-risk and readily available goods/services from Territory enterprises in applicable circumstances.",
      },
    ],
    thresholds: [
      {
        label: "Tier 1 purchasing cap",
        valueRange: "Up to AUD $50,000",
        method: "Tier 1",
        detail: "Current cap under reform settings from 1 October 2025.",
      },
      {
        label: "Tier 2 purchasing cap",
        valueRange: "AUD $50,000-$200,000",
        method: "Tier 2",
        detail: "Current cap under reform settings from 1 October 2025.",
      },
      {
        label: "Supplier-facing market path",
        valueRange: "Up to AUD $200,000 vs over AUD $200,000",
        method: "Quoting band vs tendering band",
        detail: "Band guidance does not create unrestricted direct purchase for all procurements below AUD $200,000.",
      },
    ],
    decisionFactors: [
      "Procurement category eligibility and risk profile.",
      "Territory enterprise participation settings and policy requirements.",
      "Applicable governance, value and process controls.",
    ],
    panelsAndArrangements: [
      "Existing arrangements can still affect whether new market approach is required.",
    ],
    localIndustryPolicies: [
      "Territory business participation is a major feature of the NT framework.",
      "Local delivery capability and partner strategy can be commercially significant even where external suppliers are eligible.",
    ],
    earlyIntelligenceNotes: [
      "Territory business considerations should be assessed early when shaping bid and delivery strategy.",
    ],
    procurementLifecycle: ntLifecycle,
    typicalTimescales: australiaTimescales,
    terminology: australiaTerminology,
    sources: [
      {
        title: "NT Government Procurement",
        url: "https://business.nt.gov.au/procurement",
        authority: "Northern Territory Government",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
      {
        title: "Quoting and Tendering Online",
        url: "https://quotingandtendering.nt.gov.au/",
        authority: "Northern Territory Government",
        lastVerified: "2026-09-01",
        confidence: "high",
      },
    ],
    lastVerified: "2026-09-01",
    confidence: "high",
    detailStatus: "full",
  },
};

const procurementGuides: ProcurementGuide[] = [
  {
    country: "Australia",
    countrySlug: "australia",
    procurementAuthority: "Australian Government Department of Finance and state/territory procurement authorities",
    framework: "Commonwealth Procurement Rules (CPRs) + state/territory procurement rules",
    frameworkUrl: "https://www.finance.gov.au/government/procurement/commonwealth-procurement-rules",
    procurementModel: "Commonwealth and state/territory pathways using open, limited and arrangement-based procurement routes.",
    detailStatus: "full",
    opportunityPortals: [
      commonwealthGuide.opportunityPortal,
      australianStateGuides["new-south-wales"].opportunityPortal,
      australianStateGuides.victoria.opportunityPortal,
      australianStateGuides.queensland.opportunityPortal,
      australianStateGuides["south-australia"].opportunityPortal,
      australianStateGuides.tasmania.opportunityPortal,
      australianStateGuides["australian-capital-territory"].opportunityPortal,
      westernAustraliaGuide.opportunityPortal,
      australianStateGuides["northern-territory"].opportunityPortal,
    ],
    procurementMethods: [
      { name: "Open Tender", detail: "Open approach to market inviting submissions." },
      { name: "Limited Tender", detail: "Agency approaches one or more suppliers in applicable circumstances." },
      { name: "Standing Offer / Panel pathways", detail: "Procurement through existing arrangements where available." },
      { name: "State-specific sourcing methods", detail: "Direct, limited and open pathways vary by state/territory rules." },
    ],
    thresholds: [
      ...commonwealthGuide.thresholds,
      ...westernAustraliaGuide.thresholds,
    ],
    procurementLifecycle: australiaLifecycle,
    supplierEngagement: [
      "Early market education and capability briefings in pre-tender phases under probity controls.",
      "Demonstrations, pilots/trials and technical validation where agencies permit.",
      "Partner engagement and delivery model design before formal ATM release.",
      "Formal clarifications only through procurement channels once ATM is open.",
    ],
    panelsAndFrameworks: [
      "Standing offers and panels can materially change route-to-market.",
      "Common Use Arrangements and similar mechanisms may be mandatory/preferred depending on agency settings.",
    ],
    localSupplierRules: [commonwealthGuide.localSupplierConsideration, westernAustraliaGuide.waipsCallout],
    typicalTimescales: australiaTimescales,
    terminology: australiaTerminology,
    sources: [
      ...commonwealthGuide.sources,
      ...westernAustraliaGuide.sources,
    ],
    lastVerified: "2026-09-01",
    confidence: "high",
    statesOrRegions: australianStates,
  },
  {
    country: "Canada",
    countrySlug: "canada",
    procurementAuthority: "Procurement authority and framework being verified",
    framework: "Detailed procurement framework being verified",
    procurementModel: "Procurement guide being verified",
    detailStatus: "verification-pending",
    detailVerificationNote: "Detailed procurement pathway being verified.",
    opportunityPortals: [],
    procurementMethods: [],
    thresholds: [],
    procurementLifecycle: [],
    supplierEngagement: [],
    panelsAndFrameworks: [],
    localSupplierRules: [],
    typicalTimescales: [],
    terminology: [],
    sources: [],
    lastVerified: "2026-08-31",
    confidence: "verification-required",
    statesOrRegions: [],
  },
  {
    country: "United States",
    countrySlug: "united-states",
    procurementAuthority: "Procurement authority and framework being verified",
    framework: "Detailed procurement framework being verified",
    procurementModel: "Procurement guide being verified",
    detailStatus: "verification-pending",
    detailVerificationNote: "Detailed procurement pathway being verified.",
    opportunityPortals: [],
    procurementMethods: [],
    thresholds: [],
    procurementLifecycle: [],
    supplierEngagement: [],
    panelsAndFrameworks: [],
    localSupplierRules: [],
    typicalTimescales: [],
    terminology: [],
    sources: [],
    lastVerified: "2026-08-31",
    confidence: "verification-required",
    statesOrRegions: [],
  },
  {
    country: "United Kingdom",
    countrySlug: "united-kingdom",
    procurementAuthority: "Procurement authority and framework being verified",
    framework: "Detailed procurement framework being verified",
    procurementModel: "Procurement guide being verified",
    detailStatus: "verification-pending",
    detailVerificationNote: "Detailed procurement pathway being verified.",
    opportunityPortals: [],
    procurementMethods: [],
    thresholds: [],
    procurementLifecycle: [],
    supplierEngagement: [],
    panelsAndFrameworks: [],
    localSupplierRules: [],
    typicalTimescales: [],
    terminology: [],
    sources: [],
    lastVerified: "2026-08-31",
    confidence: "verification-required",
    statesOrRegions: [],
  },
  {
    country: "New Zealand",
    countrySlug: "new-zealand",
    procurementAuthority: "Procurement authority and framework being verified",
    framework: "Detailed procurement framework being verified",
    procurementModel: "Procurement guide being verified",
    detailStatus: "verification-pending",
    detailVerificationNote: "Detailed procurement pathway being verified.",
    opportunityPortals: [],
    procurementMethods: [],
    thresholds: [],
    procurementLifecycle: [],
    supplierEngagement: [],
    panelsAndFrameworks: [],
    localSupplierRules: [],
    typicalTimescales: [],
    terminology: [],
    sources: [],
    lastVerified: "2026-08-31",
    confidence: "verification-required",
    statesOrRegions: [],
  },
  {
    country: "European Union",
    countrySlug: "european-union",
    procurementAuthority: "Procurement authority and framework being verified",
    framework: "Detailed procurement framework being verified",
    procurementModel: "Procurement guide being verified",
    detailStatus: "verification-pending",
    detailVerificationNote: "Detailed procurement pathway being verified.",
    opportunityPortals: [],
    procurementMethods: [],
    thresholds: [],
    procurementLifecycle: [],
    supplierEngagement: [],
    panelsAndFrameworks: [],
    localSupplierRules: [],
    typicalTimescales: [],
    terminology: [],
    sources: [],
    lastVerified: "2026-08-31",
    confidence: "verification-required",
    statesOrRegions: [],
  },
  {
    country: "South Africa",
    countrySlug: "south-africa",
    procurementAuthority: "Procurement authority and framework being verified",
    framework: "Detailed procurement framework being verified",
    procurementModel: "Procurement guide being verified",
    detailStatus: "verification-pending",
    detailVerificationNote: "Detailed procurement pathway being verified.",
    opportunityPortals: [],
    procurementMethods: [],
    thresholds: [],
    procurementLifecycle: [],
    supplierEngagement: [],
    panelsAndFrameworks: [],
    localSupplierRules: [],
    typicalTimescales: [],
    terminology: [],
    sources: [],
    lastVerified: "2026-08-31",
    confidence: "verification-required",
    statesOrRegions: [],
  },
];

const whyThisMattersPrompts: string[] = [
  "Is the opportunity still in a pre-tender stage?",
  "Is there an incumbent supplier or existing arrangement?",
  "Is there an existing panel or standing offer route?",
  "Could an Australian partner materially improve delivery confidence?",
  "Is an open approach to market likely based on value and rules?",
  "Is there evidence of budget allocation or planning activity?",
  "Is the current contract nearing expiry?",
  "Has the agency already conducted market engagement?",
];

export function listProcurementGuides(): ProcurementGuide[] {
  return procurementGuides;
}

export function getProcurementGuideByCountrySlug(countrySlug: string): ProcurementGuide | undefined {
  return procurementGuides.find((guide) => guide.countrySlug === countrySlug);
}

export function getAustraliaProcurementGuide(): ProcurementGuide {
  return procurementGuides[0];
}

export function getCommonwealthProcurementGuide(): CommonwealthGuide {
  return commonwealthGuide;
}

export function getWesternAustraliaProcurementGuide(): WesternAustraliaGuide {
  return westernAustraliaGuide;
}

export function listAustralianProcurementStates(): StateOrRegionSummary[] {
  return australianStates;
}

export function getAustralianStateProcurementSummary(stateSlug: string): StateOrRegionSummary | undefined {
  return australianStates.find((state) => state.slug === stateSlug);
}

export function listAustralianStateProcurementGuides(): AustralianStateProcurementGuide[] {
  return australianStates
    .map((state) => australianStateGuides[state.slug])
    .filter((guide): guide is AustralianStateProcurementGuide => Boolean(guide));
}

export function getAustralianStateProcurementGuide(stateSlug: string): AustralianStateProcurementGuide | undefined {
  return australianStateGuides[stateSlug];
}

export function listProcurementWhyThisMattersPrompts(): string[] {
  return whyThisMattersPrompts;
}
