"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatPublishedDate, type IntelligenceRecord } from "../lib/intelligence";

type LiveFilterState = {
  source: string;
  country: string;
  type: string;
  recency: string;
  search: string;
};

type LiveIntelligenceBrowserProps = {
  items: IntelligenceRecord[];
  initialFilters: LiveFilterState;
};

function titleCase(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getItemTimestamp(item: IntelligenceRecord): number {
  if (!item.publishedDate) return 0;
  const parsed = new Date(item.publishedDate).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

function buildItemMeta(item: IntelligenceRecord) {
  const parts = [item.source, formatPublishedDate(item.publishedDate)];
  if (item.country) parts.push(item.country);

  const visibleTags = item.tags.filter((tag) => tag !== item.source);
  if (visibleTags.length > 0) {
    parts.push(visibleTags.slice(0, 3).join(" · "));
  }

  return parts.join(" · ");
}

export default function LiveIntelligenceBrowser({ items, initialFilters }: LiveIntelligenceBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [source, setSource] = useState(initialFilters.source);
  const [country, setCountry] = useState(initialFilters.country);
  const [type, setType] = useState(initialFilters.type);
  const [recency, setRecency] = useState(initialFilters.recency);
  const [search, setSearch] = useState(initialFilters.search);

  useEffect(() => {
    setSource(initialFilters.source);
    setCountry(initialFilters.country);
    setType(initialFilters.type);
    setRecency(initialFilters.recency);
    setSearch(initialFilters.search);
  }, [initialFilters]);

  const sourceOptions = useMemo(() => {
    return ["all", ...Array.from(new Set(items.map((item) => item.source))).sort()];
  }, [items]);

  const countryOptions = useMemo(() => {
    return ["all", ...Array.from(new Set(items.map((item) => item.country).filter((value): value is string => Boolean(value)))).sort()];
  }, [items]);

  const typeOptions = useMemo(() => {
    return ["all", ...Array.from(new Set(items.map((item) => item.intelligenceType))).sort()];
  }, [items]);

  const filtered = useMemo(() => {
    const now = Date.now();
    const recencyDays = recency === "all" ? null : Number(recency);
    const threshold = recencyDays ? now - recencyDays * 24 * 60 * 60 * 1000 : null;
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      if (source !== "all" && item.source !== source) return false;
      if (country !== "all" && item.country !== country) return false;
      if (type !== "all" && item.intelligenceType !== type) return false;

      if (threshold) {
        const itemTime = getItemTimestamp(item);
        if (!itemTime || itemTime < threshold) return false;
      }

      if (!query) return true;
      const text = [item.title, item.source, item.intelligenceType, item.country ?? "", item.tags.join(" ")].join(" ").toLowerCase();
      return text.includes(query);
    });
  }, [country, items, recency, search, source, type]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (source !== "all") params.set("source", source);
    if (country !== "all") params.set("country", country);
    if (type !== "all") params.set("type", type);
    if (recency !== "all") params.set("recency", recency);
    if (search.trim()) params.set("search", search.trim());

    const query = params.toString();
    const currentQuery = searchParams.toString();
    if (query !== currentQuery) {
      const nextUrl = query ? `${pathname}?${query}` : pathname;
      router.replace(nextUrl, { scroll: false });
    }
  }, [country, pathname, recency, router, search, searchParams, source, type]);

  const clearFilters = () => {
    setSource("all");
    setCountry("all");
    setType("all");
    setRecency("all");
    setSearch("");
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="live-shell">
      <section className="panel live-filter-panel">
        <div className="live-filter-grid">
          <div>
            <label htmlFor="live-source">Source</label>
            <select id="live-source" className="filter-control" value={source} onChange={(event) => setSource(event.target.value)}>
              {sourceOptions.map((option) => (
                <option key={option} value={option}>{option === "all" ? "All Sources" : option}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="live-country">Country</label>
            <select id="live-country" className="filter-control" value={country} onChange={(event) => setCountry(event.target.value)}>
              {countryOptions.map((option) => (
                <option key={option} value={option}>{option === "all" ? "All Countries" : option}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="live-type">Intelligence Type</label>
            <select id="live-type" className="filter-control" value={type} onChange={(event) => setType(event.target.value)}>
              {typeOptions.map((option) => (
                <option key={option} value={option}>{option === "all" ? "All Types" : titleCase(option)}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="live-recency">Recency</label>
            <select id="live-recency" className="filter-control" value={recency} onChange={(event) => setRecency(event.target.value)}>
              <option value="all">All Dates</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>

          <div className="live-search-wrap">
            <label htmlFor="live-search">Search</label>
            <input
              id="live-search"
              className="filter-control"
              type="search"
              placeholder="Search title, source, type, country or tags"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="live-filter-actions">
          <span>{filtered.length} intelligence item{filtered.length === 1 ? "" : "s"}</span>
          <button type="button" className="secondary-button" onClick={clearFilters}>Clear Filters</button>
        </div>
      </section>

      <section className="live-feed-list">
        {filtered.length > 0 ? filtered.map((update) => (
          <article className="panel live-card" key={update.id}>
            <div className="live-card-top">
              <p className="live-card-type">{titleCase(update.intelligenceType)}</p>
              <span className="country-status">{update.source}</span>
            </div>

            <h2>
              <a href={update.sourceUrl} rel="noreferrer" target="_blank">
                {update.title}
              </a>
            </h2>

            <p className="intelligence-meta live-card-meta">{buildItemMeta(update)}</p>

            <a href={update.sourceUrl} rel="noreferrer" target="_blank" className="live-source-link">
              View source →
            </a>
          </article>
        )) : (
          <article className="panel">
            <h2>No intelligence matches the current filters.</h2>
            <p>Try broadening source, type, date or search filters to see more curated items.</p>
          </article>
        )}
      </section>
    </div>
  );
}
