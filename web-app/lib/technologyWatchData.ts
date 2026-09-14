export type TechnologyConfidence = "high" | "medium" | "low" | "research-required";

export type TechnologyRelationshipType =
  | "integrated"
  | "supported-hardware"
  | "technology-partner"
  | "versaterm-ecosystem"
  | "interoperability"
  | "monitored-technology"
  | "other-verified-relationship";

export type TechnologyCompanyType =
  | "public-safety-platform"
  | "hardware-manufacturer"
  | "communications-technology"
  | "mapping-geospatial"
  | "video-management"
  | "other";

export type TechnologyCategory =
  | "video-integration"
  | "dfr-operations"
  | "evidence-management"
  | "real-time-response"
  | "other";

export type TechnologySourceType =
  | "official-company"
  | "official-product-documentation"
  | "dronesense-support"
  | "versaterm"
  | "regulator"
  | "government"
  | "official-partner"
  | "other-primary-source";

export type TechnologyIntelligenceType =
  | "new-product-hardware"
  | "software-platform-update"
  | "integration"
  | "partnership"
  | "acquisition"
  | "public-safety-deployment"
  | "dfr-dock-development"
  | "regulatory-approval-certification"
  | "connectivity-edge-technology"
  | "end-of-life-product-change"
  | "strategic-development";

export type TechnologyImpactType =
  | "opportunity"
  | "integration-impact"
  | "compatibility-impact"
  | "competitive-impact"
  | "strategic-relevance"
  | "monitor"
  | "no-material-impact";

export type TechnologyWatchSource = {
  title: string;
  publisher: string;
  url: string;
  publicationDate?: string;
  sourceType: TechnologySourceType;
};

export type TechnologyTerm = {
  id: string;
  term: string;
  definition: string;
  productId?: string;
  companyId?: string;
  source?: TechnologyWatchSource;
};

export type TechnologyCompany = {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  website?: string;
  overview: string;
  headquarters?: string;
  companyType: TechnologyCompanyType;
  relationshipTypes: TechnologyRelationshipType[];
  relationshipSummary: string;
  relevantProductIds: string[];
  integrationSummary: string;
  trainingSummary: string;
  terminologyIds: string[];
  officialSources: TechnologyWatchSource[];
  lastVerified: string;
  confidence: TechnologyConfidence;
  tags: string[];
};

export type TechnologyProduct = {
  id: string;
  companyId: string;
  name: string;
  slug: string;
  category: TechnologyCategory;
  overview: string;
  whatItDoes: string;
  publicSafetyUse: string;
  keyCapabilities: string[];
  relationshipToDroneSense: string;
  integrationDetails: string;
  trainingNotes: string[];
  terminologyIds: string[];
  officialSources: TechnologyWatchSource[];
  lastVerified: string;
  confidence: TechnologyConfidence;
  tags: string[];
};

export type TechnologyIntelligenceItem = {
  id: string;
  headline: string;
  date: string;
  companyIds: string[];
  productIds: string[];
  type: TechnologyIntelligenceType;
  summary: string;
  whatChanged: string;
  whyItMatters: string;
  droneSenseImpact: string;
  impactType: TechnologyImpactType;
  countries: string[];
  sectors: string[];
  sources: TechnologyWatchSource[];
  lastVerified: string;
  confidence: TechnologyConfidence;
  tags: string[];
};

export type TechnologyWatchViewMode = "ecosystem" | "intelligence";

export type TechnologyWatchFilterState = {
  view: TechnologyWatchViewMode;
  search: string;
  company: string;
  relationship: string;
  category: string;
  intelligenceType: string;
  impact: string;
  country: string;
};

export const technologyRelationshipOptions: Array<{ value: TechnologyRelationshipType; label: string }> = [
  { value: "integrated", label: "Integrated" },
  { value: "supported-hardware", label: "Supported Hardware" },
  { value: "technology-partner", label: "Technology Partner" },
  { value: "versaterm-ecosystem", label: "Versaterm Ecosystem" },
  { value: "interoperability", label: "Interoperability" },
  { value: "monitored-technology", label: "Monitored Technology" },
  { value: "other-verified-relationship", label: "Other Verified Relationship" },
];

