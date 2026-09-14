"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  australiaDirectoryCategories,
  australiaJurisdictions,
  australiaStateDirectory,
  type AustraliaDirectoryCategoryKey,
  type AustraliaOrganisationRecord,
} from "../lib/australiaStateDirectory";
import { supportedCountries } from "../lib/countries";

type SectorOption = {
  value: "all" | "public-safety" | "critical-infrastructure-industry" | "defence-military" | "partners";
  label: string;
};

type TypeOption = {
  value: string;
  label: string;
};

type DirectoryRecord = {
  id: string;
  name: string;
  organisationType: string;
  category: AustraliaDirectoryCategoryKey;
  sectorLabel: string;
  country: string;
  region: string | null;
  regionCode: string | null;
  officialSourceUrl: string;
  lastVerified: string | null;
  confidence: string;
  profileHref?: string;
};

const SEARCH_PLACEHOLDER = "Search by organisation, sector, type or location...";

const TYPE_OPTIONS: TypeOption[] = [
  { value: "all", label: "All Types" },
  { value: "Police", label: "Police" },
  { value: "Fire & Rescue", label: "Fire & Rescue" },
  { value: "Ambulance / Medical", label: "Ambulance / Medical" },
  { value: "Emergency Management", label: "Emergency Management" },
  { value: "Defence / Military", label: "Defence / Military" },
  { value: "Mining", label: "Mining" },
  { value: "Oil & Gas", label: "Oil & Gas" },
  { value: "Energy / Utilities", label: "Energy / Utilities" },
  { value: "Aviation / Critical Infrastructure", label: "Aviation / Critical Infrastructure" },
  { value: "Transport Infrastructure", label: "Transport Infrastructure" },
  { value: "Rail Infrastructure", label: "Rail Infrastructure" },
  { value: "Partner", label: "Partner" },
];

const SECTOR_OPTIONS: SectorOption[] = [
  { value: "all", label: "All Sectors" },
  { value: "public-safety", label: "Public Safety" },
  { value: "critical-infrastructure-industry", label: "Critical Infrastructure & Industry" },
  { value: "defence-military", label: "Defence / Military" },
  { value: "partners", label: "Partners" },
];

const COUNTRY_OPTIONS = [
  { value: "all", label: "All Countries" },
  { value: "australia", label: "Australia" },
  { value: "new-zealand", label: "New Zealand" },
  { value: "canada", label: "Canada" },
  { value: "united-kingdom", label: "United Kingdom" },
  { value: "united-states", label: "United States" },
  { value: "european-union", label: "European Union" },
  { value: "south-africa", label: "South Africa" },
] as const;

const REGION_ALIASES: Record<string, string> = {
  wa: "western australia",
  nsw: "new south wales",
  vic: "victoria",
  qld: "queensland",
  sa: "south australia",
  tas: "tasmania",
  act: "australian capital territory",
  nt: "northern territory",
};

const CATEGORY_LABELS: Record<AustraliaDirectoryCategoryKey, string> = {
  "public-safety": "Public Safety",
  "critical-infrastructure-industry": "Critical Infrastructure & Industry",
  "defence-military": "Defence / Military",
  partners: "Partners",
};

