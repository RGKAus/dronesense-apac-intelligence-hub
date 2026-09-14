import {
  formatFunding,
  getConfidenceLabel,
  getHorizonLabel,
  getIntelligenceTypeLabel,
  getSectorLabel,
  type MarketEnvironmentItem,
} from "../lib/marketEnvironmentData";

export default function MarketEnvironmentCard({ item }: { item: MarketEnvironmentItem }) {
  return (
    <article className="panel market-card">
      <div className="market-card-header">
        <span className="country-status">{getIntelligenceTypeLabel(item.type)}</span>
        <span className={`market-confidence market-confidence-${item.confidence}`}>{getConfidenceLabel(item.confidence)}</span>
      </div>

      <h3>{item.headline}</h3>

      <div className="market-meta-grid">
        <p><strong>Date:</strong> {item.date}</p>
        <p>
          <strong>Country / Region:</strong> {item.country}
          {item.region ? ` / ${item.region}` : ""}
        </p>
        <p><strong>Sector:</strong> {getSectorLabel(item.sector)}</p>
        <p><strong>Opportunity Horizon:</strong> {getHorizonLabel(item.opportunityHorizon)}</p>
      </div>

      <p className="market-summary">{item.summary}</p>

      {item.funding ? (
        <div className="market-funding">
          <span>Funding Signal</span>
          <strong>{formatFunding(item.funding)}</strong>
          {item.funding.note ? <p>{item.funding.note}</p> : null}
        </div>
      ) : null}

      <details className="market-details">
        <summary>View Intelligence Detail</summary>
        <div className="market-details-grid">
          <section>
            <h4>WHAT CHANGED</h4>
            <p>{item.whatChanged}</p>
          </section>

          <section>
            <h4>WHY THIS MATTERS</h4>
            <p>{item.commercialRelevance}</p>
          </section>

          <section>
            <h4>DRONESENSE RELEVANCE</h4>
            <p>{item.droneSenseRelevance}</p>
          </section>

          {item.affectedAgencies.length ? (
            <section>
              <h4>AFFECTED AGENCIES</h4>
              <ul className="market-inline-list">
                {item.affectedAgencies.map((agency) => (
                  <li key={agency}>{agency}</li>
                ))}
              </ul>
            </section>
          ) : null}

          <section>
            <h4>FUNDING / PROGRAM</h4>
            <p>{item.governmentOrProgram ?? "No specific program label or direct funding amount stated in this record."}</p>
          </section>

          <section>
            <h4>SOURCES</h4>
            {item.sources.length ? (
              <div className="market-source-list">
                {item.sources.map((source) => (
                  <article key={`${item.id}-${source.title}`}>
                    <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>
                    <p>
                      {source.publisher} · {source.sourceType}
                      {source.publicationDate ? ` · Published ${source.publicationDate}` : ""}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p>No sources recorded.</p>
            )}
          </section>

          <section>
            <h4>LAST VERIFIED</h4>
            <p>{item.lastVerified}</p>
          </section>
        </div>
      </details>
    </article>
  );
}