export const technologyCompanyTypeOptions: Array<{ value: TechnologyCompanyType; label: string }> = [
  { value: "public-safety-platform", label: "Public Safety Technology" },
  { value: "hardware-manufacturer", label: "Hardware Manufacturer" },
  { value: "communications-technology", label: "Communications Technology" },
  { value: "mapping-geospatial", label: "Mapping / Geospatial" },
  { value: "video-management", label: "Video Management" },
  { value: "other", label: "Other" },
];

export const technologyCategoryOptions: Array<{ value: TechnologyCategory; label: string }> = [
  { value: "video-integration", label: "Real-Time Operations / RTCC Platform" },
  { value: "dfr-operations", label: "Drone / DFR Platform" },
  { value: "evidence-management", label: "Digital Evidence Management" },
  { value: "real-time-response", label: "Real-Time Situational Awareness" },
  { value: "other", label: "Other" },
];

export const technologyIntelligenceTypeOptions: Array<{ value: TechnologyIntelligenceType; label: string }> = [
  { value: "new-product-hardware", label: "New Product / Hardware" },
  { value: "software-platform-update", label: "Software / Platform Update" },
  { value: "integration", label: "Integration" },
  { value: "partnership", label: "Partnership" },
  { value: "acquisition", label: "Acquisition" },
  { value: "public-safety-deployment", label: "Public Safety Deployment" },
  { value: "dfr-dock-development", label: "DFR / Dock Development" },
  { value: "regulatory-approval-certification", label: "Regulatory Approval / Certification" },
  { value: "connectivity-edge-technology", label: "Connectivity / Edge Technology" },
  { value: "end-of-life-product-change", label: "End-of-Life / Product Change" },
  { value: "strategic-development", label: "Strategic Development" },
];

export const technologyImpactTypeOptions: Array<{ value: TechnologyImpactType; label: string }> = [
  { value: "opportunity", label: "Opportunity" },
  { value: "integration-impact", label: "Integration Impact" },
  { value: "compatibility-impact", label: "Compatibility Impact" },
  { value: "competitive-impact", label: "Competitive Impact" },
  { value: "strategic-relevance", label: "Strategic Relevance" },
  { value: "monitor", label: "Monitor" },
  { value: "no-material-impact", label: "No Material Impact" },
];

const technologyTerminology: TechnologyTerm[] = [
  {
    id: "term-rtcc",
    term: "RTCC",
    definition:
      "A command and operations environment used to combine live operational information and support real-time public-safety decision making.",
    companyId: "company-axon",
    productId: "product-axon-fusus",
    source: {
      title: "Axon Fusus",
      publisher: "Axon",
      url: "https://www.axon.com/products/axon-fusus",
      sourceType: "official-product-documentation",
    },
  },
  {
    id: "term-real-time-crime-center",
    term: "Real-Time Crime Center",
    definition:
      "A command and operations environment used to combine live operational information and support real-time public-safety decision making.",
    companyId: "company-axon",
    productId: "product-axon-fusus",
    source: {
      title: "Axon Fusus",
      publisher: "Axon",
      url: "https://www.axon.com/products/axon-fusus",
      sourceType: "official-product-documentation",
    },
  },
  {
    id: "term-dfr",
    term: "DFR",
    definition:
      "Drone as First Responder operating model using remotely deployed public-safety drones to provide live aerial situational awareness.",
    companyId: "company-axon",
    productId: "product-axon-air",
    source: {
      title: "Axon Air",
      publisher: "Axon",
      url: "https://www.axon.com/products/axon-air",
      sourceType: "official-product-documentation",
    },
  },
];

