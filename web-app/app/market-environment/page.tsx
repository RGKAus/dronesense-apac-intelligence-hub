import AppShell from "../../components/AppShell";
import MarketEnvironmentBrowser from "../../components/MarketEnvironmentBrowser";
import {
  getMarketEnvironmentItems,
  marketEnvironmentHorizons,
  marketEnvironmentIntelligenceTypes,
  marketEnvironmentSectors,
  type MarketEnvironmentFilterState,
} from "../../lib/marketEnvironmentData";

type SearchParams = Record<string, string | string[] | undefined>;

function readSingleValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function sanitizeFilter(value: string, allowed: string[]): string {
  if (!value) return "all";
  return allowed.includes(value) ? value : "all";
}

export default async function MarketEnvironmentPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const items = getMarketEnvironmentItems();

  const countryValue = readSingleValue(searchParams.country);
  const regionValue = readSingleValue(searchParams.region);
  const typeValue = readSingleValue(searchParams.type);
  const sectorValue = readSingleValue(searchParams.sector);
  const horizonValue = readSingleValue(searchParams.horizon);
  const searchValue = readSingleValue(searchParams.search);

  const initialFilters: MarketEnvironmentFilterState = {
    country: sanitizeFilter(countryValue, [
      "australia",
      "canada",
      "united-states",
      "united-kingdom",
      "new-zealand",
      "european-union",
      "south-africa",
    ]),
    region: sanitizeFilter(regionValue, [
      "federal-commonwealth",
      "western-australia",
      "new-south-wales",
      "victoria",
      "queensland",
      "south-australia",
      "tasmania",
      "australian-capital-territory",
      "northern-territory",
    ]),
    type: sanitizeFilter(typeValue, marketEnvironmentIntelligenceTypes.map((item) => item.value)),
    sector: sanitizeFilter(sectorValue, marketEnvironmentSectors.map((item) => item.value)),
    horizon: sanitizeFilter(horizonValue, marketEnvironmentHorizons.map((item) => item.value)),
    search: searchValue,
  };

  if (initialFilters.country !== "australia") {
    initialFilters.region = "all";
  }

  return (
    <AppShell
      activePath="/market-environment"
      eyebrow="MARKET INTELLIGENCE"
      title="MARKET ENVIRONMENT"
      description="Track the funding, policy, government priorities and strategic developments shaping public-safety technology markets."
    >
      <section className="panel market-intro-panel">
        <p>
          Understand what changed, who it affects, why it matters commercially and what to watch next.
        </p>
      </section>

      <MarketEnvironmentBrowser items={items} initialFilters={initialFilters} />
    </AppShell>
  );
}
