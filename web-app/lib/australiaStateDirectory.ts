export const australiaDirectoryCategories = [
  { key: "public-safety", label: "Public Safety" },
  { key: "critical-infrastructure-industry", label: "Critical Infrastructure & Industry" },
  { key: "defence-military", label: "Defence / Military" },
  { key: "partners", label: "Partners" },
] as const;

export type AustraliaDirectoryCategoryKey = typeof australiaDirectoryCategories[number]["key"];

export type AustraliaStateSlug =
  | "western-australia"
  | "new-south-wales"
  | "victoria"
  | "queensland"
  | "south-australia"
  | "tasmania"
  | "australian-capital-territory"
  | "northern-territory";

export type AustraliaJurisdiction = {
  slug: AustraliaStateSlug;
  name: string;
  code: string;
};

export type OrganisationType =
  | "Police"
  | "Fire & Rescue"
  | "Ambulance / Medical"
  | "Emergency Management"
  | "Mining"
  | "Oil & Gas"
  | "Energy / Utilities"
  | "Aviation / Critical Infrastructure"
  | "Transport Infrastructure"
  | "Rail Infrastructure"
  | "Ports"
  | "Defence / Military"
  | "Partner";

export type OrganisationSector =
  | "Public Safety"
  | "Critical Infrastructure & Industry"
  | "Defence / Military"
  | "Partners";

export type OrganisationConfidence = "confirmed" | "high" | "medium" | "low" | "research-required";

export type AustraliaOrganisationRecord = {
  id: string;
  name: string;
  organisationType: OrganisationType;
  category: AustraliaDirectoryCategoryKey;
  sector: OrganisationSector;
  jurisdiction: string;
  leaderName: string | null;
  leaderTitle: string | null;
  officialSourceUrl: string;
  lastVerified: string | null;
  confidence: OrganisationConfidence;
  profileHref?: string;
};

export const australiaJurisdictions: AustraliaJurisdiction[] = [
  { slug: "western-australia", name: "Western Australia", code: "WA" },
  { slug: "new-south-wales", name: "New South Wales", code: "NSW" },
  { slug: "victoria", name: "Victoria", code: "VIC" },
  { slug: "queensland", name: "Queensland", code: "QLD" },
  { slug: "south-australia", name: "South Australia", code: "SA" },
  { slug: "tasmania", name: "Tasmania", code: "TAS" },
  { slug: "australian-capital-territory", name: "Australian Capital Territory", code: "ACT" },
  { slug: "northern-territory", name: "Northern Territory", code: "NT" },
];

