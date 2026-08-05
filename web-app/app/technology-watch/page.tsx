import Link from "next/link";

const technologies = [
  {
    company: "DroneSense",
    area: "Public-safety drone operations",
    update: "Platform capability and integration monitoring",
  },
  {
    company: "DJI",
    area: "Aircraft, docks and SDKs",
    update: "Enterprise aircraft and software developments",
  },
  {
    company: "Skydio",
    area: "Autonomous flight and remote operations",
    update: "Public-safety and DFR programme developments",
  },
  {
    company: "Esri",
    area: "Mapping and geospatial intelligence",
    update: "ArcGIS integrations and public-safety workflows",
  },
  {
    company: "OneSky",
    area: "UTM and airspace management",
    update: "Traffic management and BVLOS-enablement developments",
  },
  {
    company: "Flyability",
    area: "Confined-space inspection",
    update: "Emergency response and critical-infrastructure use cases",
  },
];

export default function TechnologyWatchPage() {
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
          TECHNOLOGY INTELLIGENCE
        </p>

        <h1 style={{ color: "#0b2e59", fontSize: "36px", marginBottom: "10px" }}>
          Technology Watch
        </h1>

        <p style={{ color: "#667085", maxWidth: "750px", lineHeight: 1.6 }}>
          Monitor aircraft, software, autonomy, communications and integration
          developments relevant to public-safety RPAS programmes.
        </p>
      </div>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "18px",
        }}
      >
        {technologies.map((technology) => (
          <article
            key={technology.company}
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
              {technology.area}
            </p>

            <h2 style={{ color: "#0b2e59", fontSize: "20px" }}>
              {technology.company}
            </h2>

            <p style={{ color: "#667085", lineHeight: 1.6 }}>
              {technology.update}
            </p>

            <span style={{ color: "#2563eb", fontWeight: 700 }}>
              View technology profile →
            </span>
          </article>
        ))}
      </section>
    </main>
  );
}