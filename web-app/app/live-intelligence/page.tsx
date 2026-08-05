import AppShell from "../../components/AppShell";

const updates = [
  {
    headline: "CASA BVLOS guidance requires review",
    country: "Australia",
    category: "Regulation",
    impact: "Critical",
  },
  {
    headline: "Public-safety RPAS procurement identified",
    country: "Canada",
    category: "Procurement",
    impact: "High",
  },
  {
    headline: "New drone technology integration announced",
    country: "Global",
    category: "Technology",
    impact: "Medium",
  },
  {
    headline: "Government funding announced for emergency services",
    country: "United Kingdom",
    category: "Funding",
    impact: "High",
  },
];

export default function LiveIntelligencePage() {
  return (
    <AppShell
      activePath="/live-intelligence"
      eyebrow="GLOBAL INTELLIGENCE FEED"
      title="Live Intelligence"
      description="Regulatory, procurement, agency, funding and technology updates from trusted public sources."
    >
      <div style={{ display: "grid", gap: "14px" }}>
        {updates.map((update) => (
          <article
            className="panel"
            key={update.headline}
            style={{ borderLeft: "5px solid #0b2e59" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#2563eb",
                    fontSize: "12px",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {update.category} · {update.country}
                </p>

                <h2>{update.headline}</h2>

                <a href="#" style={{ color: "#2563eb", fontWeight: 700 }}>
                  View source →
                </a>
              </div>

              <span className="country-status">{update.impact}</span>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}