const technologyCompanies: TechnologyCompany[] = [
  {
    id: "company-axon",
    name: "Axon",
    slug: "axon",
    website: "https://www.axon.com/",
    overview:
      "Axon provides public-safety technology spanning real-time operations, digital evidence management, body-worn and connected devices, drone operations, records and related public-safety software.",
    companyType: "public-safety-platform",
    relationshipTypes: ["integrated", "interoperability", "versaterm-ecosystem"],
    relationshipSummary:
      "DroneSense interoperates with multiple components of the Axon public-safety ecosystem, allowing DroneSense drone operations to fit into broader Axon real-time operations and evidence workflows. This does not imply all Axon products are directly integrated with DroneSense.",
    relevantProductIds: ["product-axon-fusus", "product-axon-air", "product-axon-respond", "product-axon-evidence"],
    integrationSummary:
      "DroneSense Support states that users transitioning from Axon Air Powered by DroneSense to DroneSense applications continue to receive integrations with Axon Fusus, Axon Respond, Axon Evidence and Axon Single Sign-On in DroneSense mobile applications. Integration mechanics beyond this statement require separate verification.",
    trainingSummary:
      "AXON ECOSYSTEM - SIMPLE MENTAL MODEL\nAxon Air = drones / DFR\nFusus = real-time operations / RTCC / common operational view\nRespond = real-time connected-device awareness\nEvidence = digital evidence management\nDroneSense = drone operations platform with verified ongoing integrations into Fusus, Respond, Evidence and Axon SSO.",
    terminologyIds: ["term-rtcc", "term-real-time-crime-center", "term-dfr"],
    officialSources: [
      {
        title: "Axon Official Website",
        publisher: "Axon",
        url: "https://www.axon.com/",
        sourceType: "official-company",
      },
      {
        title: "Axon Air App Transition to DroneSense",
        publisher: "DroneSense Support",
        url: "https://support.dronesense.com/hc/en-us/articles/37992894260749-Axon-Air-App-Transition-to-DroneSense",
        publicationDate: "2025-07-11",
        sourceType: "dronesense-support",
      },
    ],
    lastVerified: "2026-09-02",
    confidence: "high",
    tags: [
      "axon",
      "public-safety-technology",
      "fusus",
      "axon-air",
      "axon-respond",
      "axon-evidence",
      "integrated",
      "interoperability",
      "versaterm-ecosystem",
      "situational-awareness",
      "evidence-management",
      "dfr",
    ],
  },
];

