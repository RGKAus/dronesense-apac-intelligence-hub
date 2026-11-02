import type { Metadata } from "next";
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { versatermProducts } from "../../lib/versatermProducts";
import { getProductProfileHref } from "../../lib/versatermProductIntelligence";

export const metadata: Metadata = {
  title: "Versaterm Products",
  description: "Versaterm portfolio product intelligence and explicit research requirements.",
};

export default function VersatermProductsPage() {
  return (
    <AppShell activePath="/versaterm-products" eyebrow="PRODUCT PORTFOLIO" title="Versaterm Products" description="Explore product knowledge across the Versaterm portfolio. Evidence gaps are marked Research Required.">
      <div className="portfolio-stack">
        <section className="panel portfolio-stack">
          <h2>One portfolio, shared product identities</h2>
          <p>These are the same product identities used by Customers &amp; Opportunities. Inclusion does not establish customer usage, international availability, pricing or interoperability.</p>
        </section>
        <section className="portfolio-directory" aria-label="Versaterm product directory">
          {versatermProducts.map((product) => (
            <article key={product.id} className="panel portfolio-stack">
              <h2><Link href={getProductProfileHref(product.id)}>{product.name}</Link></h2>
              <span className="badge-early-access">Research Required</span>
              <p>Product intelligence awaiting reviewed primary sources. Last verified: Not yet verified.</p>
              <Link className="secondary-button" href={getProductProfileHref(product.id)}>Open {product.name} profile</Link>
            </article>
          ))}
        </section>
        <section className="panel portfolio-stack">
          <h2>Hardware remains under Technology Watch</h2>
          <p>Existing hardware records and their URLs are preserved. Hardware is not a separate Versaterm portfolio product.</p>
          <Link className="secondary-button" href="/technology-watch">Open Technology Watch</Link>
        </section>
      </div>
    </AppShell>
  );
}
