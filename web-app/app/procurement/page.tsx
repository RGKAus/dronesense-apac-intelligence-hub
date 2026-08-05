import AppShell from "../../components/AppShell";

const opportunities = [
  {
    title: "Public-safety RPAS capability",
    country: "Australia",
    organisation: "Example government agency",
    stage: "Open",
  },
  {
    title: "Drone programme support services",
    country: "Canada",
    organisation: "Example police service",
    stage: "Market research",
  },
  {
    title: "Remote aviation technology",
    country: "United Kingdom",
    organisation: "Example emergency service",
    stage: "Upcoming",
  },
];

export default function ProcurementPage() {
  return (
    <AppShell
      activePath="/procurement"
      eyebrow="COMMERCIAL INTELLIGENCE"
      title="Procurement"
      description="Track public-sector tenders, market research, contract awards and upcoming procurement activity."
    >
      <div style={{ display: "grid", gap: "14px" }}>
        {opportunities.map((item) => (
          <article className="panel" key={item.title}>
            <p
              style={{
                color: "#2563eb",
                fontSize: "12px",
                fontWeight: 700,
                margin: 0,
              }}
            >
              {item.country}
            </p>

            <h2>{item.title}</h2>
            <p>{item.organisation}</p>

            <span className="country-status">{item.stage}</span>
          </article>
        ))}
      </div>

      <p style={{ color: "#667085", fontSize: "12px", marginTop: "24px" }}>
        Prototype records shown for demonstration purposes.
      </p>
    </AppShell>
  );
}