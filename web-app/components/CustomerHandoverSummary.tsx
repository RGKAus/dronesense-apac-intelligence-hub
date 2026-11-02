import { getHandoverCompleteness, type CustomerHandover, type EvidenceStatus } from "../lib/customers";

export function CustomerEvidenceBadge({ evidence, review = "reviewed" }: { evidence: EvidenceStatus; review?: "reviewed" | "not-reviewed" }) {
  const labels = { unknown: "Unknown / research required", reported: "Reported / unverified", confirmed: "Confirmed" };
  return <span className={`customer-badge customer-evidence-${evidence}`}>{review === "not-reviewed" ? "Not yet reviewed" : labels[evidence]}</span>;
}

export function CustomerHandoverSummary({
  record, detailed = false,
}: { record: CustomerHandover; detailed?: boolean }) {
  const completeness = getHandoverCompleteness(record);
  const outstanding = record.actions.filter((action) => !action.completed).length;
  return (
    <div className="customer-completeness">
      <div className="customer-row">
        <strong>{completeness.percent}% reviewed</strong>
        <span>{completeness.resolved}/{completeness.total} handover areas</span>
      </div>
      <progress
        max={completeness.total}
        value={completeness.resolved}
        aria-label={`${completeness.percent}% of handover areas reviewed`}
      />
      <p>{completeness.confirmed} confirmed · {completeness.reported} reported · {completeness.unknown} reviewed unknown · {completeness.notReviewed} not yet reviewed</p>
      <p><strong>{outstanding} outstanding follow-up {outstanding === 1 ? "action" : "actions"}</strong></p>
      {detailed && (
        <details>
          <summary>Required areas and scoring</summary>
          <p>Classification plus seven profile sections, including Commercial &amp; Contract History. Reviewed Unknown counts as reviewed, not confirmed. Not yet reviewed does not count. Reported/confirmed values require a source. Contract history replaces the former dates-only area, so dates are not duplicated.</p>
          {completeness.missing.length > 0 ? (
            <ul>
              {completeness.missing.map(({ key, label }) => (
                <li key={key}><a href={`#customer-${key}`}>{label}</a></li>
              ))}
            </ul>
          ) : <p>All handover areas reviewed. Review reported information before relying on it.</p>}
          <p>Completed requires all eight areas reviewed and no outstanding actions. Unknown information is allowed; completion does not certify every claim as confirmed.</p>
        </details>
      )}
    </div>
  );
}
