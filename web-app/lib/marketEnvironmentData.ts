import { australiaJurisdictions } from "./australiaStateDirectory";
import { supportedCountries } from "./countries";

export type MarketEnvironmentConfidence = "high" | "medium" | "low" | "verification-required";

export type MarketEnvironmentStatus = "active" | "archived";

export type MarketEnvironmentIntelligenceType =
  | "budget-funding"
  | "government-priority"
  | "policy-legislative-change"
  | "program-initiative"
  | "government-portfolio-change"
  | "strategic-investment";

export type MarketEnvironmentSector =
  | "public-safety"
  | "police-law-enforcement"
  | "fire-rescue"
  | "emergency-management"
  | "defence-military"
  | "border-home-affairs"
  | "critical-infrastructure-industry"
  | "aviation"
  | "government-digital-transformation";

export type MarketEnvironmentOpportunityHorizon =
  | "immediate"
  | "near-term"
  | "medium-term"
  | "long-term"
  | "monitor";

export type MarketEnvironmentSourceType =
  | "government"
  | "budget"
  | "regulator"
  | "agency"
  | "parliament"
  | "official-strategy"
  | "official-procurement"
  | "other-primary-source";

export type MarketEnvironmentSource = {
  title: string;
  publisher: string;
  url: string;
  publicationDate?: string;
  sourceType: MarketEnvironmentSourceType;
};

export type MarketEnvironmentFunding = {
  value: number;
  currency: string;
  note?: string;
};

export type MarketEnvironmentItem = {
  id: string;
  headline: string;
  date: string;
  country: string;
  countrySlug: string;
  region?: string;
  regionSlug?: string;
  type: MarketEnvironmentIntelligenceType;
  sector: MarketEnvironmentSector;
  affectedAgencies: string[];
  summary: string;
  whatChanged: string;
  governmentOrProgram?: string;
  funding?: MarketEnvironmentFunding;
  commercialRelevance: string;
  droneSenseRelevance: string;
  opportunityHorizon: MarketEnvironmentOpportunityHorizon;
  confidence: MarketEnvironmentConfidence;
  sources: MarketEnvironmentSource[];
  lastVerified: string;
  status: MarketEnvironmentStatus;
  tags: string[];
};

export type MarketEnvironmentFilterState = {
  country: string;
  region: string;
  type: string;
  sector: string;
  horizon: string;
  search: string;
};

export type MarketEnvironmentMetrics = {
  activeIntelligence: number;
  fundingAndBudget: number;
  policyAndGovernment: number;
  nearTermOpportunities: number;
};

export const marketEnvironmentIntelligenceTypes: Array<{ value: MarketEnvironmentIntelligenceType; label: string }> = [
  { value: "budget-funding", label: "Budget & Funding" },
  { value: "government-priority", label: "Government Priority" },
  { value: "policy-legislative-change", label: "Policy & Legislative Change" },
  { value: "program-initiative", label: "Program & Initiative" },
  { value: "government-portfolio-change", label: "Government / Portfolio Change" },
  { value: "strategic-investment", label: "Strategic Investment" },
];

export const marketEnvironmentSectors: Array<{ value: MarketEnvironmentSector; label: string }> = [
  { value: "public-safety", label: "Public Safety" },
  { value: "police-law-enforcement", label: "Police / Law Enforcement" },
  { value: "fire-rescue", label: "Fire & Rescue" },
  { value: "emergency-management", label: "Emergency Management" },
  { value: "defence-military", label: "Defence / Military" },
  { value: "border-home-affairs", label: "Border / Home Affairs" },
  { value: "critical-infrastructure-industry", label: "Critical Infrastructure & Industry" },
  { value: "aviation", label: "Aviation" },
  { value: "government-digital-transformation", label: "Government / Digital Transformation" },
];