const technologyProducts: TechnologyProduct[] = [
  {
    id: "product-axon-fusus",
    companyId: "company-axon",
    name: "Axon Fusus",
    slug: "fusus",
    category: "video-integration",
    overview: "Axon Fusus is a real-time operations and intelligence platform for public safety.",
    whatItDoes:
      "Axon states that Fusus unifies live video, alerts and field data into one operational view. Current product material describes combining sources such as live video, officer location, alerts, dispatch/CAD context, ALPR data and other connected camera or sensor feeds into a shared real-time operational picture.",
    publicSafetyUse:
      "Used by command, field and Real-Time Crime Center teams to coordinate response and maintain shared situational awareness.",
    keyCapabilities: [
      "Unified real-time operational view across video, alerts and field context",
      "Multi-source visibility including CAD context and connected sensor feeds",
      "Operational situational awareness support for command and RTCC workflows",
    ],
    relationshipToDroneSense:
      "Verified integration. DroneSense Support states that ongoing integrations with Axon Fusus continue within DroneSense mobile applications after the Axon Air app transition.",
    integrationDetails:
      "Verified at relationship level only. Do not infer workflow-level API behavior, schemas or automation details beyond published sources.",
    trainingNotes: [
      "Think of Fusus as the operational intelligence and RTCC layer.",
      "It is not simply a video-storage system.",
      "Its purpose is real-time operational visibility and coordination.",
      "Axon Evidence is the evidence-management layer; Fusus is the live operational layer.",
      "When discussing DroneSense integration, stay within verified wording unless exact workflow details are known.",
    ],
    terminologyIds: ["term-rtcc", "term-real-time-crime-center"],
    officialSources: [
      {
        title: "Axon Fusus",
        publisher: "Axon",
        url: "https://www.axon.com/products/axon-fusus",
        sourceType: "official-product-documentation",
      },
      {
        title: "Axon Air App Transition to DroneSense",
        publisher: "DroneSense Support",
        url: "https://support.dronesense.com/hc/en-us/articles/37992894260749-Axon-Air-App-Transition-to-DroneSense",
        publicationDate: "2025-07-11",
        sourceType: "dronesense-support",
      },
    ],
    lastVerified: "2026-09-02",
    confidence: "high",
    tags: ["axon", "fusus", "rtcc", "real-time-crime-center", "situational-awareness", "integrated"],
  },
  {
    id: "product-axon-air",
    companyId: "company-axon",
    name: "Axon Air",
    slug: "axon-air",
    category: "dfr-operations",
    overview: "Axon Air is Axon's public-safety drone and Drone as First Responder offering.",
    whatItDoes:
      "Axon product material describes Axon Air as an end-to-end DFR solution built for public safety, including public-safety drone operations, remote deployment and piloting, live aerial situational awareness, and integration into the broader Axon ecosystem. The Axon Air product page states that live drone video can be streamed into Fusus for command-level situational awareness.",
    publicSafetyUse:
      "Used to provide aerial awareness during public-safety response, including remote and DFR operating models.",
    keyCapabilities: [
      "Public-safety drone operations support",
      "Remote deployment and remote piloting workflows",
      "Live aerial situational awareness for command-level operations",
      "Ecosystem linkage to Axon real-time operations context",
    ],
    relationshipToDroneSense:
      "Very high relevance. DroneSense Support documents transition from Axon Air Powered by DroneSense applications to DroneSense applications.",
    integrationDetails:
      "DroneSense Support states users transitioning to DroneSense applications continue to receive integrations with Axon Fusus, Axon Respond, Axon Evidence and Axon Single Sign-On in DroneSense mobile apps.",
    trainingNotes: [
      "Critical distinction: Axon Air is Axon's broader drone and DFR proposition in the Axon ecosystem.",
      "DroneSense applications are the platform context used in place of former Axon Air Powered by DroneSense apps per transition documentation.",
      "When someone says Axon Air, confirm whether they mean Axon's broader DFR offering or legacy app context.",
      "Do not assume those concepts are identical.",
    ],
    terminologyIds: ["term-dfr"],
    officialSources: [
      {
        title: "Axon Air (Australia)",
        publisher: "Axon",
        url: "https://www.axon.com/au/products/axon-air",
        sourceType: "official-product-documentation",
      },
      {
        title: "Axon Air",
        publisher: "Axon",
        url: "https://www.axon.com/products/axon-air",
        sourceType: "official-product-documentation",
      },
      {
        title: "Axon Air App Transition to DroneSense",
        publisher: "DroneSense Support",
        url: "https://support.dronesense.com/hc/en-us/articles/37992894260749-Axon-Air-App-Transition-to-DroneSense",
        publicationDate: "2025-07-11",
        sourceType: "dronesense-support",
      },
    ],
    lastVerified: "2026-09-02",
    confidence: "high",
    tags: ["axon", "axon-air", "dfr", "drone-as-first-responder", "situational-awareness", "transition"],
  },
  {
    id: "product-axon-respond",
    companyId: "company-axon",
    name: "Axon Respond",
    slug: "axon-respond",
    category: "real-time-response",
    overview: "Axon Respond is Axon's real-time situational-awareness capability for connected Axon devices.",
    whatItDoes:
      "Axon states that Respond provides capabilities including real-time alerts, live device and location information, live streaming, and communication between field personnel and support or command teams. Respond and Respond+ provide different levels of real-time capability.",
    publicSafetyUse:
      "Provides supervisors, dispatchers, officers and other responders with real-time information from connected Axon devices during evolving incidents.",
    keyCapabilities: [
      "Real-time alerts and location awareness",
      "Live streaming and field-to-command visibility",
      "Connected-device situational awareness during active incidents",
    ],
    relationshipToDroneSense:
      "Verified integration. DroneSense Support states ongoing Axon Respond integration continues within DroneSense mobile applications after the Axon Air app transition.",
    integrationDetails:
      "Relationship is verified at integration-presence level; exact technical mechanism requires separate source verification.",
    trainingNotes: [
      "Axon Respond means real-time awareness from connected Axon devices.",
      "Think live location, alerts, live streaming and field-to-command visibility.",
      "Fusus is broader multi-source RTCC operations.",
      "Evidence is post-event evidentiary management and chain of custody.",
    ],
    terminologyIds: [],
    officialSources: [
      {
        title: "Axon Respond",
        publisher: "Axon",
        url: "https://www.axon.com/products/axon-respond",
        sourceType: "official-product-documentation",
      },
      {
        title: "Axon Air App Transition to DroneSense",
        publisher: "DroneSense Support",
        url: "https://support.dronesense.com/hc/en-us/articles/37992894260749-Axon-Air-App-Transition-to-DroneSense",
        publicationDate: "2025-07-11",
        sourceType: "dronesense-support",
      },
    ],
    lastVerified: "2026-09-02",
    confidence: "high",
    tags: ["axon", "axon-respond", "situational-awareness", "alerts", "live-streaming", "integrated"],
  },
  {
    id: "product-axon-evidence",
    companyId: "company-axon",
    name: "Axon Evidence",
    slug: "axon-evidence",
    category: "evidence-management",
    overview: "Axon Evidence is Axon's cloud-based digital evidence management platform.",
    whatItDoes:
      "Axon states that Evidence enables organizations to upload and store digital evidence, organize evidence and case metadata, search and review files, securely share evidence, manage permissions, and maintain audit trails and chain of custody. Supported evidence types include video, audio, images and documents.",
    publicSafetyUse:
      "Used to manage digital evidence and investigative workflows from collection through review, sharing and case management.",
    keyCapabilities: [
      "Cloud-based digital evidence storage and organization",
      "Search and review across evidence files and metadata",
      "Secure sharing, permissions and audit trail support",
      "Chain-of-custody support across evidentiary workflows",
    ],
    relationshipToDroneSense:
      "Verified integration. DroneSense Support states Axon Evidence integration continues within DroneSense mobile applications following the Axon Air app transition.",
    integrationDetails:
      "Do not infer exact drone-file, metadata, flight-record or video transfer behavior unless an additional official integration source confirms workflow details.",
    trainingNotes: [
      "Axon Evidence is the evidence-management layer.",
      "Fusus is real-time operational intelligence.",
      "Respond is real-time awareness from connected devices.",
      "Axon Air is the drone and DFR capability context.",
      "This distinction is important in demos and training.",
    ],
    terminologyIds: [],
    officialSources: [
      {
        title: "Axon Evidence (Australia)",
        publisher: "Axon",
        url: "https://www.axon.com/au/products/axon-evidence",
        sourceType: "official-product-documentation",
      },
      {
        title: "Axon Evidence Product Guide",
        publisher: "Axon Help",
        url: "https://www.axon.com/help/axon-evidence/software/axon-evidence/axon-evidence.htm",
        sourceType: "official-product-documentation",
      },
      {
        title: "Axon Air App Transition to DroneSense",
        publisher: "DroneSense Support",
        url: "https://support.dronesense.com/hc/en-us/articles/37992894260749-Axon-Air-App-Transition-to-DroneSense",
        publicationDate: "2025-07-11",
        sourceType: "dronesense-support",
      },
    ],
    lastVerified: "2026-09-02",
    confidence: "high",
    tags: ["axon", "axon-evidence", "evidence", "chain-of-custody", "digital-evidence-management", "integrated"],
  },
];

