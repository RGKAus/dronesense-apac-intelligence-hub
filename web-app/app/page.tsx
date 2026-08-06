import Link from "next/link";
import { logout } from "./logout/actions";

const navigation = [
  { label: "Dashboard", href: "/" },
  { label: "Live Intelligence", href: "/live-intelligence" },
  { label: "Countries", href: "/countries" },
  { label: "Agencies", href: "/agencies" },
  { label: "Regulations", href: "/regulations" },
  { label: "Procurement", href: "/procurement" },
  { label: "Technology Watch", href: "/technology-watch" },
  { label: "Reports", href: "/reports" },
];

const intelligence = [
  { headline: "CASA publishes updated BVLOS guidance", country: "Australia", impact: "Critical", impactClass: "critical" },
  { headline: "New police drone procurement announced", country: "Canada", impact: "High", impactClass: "high" },
  { headline: "EASA issues operational update", country: "European Union", impact: "Medium", impactClass: "medium" },
];

const countries = ["Australia", "Canada", "United Kingdom", "European Union", "South Africa"];

export default function Home() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">DS</div>
          <div>
            <p className="brand-name">Versaterm DroneSense</p>
            <p className="brand-subtitle">Intelligence Platform</p>
          </div>
        </div>

        <nav className="navigation">
          {navigation.map((item, index) => (
            <Link
              href={item.href}
              className={index === 0 ? "nav-item active" : "nav-item"}
              key={item.label}
            >
              <span className="nav-symbol">{index + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <a href="#" className="nav-item">
            <span className="nav-symbol">A</span>
            Administration
          </a>
          <p>Platform v2.0</p>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="mobile-brand">DS Intelligence</div>

          <div className="search-box">
            <span>⌕</span>
            <input type="search" placeholder="Search intelligence, agencies and regulations" />
          </div>

          <div
  className="user-profile"
  style={{ display: "flex", alignItems: "center", gap: "16px" }}
>
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <div className="user-avatar">RG</div>

    <div>
      <strong>Rachael</strong>
      <span>Administrator</span>
    </div>
  </div>

  <form action={logout}>
    <button
      type="submit"
      style={{
        padding: "8px 14px",
        borderRadius: "8px",
        border: "1px solid #d0d5dd",
        background: "#ffffff",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      Log out
    </button>
  </form>
</div>
        </header>

        <div className="content">
          <section className="page-heading">
            <div>
              <p className="eyebrow">GLOBAL RPAS INTELLIGENCE</p>
              <h1>Dashboard</h1>
              <p>Public safety, regulatory and market intelligence across global RPAS operations.</p>
            </div>
            <button className="primary-button">+ Add intelligence</button>
          </section>

          <section className="metric-grid">
            <article className="metric-card">
              <div className="metric-top"><span>Critical intelligence</span><span className="metric-icon">!</span></div>
              <strong>4</strong><p>Two new updates today</p>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span>New procurements</span><span className="metric-icon">P</span></div>
              <strong>6</strong><p>Across three countries</p>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span>Regulatory changes</span><span className="metric-icon">R</span></div>
              <strong>3</strong><p>Requiring review</p>
            </article>
            <article className="metric-card">
              <div className="metric-top"><span>Countries covered</span><span className="metric-icon">G</span></div>
              <strong>5</strong><p>Global expansion underway</p>
            </article>
          </section>

          <section className="dashboard-grid">
            <article className="panel intelligence-panel">
              <div className="panel-heading">
                <div><h2>Latest intelligence</h2><p>Recent developments requiring attention</p></div>
                <a href="#">View all</a>
              </div>

              <div className="intelligence-list">
                {intelligence.map((item) => (
                  <div className="intelligence-row" key={item.headline}>
                    <div className="intelligence-marker" />
                    <div className="intelligence-content"><strong>{item.headline}</strong><span>{item.country}</span></div>
                    <span className={`impact ${item.impactClass}`}>{item.impact}</span>
                  </div>
                ))}
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
              style={{
                overflow: "hidden",
                border: "1px solid #d9e0e7",
                borderRadius: "12px",
                background: "#f8fafc",
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
        </div>
      </main>
    </div>
  );
}