export const marketEnvironmentHorizons: Array<{ value: MarketEnvironmentOpportunityHorizon; label: string; helpText: string }> = [
  {
    value: "immediate",
    label: "Immediate",
    helpText: "Potential commercial impact is current or imminent.",
  },
  {
    value: "near-term",
    label: "Near-term",
    helpText: "Potential impact is expected in the next planning cycle.",
  },
  {
    value: "medium-term",
    label: "Medium-term",
    helpText: "Potential impact is plausible but may require lead-time or enabling decisions.",
  },
  {
    value: "long-term",
    label: "Long-term",
    helpText: "Potential impact is strategic and likely beyond near-cycle execution.",
  },
  {
    value: "monitor",
    label: "Monitor",
    helpText: "Signal is relevant to track but has uncertain commercial timing.",
  },
];

export const marketEnvironmentSourceTypes: Array<{ value: MarketEnvironmentSourceType; label: string }> = [
  { value: "government", label: "Government" },
  { value: "budget", label: "Budget" },
  { value: "regulator", label: "Regulator" },
  { value: "agency", label: "Agency" },
  { value: "parliament", label: "Parliament" },
  { value: "official-strategy", label: "Official Strategy" },
  { value: "official-procurement", label: "Official Procurement" },
  { value: "other-primary-source", label: "Other Primary Source" },
];

export const australiaMarketRegions: Array<{ slug: string; name: string }> = [
  { slug: "federal-commonwealth", name: "Federal / Commonwealth" },
  ...australiaJurisdictions.map((state) => ({ slug: state.slug, name: state.name })),
];