const technologyIntelligenceItems: TechnologyIntelligenceItem[] = [
  {
    id: "axon-air-powered-by-dronesense-transition-2025-07-11",
    headline: "Axon Air Powered by DroneSense applications transition to DroneSense apps",
    date: "2025-07-11",
    companyIds: ["company-axon"],
    productIds: ["product-axon-air"],
    type: "strategic-development",
    summary:
      "DroneSense documented the transition of Axon Air Powered by DroneSense users from Axon Air applications to DroneSense applications.",
    whatChanged:
      "According to DroneSense Support, the transition gives users direct access to DroneSense application development, support and current integrations while retaining integrations with Axon Fusus, Axon Respond, Axon Evidence and Axon Single Sign-On.",
    whyItMatters:
      "This clarifies the current product relationship between the Axon Air ecosystem and DroneSense and is important context when discussing legacy Axon Air Powered by DroneSense deployments.",
    droneSenseImpact:
      "Strategic relevance for positioning current DroneSense application context and integration continuity during customer and internal conversations.",
    impactType: "strategic-relevance",
    countries: ["Global"],
    sectors: ["Public Safety"],
    sources: [
      {
        title: "Axon Air App Transition to DroneSense",
        publisher: "DroneSense Support",
        url: "https://support.dronesense.com/hc/en-us/articles/37992894260749-Axon-Air-App-Transition-to-DroneSense",
        publicationDate: "2025-07-11",
        sourceType: "dronesense-support",
      },
    ],
    lastVerified: "2026-09-02",
    confidence: "high",
    tags: ["axon-air", "dronesense", "transition", "fusus", "respond", "evidence", "sso", "strategic"],
  },
];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values));
}

