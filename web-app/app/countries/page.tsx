import Link from "next/link";

export default function CountriesPage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Countries</h1>

      <p>Explore public safety and RPAS intelligence by country.</p>

      <ul>
        <li>
          <Link href="/countries/australia">Australia</Link>
        </li>
        <li>United States — prototype page coming next</li>
        <li>Canada — prototype page coming next</li>
        <li>United Kingdom — prototype page coming next</li>
        <li>European Union — prototype page coming next</li>
        <li>South Africa — prototype page coming next</li>
      </ul>
    </main>
  );
}