export const marketEnvironmentItems: MarketEnvironmentItem[] = [
  {
    id: "au-nsw-polair-remote-extension-2026-08-27",
    headline: "NSW Police POLAIR Remote trial extended for two years with potential regional expansion",
    date: "2026-08-27",
    country: "Australia",
    countrySlug: "australia",
    region: "New South Wales",
    regionSlug: "new-south-wales",
    type: "program-initiative",
    sector: "police-law-enforcement",
    affectedAgencies: ["NSW Police Force"],
    summary: "NSW extended the POLAIR Remote trial in Moree by two years and flagged potential rollout to other regional areas.",
    whatChanged:
      "The NSW Government announced the Australian-first POLAIR Remote police drone trial in Moree will continue for another two years. The Government also stated it will look to roll the technology out in other regional areas. Two drones have been operating in Moree and are remotely piloted from a Remote Operations Centre at NSW Police Force Aviation Command at Bankstown Airport.",
    governmentOrProgram: "POLAIR Remote",
    commercialRelevance:
      "This extends remotely operated police drone operations beyond an initial short trial and signals interest in wider regional deployment. If expansion proceeds, future requirements may emerge around remote aviation operations, command-and-control, live situational awareness, governance and scalable RPAS management.",
    droneSenseRelevance:
      "High strategic relevance due to strong adjacency to DroneSense Remote/DFR operating concepts including remotely operated aircraft, centralized remote operations and real-time situational awareness. This does not imply NSW Police is seeking DroneSense specifically.",
    opportunityHorizon: "near-term",
    confidence: "high",
    sources: [
      {
        title: "Minns Labor Government to continue police drone program trial to make regional communities safer",
        publisher: "NSW Government",
        url: "https://www.nsw.gov.au/media-releases/minns-labor-government-to-continue-police-drone-program-trial-to-make-regional-communities-safer",
        publicationDate: "2026-08-27",
        sourceType: "government",
      },
    ],
    lastVerified: "2026-09-01",
    status: "active",
    tags: ["nsw", "polair", "remote-operations", "police", "regional-expansion"],
  },
  {
    id: "au-five-country-counter-drone-priority-2026-08-26",
    headline: "Five Country security ministers identify counter-drone capability as a major-event security priority",
    date: "2026-08-26",
    country: "Australia",
    countrySlug: "australia",
    region: "Federal / Commonwealth",
    regionSlug: "federal-commonwealth",
    type: "government-priority",
    sector: "public-safety",
    affectedAgencies: [],
    summary: "Five Country ministers highlighted counter-drone capability as a joint major-event security priority, including in the lead-up to major Australian-hosted events.",
    whatChanged:
      "Australia, Canada, New Zealand, the United Kingdom and the United States identified increasingly complex major-event security as a shared challenge during the August 2026 Five Country Ministerial in Sydney. The published priorities include counter-drone capability alongside border security, critical infrastructure and cyber resilience, with reference to major events including the 2028 and 2032 Olympic Games.",
    governmentOrProgram: "Five Country Ministerial 2026",
    commercialRelevance:
      "Counter-UAS and drone situational awareness are becoming more prominent in national public-safety and major-event planning. For Australia, Brisbane 2032 creates a long-run planning horizon for inter-agency coordination and operational readiness.",
    droneSenseRelevance:
      "Medium strategic relevance. DroneSense is not a counter-UAS product; relevance is adjacent through airspace awareness, public-safety aviation coordination and command-centre operating picture requirements for authorized RPAS.",
    opportunityHorizon: "long-term",
    confidence: "high",
    sources: [
      {
        title: "Five Country Ministerial 2026",
        publisher: "Australian Government Department of Home Affairs",
        url: "https://www.homeaffairs.gov.au/about-us/our-portfolios/national-security-and-law-enforcement/five-country-ministerial",
        publicationDate: "2026-08-26",
        sourceType: "government",
      },
    ],
    lastVerified: "2026-09-01",
    status: "active",
    tags: ["counter-drone", "major-events", "public-safety", "federal", "olympics"],
  },
  {
    id: "au-nsw-ses-connectivity-live-video-2026-08-03",
    headline: "NSW SES invests $7.7m in disaster connectivity including live video support for drone operators",
    date: "2026-08-03",
    country: "Australia",
    countrySlug: "australia",
    region: "New South Wales",
    regionSlug: "new-south-wales",
    type: "strategic-investment",
    sector: "emergency-management",
    affectedAgencies: ["NSW State Emergency Service"],
    summary: "NSW announced a $7.7 million SES connectivity program, including portable kits allocated to drone operators for secure live vision transmission.",
    whatChanged:
      "The NSW Government announced a $7.7 million investment in connectivity capability for NSW SES, including portable internet connectivity kits, internet-enabled forward command vehicles and satellite vessel tracking. Eight portable connectivity kits are specifically allocated to SES drone operators, with the Government stating these kits allow secure live vision transmission from incidents to Incident Management Teams or the State Control Centre.",
    funding: {
      value: 7700000,
      currency: "AUD",
      note: "Program-level connectivity funding; not presented as drone-software specific allocation.",
    },
    commercialRelevance:
      "This is direct evidence of emergency-management investment in the communications layer needed to move live operational information from field assets into command environments during disasters.",
    droneSenseRelevance:
      "Very high relevance for live operational video workflows and command-centre situational awareness. Funding scope remains broader than drone software and should not be treated as product-specific budget.",
    opportunityHorizon: "immediate",
    confidence: "high",
    sources: [
      {
        title: "$7.7 million investment to keep communities connected and improve disaster response",
        publisher: "NSW Government",
        url: "https://www.nsw.gov.au/media-releases/7-7-million-investment-to-keep-communities-connected-and-improve-disaster-response",
        publicationDate: "2026-08-03",
        sourceType: "government",
      },
    ],
    lastVerified: "2026-09-01",
    status: "active",
    tags: ["nsw-ses", "connectivity", "live-video", "disaster-response", "drone-operators"],
  },
  {
    id: "au-abf-expanded-drone-use-signal-2026-07-30",
    headline: "Australian Border Force examining expanded use of drones to increase operational reach",
    date: "2026-07-30",
    country: "Australia",
    countrySlug: "australia",
    region: "Federal / Commonwealth",
    regionSlug: "federal-commonwealth",
    type: "government-priority",
    sector: "border-home-affairs",
    affectedAgencies: ["Australian Border Force"],
    summary: "A Home Affairs ministerial statement signaled consideration of expanded ABF drone use to increase operational reach.",
    whatChanged:
      "During a July 2026 press conference in Cairns, the Minister for Home Affairs discussed improving Australian Border Force capability through new assets, specifically including drones, to substantially expand operational reach.",
    commercialRelevance:
      "This is an early strategic signal from senior government leadership. It is not yet evidence of funded procurement or an approved program, but it may influence future border-operations capability planning.",
    droneSenseRelevance:
      "High potential relevance for large-area distributed border operations that may require RPAS command, fleet visibility, remote operations and live situational awareness. Opportunity remains unconfirmed.",
    opportunityHorizon: "monitor",
    confidence: "high",
    sources: [
      {
        title: "Press conference - Cairns, Queensland",
        publisher: "Australian Government Minister for Home Affairs",
        url: "https://minister.homeaffairs.gov.au/",
        publicationDate: "2026-07-30",
        sourceType: "government",
      },
    ],
    lastVerified: "2026-09-01",
    status: "active",
    tags: ["abf", "border-force", "drones", "strategic-signal", "home-affairs"],
  },
  {
    id: "au-nsw-public-safety-network-2026-06-23",
    headline: "NSW invests $179.1m in Public Safety Network emergency-services communications",
    date: "2026-06-23",
    country: "Australia",
    countrySlug: "australia",
    region: "New South Wales",
    regionSlug: "new-south-wales",
    type: "strategic-investment",
    sector: "public-safety",
    affectedAgencies: [],
    summary: "The NSW 2026-27 Budget allocates $179.1 million to strengthen emergency-services communications through the Public Safety Network.",
    whatChanged:
      "The 2026-27 NSW Budget includes $179.1 million investment in the Public Safety Network to improve emergency-services communications coverage and reliability.",
    funding: {
      value: 179100000,
      currency: "AUD",
      note: "Enabling communications infrastructure funding; not represented as direct RPAS budget.",
    },
    commercialRelevance:
      "Resilient communications investment can expand the practical operating environment for connected field and command technologies across emergency services.",
    droneSenseRelevance:
      "Medium strategic relevance because reliable connectivity is a core dependency for live video, remote aviation and distributed command-and-control workflows.",
    opportunityHorizon: "medium-term",
    confidence: "high",
    sources: [
      {
        title: "2026-27 Budget - Regional NSW / Ensuring community safety",
        publisher: "NSW Government",
        url: "https://www.nsw.gov.au/your-government/budget-work/regional-nsw/ensuring-community-safety",
        publicationDate: "2026-06-23",
        sourceType: "budget",
      },
    ],
    lastVerified: "2026-09-01",
    status: "active",
    tags: ["public-safety-network", "communications", "budget", "nsw", "emergency-services"],
  },
  {
    id: "au-qld-rpas-capability-expansion-2026-06-23",
    headline: "Queensland invests $5.375m to expand police remotely piloted aircraft capability",
    date: "2026-06-23",
    country: "Australia",
    countrySlug: "australia",
    region: "Queensland",
    regionSlug: "queensland",
    type: "budget-funding",
    sector: "police-law-enforcement",
    affectedAgencies: ["Queensland Police Service"],
    summary: "Queensland budget material and ministerial statements identify approximately $5.4 million over three years to expand QPS RPAS capability.",
    whatChanged:
      "The 2026-27 Queensland Budget provides approximately $5.4 million over three years to expand drone and surveillance capability. Government material describes this as expansion of Queensland Police Service Remotely Piloted Aircraft Systems Capability to support rapid launch in difficult terrain and strengthen policing, emergency-services and disaster-management responses.",
    governmentOrProgram: "Remotely Piloted Aircraft Systems Capability",
    funding: {
      value: 5375000,
      currency: "AUD",
      note: "Government capability expansion funding; not represented as allocation to specific vendor software.",
    },
    commercialRelevance:
      "This is a direct funded commitment to expand operational RPAS capability, signaling movement from experimental deployment toward broader institutional adoption.",
    droneSenseRelevance:
      "Very high relevance for operational fleet management, live video, situational awareness and multi-agency workflows. Funding should not be interpreted as allocated to DroneSense.",
    opportunityHorizon: "immediate",
    confidence: "high",
    sources: [
      {
        title: "Queensland Police Service - Service Delivery Statement 2026-27",
        publisher: "Queensland Government",
        url: "https://budget.qld.gov.au/files/BP2-Service-Delivery-Statements-2026-27-Queensland-Police-Service.pdf",
        publicationDate: "2026-06-23",
        sourceType: "budget",
      },
      {
        title: "Making Queensland safer with more police to grow frontline",
        publisher: "Queensland Government",
        url: "https://statements.qld.gov.au/",
        publicationDate: "2026-06-23",
        sourceType: "government",
      },
    ],
    lastVerified: "2026-09-01",
    status: "active",
    tags: ["qld", "qps", "rpas", "budget", "public-safety-aviation"],
  },
  {
    id: "au-qld-capital-rpas-line-item-2026-06-23",
    headline: "Queensland Budget identifies dedicated capital investment in police RPAS capability",
    date: "2026-06-23",
    country: "Australia",
    countrySlug: "australia",
    region: "Queensland",
    regionSlug: "queensland",
    type: "strategic-investment",
    sector: "police-law-enforcement",
    affectedAgencies: ["Queensland Police Service"],
    summary: "Queensland capital budget documentation includes a dedicated RPAS aviation capability line item with multi-year expenditure profile.",
    whatChanged:
      "Queensland's 2026-27 Capital Statement includes an asset investment line item for 'Aviation Capability - Remotely Piloted Aircraft System' with total estimated project cost of approximately $2.735 million and expenditure extending beyond 2026-27.",
    governmentOrProgram: "Aviation Capability - Remotely Piloted Aircraft System",
    funding: {
      value: 2735000,
      currency: "AUD",
      note: "Dedicated capital-line figure should be treated as supporting evidence and not automatically aggregated with broader RPAS figures.",
    },
    commercialRelevance:
      "A dedicated capital program indicates RPAS is represented in formal aviation investment planning rather than only ad hoc experimentation.",
    droneSenseRelevance:
      "High relevance as supporting strategic intelligence for enduring RPAS capability investment in Queensland Police Service. Figures should not be combined unless official documentation confirms they are separate programs.",
    opportunityHorizon: "near-term",
    confidence: "high",
    sources: [
      {
        title: "2026-27 Budget Paper No. 3 - Capital Statement",
        publisher: "Queensland Government",
        url: "https://budget.qld.gov.au/files/BP3-Capital-Statement-2026-27.pdf",
        publicationDate: "2026-06-23",
        sourceType: "budget",
      },
    ],
    lastVerified: "2026-09-01",
    status: "active",
    tags: ["qld", "capital-statement", "rpas", "aviation-capability", "qps"],
  },
  {
    id: "au-nsw-police-tech-uplift-2026-06-18",
    headline: "NSW Police receives $108.8m technology and digital infrastructure uplift",
    date: "2026-06-18",
    country: "Australia",
    countrySlug: "australia",
    region: "New South Wales",
    regionSlug: "new-south-wales",
    type: "budget-funding",
    sector: "police-law-enforcement",
    affectedAgencies: ["NSW Police Force"],
    summary: "NSW allocated $108.8 million for police technology and digital infrastructure modernization across evidence, analytics, platforms and mobility.",
    whatChanged:
      "The NSW Government allocated $108.8 million in the 2026-27 Budget for major technology upgrades to NSW Police, covering digital infrastructure and policing technology including evidence systems, core platforms, data and analytics, vehicle terminals and mobile devices.",
    funding: {
      value: 108800000,
      currency: "AUD",
      note: "Budgeted police technology modernization funding; not identified in source as RPAS-specific budget.",
    },
    commercialRelevance:
      "A major funded modernization program indicates sustained focus on interoperability, mobile access and digital workflows in police operations.",
    droneSenseRelevance:
      "Medium relevance because broader police digital-transformation priorities may shape integration and interoperability expectations for future RPAS and situational-awareness platforms.",
    opportunityHorizon: "near-term",
    confidence: "high",
    sources: [
      {
        title: "$126 million investment in the NSW Police Force and NSW Crime Commission to fight organised crime",
        publisher: "NSW Government",
        url: "https://www.nsw.gov.au/media-releases/126-million-investment-in-the-nsw-police-force-and-nsw-crime-commission-to-fight-organised-crime",
        publicationDate: "2026-06-18",
        sourceType: "government",
      },
    ],
    lastVerified: "2026-09-01",
    status: "active",
    tags: ["nsw-police", "digital-infrastructure", "budget", "technology-uplift", "analytics"],
  },
  {
    id: "au-wa-public-safety-network-priority-2026-06-10",
    headline: "WA progresses interoperable Public Safety Network for police, fire, ambulance and emergency services",
    date: "2026-06-10",
    country: "Australia",
    countrySlug: "australia",
    region: "Western Australia",
    regionSlug: "western-australia",
    type: "government-priority",
    sector: "public-safety",
    affectedAgencies: [],
    summary: "WA's digital-government strategy positions an interoperable Public Safety Network as a major statewide coordination and communications priority.",
    whatChanged:
      "WA Government digital-government strategy material identifies the Public Safety Network as a secure interoperable communications network being progressed for police, fire, ambulance and other emergency services across metropolitan and regional WA, and describes it as a future critical State Digital Asset.",
    commercialRelevance:
      "Explicit interoperability priorities can influence demand for platforms able to share operational information across agencies and command environments.",
    droneSenseRelevance:
      "High strategic relevance due to alignment with multi-agency situational awareness and connected operational coordination use cases. This does not imply DroneSense is part of the Public Safety Network program.",
    opportunityHorizon: "medium-term",
    confidence: "high",
    sources: [
      {
        title: "Strategic Priority 1: A digitally empowered public sector working together",
        publisher: "Western Australian Government Office of Digital Government",
        url: "https://www.wa.gov.au/government/document-collections/office-of-digital-government-strategy",
        publicationDate: "2026-06-10",
        sourceType: "official-strategy",
      },
    ],
    lastVerified: "2026-09-01",
    status: "active",
    tags: ["wa", "public-safety-network", "interoperability", "digital-government", "communications"],
  },
  {
    id: "au-nsw-police-rpas-panel-eoi-2026-06-02",
    headline: "NSW Police sought industry capability for enterprise RPAS and autonomous Drone-in-a-Box systems",
    date: "2026-06-02",
    country: "Australia",
    countrySlug: "australia",
    region: "New South Wales",
    regionSlug: "new-south-wales",
    type: "strategic-investment",
    sector: "police-law-enforcement",
    affectedAgencies: ["NSW Police Force"],
    summary: "NSW Police ran an open EOI for an RPAS panel covering enterprise-grade RPAS capability and future autonomous dock-based systems planning.",
    whatChanged:
      "NSW Police Force published an open Expression of Interest for a Remotely Piloted Aircraft Systems Panel (YR-2026-0058). The EOI sought capability information for enterprise-grade RPAS and support services for law-enforcement and public-safety operations, including future planning for autonomous and dock-based RPAS/Drone-in-a-Box systems and specialist RPAS products. The EOI opened 2 June 2026 and closed 30 June 2026.",
    governmentOrProgram: "NSW Police RPAS Panel - YR-2026-0058",
    commercialRelevance:
      "This is direct evidence of structured market engagement for enterprise RPAS capability and possible expansion planning beyond isolated trial use.",
    droneSenseRelevance:
      "Very high strategic relevance for enterprise RPAS management, autonomous/docked operations, remote operations and public-safety command workflows. This is not presented as contract award evidence and does not imply DroneSense participation.",
    opportunityHorizon: "immediate",
    confidence: "high",
    sources: [
      {
        title: "Remotely Piloted Aircraft Systems (RPAS) Panel - YR-2026-0058",
        publisher: "buy NSW",
        url: "https://www.buy.nsw.gov.au/opportunities",
        publicationDate: "2026-06-02",
        sourceType: "official-procurement",
      },
    ],
    lastVerified: "2026-09-01",
    status: "active",
    tags: ["nsw-police", "rpas-panel", "eoi", "drone-in-a-box", "autonomous"],
  },
  {
    id: "au-wa-dfes-fleet-replacement-2026-05-07",
    headline: "WA allocates $31.2m for fire and emergency services fleet replacement",
    date: "2026-05-07",
    country: "Australia",
    countrySlug: "australia",
    region: "Western Australia",
    regionSlug: "western-australia",
    type: "budget-funding",
    sector: "fire-rescue",
    affectedAgencies: ["Department of Fire and Emergency Services"],
    summary: "WA budget allocates an additional $31.2 million for fire and emergency-services fleet replacement.",
    whatChanged:
      "The WA 2026-27 Budget includes an additional $31.2 million for fire and emergency services fleet replacement.",
    funding: {
      value: 31200000,
      currency: "AUD",
      note: "Fleet-capability funding and not represented as RPAS or software-specific expenditure.",
    },
    commercialRelevance:
      "The investment indicates continued capital commitment to frontline emergency-services capability and can be used as broader market context.",
    droneSenseRelevance:
      "Low-medium relevance as contextual signal only. The source does not identify RPAS or software allocation.",
    opportunityHorizon: "monitor",
    confidence: "high",
    sources: [
      {
        title: "2026-27 WA State Budget - Safe and Inclusive Communities",
        publisher: "Western Australian Government",
        url: "https://www.wa.gov.au/government/wa-state-budget",
        publicationDate: "2026-05-07",
        sourceType: "budget",
      },
    ],
    lastVerified: "2026-09-01",
    status: "active",
    tags: ["wa", "dfes", "budget", "fleet", "fire-rescue"],
  },
  {
    id: "au-drone-security-consultation-2026-04-24",
    headline: "Australian Government advances national drone-security reform framework",
    date: "2026-04-24",
    country: "Australia",
    countrySlug: "australia",
    region: "Federal / Commonwealth",
    regionSlug: "federal-commonwealth",
    type: "policy-legislative-change",
    sector: "aviation",
    affectedAgencies: ["Department of Home Affairs"],
    summary: "Australia opened national drone-security consultation across counter-drone, identification, enforcement and information-sharing settings.",
    whatChanged:
      "The Australian Government opened consultation on proposed approaches to Australia's drone-security framework covering management of drone threats, counter-drone capability, identification and tracking, enforcement, classifications and operating areas, information and data sharing, and protection of critical infrastructure and major events. The consultation closed after receiving 62 submissions.",
    governmentOrProgram: "Drone Security Public Consultation 2026",
    commercialRelevance:
      "National policy reform can influence future operating conditions for public-safety drone programs, including identification, information-sharing and counter-UAS interfaces.",
    droneSenseRelevance:
      "High strategic relevance for the broader public-safety RPAS operating environment. Final outcomes are not yet determined and should not be predicted.",
    opportunityHorizon: "medium-term",
    confidence: "high",
    sources: [
      {
        title: "Consultation on proposed approaches to Australia's drone security",
        publisher: "Australian Government Department of Home Affairs",
        url: "https://www.homeaffairs.gov.au/reports-and-publications/submissions-and-discussion-papers/consultation-proposed-approaches-australias-drone-security",
        publicationDate: "2026-04-24",
        sourceType: "government",
      },
    ],
    lastVerified: "2026-09-01",
    status: "active",
    tags: ["drone-security", "policy", "home-affairs", "federal", "consultation"],
  },
];