export function getTechnologyCompanies(): TechnologyCompany[] {
  return [...technologyCompanies].sort((a, b) => a.name.localeCompare(b.name));
}

export function getTechnologyProducts(): TechnologyProduct[] {
  return [...technologyProducts].sort((a, b) => a.name.localeCompare(b.name));
}

export function getTechnologyIntelligenceItems(): TechnologyIntelligenceItem[] {
  return [...technologyIntelligenceItems].sort((a, b) => {
    const byDate = b.date.localeCompare(a.date);
    if (byDate !== 0) return byDate;
    return a.headline.localeCompare(b.headline);
  });
}

export function getTechnologyTerminology(): TechnologyTerm[] {
  return [...technologyTerminology].sort((a, b) => a.term.localeCompare(b.term));
}

export function getTechnologyCompanyBySlug(companySlug: string): TechnologyCompany | undefined {
  return technologyCompanies.find((company) => company.slug === companySlug);
}

export function getTechnologyProductBySlug(companySlug: string, productSlug: string): TechnologyProduct | undefined {
  const company = getTechnologyCompanyBySlug(companySlug);
  if (!company) return undefined;
  return technologyProducts.find((product) => product.slug === productSlug && product.companyId === company.id);
}

export function getTechnologyProductsForCompany(companyId: string): TechnologyProduct[] {
  return getTechnologyProducts().filter((product) => product.companyId === companyId);
}

export function getTechnologyTerminologyForCompany(companyId: string): TechnologyTerm[] {
  return getTechnologyTerminology().filter((term) => term.companyId === companyId);
}

export function getTechnologyTerminologyForProduct(productId: string): TechnologyTerm[] {
  return getTechnologyTerminology().filter((term) => term.productId === productId || !term.productId);
}

export function getTechnologyIntelligenceForCompany(companyId: string): TechnologyIntelligenceItem[] {
  return getTechnologyIntelligenceItems().filter((item) => item.companyIds.includes(companyId));
}

export function getTechnologyIntelligenceForProduct(productId: string): TechnologyIntelligenceItem[] {
  return getTechnologyIntelligenceItems().filter((item) => item.productIds.includes(productId));
}

export function getTechnologyCompanyOptions(): Array<{ value: string; label: string }> {
  return getTechnologyCompanies().map((company) => ({ value: company.slug, label: company.name }));
}

export function getTechnologyCountryOptions(): Array<{ value: string; label: string }> {
  const countryValues = uniqueStrings(
    getTechnologyIntelligenceItems().flatMap((item) => item.countries.map((country) => normalize(country))),
  );

  if (!countryValues.length) {
    return [{ value: "all", label: "All Countries" }];
  }

  return [
    { value: "all", label: "All Countries" },
    ...countryValues.map((country) => ({ value: country, label: country.replace(/(^|\s)\S/g, (s) => s.toUpperCase()) })),
  ];
}

export function formatTechnologyRelationshipLabel(value: TechnologyRelationshipType): string {
  return technologyRelationshipOptions.find((option) => option.value === value)?.label ?? value;
}

