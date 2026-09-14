import AppShell from "../../components/AppShell";
import Link from "next/link";
import { listProcurementGuides } from "../../lib/procurementData";

export default function ProcurementPage() {
  const guides = listProcurementGuides();

  return (
    <AppShell
      activePath="/procurement"
      eyebrow="PROCUREMENT"
      title="Procurement"
      description="Understand how public-sector organisations buy, where opportunities appear, and how suppliers can engage throughout the procurement lifecycle."
    >
      <section className="panel proc-top-actions">
        <div>
          <h2>Country procurement guides</h2>
          <p>Start with Australia for detailed guidance. Other jurisdictions remain explicitly verification-pending.</p>
        </div>

        <div className="proc-action-buttons">
          <Link href="/procurement/australia" className="primary-button">View Australia Guide</Link>
        </div>
      </section>

      <section className="proc-country-grid">
        {guides.map((guide) => (
          <article className="panel proc-country-card" key={guide.countrySlug}>
            <div className="proc-country-header">
              <h2>{guide.country}</h2>
              <span className="country-status">
                {guide.detailStatus === "full" ? "Detailed guide available" : "Procurement guide being verified"}
              </span>
            </div>

            <div className="proc-country-details">
              <p><strong>Authority:</strong> {guide.procurementAuthority}</p>
              <p><strong>Framework:</strong> {guide.framework}</p>
              <p><strong>Procurement model:</strong> {guide.procurementModel}</p>
              <p>
                <strong>Opportunity portal:</strong>{" "}
                {guide.opportunityPortals[0] ? guide.opportunityPortals[0].name : "Being verified"}
              </p>
              <p><strong>Last verified:</strong> {guide.lastVerified}</p>
              <p><strong>Confidence:</strong> {guide.confidence}</p>
            </div>

            <div className="proc-country-actions">
              <Link href={`/procurement/${guide.countrySlug}`} className="secondary-button">View Procurement Guide</Link>
              <Link href={`/countries/${guide.countrySlug}`} className="secondary-button">View Country Intelligence</Link>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}