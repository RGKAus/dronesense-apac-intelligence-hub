import Link from "next/link";
import AppShell from "../../components/AppShell";
import { listRegulatoryGuides } from "../../lib/regulatoryData";

export default function RegulationsPage() {
  const guides = listRegulatoryGuides();

  return (
    <AppShell
      activePath="/regulations"
      eyebrow="REGULATIONS"
      title="Regulations"
      description="Compare RPAS regulatory frameworks and understand the pathway from routine VLOS operations to complex and BVLOS operations."
    >
      <section className="panel reg-top-actions">
        <div className="reg-action-copy">
          <h2>Country regulatory guides</h2>
          <p>Browse structured national guidance and compare how requirements differ across jurisdictions.</p>
        </div>

        <div className="reg-action-buttons">
          <a href="#regulatory-guides" className="primary-button">Browse Regulatory Guides</a>
          <Link href="/regulations/compare" className="secondary-button">Compare Countries</Link>
        </div>
      </section>

      <section className="reg-country-grid" id="regulatory-guides">
        {guides.map((guide) => (
          <article className="panel reg-country-card" key={guide.countrySlug}>
            <div className="reg-country-header">
              <h2>{guide.country}</h2>
              <span className="country-status">{guide.detailStatus === "full" ? "Detailed guide available" : "Overview + comparison"}</span>
            </div>

            <div className="reg-country-details">
              <p><strong>Regulator:</strong> {guide.regulator}</p>
              <p><strong>Primary framework:</strong> {guide.primaryFramework}</p>
              <p><strong>Key terminology:</strong> {guide.terminology.join(", ")}</p>
              <p><strong>Operator model:</strong> {guide.operatorApprovalModel}</p>
              <p><strong>Advanced/BVLOS pathway:</strong> {guide.advancedBvlosPathway}</p>
              <p><strong>Last verified:</strong> {guide.lastVerified}</p>
            </div>

            <div className="reg-country-actions">
              <Link href={`/regulations/${guide.countrySlug}`} className="secondary-button">View Regulatory Guide</Link>
              <Link href={`/countries/${guide.countrySlug}`} className="secondary-button">View Country Intelligence</Link>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}