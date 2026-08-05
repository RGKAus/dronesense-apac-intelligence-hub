import AppShell from "../../components/AppShell";

const sectors = [
  {
    title: "Police",
    description:
      "Federal, state, provincial and local law-enforcement agencies.",
  },
  {
    title: "Fire & Rescue",
    description:
      "Urban fire, rescue, rural fire and civil-protection agencies.",
  },
  {
    title: "Emergency Management",
    description:
      "National, regional and local emergency-management organisations.",
  },
  {
    title: "Search & Rescue",
    description:
      "Maritime, aviation, volunteer and specialist rescue organisations.",
  },
  {
    title: "Critical Infrastructure",
    description:
      "Energy, transport, communications and essential-service operators.",
  },
  {
    title: "Government & Regulators",
    description:
      "Aviation regulators, government departments and supporting agencies.",
  },
];

export default function AgenciesPage() {
  return (
    <AppShell
      activePath="/agencies"
      eyebrow="GLOBAL AGENCY DIRECTORY"
      title="Agencies"
      description="Browse public-safety organisations by country, region and operational sector."
    >
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "18px",
        }}
      >
        {sectors.map((sector) => (
          <article className="panel" key={sector.title}>
            <h2>{sector.title}</h2>
            <p>{sector.description}</p>

            <span style={{ color: "#2563eb", fontWeight: 700 }}>
              View agencies →
            </span>
          </article>
        ))}
      </section>
    </AppShell>
  );
}