import Link from "next/link";
import { formatPublishedDate, getDashboardSnapshot } from "../lib/intelligence";
import DashboardRefreshButton from "../components/DashboardRefreshButton";
import AppShell from "../components/AppShell";

function titleCase(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildItemMeta(item: {
  source: string;
  publishedDate: string | null;
  country: string | null;
  tags: string[];
}) {
  const parts = [item.source, formatPublishedDate(item.publishedDate)];

  if (item.country) {
    parts.push(item.country);
  }

  const visibleTags = item.tags.filter((tag) => tag !== item.source && tag !== "news" && tag !== "events" && tag !== "position-papers");
  if (visibleTags.length > 0) {
    parts.push(visibleTags.slice(0, 2).join(" · "));
  }

  return parts.join(" · ");
}

export default async function Home() {
  const dashboard = await getDashboardSnapshot();
  const criticalHref = "/live-intelligence";

  return (
    <AppShell
      activePath="/"
      eyebrow="GLOBAL RPAS INTELLIGENCE"
      title="Dashboard"
      description="Public safety, regulatory and market intelligence across global RPAS operations."
      headingAction={<DashboardRefreshButton />}
    >

          <section className="metric-grid">
            <Link className="metric-card metric-card-link" href="/live-intelligence">
              <div className="metric-top"><span>Critical intelligence</span><span className="metric-icon">!</span></div>
              <strong>{dashboard.metrics.critical}</strong><p>No critical items currently classified</p>
            </Link>
            <Link className="metric-card metric-card-link" href="/procurement">
              <div className="metric-top"><span>Procurements</span><span className="metric-icon">P</span></div>
              <strong>{dashboard.metrics.procurement}</strong><p>Items categorised as procurement</p>
            </Link>
            <Link className="metric-card metric-card-link" href="/regulations">
              <div className="metric-top"><span>Regulatory changes</span><span className="metric-icon">R</span></div>
              <strong>{dashboard.metrics.regulation}</strong><p>Items categorised as regulation</p>
            </Link>
            <Link className="metric-card metric-card-link" href="/countries">
              <div className="metric-top"><span>Countries covered</span><span className="metric-icon">G</span></div>
              <strong>{dashboard.metrics.countries}</strong><p>Countries represented in ingested intelligence</p>
            </Link>
          </section>

          <section className="dashboard-grid">
            <article className="panel intelligence-panel">
              <div className="panel-heading">
                <div><h2>Latest intelligence</h2><p>Recent developments requiring attention</p></div>
                <Link href="/live-intelligence">View all</Link>
              </div>

              <div className="intelligence-list">
                {dashboard.items.length > 0 ? dashboard.items.map((item) => (
                  <a className="intelligence-row" href={item.sourceUrl} key={item.id} rel="noreferrer" target="_blank">
                    <div className="intelligence-marker" />
                    <div className="intelligence-content">
                      <span className="intelligence-meta">{buildItemMeta(item)}</span>
                      <strong>{item.title}</strong>
                    </div>
                    <span className="intelligence-type-badge">{titleCase(item.intelligenceType)}</span>
                  </a>
                )) : <div className="intelligence-empty">No ingested intelligence yet. Run Refresh Intelligence from Live Intelligence.</div>}
              </div>
            </article>

            <article className="panel activity-panel">
              <div className="panel-heading"><div><h2>Activity</h2><p>Platform overview</p></div></div>
              <div className="activity-item"><span className="activity-dot" /><div><strong>12 records updated</strong><p>Within the last seven days</p></div></div>
              <div className="activity-item"><span className="activity-dot" /><div><strong>5 reports available</strong><p>Country and regulatory briefings</p></div></div>
              <div className="activity-item"><span className="activity-dot" /><div><strong>18 verified sources</strong><p>Regulators and public agencies</p></div></div>
            </article>
          </section>

                    <section className="panel country-panel">
            <div className="panel-heading">
              <div>
                <h2>Global intelligence coverage</h2>
                <p>
                  Select a highlighted country or region to open its
                  intelligence portal.
                </p>
              </div>

              <Link href="/countries">View all countries</Link>
            </div>

            <div
              className="dashboard-map-shell"
              style={{
                overflow: "hidden",
                border: "1px solid #d9e0e7",
                borderRadius: "12px",
                background: "#f8fafc",
                position: "relative",
              }}
            >
              <object
                data="/maps/world.svg"
                type="image/svg+xml"
                aria-label="Interactive global intelligence coverage map"
                style={{
                  display: "block",
                  width: "100%",
                  minHeight: "480px",
                  border: 0,
                }}
              >
                Global intelligence map
              </object>
            </div>
          </section>
    </AppShell>
  );
}