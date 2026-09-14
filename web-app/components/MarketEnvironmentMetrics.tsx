import type { MarketEnvironmentMetrics as Metrics } from "../lib/marketEnvironmentData";

export default function MarketEnvironmentMetrics({ metrics }: { metrics: Metrics }) {
  return (
    <section className="market-metric-grid" aria-label="Market Environment metrics">
      <article className="metric-card market-metric-card">
        <div className="metric-top">
          <span>Active Intelligence</span>
          <span className="metric-icon">ME</span>
        </div>
        <strong>{metrics.activeIntelligence}</strong>
        <p>Records currently marked active.</p>
      </article>

      <article className="metric-card market-metric-card">
        <div className="metric-top">
          <span>Funding &amp; Budget</span>
          <span className="metric-icon">FB</span>
        </div>
        <strong>{metrics.fundingAndBudget}</strong>
        <p>Items tagged as Budget &amp; Funding.</p>
      </article>

      <article className="metric-card market-metric-card">
        <div className="metric-top">
          <span>Policy / Government</span>
          <span className="metric-icon">PG</span>
        </div>
        <strong>{metrics.policyAndGovernment}</strong>
        <p>Policy, priority or portfolio-change items.</p>
      </article>

      <article className="metric-card market-metric-card">
        <div className="metric-top">
          <span>Near-term Opportunities</span>
          <span className="metric-icon">NT</span>
        </div>
        <strong>{metrics.nearTermOpportunities}</strong>
        <p>Items with Near-term opportunity horizon.</p>
      </article>
    </section>
  );
}
