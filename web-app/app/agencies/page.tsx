import Link from "next/link";

const sectors = [
  {
    title: "Police",
    description: "Federal, state, provincial and local law-enforcement agencies.",
  },
  {
    title: "Fire & Rescue",
    description: "Urban fire, rescue, rural fire and civil-protection agencies.",
  },
  {
    title: "Emergency Management",
    description: "National, regional and local emergency-management organisations.",
  },
  {
    title: "Search & Rescue",
    description: "Maritime, aviation, volunteer and specialist rescue organisations.",
  },
  {
    title: "Critical Infrastructure",
    description: "Energy, transport, communications and essential-service operators.",
  },
  {
    title: "Government & Regulators",
    description: "Aviation regulators, government departments and supporting agencies.",
  },
];

export default function AgenciesPage() {
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
          GLOBAL AGENCY DIRECTORY
        </p>

        <h1 style={{ color: "#0b2e59", fontSize: "36px", marginBottom: "10px" }}>
          Agencies
        </h1>

        <p style={{ color: "#667085", maxWidth: "700px", lineHeight: 1.6 }}>
          Browse public-safety organisations by country, region and operational
          sector.
        </p>
      </div>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "18px",
        }}
      >
        {sectors.map((sector) => (
          <article
            key={sector.title}
            style={{
              background: "#ffffff",
              border: "1px solid #d9e0e7",
              borderRadius: "12px",
              padding: "22px",
            }}
          >
            <h2 style={{ color: "#0b2e59", fontSize: "18px" }}>
              {sector.title}
            </h2>

            <p style={{ color: "#667085", lineHeight: 1.6 }}>
              {sector.description}
            </p>

            <span style={{ color: "#2563eb", fontWeight: 700 }}>
              View agencies →
            </span>
          </article>
        ))}
      </section>
    </main>
  );
}