import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "../../../../components/AppShell";
import {
  australiaDirectoryCategories,
  australiaJurisdictions,
  australiaStateDirectory,
  getAustraliaJurisdictionBySlug,
} from "../../../../lib/australiaStateDirectory";

const SALESFORCE_URL = "https://login.salesforce.com/";

export function generateStaticParams() {
  return australiaJurisdictions.map((state) => ({ stateSlug: state.slug }));
}

export default async function AustraliaStateDirectoryPage(props: {
  params: Promise<{ stateSlug: string }>;
}) {
  const { stateSlug } = await props.params;
  const state = getAustraliaJurisdictionBySlug(stateSlug);

  if (!state) {
    notFound();
  }

  const records = australiaStateDirectory[state.slug];

  return (
    <AppShell
      activePath="/countries"
      eyebrow="STATE INTELLIGENCE DIRECTORY"
      title={state.name}
      description="Organisations relevant to DroneSense and Versaterm market intelligence in this jurisdiction."
    >
      <div className="breadcrumb">
        <Link href="/countries">Countries</Link>
        <span>/</span>
        <Link href="/countries/australia">Australia</Link>
        <span>/</span>
        <strong>{state.name}</strong>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <a
          className="secondary-button"
          href={SALESFORCE_URL}
          rel="noopener noreferrer"
          style={{
            alignItems: "center",
            display: "inline-flex",
            gap: "7px",
            textDecoration: "none",
          }}
          target="_blank"
        >
          <span>Open Salesforce</span>
          <svg
            aria-hidden="true"
            fill="none"
            height="12"
            viewBox="0 0 24 24"
            width="12"
          >
            <path
              d="M14 4h6v6M20 4l-9 9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </a>
      </div>

      <section className="panel" style={{ marginBottom: "16px" }}>
        <h2 style={{ marginBottom: "8px" }}>State Intelligence Directory</h2>
        <p style={{ margin: 0 }}>
          Official-source directory grouped by mission category.
        </p>
      </section>

      {australiaDirectoryCategories.map((category) => {
        const categoryRecords = records.filter((record) => record.category === category.key);

        return (
          <section className="panel" key={category.key} style={{ marginBottom: "16px" }}>
            <h2 style={{ marginBottom: "10px" }}>{category.label}</h2>

            {categoryRecords.length === 0 ? (
              <p style={{ margin: 0 }}>No organisations recorded in this category yet.</p>
            ) : (
              <div style={{ display: "grid", gap: "10px" }}>
                {categoryRecords.map((record) => {
                  const href = record.profileHref ?? record.officialSourceUrl;
                  const isExternal = !record.profileHref;

                  return (
                    <a
                      className="country-card"
                      href={href}
                      key={record.id}
                      rel={isExternal ? "noreferrer" : undefined}
                      style={{
                        alignItems: "flex-start",
                        flexDirection: "column",
                        gap: "6px",
                        padding: "12px",
                        textDecoration: "none",
                      }}
                      target={isExternal ? "_blank" : undefined}
                    >
                      <strong style={{ fontSize: "14px" }}>{record.name}</strong>
                      <span style={{ color: "#344054", fontSize: "12px", margin: 0 }}>
                        {record.organisationType}
                      </span>
                      <span style={{ color: "#667085", fontSize: "11px", margin: 0 }}>
                        {record.sector} | {record.jurisdiction}
                      </span>
                      <span style={{ color: "#667085", fontSize: "11px", margin: 0 }}>
                        Last verified: {record.lastVerified ?? "Research required"} | Confidence: {record.confidence}
                      </span>
                    </a>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </AppShell>
  );
}
