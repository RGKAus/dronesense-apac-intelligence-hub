import {
  customerRegions, getCanonicalCustomerOrganisations, type CustomerCountry, type CustomerOrganisation,
} from "./customerOrganisations";
import { demoOrganisations } from "./customerDemo";

export const logEntryTypes = ["Meeting", "Call", "Research", "General"] as const;
export const logTags = ["Customer", "Partner", "Competitor", "Procurement", "Technology", "Regulatory", "Internal", "Action Required"] as const;
export const logEvidenceStatuses = ["Not assessed", "Unknown", "Reported / unverified", "Confirmed"] as const;
export type LogTag = typeof logTags[number];
export type LogEntryType = typeof logEntryTypes[number];
export type LogEvidenceStatus = typeof logEvidenceStatuses[number];

export type LogAction = {
  id: string;
  title: string;
  dueDate: string | null;
  completed: boolean;
};

export type IntelligenceLogEntry = {
  id: string;
  title: string;
  occurredAt: string;
  type: LogEntryType;
  notes: string;
  tags: LogTag[];
  organisationIds: string[];
  country: CustomerCountry | null;
  jurisdiction: string | null;
  actions: LogAction[];
  source: string;
  evidence: LogEvidenceStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  revision: number;
};

export type LogFilters = {
  search: string;
  type: string;
  tags: LogTag[];
  country: string;
  jurisdiction: string;
  organisationId: string;
  outstandingOnly: boolean;
};
export const emptyLogFilters: LogFilters = {
  search: "", type: "all", tags: [], country: "all", jurisdiction: "all",
  organisationId: "all", outstandingOnly: false,
};

// References only: never copy agency leadership, customer relationships or handover intelligence.
export function getLogOrganisations(): CustomerOrganisation[] {
  const identities = [...getCanonicalCustomerOrganisations(), ...demoOrganisations];
  return Array.from(new Map(identities.map((identity) => [identity.id, identity])).values())
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function createLogEntry(id: string, now: Date): IntelligenceLogEntry {
  const timestamp = now.toISOString();
  return {
    id, title: "", occurredAt: timestamp, type: "General", notes: "", tags: [],
    organisationIds: [], country: null, jurisdiction: null, actions: [],
    source: "", evidence: "Not assessed", createdAt: timestamp, updatedAt: timestamp,
    createdBy: null, updatedBy: null, revision: 0,
  };
}

export function toLocalDateTime(timestamp: string): string {
  const date = new Date(timestamp);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function fromLocalDateTime(value: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime()) || toLocalDateTime(date.toISOString()) !== value) return null;
  return date.toISOString();
}

export function formatLogDate(timestamp: string): string {
  return new Intl.DateTimeFormat("en-AU", { dateStyle: "medium", timeStyle: "short" }).format(new Date(timestamp));
}

export const MAX_LOG_NOTES = 200_000;

export function logDemoTextError(text: string, maxLength = MAX_LOG_NOTES): string | null {
  if (!text.trim()) return null;
  if (text.length > maxLength) return `Use at most ${maxLength.toLocaleString("en-AU")} characters in this field.`;
  // Transcript timestamps and ISO dates are not telephone numbers.
  const withoutTimestamps = text.replace(/\b\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2})?)?\b|\b\d{1,2}:\d{2}(?::\d{2})?\b/g, "");
  if (/\S+@\S+|https?:\/\/|mailto:|tel:|(?:\+?\d[\s().-]*){8,}/i.test(withoutTimestamps)) {
    return "Emails, phone numbers and URLs are not permitted in demonstration entries.";
  }
  if (!/\bfictional\b|\bdemo\b/i.test(text)) {
    return 'Use fictional text only, labelled "Fictional:" or "Demo:". Never paste real transcripts.';
  }
  return null;
}

export function validateLogEntry(entry: IntelligenceLogEntry, organisations: CustomerOrganisation[]): string | null {
  if (!entry.id || !entry.notes.trim()) return "Write a fictional note or transcript before saving.";
  if (entry.notes.length > MAX_LOG_NOTES) return `Notes must not exceed ${MAX_LOG_NOTES.toLocaleString("en-AU")} characters.`;
  if (!entry.occurredAt || Number.isNaN(Date.parse(entry.occurredAt))) return "Choose a valid entry date and local time.";
  if (!logEntryTypes.includes(entry.type) || !logEvidenceStatuses.includes(entry.evidence)) return "Choose a valid entry type and evidence status.";
  if (new Set(entry.tags).size !== entry.tags.length || entry.tags.some((tag) => !logTags.includes(tag))) return "Choose valid, unique quick tags.";
  const ids = new Set(organisations.map((organisation) => organisation.id));
  if (new Set(entry.organisationIds).size !== entry.organisationIds.length || entry.organisationIds.some((id) => !ids.has(id))) {
    return "Link existing organisations only; no new identities are created by this notebook.";
  }
  if (entry.country !== null && entry.country !== "AU" && entry.country !== "NZ") return "Select a supported country or leave it unspecified.";
  if (entry.jurisdiction && (!entry.country || !customerRegions[entry.country].some((region) => region.id === entry.jurisdiction))) {
    return "Select a jurisdiction belonging to the selected country, or leave it unspecified.";
  }
  if (entry.evidence === "Confirmed" && !entry.source.trim()) return "A confirmed fictional entry requires an information source.";
  for (const [text, limit] of [[entry.title, 255], [entry.notes, MAX_LOG_NOTES], [entry.source, 5000]] as const) {
    const error = logDemoTextError(text, limit);
    if (error) return error;
  }
  if (new Set(entry.actions.map((action) => action.id)).size !== entry.actions.length) return "Follow-up actions need unique identities.";
  for (const action of entry.actions) {
    if (!action.id || !action.title.trim()) return "Give each follow-up action a fictional title, or remove the empty action.";
    const error = logDemoTextError(action.title, 1000);
    if (error) return error;
    if (action.dueDate && (!/^\d{4}-\d{2}-\d{2}$/.test(action.dueDate) ||
      Number.isNaN(Date.parse(action.dueDate)) || new Date(action.dueDate).toISOString().slice(0, 10) !== action.dueDate)) return "Use valid follow-up dates, or leave unknown dates blank.";
  }
  return null;
}

