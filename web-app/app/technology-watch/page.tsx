import AppShell from "../../components/AppShell";

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
    <AppShell
      activePath="/technology-watch"
      eyebrow="TECHNOLOGY INTELLIGENCE"
      title="Technology Watch"
      description="Monitor aircraft, software, autonomy, communications and integration developments relevant to public-safety RPAS programmes."
    >
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "18px",
        }}
      >
        {technologies.map((technology) => (
          <article className="panel" key={technology.company}>
            <p
              style={{
                color: "#2563eb",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              {technology.area}
            </p>

            <h2>{technology.company}</h2>
            <p>{technology.update}</p>

            <span style={{ color: "#2563eb", fontWeight: 700 }}>
              View technology profile →
            </span>
          </article>
        ))}
      </section>
    </AppShell>
  );
}