"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  customerCountries, customerRegions, getCustomerRegionName,
} from "../lib/customerOrganisations";
import {
  emptyCustomerFilters, formatCustomerDate, handoverStatuses, matchesCustomerFilters,
} from "../lib/customers";
import { useCustomerDemo } from "./CustomerDemoProvider";
import { CustomerEvidenceBadge, CustomerHandoverSummary } from "./CustomerHandoverSummary";

export default function CustomersDirectory() {
  const { organisations, handovers, filters, setFilters, createCustomer } = useCustomerDemo();
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [organisationName, setOrganisationName] = useState("");
  const [fictionalConfirmed, setFictionalConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handoverMap = new Map(handovers.map((record) => [record.organisationId, record]));
  const regions = filters.country === "AU" ? customerRegions.AU
    : filters.country === "NZ" ? customerRegions.NZ : [];
  const filtered = organisations.filter((organisation) =>
    matchesCustomerFilters(organisation, handoverMap.get(organisation.id), filters),
  ).sort((a, b) => {
    const aRecord = handoverMap.get(a.id);
    const bRecord = handoverMap.get(b.id);
    const priority = (record: typeof aRecord) => record?.actions.some((action) => !action.completed) ? 2 : record ? 1 : 0;
    return priority(bRecord) - priority(aRecord) || a.name.localeCompare(b.name);
  });
  const canCreate = (filters.country === "AU" || filters.country === "NZ") && filters.region !== "all" && filters.region !== "unknown";
  const tracked = filtered.flatMap((organisation) => {
    const record = handoverMap.get(organisation.id);
    return record ? [record] : [];
  });

  function submitAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if ((filters.country !== "AU" && filters.country !== "NZ") || !canCreate) {
      setError("Select Country and State/Region in the directory before adding a customer.");
      return;
    }
    if (!fictionalConfirmed) {
      setError("Confirm that you are using a fictional demonstration organisation only.");
      return;
    }
    const result = createCustomer(organisationName, filters.country, filters.region);
    setError(result.error);
    if (!result.error && result.organisationId) router.push(`/customers/${result.organisationId}`);
  }

  return (
    <div className="customer-stack">
      <div className="customer-row customer-toolbar">
        <div>
          <h2>ANZ handover directory</h2>
          <p className="customer-muted">Work state by state. Outstanding actions appear first. Existing Agencies remain unclassified.</p>
        </div>
        <button className="primary-button" type="button" aria-expanded={adding} aria-controls="customer-add-panel" onClick={() => { setAdding(!adding); setError(null); }}>
          {adding ? "Close Add Customer" : "Add Customer"}
        </button>
      </div>

      {adding && (
        <section className="panel" id="customer-add-panel" aria-labelledby="customer-add-heading">
          <h2 id="customer-add-heading">Add Customer - fictional demonstration</h2>
          <p>{canCreate ? `Jurisdiction: ${filters.country === "AU" ? "Australia" : "New Zealand"} / ${getCustomerRegionName(filters.country === "AU" ? "AU" : "NZ", filters.region)}` : "First select Country and State/Region below."}</p>
          <p>Enter a fictional organisation name. A new profile starts blank and Unclassified. Existing identities are opened rather than duplicated; real Agencies remain read-only.</p>
          <form onSubmit={submitAdd} className="customer-stack">
            <label className="customer-field">
              Organisation name
              <input className="filter-control" required maxLength={255} placeholder="Example Coastal Response (fictional)" value={organisationName} onChange={(event) => setOrganisationName(event.target.value)} />
            </label>
            <label className="customer-checkbox"><input type="checkbox" required checked={fictionalConfirmed} onChange={(event) => setFictionalConfirmed(event.target.checked)} /> I am using fictional demonstration information only.</label>
            {error && <p className="customer-error" role="alert">{error}</p>}
            <div className="customer-actions">
              <button className="primary-button" disabled={!canCreate} type="submit">Create / open blank profile</button>
              <button className="secondary-button" type="button" onClick={() => setAdding(false)}>Cancel</button>
            </div>
          </form>
        </section>
      )}

      <section className="panel customer-stack" aria-label="Customer directory filters">
        <label className="customer-field">
          Search organisation name
          <input className="filter-control" type="search" placeholder="Find an organisation..." value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} />
        </label>
        <div className="customer-filter-grid">
          <label className="customer-field">
            Country
            <select className="filter-control" value={filters.country} onChange={(event) => setFilters({ ...filters, country: event.target.value, region: "all" })}>
              <option value="all">Australia & New Zealand</option>
              {customerCountries.map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}
            </select>
          </label>
          <label className="customer-field">
            State / territory / region
            <select className="filter-control" value={filters.region} disabled={filters.country === "all"} onChange={(event) => setFilters({ ...filters, region: event.target.value })}>
              <option value="all">{filters.country === "all" ? "Choose a country first" : "All states / regions"}</option>
              {regions.map((region) => <option key={region.id} value={region.id}>{region.name}</option>)}
            </select>
          </label>
          <label className="customer-field">
            Classification
            <select className="filter-control" value={filters.classification} onChange={(event) => setFilters({ ...filters, classification: event.target.value })}>
              <option value="all">All classifications</option>
              {["Customer", "Prospect", "Unclassified"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="customer-field">
            Handover status
            <select className="filter-control" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
              <option value="all">All statuses</option>
              {handoverStatuses.map((status) => <option key={status}>{status}</option>)}
            </select>
          </label>
        </div>
        <div className="customer-actions">
          <label className="customer-checkbox"><input type="checkbox" checked={filters.outstandingOnly} onChange={(event) => setFilters({ ...filters, outstandingOnly: event.target.checked })} /> Outstanding follow-up only</label>
          <label className="customer-checkbox"><input type="checkbox" checked={filters.includeAgencies} onChange={(event) => setFilters({ ...filters, includeAgencies: event.target.checked })} /> Include canonical Agencies (read-only)</label>
          <button className="secondary-button" type="button" onClick={() => setFilters({ ...emptyCustomerFilters })}>Clear filters</button>
        </div>
      </section>

      <p className="customer-results" role="status">
        {filtered.length} organisations · {tracked.length} demonstration handovers · {tracked.filter((record) => record.status === "Completed").length} completed · {tracked.reduce((sum, record) => sum + record.actions.filter((action) => !action.completed).length, 0)} outstanding actions
      </p>
      {!filtered.length && (
        <section className="panel">
          <h2>No organisations match these filters</h2>
          <p>Clear filters, include canonical Agencies, or add a blank fictional organisation for this jurisdiction.</p>
        </section>
      )}
      <div className="customer-card-grid">
        {filtered.map((organisation) => {
          const record = handoverMap.get(organisation.id);
          return (
            <article className="panel customer-card" key={organisation.id}>
              <div className="customer-row">
                <span className="customer-badge">{organisation.origin === "agency" ? "Canonical Agency · read-only" : "Fictional demonstration"}</span>
                <span className="customer-badge">{record?.status ?? "Not Started"}</span>
              </div>
              <h3><Link href={`/customers/${organisation.id}`}>{organisation.name}</Link></h3>
              <p className="customer-muted">{organisation.country === "AU" ? "Australia" : "New Zealand"} · {getCustomerRegionName(organisation.country, organisation.region)} · {organisation.sector}</p>
              <div className="customer-actions">
                <strong>{record?.classification.evidence !== "unknown" ? record?.classification.value ?? "Unclassified" : "Unclassified"}</strong>
                <CustomerEvidenceBadge evidence={record?.classification.evidence ?? "unknown"} review={record?.classification.review ?? "not-reviewed"} />
              </div>
              {record ? <CustomerHandoverSummary record={record} /> : <p>No customer intelligence collected. A directory listing does not establish a customer relationship.</p>}
              <div className="customer-row customer-card-footer">
                <span className="customer-muted">Updated: {formatCustomerDate(record?.updatedAt ?? null)}</span>
                <Link className="secondary-button" href={`/customers/${organisation.id}`}>Open profile</Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
