import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "../../../../components/AppShell";
import ProcurementLifecycle from "../../../../components/ProcurementLifecycle";
import ProcurementWhyThisMatters from "../../../../components/ProcurementWhyThisMatters";
import {
  getAustralianStateProcurementGuide,
  listAustralianProcurementStates,
  listProcurementWhyThisMattersPrompts,
} from "../../../../lib/procurementData";

export function generateStaticParams() {
  return listAustralianProcurementStates().map((state) => ({ stateSlug: state.slug }));
}

export default async function AustraliaStateProcurementPage(props: {
  params: Promise<{ stateSlug: string }>;
}) {
  const { stateSlug } = await props.params;
  const guide = getAustralianStateProcurementGuide(stateSlug);

  if (!guide) {
    notFound();
  }
  const prompts = listProcurementWhyThisMattersPrompts();
  const localPolicyHeading = guide.slug === "northern-territory"
    ? "Territory Business Consideration"
    : guide.slug === "western-australia"
      ? "WA Industry Participation"
      : "Local Supplier / Industry Policies";

  return (
    <AppShell
      activePath="/procurement"
      eyebrow="PROCUREMENT"
      title={`${guide.name} Procurement Guide`}
      description="Typical public-sector procurement pathway with process, market approach and commercial intelligence context."
    >
      <section className="panel proc-guide-overview">
        <div className="proc-guide-meta">
          <p><strong>Jurisdiction:</strong> {guide.name}</p>
          <p><strong>Framework:</strong> {guide.framework}</p>
          <p><strong>Authority:</strong> {guide.authority}</p>
          <p><strong>Primary portal:</strong> <a href={guide.opportunityPortal.url} target="_blank" rel="noreferrer">{guide.opportunityPortal.name}</a></p>
          <p><strong>Procurement model:</strong> {guide.procurementModel}</p>
          <p><strong>Last verified:</strong> {guide.lastVerified}</p>
          <p><strong>Confidence:</strong> {guide.confidence}</p>
        </div>

        {guide.verificationNotes?.length ? (
          <p className="reg-verification-note">{guide.verificationNotes.join(" ")}</p>
        ) : null}

        <div className="reg-guide-links">
          <Link href="/procurement/australia" className="secondary-button">Back to Australia Procurement</Link>
          <Link href="/countries/australia" className="secondary-button">View Country Intelligence</Link>
        </div>
      </section>

      <section className="panel proc-journey">
        <h2>How Procurement Works</h2>
        <p>Typical pathway only. Agency-specific governance, risk and arrangement settings may change the route.</p>
        <ol>
          {guide.howItWorks.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="panel proc-methods">
        <h2>Procurement Methods</h2>
        <div className="proc-method-grid">
          {guide.procurementMethods.map((method) => (
            <article className="proc-mini-card" key={method.name}>
              <h4>{method.name}</h4>
              <p>{method.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel proc-thresholds-panel">
        <h2>Thresholds / Decision Factors</h2>
        <p>
          Thresholds and pathway factors are displayed based on verified jurisdiction settings. They are not universal
          national rules and should be read with framework conditions.
        </p>
        <div className="proc-threshold-grid">
          {guide.thresholds.map((threshold) => (
            <article className="proc-threshold-card" key={threshold.label}>
              <span>{threshold.method}</span>
              <h3>{threshold.valueRange}</h3>
              <p><strong>{threshold.label}</strong></p>
              <p>{threshold.detail}</p>
            </article>
          ))}
        </div>

        <div className="proc-two-col" style={{ marginTop: "12px", marginBottom: 0 }}>
          <article className="panel" style={{ margin: 0 }}>
            <h2>Decision Factors</h2>
            <ul className="proc-bullet-list">
              {guide.decisionFactors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          {guide.internationalAgreementThresholds?.length ? (
            <article className="panel" style={{ margin: 0 }}>
              <h2>International Agreement / Secondary Thresholds</h2>
              <div className="proc-threshold-grid" style={{ gridTemplateColumns: "1fr" }}>
                {guide.internationalAgreementThresholds.map((threshold) => (
                  <article className="proc-threshold-card" key={threshold.label}>
                    <span>{threshold.method}</span>
                    <h3>{threshold.valueRange}</h3>
                    <p><strong>{threshold.label}</strong></p>
                    <p>{threshold.detail}</p>
                  </article>
                ))}
              </div>
            </article>
          ) : (
            <article className="panel" style={{ margin: 0 }}>
              <h2>Procurement Context</h2>
              <p>Additional jurisdiction context appears below.</p>
            </article>
          )}
        </div>

        <article className="panel" style={{ marginTop: "12px" }}>
          <h2>Early Procurement Intelligence</h2>
          <ul className="proc-bullet-list">
            {guide.earlyIntelligenceNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <ProcurementLifecycle steps={guide.procurementLifecycle} />

      {guide.approachToMarketRequirements?.length || guide.contractFormGuidance?.length ? (
        <section className="proc-two-col">
          {guide.approachToMarketRequirements?.length ? (
            <article className="panel">
              <h2>Approach-to-Market Requirements</h2>
              <ul className="proc-bullet-list">
                {guide.approachToMarketRequirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ) : null}

          {guide.contractFormGuidance?.length ? (
            <article className="panel">
              <h2>Contract Form Guidance</h2>
              <ul className="proc-bullet-list">
                {guide.contractFormGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ) : null}
        </section>
      ) : null}

      <section className="panel proc-journey">
        <h2>Panels / Existing Arrangements</h2>
        <ul className="proc-bullet-list">
          {guide.panelsAndArrangements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="panel proc-callout waips">
        <h2>{localPolicyHeading}</h2>
        <ul className="proc-bullet-list">
          {guide.localIndustryPolicies.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="panel proc-portal-card" style={{ marginBottom: "16px" }}>
        <span className="country-status">{guide.opportunityPortal.jurisdiction}</span>
        <h3>Find Opportunities</h3>
        <p><strong>Portal:</strong> <a href={guide.opportunityPortal.url} target="_blank" rel="noreferrer">{guide.opportunityPortal.name}</a></p>
        <p><strong>What appears:</strong> {guide.opportunityPortal.whatAppears}</p>
        <p><strong>Search guidance:</strong> {guide.opportunityPortal.searchGuidance}</p>
      </section>

      {guide.suggestedSubmissionPeriods?.length ? (
        <section className="panel proc-timescale-panel">
          <h2>Suggested Market Submission Periods</h2>
          <p>Submission period guidance only. This is not an end-to-end procurement timeline.</p>
          <ul className="proc-bullet-list">
            {guide.suggestedSubmissionPeriods.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="panel proc-timescale-panel">
        <h2>Typical Planning Range</h2>
        <p>Indicative only - varies by agency, risk, complexity, value and procurement method.</p>
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
            <details key={`${guide.slug}-${item.term}`} className="proc-glossary-item">
              <summary>{item.term}</summary>
              <p>{item.meaning}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="panel proc-sources-panel">
        <h2>Official Sources</h2>
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