const westernAustraliaOrganisations: AustraliaOrganisationRecord[] = [
  {
    id: "wa-police",
    name: "Western Australia Police Force",
    organisationType: "Police",
    category: "public-safety",
    sector: "Public Safety",
    jurisdiction: "Western Australia",
    leaderName: "Col Blanch APM",
    leaderTitle: "Commissioner of Police",
    officialSourceUrl: "https://www.police.wa.gov.au/",
    lastVerified: "2026-08-31",
    confidence: "confirmed",
  },
  {
    id: "wa-dfes",
    name: "Department of Fire and Emergency Services",
    organisationType: "Fire & Rescue",
    category: "public-safety",
    sector: "Public Safety",
    jurisdiction: "Western Australia",
    leaderName: "Darren Klemm AFSM",
    leaderTitle: "Commissioner",
    officialSourceUrl: "https://www.dfes.wa.gov.au/",
    lastVerified: "2026-08-31",
    confidence: "confirmed",
  },
  {
    id: "wa-st-john",
    name: "St John WA",
    organisationType: "Ambulance / Medical",
    category: "public-safety",
    sector: "Public Safety",
    jurisdiction: "Western Australia",
    leaderName: "Kevin Brown",
    leaderTitle: "Group Chief Executive Officer",
    officialSourceUrl: "https://stjohnwa.com.au/",
    lastVerified: "2026-08-31",
    confidence: "confirmed",
  },
  {
    id: "wa-western-power",
    name: "Western Power",
    organisationType: "Energy / Utilities",
    category: "critical-infrastructure-industry",
    sector: "Critical Infrastructure & Industry",
    jurisdiction: "Western Australia",
    leaderName: "Gair Landsborough",
    leaderTitle: "Chief Executive Officer",
    officialSourceUrl: "https://www.westernpower.com.au/",
    lastVerified: "2026-08-31",
    confidence: "confirmed",
  },
  {
    id: "wa-rio-tinto-iron-ore",
    name: "Rio Tinto Iron Ore",
    organisationType: "Mining",
    category: "critical-infrastructure-industry",
    sector: "Critical Infrastructure & Industry",
    jurisdiction: "Western Australia",
    leaderName: "Matthew Holcz",
    leaderTitle: "Chief Executive, Iron Ore",
    officialSourceUrl: "https://www.riotinto.com/en/about/executive-committee",
    lastVerified: "2026-08-31",
    confidence: "confirmed",
  },
  {
    id: "wa-ses",
    name: "State Emergency Service Western Australia",
    organisationType: "Emergency Management",
    category: "public-safety",
    sector: "Public Safety",
    jurisdiction: "Western Australia",
    leaderName: null,
    leaderTitle: null,
    officialSourceUrl: "https://www.dfes.wa.gov.au/hazard-information/emergency-management/ses",
    lastVerified: null,
    confidence: "high",
  },
  {
    id: "wa-synergy",
    name: "Synergy",
    organisationType: "Energy / Utilities",
    category: "critical-infrastructure-industry",
    sector: "Critical Infrastructure & Industry",
    jurisdiction: "Western Australia",
    leaderName: null,
    leaderTitle: null,
    officialSourceUrl: "https://www.synergy.net.au/",
    lastVerified: null,
    confidence: "high",
  },
  {
    id: "wa-horizon-power",
    name: "Horizon Power",
    organisationType: "Energy / Utilities",
    category: "critical-infrastructure-industry",
    sector: "Critical Infrastructure & Industry",
    jurisdiction: "Western Australia",
    leaderName: null,
    leaderTitle: null,
    officialSourceUrl: "https://www.horizonpower.com.au/",
    lastVerified: null,
    confidence: "high",
  },
  {
    id: "wa-water-corporation",
    name: "Water Corporation",
    organisationType: "Energy / Utilities",
    category: "critical-infrastructure-industry",
    sector: "Critical Infrastructure & Industry",
    jurisdiction: "Western Australia",
    leaderName: null,
    leaderTitle: null,
    officialSourceUrl: "https://www.watercorporation.com.au/",
    lastVerified: null,
    confidence: "high",
  },
  {
    id: "wa-bhp-iron-ore",
    name: "BHP Western Australia Iron Ore",
    organisationType: "Mining",
    category: "critical-infrastructure-industry",
    sector: "Critical Infrastructure & Industry",
    jurisdiction: "Western Australia",
    leaderName: null,
    leaderTitle: null,
    officialSourceUrl: "https://www.bhp.com/what-we-do/global-locations/australia",
    lastVerified: null,
    confidence: "high",
  },
  {
    id: "wa-woodside",
    name: "Woodside Energy",
    organisationType: "Oil & Gas",
    category: "critical-infrastructure-industry",
    sector: "Critical Infrastructure & Industry",
    jurisdiction: "Western Australia",
    leaderName: null,
    leaderTitle: null,
    officialSourceUrl: "https://www.woodside.com/",
    lastVerified: null,
    confidence: "high",
  },
  {
    id: "wa-perth-airport",
    name: "Perth Airport",
    organisationType: "Aviation / Critical Infrastructure",
    category: "critical-infrastructure-industry",
    sector: "Critical Infrastructure & Industry",
    jurisdiction: "Western Australia",
    leaderName: null,
    leaderTitle: null,
    officialSourceUrl: "https://www.perthairport.com.au/",
    lastVerified: null,
    confidence: "high",
  },
  {
    id: "wa-pta",
    name: "Public Transport Authority of Western Australia",
    organisationType: "Transport Infrastructure",
    category: "critical-infrastructure-industry",
    sector: "Critical Infrastructure & Industry",
    jurisdiction: "Western Australia",
    leaderName: null,
    leaderTitle: null,
    officialSourceUrl: "https://www.pta.wa.gov.au/",
    lastVerified: null,
    confidence: "high",
  },
  {
    id: "wa-arc-infrastructure",
    name: "Arc Infrastructure",
    organisationType: "Rail Infrastructure",
    category: "critical-infrastructure-industry",
    sector: "Critical Infrastructure & Industry",
    jurisdiction: "Western Australia",
    leaderName: null,
    leaderTitle: null,
    officialSourceUrl: "https://www.arcinfra.com/",
    lastVerified: null,
    confidence: "high",
  },
  {
    id: "wa-pilbara-ports",
    name: "Pilbara Ports Authority",
    organisationType: "Ports",
    category: "critical-infrastructure-industry",
    sector: "Critical Infrastructure & Industry",
    jurisdiction: "Western Australia",
    leaderName: null,
    leaderTitle: null,
    officialSourceUrl: "https://www.pilbaraports.com.au/",
    lastVerified: null,
    confidence: "high",
  },
  {
    id: "wa-hmas-stirling",
    name: "HMAS Stirling",
    organisationType: "Defence / Military",
    category: "defence-military",
    sector: "Defence / Military",
    jurisdiction: "Western Australia",
    leaderName: null,
    leaderTitle: null,
    officialSourceUrl: "https://www.navy.gov.au/establishments/hmas-stirling",
    lastVerified: null,
    confidence: "high",
  },
];