export function formatTechnologyCompanyTypeLabel(value: TechnologyCompanyType): string {
  return technologyCompanyTypeOptions.find((option) => option.value === value)?.label ?? value;
}

export function formatTechnologyCategoryLabel(value: TechnologyCategory): string {
  return technologyCategoryOptions.find((option) => option.value === value)?.label ?? value;
}

export function formatTechnologyIntelligenceTypeLabel(value: TechnologyIntelligenceType): string {
  return technologyIntelligenceTypeOptions.find((option) => option.value === value)?.label ?? value;
}

export function formatTechnologyImpactTypeLabel(value: TechnologyImpactType): string {
  return technologyImpactTypeOptions.find((option) => option.value === value)?.label ?? value;
}

export function filterTechnologyCompanies(
  companies: TechnologyCompany[],
  filters: TechnologyWatchFilterState,
  allProducts: TechnologyProduct[],
  allIntelligence: TechnologyIntelligenceItem[],
  allTerminology: TechnologyTerm[],
): TechnologyCompany[] {
  const searchQuery = normalize(filters.search);

  return companies.filter((company) => {
    if (filters.company !== "all" && company.slug !== filters.company) return false;
    if (filters.relationship !== "all" && !company.relationshipTypes.includes(filters.relationship as TechnologyRelationshipType)) {
      return false;
    }
    if (filters.category !== "all" && company.companyType !== filters.category) return false;

    if (!searchQuery) return true;

    const relatedProducts = allProducts.filter((product) => product.companyId === company.id);
    const relatedIntelligence = allIntelligence.filter((item) => item.companyIds.includes(company.id));
    const relatedTerminology = allTerminology.filter(
      (term) => term.companyId === company.id || relatedProducts.some((product) => product.id === term.productId),
    );

    const searchable = [
      company.name,
      company.overview,
      company.relationshipSummary,
      company.integrationSummary,
      company.trainingSummary,
      company.tags.join(" "),
      relatedProducts.map((product) => `${product.name} ${product.overview} ${product.tags.join(" ")}`).join(" "),
      relatedIntelligence.map((item) => `${item.headline} ${item.summary} ${item.tags.join(" ")}`).join(" "),
      relatedTerminology.map((term) => `${term.term} ${term.definition}`).join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(searchQuery);
  });
}

export function filterTechnologyIntelligence(
  items: TechnologyIntelligenceItem[],
  filters: TechnologyWatchFilterState,
  companies: TechnologyCompany[],
  products: TechnologyProduct[],
): TechnologyIntelligenceItem[] {
  const searchQuery = normalize(filters.search);

  return items.filter((item) => {
    if (filters.company !== "all") {
      const company = companies.find((value) => value.slug === filters.company);
      if (!company || !item.companyIds.includes(company.id)) return false;
    }

    if (filters.relationship !== "all") {
      const matchingCompanies = companies.filter((company) => company.relationshipTypes.includes(filters.relationship as TechnologyRelationshipType));
      if (!matchingCompanies.some((company) => item.companyIds.includes(company.id))) return false;
    }

    if (filters.category !== "all") {
      const matchingProducts = products.filter((product) => product.category === filters.category);
      if (!matchingProducts.some((product) => item.productIds.includes(product.id))) return false;
    }

    if (filters.intelligenceType !== "all" && item.type !== filters.intelligenceType) return false;
    if (filters.impact !== "all" && item.impactType !== filters.impact) return false;
    if (filters.country !== "all" && !item.countries.some((country) => normalize(country) === filters.country)) return false;

    if (!searchQuery) return true;

    const companyNames = companies
      .filter((company) => item.companyIds.includes(company.id))
      .map((company) => company.name)
      .join(" ");

    const productNames = products
      .filter((product) => item.productIds.includes(product.id))
      .map((product) => product.name)
      .join(" ");

    const searchable = [
      item.headline,
      item.summary,
      item.whatChanged,
      item.whyItMatters,
      item.droneSenseImpact,
      item.tags.join(" "),
      companyNames,
      productNames,
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(searchQuery);
  });
}
