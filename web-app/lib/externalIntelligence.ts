type IntelligenceType = "regulation" | "industry" | "procurement" | "event" | "policy" | "defence";

export type ExternalIntelligenceItem = {
  title: string;
  source: "DroneXL" | "DRONELIFE" | "Commercial UAV News" | "sUAS News";
  sourceUrl: string;
  sourceIdentifier: string;
  publishedDate: string | null;
  intelligenceType: IntelligenceType;
  country: string | null;
  tags: string[];
};

type RssSourceConfig = {
  source: ExternalIntelligenceItem["source"];
  slug: string;
  url: string;
};

const RSS_SOURCES: RssSourceConfig[] = [
  { source: "DroneXL", slug: "dronexl", url: "https://dronexl.co/feed/" },
  { source: "DRONELIFE", slug: "dronelife", url: "https://dronelife.com/feed/" },
  { source: "sUAS News", slug: "suas-news", url: "https://www.suasnews.com/feed" },
];

const COMMERCIAL_UAV_NEWS_INDEX_URLS = [
  "https://www.commercialuavnews.com/news/public-safety-emergency-services",
  "https://www.commercialuavnews.com/news/security",
  "https://www.commercialuavnews.com/news/infrastructure-transport",
];

const POSITIVE_PHRASES = [
  "public safety",
  "law enforcement",
  "police",
  "fire",
  "firefighter",
  "search and rescue",
  "incident command",
  "emergency",
  "disaster",
  "dfr",
  "drone as first responder",
  "bvlos",
  "counter-uas",
  "counter drone",
  "critical infrastructure",
  "regulator",
  "faa",
  "casa",
  "caa",
  "easa",
  "procurement",
  "contract",
  "tender",
  "award",
  "government",
  "integration",
  "partnership",
  "deployment",
  "rtcc",
  "situational awareness",
];

const DRONE_CONTEXT_TERMS = [
  "drone",
  "drones",
  "uas",
  "uav",
  "rpas",
  "remote operations",
  "dock",
  "aircraft",
  "aerial",
];

const LOW_VALUE_TERMS = [
  "review",
  "deal",
  "coupon",
  "discount",
  "black friday",
  "amazon",
  "best drone",
  "camera drone",
  "holiday gift",
  "hobby",
  "unboxing",
  "rumor",
  "rumour",
];

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)));
}

function stripHtml(value: string): string {
  return decodeHtmlEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(block: string, tag: string): string | null {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? decodeHtmlEntities(match[1]).trim() : null;
}

function normalisePublishedDate(value: string | null): string | null {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString();
}

function canonicalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    parsed.searchParams.delete("utm_source");
    parsed.searchParams.delete("utm_medium");
    parsed.searchParams.delete("utm_campaign");
    parsed.searchParams.delete("utm_term");
    parsed.searchParams.delete("utm_content");
    parsed.searchParams.delete("fbclid");
    parsed.searchParams.delete("gclid");
    const normalized = parsed.toString();
    return normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
  } catch {
    return url.trim();
  }
}

function inferCountry(text: string): string | null {
  const lower = text.toLowerCase();
  if (/\baustralia\b|\bcasa\b|\bnsw\b|\bvictoria\b|\bqueensland\b|\bwa\b/.test(lower)) return "Australia";
  if (/\bcanada\b|\btransport canada\b/.test(lower)) return "Canada";
  if (/\bunited states\b|\busa\b|\bu\.s\.\b|\bfaa\b/.test(lower)) return "United States";
  if (/\bunited kingdom\b|\buk\b|\bcaa\b/.test(lower)) return "United Kingdom";
  if (/\beurope\b|\beu\b|\beasa\b/.test(lower)) return "European Union";
  return null;
}

function inferIntelligenceType(text: string): IntelligenceType {
  const lower = text.toLowerCase();
  if (/(procurement|tender|contract|award|rfp|eoi)/.test(lower)) return "procurement";
  if (/(regulation|regulatory|faa|casa|caa|easa|policy|consultation|rulemaking|waiver|approval|certification)/.test(lower)) return "regulation";
  if (/(government|minister|parliament|strategy|national|policy)/.test(lower)) return "policy";
  if (/(defence|defense|military|army|navy|air force)/.test(lower)) return "defence";
  if (/(conference|expo|event|summit|webinar)/.test(lower)) return "event";
  return "industry";
}

function isRelevantIntelligence(title: string, excerpt: string, sourceCategoryHint?: string): boolean {
  const text = `${title} ${excerpt} ${sourceCategoryHint ?? ""}`.toLowerCase();
  const hasDroneContext = DRONE_CONTEXT_TERMS.some((term) => text.includes(term));
  const positiveMatches = POSITIVE_PHRASES.filter((term) => text.includes(term));
  const lowValueMatches = LOW_VALUE_TERMS.filter((term) => text.includes(term));

  if (!hasDroneContext) return false;

  const hasPrioritySignal = positiveMatches.length >= 1;
  const score = positiveMatches.length * 2 - lowValueMatches.length;

  if (!hasPrioritySignal && score < 2) return false;
  if (lowValueMatches.length >= 2 && positiveMatches.length === 0) return false;

  return true;
}

