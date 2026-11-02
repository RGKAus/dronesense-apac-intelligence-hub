"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  fromLocalDateTime, logEntryTypes, logEvidenceStatuses, logTags, MAX_LOG_NOTES, toLocalDateTime,
  type IntelligenceLogEntry, type LogTag,
} from "../lib/intelligenceLog";
import { customerCountries, customerRegions, type CustomerOrganisation } from "../lib/customerOrganisations";

export function LogTagPicker({
  value, onChange, label,
}: { value: LogTag[]; onChange: (value: LogTag[]) => void; label: string }) {
  return (
    <fieldset className="log-tag-picker">
      <legend>{label}</legend>
      <div className="log-tag-options">
        {logTags.map((tag) => (
          <label key={tag} className={value.includes(tag) ? "log-tag-option selected" : "log-tag-option"}>
            <input type="checkbox" checked={value.includes(tag)} onChange={(event) => onChange(
              event.target.checked ? [...value, tag] : value.filter((item) => item !== tag),
            )} />
            {tag}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function IntelligenceLogEditor({
  entry, organisations, onSave, onCancel,
}: {
  entry: IntelligenceLogEntry;
  organisations: CustomerOrganisation[];
  onSave: (draft: IntelligenceLogEntry) => string | null;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(() => structuredClone(entry));
  const [localDateTime, setLocalDateTime] = useState(() => toLocalDateTime(entry.occurredAt));
  const [organisationSearch, setOrganisationSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const notes = useRef<HTMLTextAreaElement>(null);
  const errorSummary = useRef<HTMLParagraphElement>(null);

  useEffect(() => { notes.current?.focus(); }, []);

  const visibleOrganisations = organisations.filter((organisation) =>
    draft.organisationIds.includes(organisation.id) || organisation.name.toLowerCase().includes(organisationSearch.trim().toLowerCase()),
  );

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const occurredAt = fromLocalDateTime(localDateTime);
    if (!occurredAt) {
      setError("Enter a valid local date and time. Nonexistent daylight-saving times are not accepted.");
      return;
    }
    const saveError = onSave({ ...draft, occurredAt });
    setError(saveError);
    if (saveError) requestAnimationFrame(() => errorSummary.current?.focus());
  }

  return (
    <section className="panel log-stack log-editor" aria-labelledby="log-editor-heading">
      <div className="log-row">
        <h2 id="log-editor-heading">{entry.revision ? "Edit entry" : "New entry"}</h2>
        <span className="log-badge">Fictional · memory only</span>
      </div>
      <p className="log-muted" id="log-writing-help">Start writing below. Only notes are required; title defaults to &quot;Untitled fictional entry&quot;. Label fictional text with &quot;Fictional:&quot;. Never paste real meeting notes, contact details or confidential transcripts.</p>
      <form className="log-stack" onSubmit={submit} aria-label={entry.revision ? "Edit intelligence entry" : "New intelligence entry"}>
        <label className="log-field">
          Title (optional)
          <input className="filter-control" maxLength={255} placeholder="Fictional: Daily briefing" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
        </label>
        <div className="log-form-grid">
          <label className="log-field">
            Entry date and time (local)
            <input className="filter-control" type="datetime-local" value={localDateTime} onChange={(event) => setLocalDateTime(event.target.value)} />
          </label>
          <label className="log-field">
            Entry type
            <select className="filter-control" value={draft.type} onChange={(event) => {
              const type = logEntryTypes.find((item) => item === event.target.value);
              if (type) setDraft({ ...draft, type });
            }}>
              {logEntryTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
        </div>
        <label className="log-field">
          Notes / transcript
          <textarea
            className="filter-control log-notes-input" ref={notes} required rows={16}
            maxLength={MAX_LOG_NOTES} aria-describedby="log-writing-help log-character-count"
            placeholder={"Fictional: Write or paste a fictional transcript here.\n\nNo formatting or structured fields required."}
            value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })}
          />
        </label>
        <p className="log-muted" id="log-character-count">{draft.notes.length.toLocaleString("en-AU")} / {MAX_LOG_NOTES.toLocaleString("en-AU")} characters · Text stays in this tab&apos;s memory only</p>
        <LogTagPicker label="Quick tags (optional)" value={draft.tags} onChange={(tags) => setDraft({ ...draft, tags })} />
        <details className="log-details">
          <summary>Organisation links, location and evidence (optional)</summary>
          <div className="log-stack">
            <p className="log-muted">Links reference existing identities only. They do not establish customer status or real meetings. Fictional notes linked to a real Agency are demonstration associations, not facts about that Agency.</p>
            <label className="log-field">
              Find organisation to link
              <input className="filter-control" type="search" value={organisationSearch} onChange={(event) => setOrganisationSearch(event.target.value)} placeholder="Search existing organisation names..." />
            </label>
            <fieldset className="log-organisation-picker">
              <legend>Linked organisations (multiple allowed)</legend>
              <div className="log-organisation-options">
                {visibleOrganisations.map((organisation) => (
                  <label className="log-checkbox" key={organisation.id}>
                    <input type="checkbox" checked={draft.organisationIds.includes(organisation.id)} onChange={(event) => setDraft({
                      ...draft, organisationIds: event.target.checked ? [...draft.organisationIds, organisation.id] : draft.organisationIds.filter((id) => id !== organisation.id),
                    })} />
                    <span>{organisation.name}<small>{organisation.origin === "agency" ? "Canonical Agency identity" : "Existing fictional customer-directory identity"} · {organisation.country}</small></span>
                  </label>
                ))}
                {!visibleOrganisations.length && <p>No existing organisations match. This notebook does not create organisation records.</p>}
              </div>
            </fieldset>
            <p className="log-muted">{draft.organisationIds.length} organisation links selected. Location is optional and is never inferred from links.</p>
            <div className="log-form-grid">
              <label className="log-field">
                Country (optional)
                <select className="filter-control" value={draft.country ?? ""} onChange={(event) => {
                  const country = event.target.value;
                  if (country === "AU" || country === "NZ" || country === "") setDraft({ ...draft, country: country || null, jurisdiction: null });
                }}>
                  <option value="">Unspecified</option>
                  {customerCountries.map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}
                </select>
              </label>
              <label className="log-field">
                State / region (optional)
                <select className="filter-control" disabled={!draft.country} value={draft.jurisdiction ?? ""} onChange={(event) => setDraft({ ...draft, jurisdiction: event.target.value || null })}>
                  <option value="">Unspecified</option>
                  {draft.country && customerRegions[draft.country].map((region) => <option key={region.id} value={region.id}>{region.name}</option>)}
                </select>
              </label>
              <label className="log-field">
                Source (optional unless confirmed)
                <input className="filter-control" maxLength={5000} placeholder="Fictional: Role-play notes" value={draft.source} onChange={(event) => setDraft({ ...draft, source: event.target.value })} />
              </label>
              <label className="log-field">
                Evidence status
                <select className="filter-control" value={draft.evidence} onChange={(event) => {
                  const evidence = logEvidenceStatuses.find((item) => item === event.target.value);
                  if (evidence) setDraft({ ...draft, evidence });
                }}>
                  {logEvidenceStatuses.map((status) => <option key={status} value={status}>{status === "Confirmed" ? "Confirmed in fictional scenario" : status}</option>)}
                </select>
              </label>
            </div>
          </div>
        </details>
        <details className="log-details">
          <summary>Follow-up actions (optional) · {draft.actions.length}</summary>
          <div className="log-stack">
            {draft.actions.map((action, index) => (
              <fieldset className="log-action-editor log-stack" key={action.id}>
                <legend>Follow-up {index + 1}</legend>
                <label className="log-field">Action<input className="filter-control" maxLength={1000} placeholder="Fictional: Arrange a review" value={action.title} onChange={(event) => setDraft({ ...draft, actions: draft.actions.map((item) => item.id === action.id ? { ...item, title: event.target.value } : item) })} /></label>
                <label className="log-field">Due date (optional)<input className="filter-control" type="date" value={action.dueDate ?? ""} onChange={(event) => setDraft({ ...draft, actions: draft.actions.map((item) => item.id === action.id ? { ...item, dueDate: event.target.value || null } : item) })} /></label>
                <label className="log-checkbox"><input type="checkbox" checked={action.completed} onChange={(event) => setDraft({ ...draft, actions: draft.actions.map((item) => item.id === action.id ? { ...item, completed: event.target.checked } : item) })} /> Resolved</label>
                <button className="secondary-button" type="button" onClick={() => setDraft({ ...draft, actions: draft.actions.filter((item) => item.id !== action.id) })}>Remove follow-up {index + 1}</button>
              </fieldset>
            ))}
            <button type="button" className="secondary-button" onClick={() => setDraft({ ...draft, actions: [...draft.actions, { id: crypto.randomUUID(), title: "", dueDate: null, completed: false }] })}>Add follow-up</button>
          </div>
        </details>
        {error && <p className="log-error" role="alert" ref={errorSummary} tabIndex={-1}>{error}</p>}
        <div className="log-editor-actions">
          <div className="log-row">
            <button className="primary-button" type="submit">Save entry</button>
            <button className="secondary-button" type="button" onClick={onCancel}>Cancel</button>
          </div>
          <p>Save updates memory only. Reloading or leaving this module discards entries and drafts.</p>
        </div>
      </form>
    </section>
  );
}
