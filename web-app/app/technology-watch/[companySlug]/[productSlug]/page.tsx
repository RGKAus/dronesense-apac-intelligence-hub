import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "../../../../components/AppShell";
import {
  formatTechnologyCategoryLabel,
  getTechnologyCompanies,
  getTechnologyCompanyBySlug,
  getTechnologyIntelligenceForProduct,
  getTechnologyProductBySlug,
  getTechnologyTerminologyForProduct,
} from "../../../../lib/technologyWatchData";

type PageProps = {
  params: Promise<{
    companySlug: string;
    productSlug: string;
  }>;
};

export async function generateStaticParams() {
  const companies = getTechnologyCompanies();

  return companies.flatMap((company) => {
    const productSlugs = ["fusus", "axon-air", "axon-respond", "axon-evidence"];
    if (company.slug !== "axon") return [];
    return productSlugs.map((productSlug) => ({ companySlug: company.slug, productSlug }));
  });
}

export default async function TechnologyProductPage(props: PageProps) {
  const params = await props.params;
  const company = getTechnologyCompanyBySlug(params.companySlug);
  if (!company) {
    notFound();
  }

  const product = getTechnologyProductBySlug(params.companySlug, params.productSlug);

  if (!product) {
    notFound();
  }

  const terminology = getTechnologyTerminologyForProduct(product.id);
  const intelligence = getTechnologyIntelligenceForProduct(product.id);

  return (
    <AppShell
      activePath="/technology-watch"
      eyebrow="TECHNOLOGY PRODUCT PROFILE"
      title={product.name}
      description="Product reference profile for internal ecosystem understanding and training preparation."
    >
      <div className="breadcrumb">
        <Link href="/technology-watch">Technology Watch</Link>
        <span>/</span>
        <Link href={`/technology-watch/${params.companySlug}`}>{company.name}</Link>
        <span>/</span>
        <strong>{product.name}</strong>
      </div>

      <section className="panel techwatch-profile-section">
        <h2>WHAT IS IT?</h2>
        <p className="techwatch-source-note">Official Product Fact</p>
        <p>{product.overview}</p>
        <p className="techwatch-mini-meta">{formatTechnologyCategoryLabel(product.category)}</p>
      </section>

      <section className="panel techwatch-profile-section">
        <h2>WHAT DOES IT DO?</h2>
        <p className="techwatch-source-note">Official Product Fact</p>
        <p>{product.whatItDoes}</p>
      </section>

      <section className="panel techwatch-profile-section">
        <h2>HOW IS IT USED IN PUBLIC SAFETY?</h2>
        <p className="techwatch-source-note">Official Product Fact</p>
        <p>{product.publicSafetyUse}</p>
      </section>

      <section className="panel techwatch-profile-section">
        <h2>KEY CAPABILITIES</h2>
        {product.keyCapabilities.length ? (
          <ul className="market-inline-list">
            {product.keyCapabilities.map((capability, index) => (
              <li key={`${capability}-${index}`}>{capability}</li>
            ))}
          </ul>
        ) : (
          <p className="intelligence-empty">Product research has not yet been completed.</p>
        )}
      </section>

      <section className="panel techwatch-profile-section">
        <h2>HOW DOES IT RELATE TO DRONESENSE?</h2>
        <p className="techwatch-relationship-note">Verified DroneSense Relationship</p>
        <p>{product.relationshipToDroneSense}</p>
      </section>

      <section className="panel techwatch-profile-section">
        <h2>INTEGRATION DETAILS</h2>
        <p>{product.integrationDetails}</p>
      </section>

      <section className="panel techwatch-profile-section">
        <h2>WHAT DO I NEED TO KNOW FOR TRAINING?</h2>
        <p className="techwatch-training-note">Internal Training Notes</p>
        <ul className="market-inline-list">
          {product.trainingNotes.map((note, index) => (
            <li key={`${note}-${index}`}>{note}</li>
          ))}
        </ul>
      </section>

      <section className="panel techwatch-profile-section">
        <h2>TERMINOLOGY</h2>
        {terminology.length ? (
          <ul className="market-inline-list">
            {terminology.map((term) => (
              <li key={term.id}>
                <strong>{term.term}:</strong> {term.definition}
              </li>
            ))}
          </ul>
        ) : (
          <p className="intelligence-empty">Terminology research has not yet been completed.</p>
        )}
      </section>

      <section className="panel techwatch-profile-section">
        <h2>OFFICIAL SOURCES</h2>
        {product.officialSources.length ? (
          <div className="market-source-list">
            {product.officialSources.map((source, index) => (
              <article key={`${source.url}-${index}`}>
                <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>
                <p>{source.publisher}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="intelligence-empty">Official source references are pending verification.</p>
        )}
      </section>

      <section className="panel techwatch-profile-section">
        <h2>LATEST INTELLIGENCE</h2>
        {intelligence.length ? (
          <div className="intelligence-list">
            {intelligence.map((item) => (
              <article className="intelligence-row techwatch-intelligence-row" key={item.id}>
                <div className="intelligence-content">
                  <p className="intelligence-meta">{item.date}</p>
                  <strong>{item.headline}</strong>
                  <span>{item.summary}</span>
                  {item.sources.length ? (
                    <p className="techwatch-source-note">
                      Source: <a href={item.sources[0].url} target="_blank" rel="noreferrer">{item.sources[0].title}</a>
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="intelligence-empty">No verified technology intelligence is linked to this product yet.</p>
        )}
      </section>

      <section className="panel techwatch-profile-section">
        <h2>LAST VERIFIED</h2>
        <p>{product.lastVerified}</p>
      </section>
    </AppShell>
  );
}
