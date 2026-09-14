"use client";

import { useState } from "react";
import type { ProcurementLifecycleStep } from "../lib/procurementData";

type LifecycleView = "procurement" | "sales";

export default function ProcurementLifecycle({
  steps,
}: {
  steps: ProcurementLifecycleStep[];
}) {
  const [view, setView] = useState<LifecycleView>("procurement");

  return (
    <section className="panel proc-lifecycle-panel">
      <div className="panel-heading proc-lifecycle-header">
        <div>
          <h2>Procurement Lifecycle</h2>
          <p>Select each stage for detail. Pre-tender stages are highlighted for commercial planning.</p>
        </div>

        <div className="proc-view-toggle" role="group" aria-label="Lifecycle view mode">
          <button
            type="button"
            className={view === "procurement" ? "proc-toggle-chip active" : "proc-toggle-chip"}
            onClick={() => setView("procurement")}
          >
            Procurement View
          </button>
          <button
            type="button"
            className={view === "sales" ? "proc-toggle-chip active" : "proc-toggle-chip"}
            onClick={() => setView("sales")}
          >
            Sales View
          </button>
        </div>
      </div>

      <div className="proc-lifecycle-grid">
        {steps.map((step) => (
          <details key={step.step} className={step.preTender ? "proc-step-card pre-tender" : "proc-step-card"}>
            <summary>
              <span>Step {step.step}</span>
              <strong>{step.title}</strong>
              {step.preTender ? <em>Pre-tender</em> : null}
            </summary>

            <div className="proc-step-body">
              <p>{view === "procurement" ? step.procurementView : step.salesView}</p>

              {step.preTender && step.commercialRelevance ? (
                <div className="proc-commercial-relevance">
                  <h3>Commercial Relevance</h3>
                  <p>{step.commercialRelevance}</p>
                </div>
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