export function getMarketEnvironmentItems(): MarketEnvironmentItem[] {
  return [...marketEnvironmentItems].sort((a, b) => {
    const byDate = Date.parse(b.date) - Date.parse(a.date);
    if (byDate !== 0) return byDate;
    return a.headline.localeCompare(b.headline);
  });
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function matchesSearch(item: MarketEnvironmentItem, query: string): boolean {
  const cleaned = normalize(query);
  if (!cleaned) return true;

  const terms = [
    item.headline,
    item.country,
    item.region ?? "",
    item.summary,
    item.governmentOrProgram ?? "",
    item.commercialRelevance,
    item.droneSenseRelevance,
    item.tags.join(" "),
    item.affectedAgencies.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return terms.includes(cleaned);
}

export function filterMarketEnvironmentItems(items: MarketEnvironmentItem[], filters: MarketEnvironmentFilterState): MarketEnvironmentItem[] {
  return items.filter((item) => {
    if (filters.country !== "all" && item.countrySlug !== filters.country) {
      return false;
    }

    if (filters.region !== "all") {
      if (!item.regionSlug || item.regionSlug !== filters.region) {
        return false;
      }
    }

    if (filters.type !== "all" && item.type !== filters.type) {
      return false;
    }

    if (filters.sector !== "all" && item.sector !== filters.sector) {
      return false;
    }

    if (filters.horizon !== "all" && item.opportunityHorizon !== filters.horizon) {
      return false;
    }

    return matchesSearch(item, filters.search);
  });
}

export function getMarketEnvironmentMetrics(items: MarketEnvironmentItem[]): MarketEnvironmentMetrics {
  const policyAndGovernmentTypes: MarketEnvironmentIntelligenceType[] = [
    "government-priority",
    "policy-legislative-change",
    "government-portfolio-change",
  ];

  return {
    activeIntelligence: items.filter((item) => item.status === "active").length,
    fundingAndBudget: items.filter((item) => item.type === "budget-funding").length,
    policyAndGovernment: items.filter((item) => policyAndGovernmentTypes.includes(item.type)).length,
    nearTermOpportunities: items.filter((item) => item.opportunityHorizon === "near-term").length,
  };
}

export function getMarketEnvironmentCountryOptions(): Array<{ value: string; label: string }> {
  return [
    { value: "all", label: "All Countries" },
    ...supportedCountries.map((country) => ({ value: country.slug, label: country.name })),
  ];
}

export function getMarketEnvironmentRegionOptions(countrySlug: string): Array<{ value: string; label: string }> {
  if (countrySlug !== "australia") {
    return [{ value: "all", label: "All States / Regions" }];
  }

  return [
    { value: "all", label: "All States / Regions" },
    ...australiaMarketRegions.map((region) => ({ value: region.slug, label: region.name })),
  ];
}

export function getMarketEnvironmentItemsByCountry(countrySlug: string): MarketEnvironmentItem[] {
  return getMarketEnvironmentItems().filter((item) => item.countrySlug === countrySlug);
}

export function formatFunding(funding: MarketEnvironmentFunding): string {
  const formatted = new Intl.NumberFormat("en-AU", {
    maximumFractionDigits: 0,
    notation: funding.value >= 1_000_000 ? "compact" : "standard",
  }).format(funding.value);

  return `${funding.currency.toUpperCase()} ${formatted}`;
}

export function getIntelligenceTypeLabel(type: MarketEnvironmentIntelligenceType): string {
  return marketEnvironmentIntelligenceTypes.find((item) => item.value === type)?.label ?? type;
}

export function getSectorLabel(sector: MarketEnvironmentSector): string {
  return marketEnvironmentSectors.find((item) => item.value === sector)?.label ?? sector;
}

export function getHorizonLabel(horizon: MarketEnvironmentOpportunityHorizon): string {
  return marketEnvironmentHorizons.find((item) => item.value === horizon)?.label ?? horizon;
}

export function getConfidenceLabel(confidence: MarketEnvironmentConfidence): string {
  if (confidence === "verification-required") return "Verification Required";
  return confidence.charAt(0).toUpperCase() + confidence.slice(1);
}
