"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import {
  createLogEntry, emptyLogFilters, filterLogEntries, formatLogDate, getDemoLogEntries,
  getLogPreview, logEntryTypes, saveLogEntry,
  type IntelligenceLogEntry, type LogFilters,
} from "../lib/intelligenceLog";
import { customerCountries, customerRegions, getCustomerRegionName, type CustomerOrganisation } from "../lib/customerOrganisations";
import IntelligenceLogEditor, { LogTagPicker } from "./IntelligenceLogEditor";

const subscribeToLocalTime = () => () => {};
const localTimeReady = () => true;
const serverTimeReady = () => false;

export default function IntelligenceLogBrowser({ organisations }: { organisations: CustomerOrganisation[] }) {
  // Match server HTML before formatting in the browser's own timezone.
  const canFormatLocalTime = useSyncExternalStore(subscribeToLocalTime, localTimeReady, serverTimeReady);
  const [entries, setEntries] = useState(getDemoLogEntries);
  const [filters, setFilters] = useState<LogFilters>(emptyLogFilters);
  const [draft, setDraft] = useState<IntelligenceLogEntry | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const newEntry = useRef<HTMLButtonElement>(null);
  const savedHeading = useRef<HTMLHeadingElement>(null);
  const names = new Map(organisations.map((organisation) => [organisation.id, organisation.name]));
  const filtered = filterLogEntries(entries, filters, organisations);
  const availableRegions = filters.country === "AU" ? customerRegions.AU : filters.country === "NZ" ? customerRegions.NZ : [];
  const outstanding = entries.reduce((sum, entry) => sum + entry.actions.filter((action) => !action.completed).length, 0);
  const displayDate = (timestamp: string) => canFormatLocalTime ? formatLogDate(timestamp) : `${timestamp.slice(0, 16).replace("T", " ")} UTC`;

  function save(value: IntelligenceLogEntry): string | null {
    const result = saveLogEntry(entries, value, organisations, new Date());
    if (result.error) return result.error;
    setEntries(result.entries);
    setDraft(null);
    setMessage("Entry saved in memory only. Active filters may hide it; clear filters to see every entry.");
    requestAnimationFrame(() => savedHeading.current?.focus());
    return null;
  }

  return (
    <div className="log-stack">
      <aside className="log-demo-notice" aria-label="Demonstration notebook boundary">
        <strong>Fictional notebook only - not approved for real intelligence or transcripts.</strong>
        <p>Write fictional examples only, labelled &quot;Fictional:&quot; or &quot;Demo:&quot;. No confidential information, emails, phone numbers or URLs. All entries and drafts are memory-only and reset on reload or leaving this module. No database, browser storage, AI or transcription service is used.</p>
      </aside>
      <div className="log-row log-toolbar">
        <div><h2>Daily intelligence notebook</h2><p className="log-muted">Write first, organise later. {outstanding} outstanding follow-up {outstanding === 1 ? "action" : "actions"} across all entries.</p></div>
        <button ref={newEntry} className="primary-button" type="button" disabled={draft !== null} onClick={() => {
          setDraft(createLogEntry(crypto.randomUUID(), new Date())); setMessage(null);
        }}>New Entry</button>
      </div>
      {draft && (
        <IntelligenceLogEditor key={`${draft.id}-${draft.revision}`} entry={draft} organisations={organisations} onSave={save} onCancel={() => {
          setDraft(null); setMessage("Draft cancelled. Saved entries are unchanged."); requestAnimationFrame(() => newEntry.current?.focus());
        }} />
      )}
      {message && <p className="log-success" role="status">{message}</p>}
      {draft && <p className="log-muted">Finish Save or Cancel on this entry before opening another. Search and filters do not discard your draft.</p>}
      <section className="panel log-stack" aria-labelledby="log-filters-heading">
        <h2 id="log-filters-heading">Find entries</h2>
        <label className="log-field">Search notes, transcripts and titles<input className="filter-control" type="search" placeholder="Search the whole notebook..." value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} /></label>
        <div className="log-filter-grid">
          <label className="log-field">
            Filter entry type
            <select className="filter-control" value={filters.type} onChange={(event) => setFilters({ ...filters, type: event.target.value })}>
              <option value="all">All entry types</option>{logEntryTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <label className="log-field">
            Filter country
            <select className="filter-control" value={filters.country} onChange={(event) => setFilters({ ...filters, country: event.target.value, jurisdiction: "all" })}>
              <option value="all">All countries / unspecified</option>{customerCountries.map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}
            </select>
          </label>
          <label className="log-field">
            Filter jurisdiction
            <select className="filter-control" disabled={filters.country === "all"} value={filters.jurisdiction} onChange={(event) => setFilters({ ...filters, jurisdiction: event.target.value })}>
              <option value="all">{filters.country === "all" ? "Choose country first" : "All jurisdictions / unspecified"}</option>
              {availableRegions.map((region) => <option key={region.id} value={region.id}>{region.name}</option>)}
            </select>
          </label>
          <label className="log-field">
            Filter linked organisation
            <select className="filter-control" value={filters.organisationId} onChange={(event) => setFilters({ ...filters, organisationId: event.target.value })}>
              <option value="all">All organisations / unlinked</option>{organisations.map((organisation) => <option key={organisation.id} value={organisation.id}>{organisation.name}</option>)}
            </select>
          </label>
        </div>
        <LogTagPicker label="Filter tags (matches all selected)" value={filters.tags} onChange={(tags) => setFilters({ ...filters, tags })} />
        <div className="log-row">
          <label className="log-checkbox"><input type="checkbox" checked={filters.outstandingOnly} onChange={(event) => setFilters({ ...filters, outstandingOnly: event.target.checked })} /> Outstanding follow-up only</label>
          <button type="button" className="secondary-button" onClick={() => setFilters({ ...emptyLogFilters, tags: [] })}>Clear filters</button>
        </div>
      </section>
      <div className="log-row">
        <h2 tabIndex={-1} ref={savedHeading}>Notebook entries</h2>
        <p className="log-muted" role="status">{filtered.length} of {entries.length} entries · newest entry date first · times shown locally</p>
      </div>
      {!filtered.length && <section className="panel"><h3>No matching entries</h3><p>Clear filters or start a new fictional entry.</p></section>}
      <div className="log-stack">
        {filtered.map((entry) => (
          <article key={entry.id} className="panel log-stack log-entry-card" aria-labelledby={`log-title-${entry.id}`}>
            <div className="log-row">
              <h3 id={`log-title-${entry.id}`}>{entry.title}</h3>
              <button type="button" className="secondary-button" aria-label={`Edit ${entry.title}`} disabled={draft !== null} onClick={() => { setDraft(entry); setMessage(null); }}>Edit</button>
            </div>
            <div className="log-row log-meta">
              <time dateTime={entry.occurredAt}>{displayDate(entry.occurredAt)}</time>
              <span className="log-badge">{entry.type}</span>
              <span className="log-badge">{entry.evidence === "Confirmed" ? "Confirmed in fictional scenario" : entry.evidence}</span>
            </div>
            <div className="log-tag-options">{entry.tags.map((tag) => <span className="log-badge" key={tag}>{tag}</span>)}{!entry.tags.length && <span className="log-muted">No tags</span>}</div>
            <p className="log-muted">Linked organisations: {entry.organisationIds.length ? entry.organisationIds.map((id) => names.get(id) ?? "Unavailable identity").join("; ") : "None"}</p>
            <p className="log-muted">Location: {entry.country ? `${entry.country === "AU" ? "Australia" : "New Zealand"}${entry.jurisdiction ? ` / ${getCustomerRegionName(entry.country, entry.jurisdiction)}` : " / Unspecified"}` : "Unspecified"}</p>
            <p>{getLogPreview(entry.notes)}</p>
            <details className="log-details">
              <summary>Read full notes / transcript</summary>
              <div className="log-transcript" tabIndex={0} role="region" aria-label={`Full notes: ${entry.title}`}>{entry.notes}</div>
              <p className="log-muted">Source: {entry.source || "Not recorded"} · Updated: {displayDate(entry.updatedAt)} · User attribution unavailable in shared-login demo</p>
            </details>
            {entry.actions.length > 0 && (
              <div className="log-follow-ups">
                <h4>Follow-up actions</h4>
                <ul>{entry.actions.map((action) => <li key={action.id}><strong>{action.completed ? "Resolved" : "Outstanding"}</strong> · {action.title} · Due: {action.dueDate ?? "Unknown"}</li>)}</ul>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
