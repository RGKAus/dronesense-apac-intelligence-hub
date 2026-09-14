import Link from "next/link";
import AppShell from "../../../components/AppShell";
import { getRegulatoryGuideBySlug } from "../../../lib/regulatoryData";
import { getAustraliaProcurementGuide } from "../../../lib/procurementData";
import { getHorizonLabel, getIntelligenceTypeLabel, getMarketEnvironmentItemsByCountry } from "../../../lib/marketEnvironmentData";

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
    description: "National and state emergency-management organisations.",
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

export default function AustraliaPage() {
  const regulatoryGuide = getRegulatoryGuideBySlug("australia");
  const procurementGuide = getAustraliaProcurementGuide();
  const marketItems = getMarketEnvironmentItemsByCountry("australia");
  const marketPreviewItems = marketItems.slice(0, 3);

  return (
    <AppShell
      activePath="/countries"
      eyebrow="COUNTRY INTELLIGENCE"
      title="Australia"
      description="Public-safety agencies, RPAS regulation, procurement activity and technology intelligence across Australia."
    >
      <section
        className="panel"
        style={{
          marginBottom: "20px",
          padding: "24px",
        }}
      >
        <div style={{ marginBottom: "18px" }}>
          <h2 style={{ marginBottom: "6px" }}>Explore by state or territory</h2>
          <p style={{ margin: 0, color: "#667085" }}>
            Select a region on the map to open its public-safety agency directory.
          </p>
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
            data="/maps/australia.svg"
            type="image/svg+xml"
            aria-label="Interactive map of Australian states and territories"
            style={{
              display: "block",
              width: "100%",
              minHeight: "520px",
              border: 0,
            }}
          >
            Australia map
          </object>
        </div>
      </section>

      {regulatoryGuide ? (
        <section className="panel" style={{ marginBottom: "20px" }}>
          <div className="panel-heading" style={{ marginBottom: "12px" }}>
            <div>
              <h2>Regulatory Environment</h2>
              <p>Compact summary sourced from the shared regulations model.</p>
            </div>
            <Link href="/regulations/australia" className="secondary-button">View Full Regulatory Guide</Link>
          </div>

          <div className="reg-country-details">
            <p><strong>Regulator:</strong> {regulatoryGuide.regulator}</p>
            <p><strong>Primary framework:</strong> {regulatoryGuide.primaryFramework}</p>
            <p><strong>Regulatory model:</strong> {regulatoryGuide.regulatoryModel}</p>
            <p><strong>Key terminology:</strong> {regulatoryGuide.terminology.join(", ")}</p>
            <p><strong>VLOS/advanced pathway:</strong> {regulatoryGuide.advancedBvlosPathway}</p>
            <p><strong>Last verified:</strong> {regulatoryGuide.lastVerified}</p>
          </div>
        </section>
      ) : null}

      {procurementGuide ? (
        <section className="panel" style={{ marginBottom: "20px" }}>
          <div className="panel-heading" style={{ marginBottom: "12px" }}>
            <div>
              <h2>Procurement Environment</h2>
              <p>Compact summary sourced from the shared procurement model.</p>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <Link href="/procurement/australia" className="secondary-button">View Procurement Guide</Link>
              <Link href="/regulations/australia" className="secondary-button">View Regulations</Link>
            </div>
          </div>

          <div className="reg-country-details">
            <p><strong>Framework:</strong> {procurementGuide.framework}</p>
            <p>
              <strong>Primary procurement portal:</strong>{" "}
              {procurementGuide.opportunityPortals[0] ? procurementGuide.opportunityPortals[0].name : "Being verified"}
            </p>
            <p><strong>High-level procurement model:</strong> {procurementGuide.procurementModel}</p>
            <p><strong>Last verified:</strong> {procurementGuide.lastVerified}</p>
          </div>
        </section>
      ) : null}

      <section className="panel" style={{ marginBottom: "20px" }}>
        <div className="panel-heading" style={{ marginBottom: "12px" }}>
          <div>
            <h2>Market Environment</h2>
            <p>Strategic funding, policy and priority signals sourced from the shared market-environment model.</p>
          </div>
          <Link href="/market-environment?country=australia" className="secondary-button">View Market Environment</Link>
        </div>

        {marketItems.length ? (
          <>
            <p className="reg-overview-note" style={{ marginTop: 0 }}>
              {marketItems.length} verified intelligence record{marketItems.length === 1 ? "" : "s"} currently mapped to Australia.
            </p>
            <div style={{ display: "grid", gap: "10px" }}>
              {marketPreviewItems.map((item) => (
                <article key={item.id} className="proc-mini-card">
                  <h3 style={{ marginTop: 0 }}>{item.headline}</h3>
                  <p><strong>Date:</strong> {item.date}</p>
                  <p><strong>Type:</strong> {getIntelligenceTypeLabel(item.type)}</p>
                  <p><strong>Horizon:</strong> {getHorizonLabel(item.opportunityHorizon)}</p>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="reg-verification-note" style={{ marginTop: 0 }}>No verified Market Environment intelligence recorded.</p>
        )}
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "18px",
        }}
      >
        {sectors.map((sector) => (
          <article className="panel" key={sector.title}>
            <h2>{sector.title}</h2>
            <p>{sector.description}</p>

            <span style={{ color: "#2563eb", fontWeight: 700 }}>
              {sector.count} →
            </span>
          </article>
        ))}
      </section>
    </AppShell>
  );
}