function normalize(value: string): string {
  return value.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(value: string): string[] {
  const normalized = normalize(value);
  return normalized.length > 0 ? normalized.split(" ") : [];
}

function expandQueryTokens(query: string): string[] {
  const tokens = tokenize(query);
  const expanded = new Set<string>(tokens);

  for (const token of tokens) {
    const region = REGION_ALIASES[token];
    if (region) {
      expanded.add(region);
      for (const part of region.split(" ")) {
        expanded.add(part);
      }
    }
  }

  return Array.from(expanded);
}

function flattenAustraliaOrganisations(): DirectoryRecord[] {
  return australiaJurisdictions.flatMap((state) => {
    const regionRecords = australiaStateDirectory[state.slug] ?? [];

    return regionRecords.map((record: AustraliaOrganisationRecord) => ({
      id: record.id,
      name: record.name,
      organisationType: record.organisationType,
      category: record.category,
      sectorLabel: CATEGORY_LABELS[record.category],
      country: "Australia",
      region: state.name,
      regionCode: state.code,
      officialSourceUrl: record.officialSourceUrl,
      lastVerified: record.lastVerified,
      confidence: record.confidence,
      profileHref: record.profileHref,
    }));
  });
}

function matchesSearch(record: DirectoryRecord, query: string): boolean {
  if (!query.trim()) {
    return true;
  }

  const queryTokens = expandQueryTokens(query);
  const searchable = normalize([
    record.name,
    record.organisationType,
    record.sectorLabel,
    record.country,
    record.region ?? "",
    record.regionCode ?? "",
  ].join(" "));

  return queryTokens.every((token) => searchable.includes(token));
}

export default function AgenciesDirectoryBrowser() {
  const [searchText, setSearchText] = useState("");
  const [country, setCountry] = useState("all");
  const [region, setRegion] = useState("all");
  const [organisationType, setOrganisationType] = useState("all");
  const [sector, setSector] = useState<SectorOption["value"]>("all");

  const availableCountries = useMemo(() => {
    const canonical = new Set(supportedCountries.map((item) => item.slug));
    return COUNTRY_OPTIONS.filter((option) => option.value === "all" || canonical.has(option.value));
  }, []);

  const regionOptions = useMemo(() => {
    if (country !== "australia") {
      return [{ value: "all", label: "All Regions" }];
    }

    return [
      { value: "all", label: "All States & Territories" },
      ...australiaJurisdictions.map((state) => ({ value: state.slug, label: state.name })),
    ];
  }, [country]);

  const organisations = useMemo(() => flattenAustraliaOrganisations(), []);

  const filtered = useMemo(() => {
    return organisations.filter((record) => {
      if (country !== "all") {
        const selectedCountryName = COUNTRY_OPTIONS.find((option) => option.value === country)?.label;
        if (!selectedCountryName || record.country !== selectedCountryName) {
          return false;
        }
      }

      if (region !== "all") {
        const selectedState = australiaJurisdictions.find((state) => state.slug === region);
        if (!selectedState || record.region !== selectedState.name) {
          return false;
        }
      }

      if (organisationType !== "all" && record.organisationType !== organisationType) {
        return false;
      }

      if (sector !== "all" && record.category !== sector) {
        return false;
      }

      return matchesSearch(record, searchText);
    });
  }, [country, organisations, organisationType, region, searchText, sector]);

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setRegion("all");
  };

  const clearAll = () => {
    setSearchText("");
    setCountry("all");
    setRegion("all");
    setOrganisationType("all");
    setSector("all");
  };

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <section className="panel" style={{ padding: "18px" }}>
        <div style={{ display: "grid", gap: "12px" }}>
          <div>
            <label htmlFor="agency-search" style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
              Search
            </label>
            <input
              className="filter-control"
              id="agency-search"
              onChange={(event) => setSearchText(event.target.value)}
              placeholder={SEARCH_PLACEHOLDER}
              style={{ width: "100%" }}
              type="search"
              value={searchText}
            />
          </div>

          <div
            style={{
              display: "grid",
              gap: "12px",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}
          >
            <div>
              <label htmlFor="country-filter" style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                Country
              </label>
              <select
                className="filter-control"
                id="country-filter"
                onChange={(event) => handleCountryChange(event.target.value)}
                style={{ width: "100%" }}
                value={country}
              >
                {availableCountries.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="region-filter" style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                State / Region
              </label>
              <select
                className="filter-control"
                disabled={country !== "australia"}
                id="region-filter"
                onChange={(event) => setRegion(event.target.value)}
                style={{ width: "100%" }}
                value={region}
              >
                {regionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="type-filter" style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                Agency / Organisation Type
              </label>
              <select
                className="filter-control"
                id="type-filter"
                onChange={(event) => setOrganisationType(event.target.value)}
                style={{ width: "100%" }}
                value={organisationType}
              >
                {TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="sector-filter" style={{ display: "block", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
                Sector
              </label>
              <select
                className="filter-control"
                id="sector-filter"
                onChange={(event) => setSector(event.target.value as SectorOption["value"])}
                style={{ width: "100%" }}
                value={sector}
              >
                {SECTOR_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ alignItems: "center", display: "flex", gap: "10px", justifyContent: "space-between" }}>
            <span style={{ color: "#667085", fontSize: "12px" }}>
              {filtered.length} organisation{filtered.length === 1 ? "" : "s"} found
            </span>

            <button className="secondary-button" onClick={clearAll} type="button">
              Clear All Filters
            </button>
          </div>
        </div>
      </section>

      <section className="panel" style={{ padding: "16px" }}>
        {filtered.length > 0 ? (
          <div style={{ display: "grid", gap: "10px" }}>
            {filtered.map((record) => {
              const row = (
                <>
                  <strong style={{ fontSize: "14px" }}>{record.name}</strong>
                  <span style={{ color: "#344054", fontSize: "12px" }}>
                    {record.organisationType}
                  </span>
                  <span style={{ color: "#667085", fontSize: "12px" }}>
                    {record.sectorLabel}
                  </span>
                  <span style={{ color: "#667085", fontSize: "11px" }}>
                    {record.country}{record.region ? ` · ${record.region}` : ""}
                  </span>
                  <span style={{ color: "#667085", fontSize: "11px" }}>
                    Last verified: {record.lastVerified ?? "Research required"} · Confidence: {record.confidence}
                  </span>
                </>
              );

              if (record.profileHref) {
                return (
                  <Link
                    className="country-card"
                    href={record.profileHref}
                    key={record.id}
                    style={{ alignItems: "flex-start", flexDirection: "column", gap: "4px", padding: "12px", textDecoration: "none" }}
                  >
                    {row}
                  </Link>
                );
              }

              return (
                <a
                  className="country-card"
                  href={record.officialSourceUrl}
                  key={record.id}
                  rel="noreferrer"
                  style={{ alignItems: "flex-start", flexDirection: "column", gap: "4px", padding: "12px", textDecoration: "none" }}
                  target="_blank"
                >
                  {row}
                </a>
              );
            })}
          </div>
        ) : (
          <p style={{ margin: 0 }}>No organisations matched the current search and filter selection.</p>
        )}
      </section>

      <section className="panel" style={{ padding: "16px" }}>
        <h2 style={{ marginBottom: "8px" }}>Browse coverage</h2>
        <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          {australiaDirectoryCategories.map((category) => {
            const count = organisations.filter((record) => record.category === category.key).length;
            return (
              <div key={category.key} style={{ border: "1px solid #d9e0e7", borderRadius: "8px", padding: "10px" }}>
                <strong style={{ fontSize: "13px" }}>{category.label}</strong>
                <p style={{ color: "#667085", fontSize: "12px", margin: "6px 0 0" }}>{count} organisations</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
