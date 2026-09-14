"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MarketEnvironmentCard from "./MarketEnvironmentCard";
import MarketEnvironmentMetrics from "./MarketEnvironmentMetrics";
import {
  filterMarketEnvironmentItems,
  getMarketEnvironmentCountryOptions,
  getMarketEnvironmentMetrics,
  getMarketEnvironmentRegionOptions,
  marketEnvironmentHorizons,
  marketEnvironmentIntelligenceTypes,
  marketEnvironmentSectors,
  type MarketEnvironmentFilterState,
  type MarketEnvironmentItem,
} from "../lib/marketEnvironmentData";

type BrowserProps = {
  items: MarketEnvironmentItem[];
  initialFilters: MarketEnvironmentFilterState;
};

export default function MarketEnvironmentBrowser({ items, initialFilters }: BrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(initialFilters.search);
  const [country, setCountry] = useState(initialFilters.country);
  const [region, setRegion] = useState(initialFilters.region);
  const [type, setType] = useState(initialFilters.type);
  const [sector, setSector] = useState(initialFilters.sector);
  const [horizon, setHorizon] = useState(initialFilters.horizon);

  useEffect(() => {
    setSearch(initialFilters.search);
    setCountry(initialFilters.country);
    setRegion(initialFilters.region);
    setType(initialFilters.type);
    setSector(initialFilters.sector);
    setHorizon(initialFilters.horizon);
  }, [initialFilters]);

  const regionOptions = useMemo(() => getMarketEnvironmentRegionOptions(country), [country]);
  const countryOptions = useMemo(() => getMarketEnvironmentCountryOptions(), []);

  const filtered = useMemo(
    () => filterMarketEnvironmentItems(items, { country, region, type, sector, horizon, search }),
    [country, horizon, items, region, search, sector, type],
  );

  const metrics = useMemo(() => getMarketEnvironmentMetrics(filtered), [filtered]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (country !== "all") params.set("country", country);
    if (country === "australia" && region !== "all") params.set("region", region);
    if (type !== "all") params.set("type", type);
    if (sector !== "all") params.set("sector", sector);
    if (horizon !== "all") params.set("horizon", horizon);
    if (search.trim()) params.set("search", search.trim());

    const query = params.toString();
    const currentQuery = searchParams.toString();
    if (query !== currentQuery) {
      const nextUrl = query ? `${pathname}?${query}` : pathname;
      router.replace(nextUrl, { scroll: false });
    }
  }, [country, horizon, pathname, region, router, search, searchParams, sector, type]);

  return (
    <div className="market-shell">
      <MarketEnvironmentMetrics metrics={metrics} />

      <section className="panel market-filter-panel">
        <div className="market-filter-grid">
          <div>
            <label htmlFor="market-country">Country</label>
            <select
              id="market-country"
              className="filter-control"
              value={country}
              onChange={(event) => {
                const nextCountry = event.target.value;
                setCountry(nextCountry);
                setRegion("all");
              }}
            >
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="market-region">State / Region</label>
            <select
              id="market-region"
              className="filter-control"
              value={region}
              disabled={country !== "australia"}
              onChange={(event) => setRegion(event.target.value)}
            >
              {regionOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="market-type">Intelligence Type</label>
            <select
              id="market-type"
              className="filter-control"
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="all">All Types</option>
              {marketEnvironmentIntelligenceTypes.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="market-sector">Sector</label>
            <select
              id="market-sector"
              className="filter-control"
              value={sector}
              onChange={(event) => setSector(event.target.value)}
            >
              <option value="all">All Sectors</option>
              {marketEnvironmentSectors.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="market-horizon">
              Opportunity Horizon
              <span className="market-filter-help">Timing signal, not a sales forecast.</span>
            </label>
            <select
              id="market-horizon"
              className="filter-control"
              value={horizon}
              onChange={(event) => setHorizon(event.target.value)}
            >
              <option value="all">All Horizons</option>
              {marketEnvironmentHorizons.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div className="market-search-wrap">
            <label htmlFor="market-search">Search</label>
            <input
              id="market-search"
              className="filter-control"
              type="search"
              placeholder="Search headline, summary, program, tags or agencies"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="market-filter-actions">
          <span>{filtered.length} intelligence record{filtered.length === 1 ? "" : "s"}</span>
          <Link href={pathname} className="secondary-button">Clear Filters</Link>
        </div>
      </section>

      {filtered.length ? (
        <section className="market-card-grid">
          {filtered.map((item) => (
            <MarketEnvironmentCard key={item.id} item={item} />
          ))}
        </section>
      ) : (
        <section className="panel market-empty-state">
          <h2>No verified market-environment intelligence matches these filters.</h2>
          <p>
            Market Environment will track verified funding, policy, government priorities and strategic developments
            that may affect public-safety technology opportunities.
          </p>
        </section>
      )}
    </div>
  );
}
