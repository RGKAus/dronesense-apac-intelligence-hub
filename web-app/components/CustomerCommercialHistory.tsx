"use client";

import {
  createEmptyContract, formatCustomerDate, procurementMethods, taxTreatments,
  type CustomerContract, type ContractTransaction,
} from "../lib/customers";
import { getVersatermProductNames } from "../lib/versatermProducts";
import { CustomerTextField, VersatermProductSelect } from "./CustomerSectionEditor";
import { CustomerEvidenceBadge } from "./CustomerHandoverSummary";

function TransactionsEditor({
  label, value, onChange,
}: { label: string; value: ContractTransaction[]; onChange: (value: ContractTransaction[]) => void }) {
  return (
    <div className="customer-stack">
      <h4>{label}</h4>
      {value.map((transaction, index) => (
        <fieldset className="customer-contract-fields customer-stack" key={transaction.id}>
          <legend>{label} entry {index + 1}</legend>
          <div className="customer-filter-grid">
            <CustomerTextField label="Amount (contract currency; blank = unknown)" value={transaction.amount} onChange={(amount) => onChange(value.map((item) => item.id === transaction.id ? { ...item, amount: amount || null } : item))} />
            <CustomerTextField label="Date (blank = unknown)" type="date" value={transaction.date} onChange={(date) => onChange(value.map((item) => item.id === transaction.id ? { ...item, date: date || null } : item))} />
          </div>
          <button type="button" className="secondary-button" onClick={() => onChange(value.filter((item) => item.id !== transaction.id))}>Remove entry {index + 1}</button>
        </fieldset>
      ))}
      <button type="button" className="secondary-button" onClick={() => onChange([...value, { id: crypto.randomUUID(), amount: null, date: null }])}>Add {label.toLowerCase()} entry</button>
    </div>
  );
}

