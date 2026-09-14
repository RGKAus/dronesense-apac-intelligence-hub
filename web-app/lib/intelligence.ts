import { fetchAausIntelligence, type AausIntelligenceItem } from "./aaus";
import {
  fetchCommercialUavNewsIntelligence,
  fetchDroneLifeIntelligence,
  fetchDroneXlIntelligence,
  fetchSuasNewsIntelligence,
  type ExternalIntelligenceItem,
} from "./externalIntelligence";
import { getSupportedCountryCount } from "./countries";
import { getSupabaseAdmin } from "./supabaseServer";

export type IntelligenceRecord = {
  id: string;
  title: string;
  source: string;
  sourceUrl: string;
  sourceIdentifier: string | null;
  publishedDate: string | null;
  intelligenceType: string;
  priority: string | null;
  country: string | null;
  tags: string[];
  ingestedAt: string;
};

type IngestableIntelligenceItem = AausIntelligenceItem | ExternalIntelligenceItem;

export type IntelligenceSourceRefreshResult = {
  source: string;
  parsedCount: number;
  newCount: number;
  existingCount: number;
  upsertedCount: number;
  error?: string;
};

export type UnifiedRefreshResult = {
  totalParsed: number;
  totalNew: number;
  totalExisting: number;
  totalUpserted: number;
  sources: IntelligenceSourceRefreshResult[];
  failedSources: string[];
  warning?: string;
};

type IntelligenceRow = {
  id: string;
  title: string;
  source: string;
  source_url: string;
  source_identifier: string | null;
  published_date: string | null;
  intelligence_type: string;
  priority: string | null;
  country: string | null;
  tags: unknown;
  ingested_at: string;
};

function getSupabaseAdminSafe() {
  try {
    return getSupabaseAdmin();
  } catch {
    return null;
  }
}

function normaliseTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function mapRow(row: IntelligenceRow): IntelligenceRecord {
  return {
    id: row.id,
    title: row.title,
    source: row.source,
    sourceUrl: row.source_url,
    sourceIdentifier: row.source_identifier,
    publishedDate: row.published_date,
    intelligenceType: row.intelligence_type,
    priority: row.priority,
    country: row.country,
    tags: normaliseTags(row.tags),
    ingestedAt: row.ingested_at,
  };
}

export function formatPublishedDate(value: string | null): string {
  if (!value) return "Date unavailable";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export async function listIntelligenceItems(options?: {
  limit?: number;
  priority?: string | null;
  type?: string | null;
  source?: string | null;
  country?: string | null;
  search?: string | null;
  recencyDays?: number | null;
}): Promise<IntelligenceRecord[]> {
  const supabase = getSupabaseAdminSafe();
  if (!supabase) return [];

  let query = supabase
    .from("intelligence_items")
    .select("id, title, source, source_url, source_identifier, published_date, intelligence_type, priority, country, tags, ingested_at")
    .order("published_date", { ascending: false, nullsFirst: false })
    .order("ingested_at", { ascending: false });

  if (options?.priority) {
    query = query.eq("priority", options.priority);
  }

  if (options?.type) {
    query = query.eq("intelligence_type", options.type);
  }

  if (options?.source) {
    query = query.eq("source", options.source);
  }

  if (options?.country) {
    query = query.eq("country", options.country);
  }

  if (options?.recencyDays && Number.isFinite(options.recencyDays)) {
    const threshold = new Date(Date.now() - options.recencyDays * 24 * 60 * 60 * 1000).toISOString();
    query = query.gte("published_date", threshold);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error || !data) return [];

  let mapped = (data as IntelligenceRow[]).map(mapRow);

  if (options?.search && options.search.trim()) {
    const lower = options.search.trim().toLowerCase();
    mapped = mapped.filter((item) => {
      const text = [item.title, item.source, item.intelligenceType, item.country ?? "", item.tags.join(" ")].join(" ").toLowerCase();
      return text.includes(lower);
    });
  }

  if (options?.limit) {
    return mapped.slice(0, options.limit);
  }

  return mapped;
}

export async function getDashboardSnapshot() {
  const items = await listIntelligenceItems({ limit: 6 });
  const supabase = getSupabaseAdminSafe();
  const supportedCountryCount = getSupportedCountryCount();
  if (!supabase) {
    return {
      items,
      metrics: {
        critical: 0,
        procurement: 0,
        regulation: 0,
        countries: supportedCountryCount,
      },
    };
  }

  const { data } = await supabase
    .from("intelligence_items")
    .select("intelligence_type, priority, country");

  const rows = data ?? [];
  return {
    items,
    metrics: {
      critical: rows.filter((row) => row.priority === "critical").length,
      procurement: rows.filter((row) => row.intelligence_type === "procurement").length,
      regulation: rows.filter((row) => row.intelligence_type === "regulation").length,
      countries: supportedCountryCount,
    },
  };
}

export async function ingestAausIntelligence() {
  const result = await ingestSourceItems("AAUS", await fetchAausIntelligence());
  return {
    parsedCount: result.parsedCount,
    upsertedCount: result.upsertedCount,
  };
}

function canonicalizeSourceUrl(url: string): string {
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
    return parsed.toString();
  } catch {
    return url;
  }
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Unknown refresh error";
}

