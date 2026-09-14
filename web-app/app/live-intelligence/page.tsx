import Link from "next/link";
import AAUSRefreshButton from "../../components/AAUSRefreshButton";
import AppShell from "../../components/AppShell";
import LiveIntelligenceBrowser from "../../components/LiveIntelligenceBrowser";
import { listIntelligenceItems } from "../../lib/intelligence";

type SearchParams = Promise<{
  source?: string;
  country?: string;
  type?: string;
  recency?: string;
  search?: string;
}>;

function normalizeFilter(value: string | undefined): string {
  if (!value) return "all";
  return value;
}

export default async function LiveIntelligencePage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const updates = await listIntelligenceItems({ limit: 250 });

  const initialFilters = {
    source: normalizeFilter(searchParams.source),
    country: normalizeFilter(searchParams.country),
    type: normalizeFilter(searchParams.type),
    recency: normalizeFilter(searchParams.recency),
    search: searchParams.search ?? "",
  };

  return (
    <AppShell
      activePath="/live-intelligence"
      eyebrow="GLOBAL INTELLIGENCE FEED"
      title="Live Intelligence"
      description="Regulatory, procurement, agency, funding and technology updates from trusted public sources."
    >
      <section className="panel" style={{ marginBottom: "18px" }}>
        <div className="panel-heading" style={{ marginBottom: 0 }}>
          <div>
            <h2>Intelligence source refresh</h2>
            <p>Manual authenticated refresh across AAUS, DroneXL, DRONELIFE, Commercial UAV News and sUAS News.</p>
          </div>
          <AAUSRefreshButton />
        </div>
      </section>

      {updates.length > 0 ? (
        <LiveIntelligenceBrowser items={updates} initialFilters={initialFilters} />
      ) : (
        <div style={{ display: "grid", gap: "14px" }}>
          <article className="panel">
            <h2>No intelligence available</h2>
            <p>
              No curated intelligence items are currently stored, or your environment has not ingested sources yet.
              Run refresh once source ingestion is configured.
            </p>
            <Link href="/live-intelligence">View all intelligence</Link>
          </article>
        </div>
      )}
    </AppShell>
  );
}