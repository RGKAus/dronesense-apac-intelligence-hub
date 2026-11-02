"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { customerRegions, getCustomerRegionName } from "../lib/customerOrganisations";
import { demoSectors } from "../lib/customerDemo";
import {
  describeSection, formatCustomerDate, getSalesforceAccountUrl, handoverSections, handoverStatuses,
  type IntelligenceValue, type EditableHandoverKey, type EditableHandoverFields,
} from "../lib/customers";
import { useCustomerDemo } from "./CustomerDemoProvider";
import CustomerSectionEditor, { CustomerReviewControls, CustomerTextField, VersatermProductSelect } from "./CustomerSectionEditor";
import { CustomerEvidenceBadge, CustomerHandoverSummary } from "./CustomerHandoverSummary";
import { CustomerContractsEditor, CustomerContractsView } from "./CustomerCommercialHistory";

export function SalesforceAccountButton({ accountUrl }: { accountUrl: string | null }) {
  const safeUrl = getSalesforceAccountUrl(accountUrl);
  return (
    <div className="customer-salesforce">
      {safeUrl ? (
        <a className="primary-button" href={safeUrl} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">Open in Salesforce</a>
      ) : (
        <>
          <button className="primary-button" type="button" disabled aria-describedby="customer-salesforce-status">Open in Salesforce</button>
          <small id="customer-salesforce-status">{accountUrl ? "Invalid Salesforce account URL - link unavailable" : "Salesforce account not linked"}</small>
        </>
      )}
    </div>
  );
}

function IntelligenceSection<T>({
  id, title, field, emptyValue, onSave, renderValue, children,
}: {
  id: string; title: string; field: IntelligenceValue<T>; emptyValue: T;
  onSave: (field: IntelligenceValue<T>) => string | null;
  renderValue: (value: T, onChange: (value: T) => void) => ReactNode;
  children: ReactNode;
}) {
  return (
    <CustomerSectionEditor
      id={id} title={title} value={field} onSave={onSave}
      renderEditor={(draft, setDraft) => (
        <>
          <CustomerReviewControls field={draft} onChange={setDraft} emptyValue={emptyValue} />
          {draft.review === "reviewed" && draft.evidence !== "unknown" &&
            renderValue(draft.value ?? structuredClone(emptyValue), (value) => setDraft({ ...draft, value }))}
        </>
      )}
    >
      <CustomerEvidenceBadge evidence={field.evidence} review={field.review} />
      {children}
      <p className="customer-muted">Source: {field.source || "Unknown"}</p>
    </CustomerSectionEditor>
  );
}

