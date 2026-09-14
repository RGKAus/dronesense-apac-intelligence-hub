"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  AustralianStateProcurementGuide,
  CommonwealthGuide,
  StateOrRegionSummary,
  WesternAustraliaGuide,
} from "../lib/procurementData";

type ScopeMode = "federal" | "state";

export default function AustraliaProcurementSwitcher({
  commonwealth,
  states,
  stateGuides,
  westernAustralia,
}: {
  commonwealth: CommonwealthGuide;
  states: StateOrRegionSummary[];
  stateGuides: AustralianStateProcurementGuide[];
  westernAustralia: WesternAustraliaGuide;
}) {
  const [scope, setScope] = useState<ScopeMode>("federal");
  const [stateSlug, setStateSlug] = useState<string>("western-australia");

  const selectedState = useMemo(
    () => states.find((state) => state.slug === stateSlug),
    [states, stateSlug],
  );

  const selectedStateGuide = useMemo(
    () => stateGuides.find((state) => state.slug === stateSlug),
    [stateGuides, stateSlug],
  );

  return (
    <section className="panel proc-switcher-panel">
      <div className="panel-heading" style={{ marginBottom: "12px" }}>
        <div>
          <h2>Jurisdiction Selector</h2>
          <p>Switch between Commonwealth/Federal and State/Territory procurement pathways.</p>
        </div>
      </div>

      <div className="proc-scope-toggle" role="group" aria-label="Procurement jurisdiction view">
        <button
          type="button"
          className={scope === "federal" ? "proc-toggle-chip active" : "proc-toggle-chip"}
          onClick={() => setScope("federal")}
        >
          Commonwealth / Federal
        </button>
        <button
          type="button"
          className={scope === "state" ? "proc-toggle-chip active" : "proc-toggle-chip"}
          onClick={() => setScope("state")}
        >
          State / Territory
        </button>
      </div>

      {scope === "federal" ? (
        <div className="proc-scope-body">
          <div className="proc-summary-grid">
            <article className="proc-mini-card">
              <h3>Framework</h3>
              <p>{commonwealth.framework}</p>
            </article>
            <article className="proc-mini-card">
              <h3>Authority</h3>
              <p>{commonwealth.authority}</p>
            </article>
            <article className="proc-mini-card">
              <h3>Primary Portal</h3>
              <p>
                <a href={commonwealth.opportunityPortal.url} target="_blank" rel="noreferrer">
                  {commonwealth.opportunityPortal.name}
                </a>
              </p>
            </article>
          </div>

          <div className="proc-threshold-grid">
            {commonwealth.thresholds.map((threshold) => (
              <article className="proc-threshold-card" key={threshold.label}>
                <span>{threshold.method}</span>
                <h3>{threshold.valueRange}</h3>
                <p><strong>{threshold.label}</strong></p>
                <p>{threshold.detail}</p>
              </article>
            ))}
          </div>

          <div className="proc-callout local-rule">
            <h3>Local Supplier Consideration</h3>
            <p>{commonwealth.localSupplierConsideration}</p>
          </div>

          <section className="proc-methods">
            <h3>Procurement Methods</h3>
            <div className="proc-method-grid">
              {commonwealth.procurementMethods.map((method) => (
                <article className="proc-mini-card" key={method.name}>
                  <h4>{method.name}</h4>
                  <p>{method.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="proc-journey">
            <h3>Commonwealth Typical Pathway</h3>
            <p>Typical pathway only. Entity rules, value, risk, exemptions and existing arrangements can change the route.</p>
            <ol>
              {commonwealth.journey.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <div className="proc-callout">
            <h3>Commonwealth Transparency Intelligence</h3>
            <p>{commonwealth.transparencyNote}</p>
          </div>
        </div>
      ) : (
        <div className="proc-scope-body">
          <label className="proc-state-select-label" htmlFor="state-selector">
            Select State or Territory
          </label>
          <select
            id="state-selector"
            className="filter-control"
            value={stateSlug}
            onChange={(event) => setStateSlug(event.target.value)}
          >
            {states.map((state) => (
              <option key={state.slug} value={state.slug}>
                {state.name}
              </option>
            ))}
          </select>

          {selectedState?.slug === "western-australia" ? (
            <div className="proc-state-detail">
              <div className="proc-callout emphasis">
                <h3>Western Australia Detailed Model Available</h3>
                <p>
                  WA is the first fully detailed state procurement pathway in Procurement V1, including thresholds,
                  sourcing methods, WAIPS and typical journey guidance.
                </p>
                <Link href="/procurement/australia/western-australia" className="secondary-button">
                  View Western Australia Guide
                </Link>
              </div>

              <div className="proc-threshold-grid">
                {westernAustralia.thresholds.map((threshold) => (
                  <article className="proc-threshold-card" key={threshold.label}>
                    <span>{threshold.method}</span>
                    <h3>{threshold.valueRange}</h3>
                    <p><strong>{threshold.label}</strong></p>
                    <p>{threshold.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : selectedStateGuide ? (
            <div className="proc-state-detail">
              <div className="proc-callout emphasis">
                <h3>{selectedStateGuide.name}</h3>
                <p>{selectedState?.note}</p>
                <p>
                  <strong>Primary portal:</strong>{" "}
                  <a href={selectedStateGuide.opportunityPortal.url} target="_blank" rel="noreferrer">
                    {selectedStateGuide.opportunityPortal.name}
                  </a>
                </p>
                <Link href={`/procurement/australia/${selectedStateGuide.slug}`} className="secondary-button">
                  View {selectedStateGuide.name} Guide
                </Link>
              </div>

              <div className="proc-threshold-grid">
                {selectedStateGuide.thresholds.slice(0, 3).map((threshold) => (
                  <article className="proc-threshold-card" key={threshold.label}>
                    <span>{threshold.method}</span>
                    <h3>{threshold.valueRange}</h3>
                    <p><strong>{threshold.label}</strong></p>
                    <p>{threshold.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="proc-callout verification">
              <h3>{selectedState?.name || "State/Territory"}</h3>
              <p>State procurement guide data not available.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
