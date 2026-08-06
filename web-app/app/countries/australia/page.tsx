import AppShell from "../../../components/AppShell";

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