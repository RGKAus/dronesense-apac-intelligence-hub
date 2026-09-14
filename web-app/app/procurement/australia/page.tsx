import Link from "next/link";
import AppShell from "../../../components/AppShell";
import ProcurementLifecycle from "../../../components/ProcurementLifecycle";
import ProcurementWhyThisMatters from "../../../components/ProcurementWhyThisMatters";
import AustraliaProcurementSwitcher from "../../../components/AustraliaProcurementSwitcher";
import {
  getAustraliaProcurementGuide,
  getCommonwealthProcurementGuide,
  getWesternAustraliaProcurementGuide,
  listAustralianProcurementStates,
  listAustralianStateProcurementGuides,
  listProcurementWhyThisMattersPrompts,
} from "../../../lib/procurementData";

export default function AustraliaProcurementGuidePage() {
  const guide = getAustraliaProcurementGuide();
  const commonwealth = getCommonwealthProcurementGuide();
  const westernAustralia = getWesternAustraliaProcurementGuide();
  const states = listAustralianProcurementStates();
  const stateGuides = listAustralianStateProcurementGuides();
  const prompts = listProcurementWhyThisMattersPrompts();

  return (
    <AppShell
      activePath="/procurement"
      eyebrow="PROCUREMENT"
      title="Australia - Public Sector Procurement"
      description="Understand how Australian public-safety organisations buy, where opportunities are published, and where suppliers can engage through the lifecycle."
    >
      <section className="panel proc-top-actions">
        <div>
          <h2>Find Procurement Opportunities</h2>
          <p>Use official portals to track active opportunities, prior awards and buying patterns.</p>
        </div>

        <div className="proc-action-buttons">
          <Link href="/countries/australia" className="secondary-button">View Country Intelligence</Link>
          <Link href="/regulations/australia" className="secondary-button">View Regulations</Link>
        </div>
      </section>

      <section className="proc-portal-grid">
        {guide.opportunityPortals.map((portal) => (
          <article key={portal.name} className="panel proc-portal-card">
            <span className="country-status">{portal.jurisdiction}</span>
            <h3>{portal.name}</h3>
            <p><strong>What appears:</strong> {portal.whatAppears}</p>
            <p><strong>Search guidance:</strong> {portal.searchGuidance}</p>
            <a href={portal.url} target="_blank" rel="noreferrer" className="secondary-button">Open Portal</a>
          </article>
        ))}
      </section>

      <AustraliaProcurementSwitcher
        commonwealth={commonwealth}
        states={states}
        stateGuides={stateGuides}
        westernAustralia={westernAustralia}
      />

      <ProcurementLifecycle steps={guide.procurementLifecycle} />

      <section className="panel proc-timescale-panel">
        <h2>Typical Planning Range</h2>
        <p>Indicative only - varies by agency, complexity, value and procurement method.</p>
        <div className="proc-timescale-grid">
          {guide.typicalTimescales.map((item) => (
            <article key={item.label} className="proc-mini-card">
              <h3>{item.label}</h3>
              <p><strong>{item.range}</strong></p>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <ProcurementWhyThisMatters prompts={prompts} />

      <section className="panel proc-glossary-panel">
        <h2>Terminology</h2>
        <div className="proc-glossary-grid">
          {guide.terminology.map((item) => (
            <details key={item.term} className="proc-glossary-item">
              <summary>{item.term}</summary>
              <p>{item.meaning}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="panel proc-sources-panel">
        <h2>Official Sources</h2>
        <p className="proc-last-verified">
          Last verified: {guide.lastVerified} · Confidence: {guide.confidence}
        </p>
        <div className="proc-source-list">
          {guide.sources.map((source) => (
            <article key={`${source.title}-${source.url}`} className="proc-source-item">
              <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>
              <p>
                {source.authority} · Last verified {source.lastVerified} · Confidence {source.confidence}
              </p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
