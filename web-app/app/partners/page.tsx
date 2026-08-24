import AppShell from "../../components/AppShell";
import PartnerCard from "../../components/PartnerCard";

const partners = [
  { name: "PSTR Group", code: "PSTR", href: "/partners/pstr-group", subtitle: "Engaged", status: "Engaged" },
];

export default function PartnersPage() {
  return (
    <AppShell
      activePath="/partners"
      eyebrow="PARTNERS & RELATIONSHIPS"
      title="Partners"
      description="Current and potential partner organisations, integration and strategic relationships."
    >
      <section className="country-grid">
        {partners.map((p) => (
          <PartnerCard key={p.name} name={p.name} code={p.code} href={p.href} subtitle={p.subtitle} status={p.status} />
        ))}
      </section>
    </AppShell>
  );
}
