import Link from "next/link";
import AppShell from "../../components/AppShell";

const countries = [
  {
    name: "United States",
    code: "US",
    href: "#",
  },
  {
    name: "Australia",
    code: "AU",
    href: "/countries/australia",
  },
  {
    name: "Canada",
    code: "CA",
    href: "#",
  },
  {
    name: "United Kingdom",
    code: "UK",
    href: "#",
  },
  {
    name: "European Union",
    code: "EU",
    href: "#",
  },
  {
    name: "South Africa",
    code: "ZA",
    href: "#",
  },
];

export default function CountriesPage() {
  return (
    <AppShell
      activePath="/countries"
      eyebrow="GLOBAL COVERAGE"
      title="Countries"
      description="Explore public-safety, regulatory and RPAS intelligence by country or region."
    >
      <section className="country-grid">
        {countries.map((country) => (
          <Link className="country-card" href={country.href} key={country.name}>
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