import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "../../../components/AppShell";
import { getRegulatoryGuideBySlug, listRegulatoryGuides } from "../../../lib/regulatoryData";

export function generateStaticParams() {
  return listRegulatoryGuides().map((guide) => ({ countrySlug: guide.countrySlug }));
}

export default async function RegulatoryGuidePage(props: {
  params: Promise<{ countrySlug: string }>;
}) {
  const { countrySlug } = await props.params;
  const guide = getRegulatoryGuideBySlug(countrySlug);

  if (!guide) {
    notFound();
  }

  return (
    <AppShell
      activePath="/regulations"
      eyebrow="REGULATIONS"
      title={`${guide.country} Regulatory Guide`}
      description="Practical pathway guidance from routine operations through complex and BVLOS operations."
    >
      <section className="panel reg-guide-overview">
        <div className="reg-guide-meta">
          <p><strong>Country:</strong> {guide.country}</p>
          <p><strong>Regulator:</strong> <a href={guide.regulatorUrl} target="_blank" rel="noreferrer">{guide.regulator}</a></p>
          <p><strong>Primary regulatory framework:</strong> {guide.primaryFramework}</p>
          <p><strong>Regulatory model:</strong> {guide.regulatoryModel}</p>
          <p><strong>Last verified:</strong> {guide.lastVerified}</p>
          <p><strong>Confidence:</strong> {guide.confidence}</p>
        </div>

        {guide.overviewNote ? <p className="reg-overview-note">{guide.overviewNote}</p> : null}

        {guide.detailVerificationNote ? <p className="reg-verification-note">{guide.detailVerificationNote}</p> : null}

        <div className="reg-guide-links">
          <Link href={`/countries/${guide.countrySlug}`} className="primary-button">View Country Intelligence</Link>
          <Link href="/regulations/compare" className="secondary-button">Compare Countries</Link>
        </div>
      </section>

      <section className="reg-pathway-split">
        <article className="panel reg-pathway-panel">
          <h2>Individual / Remote Pilot Pathway</h2>
          <p className="reg-pathway-description">Pilot requirements are operation-dependent and should be aligned to mission type, airspace context and approval requirements.</p>
          <div className="reg-steps-grid">
            {guide.individualPathway?.map((step) => (
              <article key={`individual-${step.step}`} className="reg-step-card">
                <span>Step {step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="panel reg-pathway-panel">
          <h2>Organisation / Operator Pathway</h2>
          <p className="reg-pathway-description">Organisational governance, procedures and operational approvals are distinct from individual pilot credentials.</p>
          <div className="reg-steps-grid">
            {guide.organisationPathway?.map((step) => (
              <article key={`operator-${step.step}`} className="reg-step-card">
                <span>Step {step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="panel reg-bvlos-panel">
        <div className="panel-heading" style={{ marginBottom: "8px" }}>
          <div>
            <h2>VLOS</h2>
            <p>{guide.vlosFramework}</p>
          </div>
        </div>
        <ul className="reg-bullet-list">
          {guide.vlosKeyRequirements?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="panel reg-bvlos-panel">
        <div className="panel-heading" style={{ marginBottom: "8px" }}>
          <div>
            <h2>Operation-Specific Approvals</h2>
            <p>{guide.advancedOperationsFramework}</p>
          </div>
        </div>
        <div className="reg-bvlos-model">
          {guide.operationSpecificApprovals?.map((item) => (
            <article key={item.label} className="reg-bvlos-item">
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel reg-bvlos-panel">
        <div className="panel-heading" style={{ marginBottom: "8px" }}>
          <div>
            <h2>Aircraft / Technical Requirements</h2>
            <p>Aircraft suitability, technical controls and maintenance expectations depend on operation profile and approval pathway.</p>
          </div>
        </div>
        <ul className="reg-bullet-list">
          {guide.aircraftTechnicalRequirements?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="panel reg-bvlos-panel">
        <div className="panel-heading" style={{ marginBottom: "8px" }}>
          <div>
            <h2>BVLOS & Complex Operations</h2>
            <p>{guide.bvlosComplex?.summary}</p>
          </div>
        </div>

        <div className="reg-bvlos-model">
          {guide.bvlosComplex?.model.map((item) => (
            <article key={item.label} className="reg-bvlos-item">
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>

        <h3 className="reg-subheading">{guide.bvlosComplex?.riskElementsHeading}</h3>
        <div className="reg-aussora-grid">
          {guide.bvlosComplex?.riskElements.map((item) => (
            <article key={item.label} className="reg-aussora-item">
              <strong>{item.label}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>

        <h3 className="reg-subheading" style={{ marginTop: "14px" }}>Major limitations</h3>
        <ul className="reg-bullet-list">
          {guide.bvlosComplex?.majorLimitations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="reg-important-note">{guide.bvlosComplex?.importantDistinction}</p>
      </section>

      <section className="panel reg-glossary">
        <h2>Terminology / Glossary</h2>
        <div className="reg-glossary-list">
          {guide.glossary?.map((item) => (
            <details key={item.term} className="reg-glossary-item">
              <summary>{item.term}</summary>
              <p>{item.meaning}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="panel reg-sources">
        <h2>Official Sources</h2>
        <div className="reg-source-list">
          {guide.sources.map((source) => (
            <article key={source.url} className="reg-source-item">
              <a href={source.url} rel="noreferrer" target="_blank">{source.title}</a>
              <p>{source.regulator} · Last verified {source.lastVerified} · Confidence {source.confidence}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