function buildTags(source: string, title: string, excerpt: string): string[] {
  const text = `${title} ${excerpt}`.toLowerCase();
  const tags = new Set<string>([source]);
  const signals = [
    "Public Safety",
    "Police",
    "Fire",
    "Emergency",
    "SAR",
    "DFR",
    "BVLOS",
    "RPAS",
    "UAS",
    "Counter-UAS",
    "Government",
    "Regulation",
    "Procurement",
    "Contract",
    "Deployment",
    "RTCC",
    "Critical Infrastructure",
    "Integration",
  ];

  for (const signal of signals) {
    if (text.includes(signal.toLowerCase())) {
      tags.add(signal);
    }
  }

  return Array.from(tags);
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "user-agent": "DroneSense Intelligence Hub/1.0",
      accept: "application/rss+xml, application/xml, text/xml, text/html;q=0.9",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch source: ${url} (${response.status})`);
  }

  return response.text();
}

function parseRssItems(xml: string, config: RssSourceConfig): ExternalIntelligenceItem[] {
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  const results: ExternalIntelligenceItem[] = [];

  for (const block of blocks) {
    const title = stripHtml(extractTag(block, "title") ?? "");
    const sourceUrlRaw = stripHtml(extractTag(block, "link") ?? "");
    const guid = stripHtml(extractTag(block, "guid") ?? sourceUrlRaw);
    const excerpt = stripHtml(extractTag(block, "description") ?? extractTag(block, "content:encoded") ?? "");
    const category = stripHtml(extractTag(block, "category") ?? "");
    const sourceUrl = canonicalizeUrl(sourceUrlRaw);

    if (!title || !sourceUrl) continue;
    if (!isRelevantIntelligence(title, excerpt, category)) continue;

    const text = `${title} ${excerpt} ${category}`;
    results.push({
      title,
      source: config.source,
      sourceUrl,
      sourceIdentifier: `external:${config.slug}:${guid || sourceUrl}`,
      publishedDate: normalisePublishedDate(extractTag(block, "pubDate")),
      intelligenceType: inferIntelligenceType(text),
      country: inferCountry(text),
      tags: buildTags(config.source, title, excerpt),
    });
  }

  return results;
}

function parseCommercialUavNewsIndex(html: string, indexUrl: string): ExternalIntelligenceItem[] {
  const matches = html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi);
  const found = new Map<string, ExternalIntelligenceItem>();

  for (const match of matches) {
    const hrefRaw = decodeHtmlEntities(match[1]).trim();
    const title = stripHtml(match[2]);
    if (!hrefRaw || !title || title.length < 20) continue;

    const absoluteUrl = hrefRaw.startsWith("http") ? hrefRaw : `https://www.commercialuavnews.com${hrefRaw.startsWith("/") ? "" : "/"}${hrefRaw}`;
    const sourceUrl = canonicalizeUrl(absoluteUrl);

    // Accept article-like news URLs only; reject category/index/utility links.
    const parsed = new URL(sourceUrl);
    if (!/^\/news\/[a-z0-9-]+\/[a-z0-9-]+/i.test(parsed.pathname)) continue;
    if (sourceUrl.includes("/authors") || sourceUrl.includes("/subscribe") || sourceUrl.includes("/advertise")) continue;

    if (!isRelevantIntelligence(title, "", indexUrl)) continue;

    found.set(sourceUrl, {
      title,
      source: "Commercial UAV News",
      sourceUrl,
      sourceIdentifier: `external:commercial-uav-news:${sourceUrl}`,
      publishedDate: null,
      intelligenceType: inferIntelligenceType(`${title} ${parsed.pathname}`),
      country: inferCountry(`${title} ${parsed.pathname}`),
      tags: buildTags("Commercial UAV News", title, parsed.pathname),
    });
  }

  return Array.from(found.values());
}

function sortByDateNewest(items: ExternalIntelligenceItem[]): ExternalIntelligenceItem[] {
  return [...items].sort((left, right) => {
    const leftTime = left.publishedDate ? new Date(left.publishedDate).getTime() : 0;
    const rightTime = right.publishedDate ? new Date(right.publishedDate).getTime() : 0;
    if (rightTime !== leftTime) return rightTime - leftTime;
    return left.title.localeCompare(right.title);
  });
}

export async function fetchRssIntelligenceSource(config: RssSourceConfig): Promise<ExternalIntelligenceItem[]> {
  const xml = await fetchText(config.url);
  return sortByDateNewest(parseRssItems(xml, config));
}

export async function fetchCommercialUavNewsIntelligence(): Promise<ExternalIntelligenceItem[]> {
  const all = new Map<string, ExternalIntelligenceItem>();

  for (const indexUrl of COMMERCIAL_UAV_NEWS_INDEX_URLS) {
    const html = await fetchText(indexUrl);
    for (const item of parseCommercialUavNewsIndex(html, indexUrl)) {
      all.set(item.sourceUrl, item);
    }
  }

  return sortByDateNewest(Array.from(all.values()));
}

export async function fetchDroneXlIntelligence(): Promise<ExternalIntelligenceItem[]> {
  return fetchRssIntelligenceSource(RSS_SOURCES[0]);
}

export async function fetchDroneLifeIntelligence(): Promise<ExternalIntelligenceItem[]> {
  return fetchRssIntelligenceSource(RSS_SOURCES[1]);
}

export async function fetchSuasNewsIntelligence(): Promise<ExternalIntelligenceItem[]> {
  return fetchRssIntelligenceSource(RSS_SOURCES[2]);
}