export function saveLogEntry(
  entries: IntelligenceLogEntry[], draft: IntelligenceLogEntry, organisations: CustomerOrganisation[], now: Date,
): { entries: IntelligenceLogEntry[]; error: string | null } {
  const error = validateLogEntry(draft, organisations);
  if (error) return { entries, error };
  const existing = entries.find((entry) => entry.id === draft.id);
  if ((existing && existing.revision !== draft.revision) || (!existing && draft.revision !== 0)) {
    return { entries, error: "This entry changed or is no longer available. Cancel and reopen it before editing." };
  }
  const saved = structuredClone({
    ...draft, title: draft.title.trim() || "Untitled fictional entry",
    createdAt: existing?.createdAt ?? now.toISOString(), updatedAt: now.toISOString(),
    createdBy: existing?.createdBy ?? null, updatedBy: null, revision: (existing?.revision ?? 0) + 1,
  });
  return { entries: existing ? entries.map((entry) => entry.id === saved.id ? saved : entry) : [...entries, saved], error: null };
}

export function filterLogEntries(
  entries: IntelligenceLogEntry[], filters: LogFilters, organisations: CustomerOrganisation[],
): IntelligenceLogEntry[] {
  const names = new Map(organisations.map((organisation) => [organisation.id, organisation.name]));
  const query = filters.search.trim().toLocaleLowerCase();
  return entries.filter((entry) => {
    const searchable = [entry.title, entry.notes, entry.source, ...entry.tags,
      ...entry.organisationIds.map((id) => names.get(id) ?? ""), ...entry.actions.map((action) => action.title)].join(" ").toLocaleLowerCase();
    return (!query || searchable.includes(query)) &&
      (filters.type === "all" || entry.type === filters.type) &&
      filters.tags.every((tag) => entry.tags.includes(tag)) &&
      (filters.country === "all" || entry.country === filters.country) &&
      (filters.jurisdiction === "all" || entry.jurisdiction === filters.jurisdiction) &&
      (filters.organisationId === "all" || entry.organisationIds.includes(filters.organisationId)) &&
      (!filters.outstandingOnly || entry.actions.some((action) => !action.completed));
  }).sort((a, b) => Date.parse(b.occurredAt) - Date.parse(a.occurredAt) ||
    Date.parse(b.createdAt) - Date.parse(a.createdAt) || a.id.localeCompare(b.id));
}

export function getLogEntriesForOrganisation(entries: IntelligenceLogEntry[], organisationId: string): IntelligenceLogEntry[] {
  return filterLogEntries(entries, { ...emptyLogFilters, organisationId }, []);
}

export function getLogPreview(notes: string, maxLength = 200): string {
  const text = notes.replace(/\s+/g, " ").trim();
  return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}...` : text;
}

export function getDemoLogEntries(): IntelligenceLogEntry[] {
  const meeting = createLogEntry("demo-log-meeting", new Date("2026-10-28T02:00:00Z"));
  const research = createLogEntry("demo-log-research", new Date("2026-10-27T04:30:00Z"));
  const general = createLogEntry("demo-log-general", new Date("2026-10-26T01:00:00Z"));
  return [
    { ...meeting, title: "Fictional: State handover briefing", type: "Meeting", revision: 1,
      notes: "Fictional transcript for training only. No real conversation or customer is represented.\n\n09:00 Alex Example: Let us review the demonstration handover.\n09:02 Taylor Example: Requirements and contract dates are unknown. Record an explicit follow-up rather than guessing.\n09:05 Alex Example: Agreed. Arrange a fictional requirements review.",
      tags: ["Customer", "Action Required"], organisationIds: ["demo-wa"], country: "AU", jurisdiction: "western-australia",
      source: "Fictional: role-play exercise", evidence: "Reported / unverified",
      actions: [{ id: "demo-log-action", title: "Fictional: Arrange a requirements review", dueDate: null, completed: false }] },
    { ...research, title: "Fictional: Regional procurement research", type: "Research", revision: 1,
      notes: "Fictional research notebook. Explore how the example organisation might approach procurement. No tender, threshold, contract or commercial commitment is asserted.\n\nResearch required: locate authoritative documentation before making any claim.",
      tags: ["Procurement", "Regulatory"], country: "NZ", jurisdiction: "canterbury", evidence: "Unknown" },
    { ...general, title: "Fictional: Daily notebook", revision: 1,
      notes: "Fictional general note. Use this notebook for free writing, then optionally add tags, organisation links and follow-up actions. All content is a demonstration.",
      tags: ["Internal"], source: "Fictional: interface example" },
  ];
}
