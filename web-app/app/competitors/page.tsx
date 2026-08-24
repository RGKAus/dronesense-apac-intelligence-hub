import AppShell from "../../components/AppShell";
import CompetitorCard from "../../components/CompetitorCard";

const competitors = [
  { name: "AVCRM", code: "AV", href: "/competitors/avcrm", subtitle: "Unverified" },
  { name: "Sphere Drones", code: "SP", href: "/competitors/sphere-drones", subtitle: "Unverified" },
];

export default function CompetitorsPage() {
  return (
    <AppShell
      activePath="/competitors"
      eyebrow="COMPETITOR WATCH"
      title="Competitors"
      description="Profiles and competitive intelligence for organisations operating in the RPAS market."
    >
      <section className="country-grid">
        {competitors.map((c) => (
          <CompetitorCard key={c.name} name={c.name} code={c.code} href={c.href} subtitle={c.subtitle} />
        ))}
      </section>
    </AppShell>
  );
}
