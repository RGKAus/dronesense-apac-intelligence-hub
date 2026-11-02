import Link from "next/link";
import AppShell from "./AppShell";
import {
  productIntelligenceSections, type ProductIntelligenceProfile,
} from "../lib/versatermProductIntelligence";

export default function VersatermProductProfile({ profile }: { profile: ProductIntelligenceProfile }) {
  const { product, sections, sources } = profile;
  const sourceMap = new Map(sources.map((source) => [source.id, source]));
  return (
    <AppShell
      activePath="/versaterm-products"
      eyebrow="VERSATERM PRODUCT INTELLIGENCE"
      title={product.name}
      description="Evidence-led product knowledge, market considerations and research requirements."
    >
      <div className="portfolio-stack">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/versaterm-products">Versaterm Products</Link><span>/</span><strong>{product.name}</strong>
        </nav>
        <section className="panel portfolio-stack" aria-labelledby="product-verification">
          <div className="portfolio-row">
            <h2 id="product-verification">Last verified / research required</h2>
            <span className="badge-early-access">Research Required</span>
          </div>
          <p>Last verified: {profile.lastVerified ?? "Not yet verified"}</p>
          <p>This profile establishes product identity only. Capabilities, pricing, integrations and international availability are not asserted until supported by reviewed sources. A missing fact is not evidence that a capability or market presence is absent.</p>
        </section>
        <nav className="portfolio-section-links" aria-label="Product profile sections">
          {productIntelligenceSections.map((section) => <a key={section.id} href={`#product-${section.id}`}>{section.title}</a>)}
          <a href="#product-sources">Supporting documents and source references</a>
        </nav>
        {productIntelligenceSections.map((section) => (
          <section className="panel portfolio-stack" id={`product-${section.id}`} key={section.id} aria-labelledby={`product-${section.id}-heading`}>
            <h2 id={`product-${section.id}-heading`}>{section.title}</h2>
            {sections[section.id].length ? sections[section.id].map((claim, index) => (
              <div className="portfolio-stack" key={index}>
                <p>{claim.text}</p>
                <p className="portfolio-muted">Last verified: {claim.lastVerified}</p>
                <ul className="sources-list">
                  {claim.sourceIds.map((id) => {
                    const source = sourceMap.get(id);
                    return <li key={id}>{source ? <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} - {source.publisher}</a> : "Source reference missing - Research Required"}</li>;
                  })}
                </ul>
              </div>
            )) : <><strong className="portfolio-research">Research Required</strong><p>{section.research}</p></>}
          </section>
        ))}
        <section className="panel portfolio-stack" id="product-sources" aria-labelledby="product-sources-heading">
          <h2 id="product-sources-heading">Supporting documents and source references</h2>
          {sources.length ? <ul className="sources-list">{sources.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} - {source.publisher}</a></li>)}</ul> : <p>Research Required - no reviewed product-specific documents or source references have been attached.</p>}
          <p>Use official product documentation and primary sources before adding claims. Internal documents remain subject to the existing document-library access controls.</p>
          <Link className="secondary-button" href="/documents">Open document library</Link>
        </section>
        {product.id === "dronesense" && (
          <section className="panel portfolio-stack">
            <h2>Existing specialist intelligence</h2>
            <p>Existing Technology Watch and hardware records remain separate canonical resources. These links do not establish portfolio-wide compatibility or current availability.</p>
            <div className="portfolio-row">
              <Link className="secondary-button" href="/technology-watch">Technology Watch</Link>
              <Link className="secondary-button" href="/hardware">Hardware intelligence</Link>
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
