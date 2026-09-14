type IntelligenceType = "regulation" | "industry" | "procurement" | "event" | "policy" | "defence";

export type AausIntelligenceItem = {
  title: string;
  source: "AAUS";
  sourceUrl: string;
  sourceIdentifier: string;
  publishedDate: string | null;
  intelligenceType: IntelligenceType;
  country: string | null;
  tags: string[];
};

const AAUS_NEWS_RSS_URL = "https://aaus.org.au/page-18126/RSS";
const AAUS_EVENTS_RSS_URL = "https://aaus.org.au/Upcoming-events/RSS";
const AAUS_POSITION_PAPERS_URL = "https://aaus.org.au/Position-Papers";

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
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? decodeHtmlEntities(match[1]).trim() : null;
}

function normalisePublishedDate(value: string | null): string | null {
  if (!value) return null;

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString();
  }

  const embedded = value.match(/(20\d{2})(\d{2})(\d{2})/);
  if (!embedded) return null;

  return `${embedded[1]}-${embedded[2]}-${embedded[3]}T00:00:00.000Z`;
}

function extractEmbeddedIsoDate(value: string): string | null {
  const decodedValue = decodeURIComponent(value);
  const matches = decodedValue.matchAll(/(?:^|\D)(20\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(?:\D|$)/g);

  for (const match of matches) {
    const year = match[1];
    const month = match[2];
    const day = match[3];
    const iso = `${year}-${month}-${day}T00:00:00.000Z`;

    if (!Number.isNaN(new Date(iso).getTime())) {
      return iso;
    }
  }

  return null;
}

function inferIntelligenceType(title: string, section: "news" | "events" | "position-papers"): IntelligenceType {
  const lower = title.toLowerCase();

  if (section === "events") return "event";
  if (/(defence|adf|military|battlespace|national defence strategy)/i.test(lower)) return "defence";
  if (/(procurement|tender|contract|supplier|award|eoi|rfp)/i.test(lower)) return "procurement";
  if (/(submission|position paper|response|consultation|feedback|letter|white paper|green paper|discussion paper|policy)/i.test(lower)) return "policy";
  if (/(casa|acma|ads-b|remote id|bvlos|rpas|airspace|airworthiness|aussora|sora|advisory circular|regulation|regulatory|licensing)/i.test(lower)) return "regulation";
  return "industry";
}

function buildTags(title: string, section: "news" | "events" | "position-papers"): string[] {
  const tags = new Set<string>(["AAUS", section]);
  const lower = title.toLowerCase();

  const candidates = ["CASA", "ACMA", "ADS-B", "RPAS", "BVLOS", "Defence", "AAM", "UTM", "AusSORA"];
  for (const candidate of candidates) {
    if (lower.includes(candidate.toLowerCase())) {
      tags.add(candidate);
    }
  }

  return Array.from(tags);
}

function isAausIntelligenceItem(
  item: AausIntelligenceItem | null,
): item is AausIntelligenceItem {
  return item !== null;
}

function parseRssItems(xml: string, section: "news" | "events"): AausIntelligenceItem[] {
  const blocks = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];
  const items: Array<AausIntelligenceItem | null> = blocks.map((block) => {
    const title = stripHtml(extractTag(block, "title") ?? "");
    const sourceUrl = stripHtml(extractTag(block, "link") ?? "");
    const guid = stripHtml(extractTag(block, "guid") ?? sourceUrl);
    const publishedDate = normalisePublishedDate(extractTag(block, "pubDate"));

    if (!title || !sourceUrl) return null;

    return {
      title,
      source: "AAUS" as const,
      sourceUrl,
      sourceIdentifier: `aaus:${section}:${guid}`,
      publishedDate,
      intelligenceType: inferIntelligenceType(title, section),
      country: "Australia",
      tags: buildTags(title, section),
    };
  });

  return items.filter(isAausIntelligenceItem);
}

function parsePositionPaperItems(html: string): AausIntelligenceItem[] {
  const matches = html.matchAll(/<a[^>]+href="([^"]*resources\/Documents[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi);
  const items = new Map<string, AausIntelligenceItem>();

  for (const match of matches) {
    const href = decodeHtmlEntities(match[1]).trim();
    const title = stripHtml(match[2]);
    if (!href || !title) continue;

    const absoluteUrl = href.startsWith("http") ? href : `https://aaus.org.au${href.startsWith("/") ? "" : "/"}${href}`;

    if (title === "Privacy Policy") continue;

    const publishedDate = extractEmbeddedIsoDate(title) ?? extractEmbeddedIsoDate(absoluteUrl);

    items.set(absoluteUrl, {
      title,
      source: "AAUS",
      sourceUrl: absoluteUrl,
      sourceIdentifier: `aaus:position-papers:${absoluteUrl}`,
      publishedDate,
      intelligenceType: inferIntelligenceType(title, "position-papers"),
      country: "Australia",
      tags: buildTags(title, "position-papers"),
    });
  }

  return Array.from(items.values());
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "user-agent": "DroneSense Intelligence Hub/1.0",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch AAUS source: ${url} (${response.status})`);
  }

  return response.text();
}

export async function fetchAausIntelligence(): Promise<AausIntelligenceItem[]> {
  const [newsXml, eventsXml, positionPapersHtml] = await Promise.all([
    fetchText(AAUS_NEWS_RSS_URL),
    fetchText(AAUS_EVENTS_RSS_URL),
    fetchText(AAUS_POSITION_PAPERS_URL),
  ]);

  const merged = new Map<string, AausIntelligenceItem>();

  for (const item of [
    ...parseRssItems(newsXml, "news"),
    ...parseRssItems(eventsXml, "events"),
    ...parsePositionPaperItems(positionPapersHtml),
  ]) {
    merged.set(item.sourceUrl, item);
  }

  return Array.from(merged.values()).sort((left, right) => {
    const leftTime = left.publishedDate ? new Date(left.publishedDate).getTime() : 0;
    const rightTime = right.publishedDate ? new Date(right.publishedDate).getTime() : 0;
    return rightTime - leftTime;
  });
}
