import Link from "next/link";

const reports = [
  {
    title: "Australia RPAS Regulatory Overview",
    description: "Country-level requirements, approvals and BVLOS pathways.",
  },
  {
    title: "Canada DFR and BVLOS Brief",
    description: "Routine operating pathways, Level 1 Complex and SFOC use.",
  },
  {
    title: "Global Regulatory Comparison",
    description: "Comparison of the US, Australia, Canada, UK, EU and South Africa.",
  },
  {
    title: "Public-Safety Agency Landscape",
    description: "Overview of police, fire, emergency and supporting agencies.",
  },
];

export default function ReportsPage() {
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
          REPORTS & PUBLICATIONS
        </p>

        <h1 style={{ color: "#0b2e59", fontSize: "36px", marginBottom: "10px" }}>
          Reports
        </h1>

        <p style={{ color: "#667085", maxWidth: "750px", lineHeight: 1.6 }}>
          Access country briefs, regulatory comparisons and public-safety
          intelligence reports.
        </p>
      </div>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "18px",
        }}
      >
        {reports.map((report) => (
          <article
            key={report.title}
            style={{
              background: "#ffffff",
              border: "1px solid #d9e0e7",
              borderRadius: "12px",
              padding: "22px",
            }}
          >
            <p
              style={{
                color: "#2563eb",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              PDF REPORT
            </p>

            <h2 style={{ color: "#0b2e59", fontSize: "18px" }}>
              {report.title}
            </h2>

            <p style={{ color: "#667085", lineHeight: 1.6 }}>
              {report.description}
            </p>

            <button
              type="button"
              style={{
                background: "#0b2e59",
                border: 0,
                borderRadius: "8px",
                color: "#ffffff",
                cursor: "pointer",
                fontWeight: 700,
                padding: "10px 14px",
              }}
            >
              Open prototype report
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}