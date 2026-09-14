import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "../../../components/AppShell";
import {
  formatTechnologyCategoryLabel,
  formatTechnologyCompanyTypeLabel,
  formatTechnologyRelationshipLabel,
  getTechnologyCompanies,
  getTechnologyCompanyBySlug,
  getTechnologyIntelligenceForCompany,
  getTechnologyProductsForCompany,
  getTechnologyTerminologyForCompany,
} from "../../../lib/technologyWatchData";

type PageProps = {
  params: Promise<{
    companySlug: string;
  }>;
};

export async function generateStaticParams() {
  return getTechnologyCompanies().map((company) => ({ companySlug: company.slug }));
}

export default async function TechnologyCompanyPage(props: PageProps) {
  const params = await props.params;
  const company = getTechnologyCompanyBySlug(params.companySlug);

  if (!company) {
    notFound();
  }

  const products = getTechnologyProductsForCompany(company.id);
  const terminology = getTechnologyTerminologyForCompany(company.id);
  const intelligence = getTechnologyIntelligenceForCompany(company.id);

  return (
    <AppShell
      activePath="/technology-watch"
      eyebrow="TECHNOLOGY ECOSYSTEM"
      title={company.name}
      description="Company reference profile for internal technology intelligence and training context."
    >
      <div className="breadcrumb">
        <Link href="/technology-watch">Technology Watch</Link>
        <span>/</span>
        <strong>{company.name}</strong>
      </div>

      <section className="panel techwatch-profile-section">
        <h2>OVERVIEW</h2>
        <p>{company.overview}</p>
        <div className="techwatch-company-meta">
          <span>{formatTechnologyCompanyTypeLabel(company.companyType)}</span>
          <span>Confidence: {company.confidence.replace("-", " ")}</span>
        </div>
      </section>

      <section className="panel techwatch-profile-section">
        <h2>DRONESENSE RELATIONSHIP</h2>
        <div className="techwatch-badge-row">
          {company.relationshipTypes.map((relationship) => (
            <span className="badge-verified" key={relationship}>{formatTechnologyRelationshipLabel(relationship)}</span>
          ))}
        </div>
        <p>{company.relationshipSummary}</p>
      </section>

      <section className="panel techwatch-profile-section">
        <h2>RELEVANT PRODUCTS</h2>
        {products.length ? (
          <div className="techwatch-product-grid">
            {products.map((product) => (
              <article className="techwatch-product-card" key={product.id}>
                <h3>{product.name}</h3>
                <p>{product.overview}</p>
                <p className="techwatch-mini-meta">{formatTechnologyCategoryLabel(product.category)}</p>
                <Link className="secondary-button" href={`/technology-watch/${company.slug}/${product.slug}`}>
                  View Product
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="intelligence-empty">Product research has not yet been completed.</p>
        )}
      </section>

      <section className="panel techwatch-profile-section">
        <h2>INTEGRATIONS / INTEROPERABILITY</h2>
        <p>{company.integrationSummary}</p>
      </section>

      <section className="panel techwatch-profile-section">
        <h2>KEY TERMINOLOGY</h2>
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
        <h2>TRAINING / WHAT TO KNOW</h2>
        <p className="techwatch-training-note">Internal Training Note</p>
        <p className="techwatch-training-block">{company.trainingSummary}</p>
      </section>

      <section className="panel techwatch-profile-section">
        <h2>LATEST INTELLIGENCE</h2>
        {intelligence.length ? (
          <div className="intelligence-list">
            {intelligence.map((item) => (
              <article className="intelligence-row techwatch-intelligence-row" key={item.id}>
                <div className="intelligence-content">
                  <p className="intelligence-meta">{item.date} • {item.impactType.replace(/-/g, " ")}</p>
                  <strong>{item.headline}</strong>
                  <span>{item.summary}</span>
                  <p className="techwatch-impact-note">
                    <strong>Why This Matters:</strong> {item.whyItMatters}
                  </p>
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
          <p className="intelligence-empty">No verified technology intelligence is linked to this company yet.</p>
        )}
      </section>

      <section className="panel techwatch-profile-section">
        <h2>OFFICIAL SOURCES</h2>
        {company.officialSources.length ? (
          <div className="market-source-list">
            {company.officialSources.map((source, index) => (
              <article key={`${source.url}-${index}`}>
                <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>
                <p>{source.publisher} • {source.sourceType.replace(/-/g, " ")}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="intelligence-empty">Official source references are pending verification.</p>
        )}
      </section>

      <section className="panel techwatch-profile-section">
        <h2>LAST VERIFIED</h2>
        <p>{company.lastVerified}</p>
      </section>
    </AppShell>
  );
}
