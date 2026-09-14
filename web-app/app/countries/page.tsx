import Link from "next/link";
import AppShell from "../../components/AppShell";
import { supportedCountries } from "../../lib/countries";

export default function CountriesPage() {
  return (
    <AppShell
      activePath="/countries"
      eyebrow="GLOBAL COVERAGE"
      title="Countries"
      description="Explore public-safety, regulatory and RPAS intelligence by country or region."
    >
      <section className="country-grid">
        {supportedCountries.map((country) => (
          <Link className="country-card" href={`/countries/${country.slug}`} key={country.name}>
            <div className="country-symbol">{country.code}</div>

            <div>
              <strong>{country.name}</strong>
              <span>View intelligence →</span>
            </div>
          </Link>
        ))}
      </section>
    </AppShell>
  );
}