import Link from "next/link";

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
    <main style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <Link href="/">← Back to dashboard</Link>

      <div style={{ marginTop: "24px", marginBottom: "32px" }}>
        <p
          style={{
            color: "#2563eb",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          GLOBAL INTELLIGENCE FEED
        </p>

        <h1 style={{ color: "#0b2e59", fontSize: "36px", marginBottom: "10px" }}>
          Live Intelligence
        </h1>

        <p style={{ color: "#667085", maxWidth: "750px", lineHeight: 1.6 }}>
          Regulatory, procurement, agency, funding and technology updates from
          trusted public sources.
        </p>
      </div>

      <div style={{ display: "grid", gap: "14px" }}>
        {updates.map((update) => (
          <article
            key={update.headline}
            style={{
              background: "#ffffff",
              border: "1px solid #d9e0e7",
              borderLeft: "5px solid #0b2e59",
              borderRadius: "10px",
              padding: "20px",
            }}
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

                <h2
                  style={{
                    color: "#27313d",
                    fontSize: "18px",
                    marginBottom: "8px",
                  }}
                >
                  {update.headline}
                </h2>

                <a href="#" style={{ color: "#2563eb", fontWeight: 700 }}>
                  View source →
                </a>
              </div>

              <span
                style={{
                  alignSelf: "flex-start",
                  background: "#eef4fb",
                  borderRadius: "999px",
                  color: "#0b2e59",
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "7px 10px",
                }}
              >
                {update.impact}
              </span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}