export default function CustomerProfile({ organisationId }: { organisationId: string }) {
  const { organisations, handovers, saveField, saveOrganisation, createCustomer } = useCustomerDemo();
  const organisation = organisations.find((item) => item.id === organisationId);
  const record = handovers.find((item) => item.organisationId === organisationId);
  const [error, setError] = useState<string | null>(null);

  if (!organisation) {
    return (
      <section className="panel customer-stack">
        <h2>Temporary demonstration profile unavailable</h2>
        <p>This in-memory profile was cleared by a reload or leaving the module. Create a new fictional profile from the directory; nothing was saved permanently.</p>
        <Link className="customer-back-link" href="/customers">Return to directory</Link>
      </section>
    );
  }
  const editable = organisation.origin === "demonstration" && Boolean(record);
  const title = (key: string) => handoverSections.find((section) => section.key === key)?.label ?? key;
  const save = <K extends EditableHandoverKey,>(key: K) =>
    (value: EditableHandoverFields[K]) => saveField(organisationId, key, value);

  return (
    <div className="customer-stack">
      <Link className="customer-back-link" href="/customers">Back to customer directory</Link>
      <section className="panel customer-stack">
        <div className="customer-row customer-profile-header">
          <div>
            <span className="customer-badge">{organisation.origin === "agency" ? "Canonical Agency · read-only" : "Fictional demonstration"}</span>
            <h2>{organisation.name}</h2>
            <p className="customer-muted">{organisation.country === "AU" ? "Australia" : "New Zealand"} · {getCustomerRegionName(organisation.country, organisation.region)} · {organisation.sector}</p>
          </div>
          <SalesforceAccountButton accountUrl={record?.salesforceAccountUrl ?? null} />
        </div>
        <div className="customer-actions">
          <strong>{record?.classification.evidence !== "unknown" ? record?.classification.value ?? "Unclassified" : "Unclassified"}</strong>
          <CustomerEvidenceBadge evidence={record?.classification.evidence ?? "unknown"} review={record?.classification.review ?? "not-reviewed"} />
          <span className="customer-badge">{record?.status ?? "Not Started"}</span>
        </div>
        <p className="customer-muted">Last updated: {formatCustomerDate(record?.updatedAt ?? null)} · Source: {record?.source || "No handover information collected"}</p>
      </section>
      {error && <p className="customer-error" role="alert">{error}</p>}
      {!record || !editable ? (
        <section className="panel customer-stack">
          <h2>{organisation.origin === "agency" ? "Real customer intelligence is locked" : "No demonstration handover yet"}</h2>
          <p>Canonical Agency identities remain read-only. No commercial relationship is inferred and no fictional intelligence is attached to real organisations.</p>
          {organisation.origin === "agency" ? <Link className="customer-back-link" href="/agencies">Open Agencies directory</Link> : (
            <button type="button" className="primary-button" onClick={() => setError(createCustomer(organisation.name, organisation.country, organisation.region).error)}>Start blank demonstration handover</button>
          )}
        </section>
      ) : (
        <>
          <section className="panel customer-stack">
            <h2>Handover completeness</h2>
            <CustomerHandoverSummary record={record} detailed />
            <p>Edit any section below, in any order. Each Save changes only that section. If a Completed handover becomes incomplete or gains follow-up work it returns to In Progress.</p>
            <nav className="customer-actions" aria-label="Profile sections">
              <a href="#customer-actions">Follow-up actions</a>
              {handoverSections.map(({ key, label }) => <a key={key} href={`#customer-${key}`}>{label}</a>)}
            </nav>
          </section>

          <CustomerSectionEditor id="actions" title="Follow-up actions" value={record.actions} onSave={save("actions")}
            renderEditor={(actions, setActions) => (
              <>
                {actions.map((action, index) => (
                  <fieldset key={action.id} className="customer-contract-fields customer-stack">
                    <legend>Follow-up {index + 1}</legend>
                    <CustomerTextField label="Action" value={action.title} onChange={(value) => setActions(actions.map((item) => item.id === action.id ? { ...item, title: value } : item))} />
                    <CustomerTextField label="Due date" type="date" value={action.dueDate} onChange={(value) => setActions(actions.map((item) => item.id === action.id ? { ...item, dueDate: value || null } : item))} />
                    <label className="customer-checkbox"><input type="checkbox" checked={action.completed} onChange={(event) => setActions(actions.map((item) => item.id === action.id ? { ...item, completed: event.target.checked } : item))} /> Resolved</label>
                    <button className="secondary-button" type="button" onClick={() => setActions(actions.filter((item) => item.id !== action.id))}>Remove follow-up {index + 1}</button>
                  </fieldset>
                ))}
                <button className="secondary-button" type="button" onClick={() => setActions([...actions, { id: crypto.randomUUID(), title: "", dueDate: null, completed: false }])}>Add follow-up</button>
              </>
            )}>
            {!record.actions.length && <p>No follow-up actions recorded.</p>}
            <ul className="customer-action-list">{record.actions.map((action) => (
              <li key={action.id}><strong>{action.title}</strong><span>{action.completed ? "Resolved" : "Outstanding"} · Due: {formatCustomerDate(action.dueDate)}</span></li>
            ))}</ul>
          </CustomerSectionEditor>

          <CustomerSectionEditor id="identity" title="Organisation details" value={organisation} onSave={saveOrganisation}
            renderEditor={(draft, setDraft) => (
              <div className="customer-filter-grid">
                <CustomerTextField label="Organisation name" maxLength={255} value={draft.name} onChange={(name) => setDraft({ ...draft, name })} />
                <label className="customer-field">Country<select className="filter-control" value={draft.country} onChange={(event) => {
                  const country = event.target.value;
                  if (country === "AU" || country === "NZ") setDraft({ ...draft, country, region: "unknown" });
                }}><option value="AU">Australia</option><option value="NZ">New Zealand</option></select></label>
                <label className="customer-field">State / territory / region<select className="filter-control" value={draft.region} onChange={(event) => setDraft({ ...draft, region: event.target.value })}>
                  {customerRegions[draft.country].map((region) => <option key={region.id} value={region.id}>{region.name}</option>)}
                </select></label>
                <label className="customer-field">Sector<select className="filter-control" value={draft.sector} onChange={(event) => setDraft({ ...draft, sector: event.target.value })}>
                  {demoSectors.map((sector) => <option key={sector}>{sector}</option>)}
                </select></label>
              </div>
            )}>
            <p>{organisation.name} · {getCustomerRegionName(organisation.country, organisation.region)} · {organisation.sector}</p>
          </CustomerSectionEditor>

          <CustomerSectionEditor id="status" title="Handover status" value={record.status} onSave={save("status")}
            renderEditor={(draft, setDraft) => (
              <label className="customer-field">Handover status<select className="filter-control" value={draft} onChange={(event) => {
                const status = handoverStatuses.find((item) => item === event.target.value);
                if (status) setDraft(status);
              }}>{handoverStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
            )}>
            <p>{record.status}</p>
          </CustomerSectionEditor>

          <CustomerSectionEditor id="classification" title="Customer/prospect classification" value={record.classification} onSave={save("classification")}
            renderEditor={(draft, setDraft) => (
              <>
                <CustomerReviewControls field={draft} onChange={setDraft} emptyValue={null} />
                {draft.review === "reviewed" && draft.evidence !== "unknown" && <label className="customer-field">Classification<select className="filter-control" value={draft.value ?? ""} onChange={(event) => {
                  const value = event.target.value;
                  if (value === "Customer" || value === "Prospect") setDraft({ ...draft, value });
                }}><option value="">Choose classification</option><option>Customer</option><option>Prospect</option></select></label>}
              </>
            )}>
            <p>{record.classification.value ?? "Unclassified"}</p>
            <CustomerEvidenceBadge evidence={record.classification.evidence} review={record.classification.review} />
            <p className="customer-muted">Source: {record.classification.source || "Unknown"}</p>
          </CustomerSectionEditor>

          <IntelligenceSection id="versatermProducts" title={title("versatermProducts")} field={record.sections.versatermProducts} emptyValue={[]} onSave={save("versatermProducts")}
            renderValue={(value, onChange) => <VersatermProductSelect label="Versaterm products currently used" value={value} onChange={onChange} />}>
            <p>{describeSection("versatermProducts", record.sections)}</p>
          </IntelligenceSection>

          {(["competitorProducts", "notes", "opportunities", "procurement"] as const).map((key) => (
            <IntelligenceSection key={key} id={key} title={title(key)} field={record.sections[key]} emptyValue="" onSave={save(key)}
              renderValue={(value, onChange) => <CustomerTextField label={title(key)} value={value} onChange={onChange} multiline />}>
              <p className="customer-section-value">{describeSection(key, record.sections)}</p>
            </IntelligenceSection>
          ))}

          <IntelligenceSection id="contacts" title={title("contacts")} field={record.sections.contacts} emptyValue={[]} onSave={save("contacts")}
            renderValue={(contacts, setContacts) => (
              <>
                {contacts.map((contact, index) => (
                  <fieldset className="customer-contract-fields customer-stack" key={index}>
                    <legend>Contact {index + 1} - fictional names and titles only</legend>
                    <CustomerTextField label="Name" value={contact.name} onChange={(name) => setContacts(contacts.map((item, position) => position === index ? { ...item, name } : item))} />
                    <CustomerTextField label="Job title" value={contact.jobTitle} onChange={(jobTitle) => setContacts(contacts.map((item, position) => position === index ? { ...item, jobTitle } : item))} />
                    <button className="secondary-button" type="button" onClick={() => setContacts(contacts.filter((_, position) => position !== index))}>Remove contact {index + 1}</button>
                  </fieldset>
                ))}
                <button className="secondary-button" type="button" onClick={() => setContacts([...contacts, { name: "", jobTitle: "" }])}>Add contact</button>
              </>
            )}>
            <p className="customer-section-value">{describeSection("contacts", record.sections)}</p>
          </IntelligenceSection>

          <IntelligenceSection id="contracts" title={title("contracts")} field={record.sections.contracts} emptyValue={[]} onSave={save("contracts")}
            renderValue={(contracts, onChange) => <CustomerContractsEditor contracts={contracts} onChange={onChange} />}>
            {record.sections.contracts.review === "reviewed" && record.sections.contracts.evidence !== "unknown" && record.sections.contracts.value
              ? <CustomerContractsView contracts={record.sections.contracts.value} /> : <p>{describeSection("contracts", record.sections)}</p>}
          </IntelligenceSection>

          <section className="panel customer-stack">
            <div className="customer-row"><h2>Salesforce account</h2><button className="secondary-button" type="button" disabled aria-label="Edit Salesforce account">Edit (locked)</button></div>
            <p>Account URL entry remains locked in demonstration mode. No Salesforce URLs are generated.</p>
          </section>
        </>
      )}
    </div>
  );
}
