import Link from "next/link";

const sectors = [
  {
    title: "Police",
    description: "Federal, state and territory policing agencies.",
    count: "10 agencies",
  },
  {
    title: "Fire & Rescue",
    description: "Urban fire, rescue and rural fire services.",
    count: "18 agencies",
  },
  {
    title: "Emergency Management",
    description: "National and state emergency management organisations.",
    count: "9 agencies",
  },
  {
    title: "Search & Rescue",
    description: "Aeromedical, maritime and volunteer response organisations.",
    count: "12 organisations",
  },
  {
    title: "Critical Infrastructure",
    description: "Energy, transport, resources and essential services.",
    count: "14 sectors",
  },
  {
    title: "Government & Regulators",
    description: "Aviation, communications, weather and federal departments.",
    count: "8 organisations",
  },
];

const updates = [
  {
    title: "CASA BVLOS pathway and AusSORA",
    category: "Regulation",
    status: "Priority",
  },
  {
    title: "Public safety DFR adoption remains regulation-led",
    category: "Market intelligence",
    status: "Active",
  },
  {
    title: "Australian-hosted platform environment available",
    category: "Technology",
    status: "Verified",
  },
];

export default function AustraliaPage() {
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
          <Link href="/" className="nav-item">
            <span className="nav-symbol">1</span>
            Dashboard
          </Link>
          <a href="#" className="nav-item">
            <span className="nav-symbol">2</span>
            Live Intelligence
          </a>
          <a href="#" className="nav-item active">
            <span className="nav-symbol">3</span>
            Countries
          </a>
          <a href="#" className="nav-item">
            <span className="nav-symbol">4</span>
            Agencies
          </a>
          <a href="#" className="nav-item">
            <span className="nav-symbol">5</span>
            Regulations
          </a>
          <a href="#" className="nav-item">
            <span className="nav-symbol">6</span>
            Procurement
          </a>
          <a href="#" className="nav-item">
            <span className="nav-symbol">7</span>
            Technology Watch
          </a>
          <a href="#" className="nav-item">
            <span className="nav-symbol">8</span>
            Reports
          </a>
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
            <input
              type="search"
              placeholder="Search Australian intelligence and agencies"
            />
          </div>

          <div className="user-profile">
            <div className="user-avatar">RG</div>
            <div>
              <strong>Rachael</strong>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        <div className="content">
          <div className="breadcrumb">
            <Link href="/">Dashboard</Link>
            <span>›</span>
            <span>Countries</span>
            <span>›</span>
            <strong>Australia</strong>
          </div>

          <section className="country-hero">
            <div className="country-hero-code">AU</div>

            <div className="country-hero-copy">
              <p className="eyebrow">COUNTRY INTELLIGENCE</p>
              <h1>Australia</h1>
              <p>
                Public safety agencies, RPAS regulation, procurement activity
                and technology intelligence across Australia.
              </p>
            </div>

            <button className="primary-button">Generate country brief</button>
          </section>

          <section className="metric-grid">
            <article className="metric-card">
              <div className="metric-top">
                <span>Agencies profiled</span>
                <span className="metric-icon">A</span>
              </div>
              <strong>57</strong>
              <p>Federal, state and territory coverage</p>
            </article>

            <article className="metric-card">
              <div className="metric-top">
                <span>Regulatory items</span>
                <span className="metric-icon">R</span>
              </div>
              <strong>14</strong>
              <p>Including BVLOS and DFR pathways</p>
            </article>

            <article className="metric-card">
              <div className="metric-top">
                <span>Active procurements</span>
                <span className="metric-icon">P</span>
              </div>
              <strong>6</strong>
              <p>Across public safety and infrastructure</p>
            </article>

            <article className="metric-card">
              <div className="metric-top">
                <span>Verified sources</span>
                <span className="metric-icon">S</span>
              </div>
              <strong>24</strong>
              <p>Regulators, agencies and government</p>
            </article>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>Public safety landscape</h2>
                <p>Explore Australia by operational sector</p>
              </div>
            </div>

            <div className="sector-grid">
              {sectors.map((sector) => (
                <a href="#" className="sector-card" key={sector.title}>
                  <div>
                    <strong>{sector.title}</strong>
                    <p>{sector.description}</p>
                  </div>
                  <span>{sector.count} →</span>
                </a>
              ))}
            </div>
          </section>

          <section className="country-lower-grid">
            <article className="panel">
              <div className="panel-heading">
                <div>
                  <h2>Latest Australian intelligence</h2>
                  <p>Priority developments and verified updates</p>
                </div>
                <a href="#">View all</a>
              </div>

              <div className="intelligence-list">
                {updates.map((update) => (
                  <div className="intelligence-row" key={update.title}>
                    <div className="intelligence-marker" />
                    <div className="intelligence-content">
                      <strong>{update.title}</strong>
                      <span>{update.category}</span>
                    </div>
                    <span className="country-status">{update.status}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel quick-links-panel">
              <div className="panel-heading">
                <div>
                  <h2>Country resources</h2>
                  <p>Key sections for Australia</p>
                </div>
              </div>

              <a href="#">Regulatory requirements <span>→</span></a>
              <a href="#">BVLOS and DFR overview <span>→</span></a>
              <a href="#">Agency directory <span>→</span></a>
              <a href="#">State and territory map <span>→</span></a>
              <a href="#">Reports and publications <span>→</span></a>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}