async function lookupExistingUrls(urls: string[]): Promise<Set<string>> {
  const supabase = getSupabaseAdminSafe();
  if (!supabase) {
    throw new Error("Supabase environment variables are not configured.");
  }

  const existing = new Set<string>();
  const chunkSize = 200;

  for (let index = 0; index < urls.length; index += chunkSize) {
    const chunk = urls.slice(index, index + chunkSize);
    const { data, error } = await supabase
      .from("intelligence_items")
      .select("source_url")
      .in("source_url", chunk);

    if (error) {
      throw error;
    }

    for (const row of data ?? []) {
      const value = (row as { source_url?: string }).source_url;
      if (typeof value === "string") {
        existing.add(value);
      }
    }
  }

  return existing;
}

async function ingestSourceItems(source: string, parsed: IngestableIntelligenceItem[]): Promise<IntelligenceSourceRefreshResult> {
  const supabase = getSupabaseAdminSafe();
  if (!supabase) {
    throw new Error("Supabase environment variables are not configured.");
  }

  const deduped = new Map<string, IngestableIntelligenceItem>();
  for (const item of parsed) {
    const canonicalUrl = canonicalizeSourceUrl(item.sourceUrl);
    deduped.set(canonicalUrl, { ...item, sourceUrl: canonicalUrl });
  }

  const normalized = Array.from(deduped.values());
  const existingSet = await lookupExistingUrls(normalized.map((item) => item.sourceUrl));

  const ingestedAt = new Date().toISOString();
  const payload = normalized.map((item) => ({
    title: item.title,
    source: item.source,
    source_url: item.sourceUrl,
    source_identifier: item.sourceIdentifier,
    published_date: item.publishedDate,
    intelligence_type: item.intelligenceType,
    priority: null,
    country: item.country,
    tags: item.tags,
    ingested_at: ingestedAt,
  }));

  const { data, error } = await supabase
    .from("intelligence_items")
    .upsert(payload, { onConflict: "source_url" })
    .select("id");

  if (error) {
    throw error;
  }

  const newCount = normalized.filter((item) => !existingSet.has(item.sourceUrl)).length;
  const existingCount = normalized.length - newCount;

  return {
    source,
    parsedCount: normalized.length,
    newCount,
    existingCount,
    upsertedCount: data?.length ?? 0,
  };
}

export async function refreshAllIntelligenceSources(): Promise<UnifiedRefreshResult> {
  const sourceRunners: Array<{ source: string; run: () => Promise<IngestableIntelligenceItem[]> }> = [
    { source: "AAUS", run: () => fetchAausIntelligence() },
    { source: "DroneXL", run: () => fetchDroneXlIntelligence() },
    { source: "DRONELIFE", run: () => fetchDroneLifeIntelligence() },
    { source: "Commercial UAV News", run: () => fetchCommercialUavNewsIntelligence() },
    { source: "sUAS News", run: () => fetchSuasNewsIntelligence() },
  ];

  const results: IntelligenceSourceRefreshResult[] = [];

  for (const runner of sourceRunners) {
    try {
      const parsed = await runner.run();
      const result = await ingestSourceItems(runner.source, parsed);
      results.push(result);
    } catch (error) {
      results.push({
        source: runner.source,
        parsedCount: 0,
        newCount: 0,
        existingCount: 0,
        upsertedCount: 0,
        error: getErrorMessage(error),
      });
    }
  }

  const failedSources = results.filter((result) => Boolean(result.error)).map((result) => result.source);
  const successResults = results.filter((result) => !result.error);

  const totalParsed = successResults.reduce((sum, item) => sum + item.parsedCount, 0);
  const totalNew = successResults.reduce((sum, item) => sum + item.newCount, 0);
  const totalExisting = successResults.reduce((sum, item) => sum + item.existingCount, 0);
  const totalUpserted = successResults.reduce((sum, item) => sum + item.upsertedCount, 0);

  return {
    totalParsed,
    totalNew,
    totalExisting,
    totalUpserted,
    sources: results,
    failedSources,
    warning: failedSources.length ? `Some sources failed: ${failedSources.join(", ")}` : undefined,
  };
}