const newSouthWalesOrganisations: AustraliaOrganisationRecord[] = [
  { id: "nsw-police", name: "NSW Police Force", organisationType: "Police", category: "public-safety", sector: "Public Safety", jurisdiction: "New South Wales", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.police.nsw.gov.au/", lastVerified: null, confidence: "high" },
  { id: "nsw-frnsw", name: "Fire and Rescue NSW", organisationType: "Fire & Rescue", category: "public-safety", sector: "Public Safety", jurisdiction: "New South Wales", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.fire.nsw.gov.au/", lastVerified: null, confidence: "high" },
  { id: "nsw-rfs", name: "NSW Rural Fire Service", organisationType: "Fire & Rescue", category: "public-safety", sector: "Public Safety", jurisdiction: "New South Wales", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.rfs.nsw.gov.au/", lastVerified: null, confidence: "high" },
  { id: "nsw-ambulance", name: "NSW Ambulance", organisationType: "Ambulance / Medical", category: "public-safety", sector: "Public Safety", jurisdiction: "New South Wales", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.ambulance.nsw.gov.au/", lastVerified: null, confidence: "high" },
  { id: "nsw-ses", name: "NSW State Emergency Service", organisationType: "Emergency Management", category: "public-safety", sector: "Public Safety", jurisdiction: "New South Wales", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.ses.nsw.gov.au/", lastVerified: null, confidence: "high" },
  { id: "nsw-ausgrid", name: "Ausgrid", organisationType: "Energy / Utilities", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "New South Wales", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.ausgrid.com.au/", lastVerified: null, confidence: "high" },
  { id: "nsw-endeavour", name: "Endeavour Energy", organisationType: "Energy / Utilities", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "New South Wales", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.endeavourenergy.com.au/", lastVerified: null, confidence: "high" },
  { id: "nsw-essential", name: "Essential Energy", organisationType: "Energy / Utilities", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "New South Wales", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.essentialenergy.com.au/", lastVerified: null, confidence: "high" },
  { id: "nsw-santos", name: "Santos NSW", organisationType: "Oil & Gas", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "New South Wales", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.santos.com/", lastVerified: null, confidence: "medium" },
  { id: "nsw-sydney-airport", name: "Sydney Airport", organisationType: "Aviation / Critical Infrastructure", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "New South Wales", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.sydneyairport.com.au/", lastVerified: null, confidence: "high" },
  { id: "nsw-tfnsw", name: "Transport for NSW", organisationType: "Transport Infrastructure", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "New South Wales", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.transport.nsw.gov.au/", lastVerified: null, confidence: "high" },
  { id: "nsw-sydney-trains", name: "Sydney Trains", organisationType: "Rail Infrastructure", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "New South Wales", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.transport.nsw.gov.au/about-us/our-agencies/sydney-trains", lastVerified: null, confidence: "high" },
  { id: "nsw-port-authority", name: "Port Authority of New South Wales", organisationType: "Ports", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "New South Wales", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.portauthoritynsw.com.au/", lastVerified: null, confidence: "high" },
  { id: "nsw-hmas-kuttabul", name: "HMAS Kuttabul", organisationType: "Defence / Military", category: "defence-military", sector: "Defence / Military", jurisdiction: "New South Wales", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.navy.gov.au/establishments/hmas-kuttabul", lastVerified: null, confidence: "high" },
];

const victoriaOrganisations: AustraliaOrganisationRecord[] = [
  { id: "vic-police", name: "Victoria Police", organisationType: "Police", category: "public-safety", sector: "Public Safety", jurisdiction: "Victoria", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.police.vic.gov.au/", lastVerified: null, confidence: "high" },
  { id: "vic-frv", name: "Fire Rescue Victoria", organisationType: "Fire & Rescue", category: "public-safety", sector: "Public Safety", jurisdiction: "Victoria", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.frv.vic.gov.au/", lastVerified: null, confidence: "high" },
  { id: "vic-cfa", name: "Country Fire Authority", organisationType: "Fire & Rescue", category: "public-safety", sector: "Public Safety", jurisdiction: "Victoria", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.cfa.vic.gov.au/", lastVerified: null, confidence: "high" },
  { id: "vic-ambulance", name: "Ambulance Victoria", organisationType: "Ambulance / Medical", category: "public-safety", sector: "Public Safety", jurisdiction: "Victoria", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.ambulance.vic.gov.au/", lastVerified: null, confidence: "high" },
  { id: "vic-ses", name: "Victoria State Emergency Service", organisationType: "Emergency Management", category: "public-safety", sector: "Public Safety", jurisdiction: "Victoria", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.ses.vic.gov.au/", lastVerified: null, confidence: "high" },
  { id: "vic-ausnet", name: "AusNet", organisationType: "Energy / Utilities", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Victoria", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.ausnetservices.com.au/", lastVerified: null, confidence: "high" },
  { id: "vic-powercor", name: "Powercor", organisationType: "Energy / Utilities", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Victoria", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.powercor.com.au/", lastVerified: null, confidence: "high" },
  { id: "vic-melbourne-airport", name: "Melbourne Airport", organisationType: "Aviation / Critical Infrastructure", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Victoria", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.melbourneairport.com.au/", lastVerified: null, confidence: "high" },
  { id: "vic-dotp", name: "Department of Transport and Planning Victoria", organisationType: "Transport Infrastructure", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Victoria", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.transport.vic.gov.au/", lastVerified: null, confidence: "high" },
  { id: "vic-metro-trains", name: "Metro Trains Melbourne", organisationType: "Rail Infrastructure", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Victoria", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.metrotrains.com.au/", lastVerified: null, confidence: "high" },
  { id: "vic-port-of-melbourne", name: "Port of Melbourne", organisationType: "Ports", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Victoria", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.portofmelbourne.com/", lastVerified: null, confidence: "high" },
  { id: "vic-hmas-cerberus", name: "HMAS Cerberus", organisationType: "Defence / Military", category: "defence-military", sector: "Defence / Military", jurisdiction: "Victoria", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.navy.gov.au/establishments/hmas-cerberus", lastVerified: null, confidence: "high" },
];

const queenslandOrganisations: AustraliaOrganisationRecord[] = [
  { id: "qld-police", name: "Queensland Police Service", organisationType: "Police", category: "public-safety", sector: "Public Safety", jurisdiction: "Queensland", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.police.qld.gov.au/", lastVerified: null, confidence: "high" },
  { id: "qld-fire", name: "Queensland Fire Department", organisationType: "Fire & Rescue", category: "public-safety", sector: "Public Safety", jurisdiction: "Queensland", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.fire.qld.gov.au/", lastVerified: null, confidence: "high" },
  { id: "qld-ambulance", name: "Queensland Ambulance Service", organisationType: "Ambulance / Medical", category: "public-safety", sector: "Public Safety", jurisdiction: "Queensland", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.ambulance.qld.gov.au/", lastVerified: null, confidence: "high" },
  { id: "qld-ses", name: "Queensland State Emergency Service", organisationType: "Emergency Management", category: "public-safety", sector: "Public Safety", jurisdiction: "Queensland", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.qfes.qld.gov.au/about-us/about-queensland-state-emergency-service", lastVerified: null, confidence: "high" },
  { id: "qld-energy-queensland", name: "Energy Queensland", organisationType: "Energy / Utilities", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Queensland", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.energyq.com.au/", lastVerified: null, confidence: "high" },
  { id: "qld-powerlink", name: "Powerlink Queensland", organisationType: "Energy / Utilities", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Queensland", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.powerlink.com.au/", lastVerified: null, confidence: "high" },
  { id: "qld-sunwater", name: "Sunwater", organisationType: "Energy / Utilities", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Queensland", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.sunwater.com.au/", lastVerified: null, confidence: "high" },
  { id: "qld-glencore", name: "Glencore Coal Queensland", organisationType: "Mining", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Queensland", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.glencore.com.au/operations-and-projects/coal", lastVerified: null, confidence: "medium" },
  { id: "qld-santos-glng", name: "Santos GLNG", organisationType: "Oil & Gas", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Queensland", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.santos.com/", lastVerified: null, confidence: "medium" },
  { id: "qld-brisbane-airport", name: "Brisbane Airport", organisationType: "Aviation / Critical Infrastructure", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Queensland", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.bne.com.au/", lastVerified: null, confidence: "high" },
  { id: "qld-tmr", name: "Department of Transport and Main Roads Queensland", organisationType: "Transport Infrastructure", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Queensland", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.tmr.qld.gov.au/", lastVerified: null, confidence: "high" },
  { id: "qld-queensland-rail", name: "Queensland Rail", organisationType: "Rail Infrastructure", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Queensland", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.queenslandrail.com.au/", lastVerified: null, confidence: "high" },
  { id: "qld-port-brisbane", name: "Port of Brisbane", organisationType: "Ports", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Queensland", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.portbris.com.au/", lastVerified: null, confidence: "high" },
  { id: "qld-raaf-amberley", name: "RAAF Base Amberley", organisationType: "Defence / Military", category: "defence-military", sector: "Defence / Military", jurisdiction: "Queensland", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.airforce.gov.au/about-us/bases/raaf-base-amberley", lastVerified: null, confidence: "high" },
  { id: "au-pstr-group", name: "PSTR Group", organisationType: "Partner", category: "partners", sector: "Partners", jurisdiction: "Queensland", leaderName: null, leaderTitle: null, officialSourceUrl: "https://pstrgroup.com.au/", lastVerified: "20 August 2026", confidence: "medium", profileHref: "/partners/pstr-group" },
];

const southAustraliaOrganisations: AustraliaOrganisationRecord[] = [
  { id: "sa-police", name: "South Australia Police", organisationType: "Police", category: "public-safety", sector: "Public Safety", jurisdiction: "South Australia", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.police.sa.gov.au/", lastVerified: null, confidence: "high" },
  { id: "sa-mfs", name: "SA Metropolitan Fire Service", organisationType: "Fire & Rescue", category: "public-safety", sector: "Public Safety", jurisdiction: "South Australia", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.mfs.sa.gov.au/", lastVerified: null, confidence: "high" },
  { id: "sa-cfs", name: "South Australian Country Fire Service", organisationType: "Fire & Rescue", category: "public-safety", sector: "Public Safety", jurisdiction: "South Australia", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.cfs.sa.gov.au/", lastVerified: null, confidence: "high" },
  { id: "sa-ambulance", name: "SA Ambulance Service", organisationType: "Ambulance / Medical", category: "public-safety", sector: "Public Safety", jurisdiction: "South Australia", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.saambulance.sa.gov.au/", lastVerified: null, confidence: "high" },
  { id: "sa-ses", name: "South Australian State Emergency Service", organisationType: "Emergency Management", category: "public-safety", sector: "Public Safety", jurisdiction: "South Australia", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.sases.sa.gov.au/", lastVerified: null, confidence: "high" },
  { id: "sa-sa-power-networks", name: "SA Power Networks", organisationType: "Energy / Utilities", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "South Australia", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.sapowernetworks.com.au/", lastVerified: null, confidence: "high" },
  { id: "sa-santos", name: "Santos", organisationType: "Oil & Gas", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "South Australia", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.santos.com/", lastVerified: null, confidence: "high" },
  { id: "sa-bhp-olympic-dam", name: "BHP Olympic Dam", organisationType: "Mining", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "South Australia", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.bhp.com/what-we-do/global-locations/australia", lastVerified: null, confidence: "high" },
  { id: "sa-adelaide-airport", name: "Adelaide Airport", organisationType: "Aviation / Critical Infrastructure", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "South Australia", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.adelaideairport.com.au/", lastVerified: null, confidence: "high" },
  { id: "sa-flinders-ports", name: "Flinders Ports", organisationType: "Ports", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "South Australia", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.flindersports.com.au/", lastVerified: null, confidence: "high" },
  { id: "sa-raaf-edinburgh", name: "RAAF Base Edinburgh", organisationType: "Defence / Military", category: "defence-military", sector: "Defence / Military", jurisdiction: "South Australia", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.airforce.gov.au/about-us/bases/raaf-base-edinburgh", lastVerified: null, confidence: "high" },
];

const tasmaniaOrganisations: AustraliaOrganisationRecord[] = [
  { id: "tas-police", name: "Tasmania Police", organisationType: "Police", category: "public-safety", sector: "Public Safety", jurisdiction: "Tasmania", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.police.tas.gov.au/", lastVerified: null, confidence: "high" },
  { id: "tas-fire", name: "Tasmania Fire Service", organisationType: "Fire & Rescue", category: "public-safety", sector: "Public Safety", jurisdiction: "Tasmania", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.fire.tas.gov.au/", lastVerified: null, confidence: "high" },
  { id: "tas-ambulance", name: "Ambulance Tasmania", organisationType: "Ambulance / Medical", category: "public-safety", sector: "Public Safety", jurisdiction: "Tasmania", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.health.tas.gov.au/health-topics/emergency-services/ambulance-tasmania", lastVerified: null, confidence: "high" },
  { id: "tas-ses", name: "State Emergency Service Tasmania", organisationType: "Emergency Management", category: "public-safety", sector: "Public Safety", jurisdiction: "Tasmania", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.ses.tas.gov.au/", lastVerified: null, confidence: "high" },
  { id: "tas-tasnetworks", name: "TasNetworks", organisationType: "Energy / Utilities", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Tasmania", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.tasnetworks.com.au/", lastVerified: null, confidence: "high" },
  { id: "tas-taswater", name: "TasWater", organisationType: "Energy / Utilities", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Tasmania", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.taswater.com.au/", lastVerified: null, confidence: "high" },
  { id: "tas-hobart-airport", name: "Hobart Airport", organisationType: "Aviation / Critical Infrastructure", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Tasmania", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.hobartairport.com.au/", lastVerified: null, confidence: "high" },
  { id: "tas-tasrail", name: "TasRail", organisationType: "Rail Infrastructure", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Tasmania", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.tasrail.com.au/", lastVerified: null, confidence: "high" },
  { id: "tas-tasports", name: "TasPorts", organisationType: "Ports", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Tasmania", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.tasports.com.au/", lastVerified: null, confidence: "high" },
  { id: "tas-anglesea", name: "Anglesea Barracks", organisationType: "Defence / Military", category: "defence-military", sector: "Defence / Military", jurisdiction: "Tasmania", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.army.gov.au/our-work/bases-and-barracks/anglesea-barracks", lastVerified: null, confidence: "high" },
];

const australianCapitalTerritoryOrganisations: AustraliaOrganisationRecord[] = [
  { id: "act-policing", name: "ACT Policing", organisationType: "Police", category: "public-safety", sector: "Public Safety", jurisdiction: "Australian Capital Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.policenews.act.gov.au/", lastVerified: null, confidence: "medium" },
  { id: "act-fire-rescue", name: "ACT Fire & Rescue", organisationType: "Fire & Rescue", category: "public-safety", sector: "Public Safety", jurisdiction: "Australian Capital Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://esa.act.gov.au/actfr", lastVerified: null, confidence: "high" },
  { id: "act-ambulance", name: "ACT Ambulance Service", organisationType: "Ambulance / Medical", category: "public-safety", sector: "Public Safety", jurisdiction: "Australian Capital Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://esa.act.gov.au/actas", lastVerified: null, confidence: "high" },
  { id: "act-ses", name: "ACT State Emergency Service", organisationType: "Emergency Management", category: "public-safety", sector: "Public Safety", jurisdiction: "Australian Capital Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://esa.act.gov.au/actses", lastVerified: null, confidence: "high" },
  { id: "act-icon-water", name: "Icon Water", organisationType: "Energy / Utilities", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Australian Capital Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.iconwater.com.au/", lastVerified: null, confidence: "high" },
  { id: "act-evoenergy", name: "Evoenergy", organisationType: "Energy / Utilities", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Australian Capital Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.evoenergy.com.au/", lastVerified: null, confidence: "high" },
  { id: "act-canberra-airport", name: "Canberra Airport", organisationType: "Aviation / Critical Infrastructure", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Australian Capital Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.canberraairport.com.au/", lastVerified: null, confidence: "high" },
  { id: "act-transport-canberra", name: "Transport Canberra", organisationType: "Transport Infrastructure", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Australian Capital Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.transport.act.gov.au/", lastVerified: null, confidence: "high" },
  { id: "act-adfa", name: "Australian Defence Force Academy", organisationType: "Defence / Military", category: "defence-military", sector: "Defence / Military", jurisdiction: "Australian Capital Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.adfa.edu.au/", lastVerified: null, confidence: "high" },
  { id: "act-rmc-duntroon", name: "Royal Military College Duntroon", organisationType: "Defence / Military", category: "defence-military", sector: "Defence / Military", jurisdiction: "Australian Capital Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.army.gov.au/our-work/training-and-schools/royal-military-college-duntroon", lastVerified: null, confidence: "high" },
];

const northernTerritoryOrganisations: AustraliaOrganisationRecord[] = [
  { id: "nt-police", name: "Northern Territory Police", organisationType: "Police", category: "public-safety", sector: "Public Safety", jurisdiction: "Northern Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://pfes.nt.gov.au/police", lastVerified: null, confidence: "high" },
  { id: "nt-fire-rescue", name: "NT Fire and Rescue Service", organisationType: "Fire & Rescue", category: "public-safety", sector: "Public Safety", jurisdiction: "Northern Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://pfes.nt.gov.au/fire-and-rescue-service", lastVerified: null, confidence: "high" },
  { id: "nt-st-john", name: "St John Ambulance Australia (NT)", organisationType: "Ambulance / Medical", category: "public-safety", sector: "Public Safety", jurisdiction: "Northern Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.stjohnnt.asn.au/", lastVerified: null, confidence: "high" },
  { id: "ntes", name: "Northern Territory Emergency Service", organisationType: "Emergency Management", category: "public-safety", sector: "Public Safety", jurisdiction: "Northern Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://pfes.nt.gov.au/emergency-service", lastVerified: null, confidence: "high" },
  { id: "nt-power-water", name: "Power and Water Corporation", organisationType: "Energy / Utilities", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Northern Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.powerwater.com.au/", lastVerified: null, confidence: "high" },
  { id: "nt-territory-generation", name: "Territory Generation", organisationType: "Energy / Utilities", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Northern Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.territorygeneration.com.au/", lastVerified: null, confidence: "high" },
  { id: "nt-inpex", name: "INPEX Australia (Ichthys LNG)", organisationType: "Oil & Gas", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Northern Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.inpex.com.au/", lastVerified: null, confidence: "high" },
  { id: "nt-newmont-tanami", name: "Newmont Tanami Operations", organisationType: "Mining", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Northern Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.newmont.com/operations-and-projects/production/operations/australia/default.aspx", lastVerified: null, confidence: "medium" },
  { id: "nt-darwin-airport", name: "Darwin International Airport", organisationType: "Aviation / Critical Infrastructure", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Northern Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.darwinairport.com.au/", lastVerified: null, confidence: "high" },
  { id: "nt-darwin-port", name: "Darwin Port", organisationType: "Ports", category: "critical-infrastructure-industry", sector: "Critical Infrastructure & Industry", jurisdiction: "Northern Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.darwinport.com.au/", lastVerified: null, confidence: "high" },
  { id: "nt-raaf-darwin", name: "RAAF Base Darwin", organisationType: "Defence / Military", category: "defence-military", sector: "Defence / Military", jurisdiction: "Northern Territory", leaderName: null, leaderTitle: null, officialSourceUrl: "https://www.airforce.gov.au/about-us/bases/raaf-base-darwin", lastVerified: null, confidence: "high" },
];

export const australiaStateDirectory: Record<AustraliaStateSlug, AustraliaOrganisationRecord[]> = {
  "western-australia": westernAustraliaOrganisations,
  "new-south-wales": newSouthWalesOrganisations,
  victoria: victoriaOrganisations,
  queensland: queenslandOrganisations,
  "south-australia": southAustraliaOrganisations,
  tasmania: tasmaniaOrganisations,
  "australian-capital-territory": australianCapitalTerritoryOrganisations,
  "northern-territory": northernTerritoryOrganisations,
};

export function getAustraliaJurisdictionBySlug(slug: string): AustraliaJurisdiction | null {
  return australiaJurisdictions.find((state) => state.slug === slug) ?? null;
}
