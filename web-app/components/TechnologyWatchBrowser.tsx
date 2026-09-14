"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  filterTechnologyCompanies,
  filterTechnologyIntelligence,
  formatTechnologyCompanyTypeLabel,
  formatTechnologyImpactTypeLabel,
  formatTechnologyIntelligenceTypeLabel,
  formatTechnologyRelationshipLabel,
  getTechnologyCountryOptions,
  type TechnologyCompany,
  type TechnologyIntelligenceItem,
  type TechnologyProduct,
  type TechnologyTerm,
  type TechnologyWatchFilterState,
  technologyCompanyTypeOptions,
  technologyImpactTypeOptions,
  technologyIntelligenceTypeOptions,
  technologyRelationshipOptions,
} from "../lib/technologyWatchData";

type TechnologyWatchBrowserProps = {
  companies: TechnologyCompany[];
  products: TechnologyProduct[];
  intelligenceItems: TechnologyIntelligenceItem[];
  terminology: TechnologyTerm[];
  initialFilters: TechnologyWatchFilterState;
};

export default function TechnologyWatchBrowser({
  companies,
  products,
  intelligenceItems,
  terminology,
  initialFilters,
}: TechnologyWatchBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [view, setView] = useState(initialFilters.view);
  const [search, setSearch] = useState(initialFilters.search);
  const [company, setCompany] = useState(initialFilters.company);
  const [relationship, setRelationship] = useState(initialFilters.relationship);
  const [category, setCategory] = useState(initialFilters.category);
  const [intelligenceType, setIntelligenceType] = useState(initialFilters.intelligenceType);
  const [impact, setImpact] = useState(initialFilters.impact);
  const [country, setCountry] = useState(initialFilters.country);

  useEffect(() => {
    setView(initialFilters.view);
    setSearch(initialFilters.search);
    setCompany(initialFilters.company);
    setRelationship(initialFilters.relationship);
    setCategory(initialFilters.category);
    setIntelligenceType(initialFilters.intelligenceType);
    setImpact(initialFilters.impact);
    setCountry(initialFilters.country);
  }, [initialFilters]);

  const countryOptions = useMemo(() => getTechnologyCountryOptions(), []);

  const filteredCompanies = useMemo(
    () =>
      filterTechnologyCompanies(
        companies,
        { view, search, company, relationship, category, intelligenceType, impact, country },
        products,
        intelligenceItems,
        terminology,
      ),
    [category, companies, company, country, impact, intelligenceItems, intelligenceType, products, relationship, search, terminology, view],
  );

  const filteredIntelligence = useMemo(
    () =>
      filterTechnologyIntelligence(
        intelligenceItems,
        { view, search, company, relationship, category, intelligenceType, impact, country },
        companies,
        products,
      ),
    [category, companies, company, country, impact, intelligenceItems, intelligenceType, products, relationship, search, view],
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (view !== "ecosystem") params.set("view", view);
    if (search.trim()) params.set("search", search.trim());
    if (company !== "all") params.set("company", company);
    if (relationship !== "all") params.set("relationship", relationship);
    if (category !== "all") params.set("category", category);
    if (intelligenceType !== "all") params.set("intelligenceType", intelligenceType);
    if (impact !== "all") params.set("impact", impact);
    if (country !== "all") params.set("country", country);

    const query = params.toString();
    const currentQuery = searchParams.toString();
    if (query !== currentQuery) {
      const nextUrl = query ? `${pathname}?${query}` : pathname;
      router.replace(nextUrl, { scroll: false });
    }
  }, [category, company, country, impact, intelligenceType, pathname, relationship, router, search, searchParams, view]);

  const intelligenceByCompany = useMemo(() => {
    return companies.reduce<Record<string, { count: number; latestDate: string | null }>>((acc, companyRecord) => {
      const related = intelligenceItems.filter((item) => item.companyIds.includes(companyRecord.id));
      const latestDate = related.length ? related[0]?.date ?? null : null;
      acc[companyRecord.id] = { count: related.length, latestDate };
      return acc;
    }, {});
  }, [companies, intelligenceItems]);

  const ecosystemPreview = view === "ecosystem" ? filteredCompanies : filteredCompanies.slice(0, 3);
  const intelligencePreview = view === "intelligence" ? filteredIntelligence : filteredIntelligence.slice(0, 4);

  const clearFilters = () => {
    setView("ecosystem");
    setSearch("");
    setCompany("all");
    setRelationship("all");
    setCategory("all");
    setIntelligenceType("all");
    setImpact("all");
    setCountry("all");
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="techwatch-shell">
      <section className="panel techwatch-filter-panel">
        <div className="techwatch-view-toggle" role="tablist" aria-label="Technology Watch view mode">
          <button
            type="button"
            className={view === "ecosystem" ? "secondary-button techwatch-toggle-active" : "secondary-button"}
            onClick={() => setView("ecosystem")}
          >
            Ecosystem
          </button>
          <button
            type="button"
            className={view === "intelligence" ? "secondary-button techwatch-toggle-active" : "secondary-button"}
            onClick={() => setView("intelligence")}
          >
            Intelligence
          </button>
        </div>

        <div className="techwatch-filter-grid">
          <div>
            <label htmlFor="techwatch-company">Company</label>
            <select id="techwatch-company" className="filter-control" value={company} onChange={(event) => setCompany(event.target.value)}>
              <option value="all">All Companies</option>
              {companies.map((option) => (
                <option key={option.id} value={option.slug}>{option.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="techwatch-relationship">Relationship</label>
            <select
              id="techwatch-relationship"
              className="filter-control"
              value={relationship}
              onChange={(event) => setRelationship(event.target.value)}
            >
              <option value="all">All Relationships</option>
              {technologyRelationshipOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="techwatch-category">Technology Category</label>
            <select id="techwatch-category" className="filter-control" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">All Categories</option>
              {technologyCompanyTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="techwatch-intelligence-type">Intelligence Type</label>
            <select
              id="techwatch-intelligence-type"
              className="filter-control"
              value={intelligenceType}
              onChange={(event) => setIntelligenceType(event.target.value)}
            >
              <option value="all">All Types</option>
              {technologyIntelligenceTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="techwatch-impact">DroneSense Impact</label>
            <select id="techwatch-impact" className="filter-control" value={impact} onChange={(event) => setImpact(event.target.value)}>
              <option value="all">All Impact Types</option>
              {technologyImpactTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="techwatch-country">Country</label>
            <select id="techwatch-country" className="filter-control" value={country} onChange={(event) => setCountry(event.target.value)}>
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div className="techwatch-search-wrap">
            <label htmlFor="techwatch-search">Search</label>
            <input
              id="techwatch-search"
              className="filter-control"
              type="search"
              placeholder="Search companies, products, terminology and intelligence"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="techwatch-filter-actions">
          <span>
            {filteredCompanies.length} compan{filteredCompanies.length === 1 ? "y" : "ies"} • {filteredIntelligence.length} intelligence item
            {filteredIntelligence.length === 1 ? "" : "s"}
          </span>
          <button type="button" className="secondary-button" onClick={clearFilters}>Clear Filters</button>
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>TECHNOLOGY ECOSYSTEM</h2>
            <p>Reference knowledge about companies, products, terminology and verified relationship context.</p>
          </div>
          {view !== "ecosystem" ? (
            <button type="button" className="secondary-button" onClick={() => setView("ecosystem")}>Focus Ecosystem</button>
          ) : null}
        </div>

        {ecosystemPreview.length ? (
          <div className="techwatch-company-grid">
            {ecosystemPreview.map((companyRecord) => {
              const companyProducts = products.filter((item) => item.companyId === companyRecord.id);
              const companyIntelligence = intelligenceByCompany[companyRecord.id] ?? { count: 0, latestDate: null };

              return (
                <article className="techwatch-company-card" key={companyRecord.id}>
                  <div className="techwatch-company-head">
                    <h3>{companyRecord.name}</h3>
                    <span className="techwatch-company-type">{formatTechnologyCompanyTypeLabel(companyRecord.companyType)}</span>
                  </div>

                  <div className="techwatch-badge-row">
                    {companyRecord.relationshipTypes.map((relation) => (
                      <span key={relation} className="badge-verified">{formatTechnologyRelationshipLabel(relation)}</span>
                    ))}
                  </div>

                  <p>{companyRecord.overview}</p>

                  <div className="techwatch-company-meta">
                    <span>{companyProducts.length} product{companyProducts.length === 1 ? "" : "s"}</span>
                    <span>
                      {companyIntelligence.count} intelligence item{companyIntelligence.count === 1 ? "" : "s"}
                      {companyIntelligence.latestDate ? ` • Latest ${companyIntelligence.latestDate}` : ""}
                    </span>
                  </div>

                  <Link className="secondary-button" href={`/technology-watch/${companyRecord.slug}`}>
                    View Company
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="intelligence-empty">No verified companies match these filters.</p>
        )}
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>LATEST TECHNOLOGY INTELLIGENCE</h2>
            <p>Time-sensitive developments about what changed and why it matters.</p>
          </div>
          {view !== "intelligence" ? (
            <button type="button" className="secondary-button" onClick={() => setView("intelligence")}>Focus Intelligence</button>
          ) : null}
        </div>

        {intelligencePreview.length ? (
          <div className="intelligence-list">
            {intelligencePreview.map((item) => (
              <article key={item.id} className="intelligence-row techwatch-intelligence-row">
                <div className="intelligence-content">
                  <p className="intelligence-meta">{item.date} • {formatTechnologyIntelligenceTypeLabel(item.type)}</p>
                  <strong>{item.headline}</strong>
                  <span>{item.summary}</span>
                  {item.sources.length ? (
                    <p className="techwatch-source-note">
                      Source: <a href={item.sources[0].url} target="_blank" rel="noreferrer">{item.sources[0].title}</a>
                    </p>
                  ) : null}
                  <p className="techwatch-impact-note">
                    <strong>Why This Matters:</strong> {item.whyItMatters}
                  </p>
                  <p className="techwatch-impact-note">
                    <strong>DroneSense Impact ({formatTechnologyImpactTypeLabel(item.impactType)}):</strong> {item.droneSenseImpact}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="intelligence-empty">No verified technology intelligence matches these filters.</p>
        )}
      </section>
    </div>
  );
}
