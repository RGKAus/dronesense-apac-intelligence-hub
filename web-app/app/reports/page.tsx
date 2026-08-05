import AppShell from "../../components/AppShell";

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
    description:
      "Comparison of the US, Australia, Canada, UK, EU and South Africa.",
  },
  {
    title: "Public-Safety Agency Landscape",
    description:
      "Overview of police, fire, emergency and supporting agencies.",
  },
];

export default function ReportsPage() {
  return (
    <AppShell
      activePath="/reports"
      eyebrow="REPORTS & PUBLICATIONS"
      title="Reports"
      description="Access country briefs, regulatory comparisons and public-safety intelligence reports."
    >
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "18px",
        }}
      >
        {reports.map((report) => (
          <article className="panel" key={report.title}>
            <p
              style={{
                color: "#2563eb",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              PDF REPORT
            </p>

            <h2>{report.title}</h2>
            <p>{report.description}</p>

            <button type="button" className="primary-button">
              Open prototype report
            </button>
          </article>
        ))}
      </section>
    </AppShell>
  );
}