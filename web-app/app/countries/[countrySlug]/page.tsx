import { notFound } from "next/navigation";
import Link from "next/link";
import AppShell from "../../../components/AppShell";
import { getSupportedCountryBySlug, supportedCountries } from "../../../lib/countries";
import { getRegulatoryGuideBySlug } from "../../../lib/regulatoryData";

function titleCase(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function generateStaticParams() {
  return supportedCountries
    .filter((country) => country.status === "placeholder")
    .map((country) => ({ countrySlug: country.slug }));
}

export default async function CountryPlaceholderPage(props: {
  params: Promise<{ countrySlug: string }>;
}) {
  const { countrySlug } = await props.params;
  const country = getSupportedCountryBySlug(countrySlug);
  const regulatoryGuide = getRegulatoryGuideBySlug(countrySlug);

  if (!country || country.status !== "placeholder") {
    notFound();
  }

  return (
    <AppShell
      activePath="/countries"
      eyebrow="COUNTRY INTELLIGENCE"
      title={country.name}
      description={`${country.name} intelligence profile coming next.`}
    >
      <section className="panel">
        <h2>{titleCase(country.slug)}</h2>
        <p>Intelligence profile coming next.</p>
      </section>

      {regulatoryGuide ? (
        <section className="panel" style={{ marginTop: "16px" }}>
          <div className="panel-heading" style={{ marginBottom: "12px" }}>
            <div>
              <h2>Regulatory Environment</h2>
              <p>Compact summary sourced from the shared regulations model.</p>
            </div>
            <Link href={`/regulations/${country.slug}`} className="secondary-button">View Full Regulatory Guide</Link>
          </div>

          <div className="reg-country-details">
            <p><strong>Regulator:</strong> {regulatoryGuide.regulator}</p>
            <p><strong>Primary framework:</strong> {regulatoryGuide.primaryFramework}</p>
            <p><strong>Regulatory model:</strong> {regulatoryGuide.regulatoryModel}</p>
            <p><strong>Advanced/BVLOS pathway:</strong> {regulatoryGuide.advancedBvlosPathway}</p>
            <p><strong>Last verified:</strong> {regulatoryGuide.lastVerified}</p>
          </div>
        </section>
      ) : null}
    </AppShell>
  );
}
