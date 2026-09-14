import AppShell from "../../components/AppShell";
import TechnologyWatchBrowser from "../../components/TechnologyWatchBrowser";
import {
  getTechnologyCompanies,
  getTechnologyIntelligenceItems,
  getTechnologyProducts,
  getTechnologyTerminology,
  technologyCompanyTypeOptions,
  technologyImpactTypeOptions,
  technologyIntelligenceTypeOptions,
  technologyRelationshipOptions,
  type TechnologyWatchFilterState,
  type TechnologyWatchViewMode,
} from "../../lib/technologyWatchData";

type SearchParams = Record<string, string | string[] | undefined>;

function readSingleValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function sanitizeFilter(value: string, allowed: string[]): string {
  if (!value) return "all";
  return allowed.includes(value) ? value : "all";
}

function sanitizeView(value: string): TechnologyWatchViewMode {
  return value === "intelligence" ? "intelligence" : "ecosystem";
}

export default async function TechnologyWatchPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;

  const companies = getTechnologyCompanies();
  const products = getTechnologyProducts();
  const intelligenceItems = getTechnologyIntelligenceItems();
  const terminology = getTechnologyTerminology();

  const viewValue = readSingleValue(searchParams.view);
  const searchValue = readSingleValue(searchParams.search);
  const companyValue = readSingleValue(searchParams.company);
  const relationshipValue = readSingleValue(searchParams.relationship);
  const categoryValue = readSingleValue(searchParams.category);
  const intelligenceTypeValue = readSingleValue(searchParams.intelligenceType);
  const impactValue = readSingleValue(searchParams.impact);
  const countryValue = readSingleValue(searchParams.country);

  const initialFilters: TechnologyWatchFilterState = {
    view: sanitizeView(viewValue),
    search: searchValue,
    company: sanitizeFilter(companyValue, companies.map((company) => company.slug)),
    relationship: sanitizeFilter(relationshipValue, technologyRelationshipOptions.map((item) => item.value)),
    category: sanitizeFilter(categoryValue, technologyCompanyTypeOptions.map((item) => item.value)),
    intelligenceType: sanitizeFilter(intelligenceTypeValue, technologyIntelligenceTypeOptions.map((item) => item.value)),
    impact: sanitizeFilter(impactValue, technologyImpactTypeOptions.map((item) => item.value)),
    country: sanitizeFilter(countryValue, intelligenceItems.flatMap((item) => item.countries.map((country) => country.toLowerCase()))),
  };

  return (
    <AppShell
      activePath="/technology-watch"
      eyebrow="TECHNOLOGY INTELLIGENCE"
      title="TECHNOLOGY WATCH"
      description="Understand the technologies, companies and integrations shaping public-safety drone operations."
    >
      <section className="panel market-intro-panel">
        <p>
          Explore the technology ecosystem around DroneSense and monitor the developments that could affect
          integrations, deployments and future capability.
        </p>
      </section>

      <TechnologyWatchBrowser
        companies={companies}
        products={products}
        intelligenceItems={intelligenceItems}
        terminology={terminology}
        initialFilters={initialFilters}
      />
    </AppShell>
  );
}