export function CustomerContractsEditor({
  contracts, onChange,
}: { contracts: CustomerContract[]; onChange: (contracts: CustomerContract[]) => void }) {
  function update(id: string, patch: Partial<CustomerContract>) {
    onChange(contracts.map((contract) => contract.id === id ? { ...contract, ...patch } : contract));
  }

  return (
    <div className="customer-stack">
      <p>Blank amounts, currencies and dates mean Unknown, never zero. No totals or tax calculations are inferred. Section evidence describes the history inventory; each contract retains its own evidence. All text must be fictional. Procurement categories aid handover only: record local terminology and legal basis separately.</p>
      {contracts.map((contract, index) => (
        <fieldset className="customer-contract-fields customer-stack" key={contract.id}>
          <legend>Contract {index + 1}</legend>
          <VersatermProductSelect value={contract.products} onChange={(products) => update(contract.id, { products })} />
          <div className="customer-filter-grid">
            <CustomerTextField label="Contract value (blank = unknown)" value={contract.value} onChange={(value) => update(contract.id, { value: value || null })} />
            <label className="customer-field">
              Currency
              <select className="filter-control" value={contract.currency ?? ""} onChange={(event) => {
                const currency = event.target.value;
                if (!currency) update(contract.id, { currency: null, otherCurrency: "" });
                else if (currency === "AUD" || currency === "NZD" || currency === "USD" || currency === "Other") update(contract.id, { currency, otherCurrency: "" });
              }}>
                <option value="">Unknown</option>{["AUD", "NZD", "USD", "Other"].map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            {contract.currency === "Other" && <CustomerTextField label="Other currency code" value={contract.otherCurrency} maxLength={3} onChange={(otherCurrency) => update(contract.id, { otherCurrency: otherCurrency.toUpperCase() })} />}
            <label className="customer-field">
              GST / tax treatment
              <select className="filter-control" value={contract.taxTreatment} onChange={(event) => {
                const taxTreatment = taxTreatments.find((item) => item === event.target.value);
                if (taxTreatment) update(contract.id, { taxTreatment });
              }}>
                {taxTreatments.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <CustomerTextField label="Tax treatment details" value={contract.taxNotes} onChange={(taxNotes) => update(contract.id, { taxNotes })} />
          </div>
          <CustomerTextField label="Payment arrangement" value={contract.paymentArrangement} multiline onChange={(paymentArrangement) => update(contract.id, { paymentArrangement })} />
          <TransactionsEditor label="Invoiced" value={contract.invoices} onChange={(invoices) => update(contract.id, { invoices })} />
          <TransactionsEditor label="Paid" value={contract.payments} onChange={(payments) => update(contract.id, { payments })} />
          <div className="customer-filter-grid">
            <CustomerTextField label="Contract start date" type="date" value={contract.startDate} onChange={(value) => update(contract.id, { startDate: value || null })} />
            <CustomerTextField label="Contract expiry date" type="date" value={contract.expiryDate} onChange={(value) => update(contract.id, { expiryDate: value || null })} />
            <CustomerTextField label="Renewal date" type="date" value={contract.renewalDate} onChange={(value) => update(contract.id, { renewalDate: value || null })} />
            <label className="customer-field">
              Original procurement method
              <select className="filter-control" value={contract.procurementMethod} onChange={(event) => {
                const procurementMethod = procurementMethods.find((item) => item === event.target.value);
                if (procurementMethod) update(contract.id, { procurementMethod });
              }}>
                {procurementMethods.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>
          <CustomerTextField label="Jurisdiction-specific procurement term / legal basis" value={contract.jurisdictionDetails} multiline onChange={(jurisdictionDetails) => update(contract.id, { jurisdictionDetails })} />
          <CustomerTextField label="Tender / contract reference" value={contract.reference} onChange={(reference) => update(contract.id, { reference })} />
          <CustomerTextField label="Renewal plans and next steps" value={contract.renewalPlans} multiline onChange={(renewalPlans) => update(contract.id, { renewalPlans })} />
          <div className="customer-filter-grid">
            <CustomerTextField label="Contract information source" value={contract.source} onChange={(source) => update(contract.id, { source })} />
            <label className="customer-field">
              Contract evidence / confidence
              <select className="filter-control" value={contract.evidence} onChange={(event) => {
                const evidence = event.target.value;
                if (evidence === "unknown" || evidence === "reported" || evidence === "confirmed") update(contract.id, { evidence });
              }}>
                <option value="unknown">Unknown / unverified</option>
                <option value="reported">Reported / unverified</option>
                <option value="confirmed">Confirmed in fictional scenario</option>
              </select>
            </label>
          </div>
          <button type="button" className="secondary-button" onClick={() => onChange(contracts.filter((item) => item.id !== contract.id))}>Remove contract {index + 1}</button>
        </fieldset>
      ))}
      <button type="button" className="secondary-button" onClick={() => onChange([...contracts, createEmptyContract(crypto.randomUUID())])}>Add contract</button>
    </div>
  );
}

export function CustomerContractsView({ contracts }: { contracts: CustomerContract[] }) {
  if (!contracts.length) return <p>No contracts recorded (explicitly reviewed).</p>;
  return (
    <div className="customer-stack">
      {contracts.map((contract, index) => (
        <article className="customer-contract-fields customer-stack" key={contract.id} aria-label={`Contract ${index + 1}`}>
          <div className="customer-row"><h3>Contract {index + 1}</h3><CustomerEvidenceBadge evidence={contract.evidence} /></div>
          <dl className="customer-contract-details">
            <div><dt>Associated products</dt><dd>{getVersatermProductNames(contract.products) || "Unknown"}</dd></div>
            <div><dt>Contract value / currency</dt><dd>{contract.value ?? "Unknown"} / {contract.currency === "Other" ? contract.otherCurrency : contract.currency ?? "Unknown"}</dd></div>
            <div><dt>GST / tax treatment</dt><dd>{contract.taxTreatment}{contract.taxNotes ? ` - ${contract.taxNotes}` : ""}</dd></div>
            <div><dt>Payment arrangement</dt><dd>{contract.paymentArrangement || "Unknown"}</dd></div>
            <div><dt>Known invoiced amounts / dates</dt><dd>{contract.invoices.length ? contract.invoices.map((item) => `${item.amount ?? "Unknown amount"} / ${formatCustomerDate(item.date)}`).join("\n") : "Unknown"}</dd></div>
            <div><dt>Known paid amounts / dates</dt><dd>{contract.payments.length ? contract.payments.map((item) => `${item.amount ?? "Unknown amount"} / ${formatCustomerDate(item.date)}`).join("\n") : "Unknown"}</dd></div>
            <div><dt>Start / expiry / renewal</dt><dd>{formatCustomerDate(contract.startDate)} / {formatCustomerDate(contract.expiryDate)} / {formatCustomerDate(contract.renewalDate)}</dd></div>
            <div><dt>Original procurement method</dt><dd>{contract.procurementMethod}</dd></div>
            <div><dt>Jurisdiction-specific term / legal basis</dt><dd>{contract.jurisdictionDetails || "Unknown - categories are not legally equivalent across jurisdictions"}</dd></div>
            <div><dt>Tender / contract reference</dt><dd>{contract.reference || "Unknown"}</dd></div>
            <div><dt>Renewal plans and next steps</dt><dd>{contract.renewalPlans || "Unknown"}</dd></div>
            <div><dt>Information source</dt><dd>{contract.source || "Unknown"}</dd></div>
          </dl>
          {contract.evidence !== "confirmed" && <p className="customer-muted">Unverified commercial intelligence. Values and dates must not be treated as confirmed.</p>}
        </article>
      ))}
    </div>
  );
}
