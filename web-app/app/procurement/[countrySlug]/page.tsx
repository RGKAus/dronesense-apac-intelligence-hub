import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "../../../components/AppShell";
import {
  getProcurementGuideByCountrySlug,
  listProcurementGuides,
} from "../../../lib/procurementData";

export function generateStaticParams() {
  return listProcurementGuides()
    .filter((guide) => guide.countrySlug !== "australia")
    .map((guide) => ({ countrySlug: guide.countrySlug }));
}

export default async function CountryProcurementGuidePage(props: {
  params: Promise<{ countrySlug: string }>;
}) {
  const { countrySlug } = await props.params;
  const guide = getProcurementGuideByCountrySlug(countrySlug);

  if (!guide || guide.countrySlug === "australia") {
    notFound();
  }

  return (
    <AppShell
      activePath="/procurement"
      eyebrow="PROCUREMENT"
      title={`${guide.country} Procurement Guide`}
      description="Overview available now. Detailed procurement pathway is being verified."
    >
      <section className="panel proc-country-overview">
        <div className="proc-guide-meta">
          <p><strong>Country:</strong> {guide.country}</p>
          <p><strong>Procurement authority/framework:</strong> {guide.procurementAuthority}</p>
          <p><strong>Framework:</strong> {guide.framework}</p>
          <p><strong>Procurement model:</strong> {guide.procurementModel}</p>
          <p><strong>Last verified:</strong> {guide.lastVerified}</p>
          <p><strong>Confidence:</strong> {guide.confidence}</p>
        </div>

        <p className="reg-verification-note">
          {guide.detailVerificationNote || "Detailed procurement pathway being verified."}
        </p>

        <div className="reg-guide-links">
          <Link href={`/countries/${guide.countrySlug}`} className="secondary-button">View Country Intelligence</Link>
          <Link href="/procurement" className="secondary-button">Back to Procurement Overview</Link>
        </div>
      </section>

      <section className="panel proc-sources-panel">
        <h2>Official Sources</h2>
        {guide.sources.length === 0 ? (
          <p className="proc-empty-note">Official source set is being verified for this jurisdiction.</p>
        ) : (
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
        )}
      </section>
    </AppShell>
  );
}
