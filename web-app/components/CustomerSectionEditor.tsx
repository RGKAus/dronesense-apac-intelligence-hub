"use client";

import { useRef, useState, type ReactNode, type FormEvent } from "react";
import type { IntelligenceValue } from "../lib/customers";
import { versatermProducts, type VersatermProductId } from "../lib/versatermProducts";
import { useCustomerDemo } from "./CustomerDemoProvider";

export default function CustomerSectionEditor<T>({
  id, title, value, onSave, children, renderEditor, locked = false,
}: {
  id: string;
  title: string;
  value: T;
  onSave: (value: T) => string | null | Promise<string | null>;
  children: ReactNode;
  renderEditor: (draft: T, setDraft: (value: T) => void) => ReactNode;
  locked?: boolean;
}) {
  const [draft, setDraft] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const editButton = useRef<HTMLButtonElement>(null);
  const [saving, setSaving] = useState(false);
  const { persistence } = useCustomerDemo();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (draft === null || saving) return;
    setSaving(true);
    const saveError = await onSave(draft);
    setSaving(false);
    setError(saveError);
    if (!saveError) {
      setDraft(null);
      setMessage(persistence === "local" ? "Section saved to the local fictional workspace. Other section drafts are unchanged." : "Section saved in memory only. Any other open section drafts are unchanged.");
      editButton.current?.focus();
    }
  }

  return (
    <section className="panel customer-stack" id={`customer-${id}`} aria-labelledby={`customer-${id}-heading`}>
      <div className="customer-row">
        <h2 id={`customer-${id}-heading`}>{title}</h2>
        <button ref={editButton} type="button" className="secondary-button" disabled={locked || draft !== null} aria-label={`Edit ${title}`} onClick={() => {
          setDraft(structuredClone(value)); setError(null); setMessage(null);
        }}>Edit</button>
      </div>
      {draft !== null ? (
        <form className="customer-stack" aria-label={`Edit ${title}`} onSubmit={submit}>
          {renderEditor(draft, setDraft)}
          {error && <p className="customer-error" role="alert">{error}</p>}
          <div className="customer-actions">
            <button type="submit" className="primary-button" disabled={saving}>{saving ? "Saving..." : "Save section"}</button>
            <button type="button" className="secondary-button" disabled={saving} onClick={() => {
              setDraft(null); setError(null); editButton.current?.focus();
            }}>Cancel</button>
          </div>
        </form>
      ) : children}
      {message && <p className="customer-success" role="status">{message}</p>}
    </section>
  );
}

export function CustomerTextField({
  label, value, onChange, multiline = false, type = "text", maxLength = 5000,
}: {
  label: string; value: string | null; onChange: (value: string) => void;
  multiline?: boolean; type?: "text" | "date"; maxLength?: number;
}) {
  return (
    <label className="customer-field">
      {label}
      {multiline
        ? <textarea className="filter-control" rows={4} maxLength={maxLength} value={value ?? ""} placeholder="Unknown / not recorded. Fictional text only." onChange={(event) => onChange(event.target.value)} />
        : <input className="filter-control" type={type} maxLength={maxLength} value={value ?? ""} placeholder={type === "date" ? undefined : "Unknown / not recorded"} onChange={(event) => onChange(event.target.value)} />}
    </label>
  );
}

export function CustomerReviewControls<T>({
  field, onChange, emptyValue,
}: { field: IntelligenceValue<T>; onChange: (field: IntelligenceValue<T>) => void; emptyValue: T | null }) {
  const mode = field.review === "not-reviewed" ? "not-reviewed" : field.evidence;
  return (
    <div className="customer-stack">
      <label className="customer-field">
        Review / evidence status
        <select className="filter-control" value={mode} onChange={(event) => {
          const value = event.target.value;
          if (value === "not-reviewed" || value === "unknown") {
            onChange({ value: null, evidence: "unknown", review: value === "unknown" ? "reviewed" : "not-reviewed", source: field.source });
          } else if (value === "reported" || value === "confirmed") {
            onChange({ value: field.value ?? structuredClone(emptyValue), review: "reviewed", evidence: value, source: field.source });
          }
        }}>
          <option value="not-reviewed">Not yet reviewed</option>
          <option value="unknown">Reviewed - unknown</option>
          <option value="reported">Reported / unverified</option>
          <option value="confirmed">Confirmed in fictional scenario</option>
        </select>
      </label>
      <CustomerTextField label="Information source / reason unknown" value={field.source} onChange={(source) => onChange({ ...field, source })} />
      <p className="customer-muted">Unknown values are never inferred. Reported information remains unverified. Label fictional text with &quot;Fictional:&quot;. Changing to Unknown/Not yet reviewed clears this section&apos;s asserted values on save.</p>
    </div>
  );
}

export function VersatermProductSelect({
  value, onChange, label = "Associated Versaterm products",
}: { value: VersatermProductId[]; onChange: (ids: VersatermProductId[]) => void; label?: string }) {
  return (
    <fieldset className="customer-product-select">
      <legend>{label}</legend>
      <div className="customer-product-options">
        {versatermProducts.map((product) => (
          <label className="customer-checkbox" key={product.id}>
            <input type="checkbox" checked={value.includes(product.id)} onChange={(event) => onChange(
              event.target.checked ? [...value, product.id] : value.filter((id) => id !== product.id),
            )} />
            {product.name}
          </label>
        ))}
      </div>
      <small>Select multiple products; uncheck a product to remove it. Selection is not evidence of use until explicitly sourced.</small>
    </fieldset>
  );
}
