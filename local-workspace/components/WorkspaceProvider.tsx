"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import {
  CustomerDemoContext, type CustomerDemoContextValue,
} from "../../web-app/components/CustomerDemoProvider";
import {
  createBlankDemoCustomer, findExistingOrganisation, updateDemoField, validateDemoOrganisation,
} from "../../web-app/lib/customerDemo";
import { emptyCustomerFilters, type CustomerFilters } from "../../web-app/lib/customers";
import { parseSnapshot, type Snapshot, type Workspace } from "../lib/workspace";

type LocalContext = {
  snapshot: Snapshot;
  backups: string[];
  change: (data: Workspace) => Promise<string | null>;
  backup: () => Promise<string | null>;
  restore: (file: string) => Promise<string | null>;
};
const Context = createContext<LocalContext | null>(null);

async function responseJson(response: Response) {
  const parsed: unknown = await response.json();
  if (!response.ok) throw new Error(parsed && typeof parsed === "object" && "error" in parsed &&
    typeof parsed.error === "string" ? parsed.error : "Local request failed. No success is assumed.");
  return parsed;
}

function parseBackups(value: unknown): string[] {
  if (!value || typeof value !== "object" || !("backups" in value) ||
    !Array.isArray(value.backups) || !value.backups.every((item): item is string => typeof item === "string")) {
    throw new Error("Invalid backup list returned by local storage.");
  }
  return value.backups;
}

export default function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const current = useRef<Snapshot | null>(null);
  const csrf = useRef("");
  const busy = useRef(false);
  const [backups, setBackups] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CustomerFilters>(emptyCustomerFilters);
  const commit = useCallback((next: Snapshot) => { current.current = next; setSnapshot(next); }, []);
  useEffect(() => {
    let active = true;
    fetch("/local-api/state", { cache: "no-store" }).then(responseJson).then((value) => {
      if (active) {
        const next = parseSnapshot(value);
        if (!value || typeof value !== "object" || !("csrf" in value) || typeof value.csrf !== "string") throw new Error("Missing local session protection.");
        csrf.current = value.csrf; setBackups(parseBackups(value)); commit(next);
      }
    }).catch((failure: unknown) => { if (active) setError(failure instanceof Error ? failure.message : "Local workspace could not load."); });
    const timer = setTimeout(() => {
      setSnapshot(null);
      fetch("/local-api/lock", {
        method: "POST", headers: { "Content-Type": "application/json", "X-Workspace-CSRF": csrf.current }, body: "{}",
      }).then(responseJson).then(() => window.location.replace("/unlock")).catch((failure: unknown) => {
        setError(`Automatic lock could not be confirmed. Close this tab and stop the launcher. ${failure instanceof Error ? failure.message : "Local connection failed."}`);
      });
    }, 30 * 60_000);
    return () => { active = false; clearTimeout(timer); };
  }, [commit]);

  async function request(url: string, method: string, body: unknown) {
    return responseJson(await fetch(url, {
      method, cache: "no-store", headers: { "Content-Type": "application/json", "X-Workspace-CSRF": csrf.current },
      body: JSON.stringify(body),
    }));
  }
  async function change(data: Workspace) {
    if (!current.current || busy.current) return "Another local operation is pending. Wait for it before saving.";
    busy.current = true;
    try {
      const next = await request("/local-api/state", "PUT", { revision: current.current.revision, data });
      commit(parseSnapshot(next)); setError(null); return null;
    } catch (failure) {
      const message = failure instanceof Error ? failure.message : "Local save failed. Your draft is not saved.";
      setError(message); return message;
    } finally { busy.current = false; }
  }
  async function backup() {
    if (busy.current) return "Wait for the current operation.";
    busy.current = true;
    try {
      const result = await request("/local-api/backup", "POST", {});
      setBackups(parseBackups(result)); return null;
    } catch (failure) { return failure instanceof Error ? failure.message : "Backup failed."; }
    finally { busy.current = false; }
  }
  async function restore(file: string) {
    if (!current.current || busy.current) return "Wait for the current operation.";
    busy.current = true;
    try {
      const result = await request("/local-api/restore", "POST", { file, revision: current.current.revision });
      const next = parseSnapshot(result);
      const restoredBackups = parseBackups(result);
      commit(next);
      setError(null);
      setBackups(restoredBackups);
      return null;
    } catch (failure) { return failure instanceof Error ? failure.message : "Restore failed. Check the workspace before continuing."; }
    finally { busy.current = false; }
  }
  if (!snapshot) return <section className="panel"><h2>Local workspace</h2><p role="status">{error ?? "Loading local fictional records..."}</p>{error && <button className="secondary-button" onClick={() => window.location.reload()}>Retry loading</button>}</section>;
  const data = snapshot.data;
  const customerContext: CustomerDemoContextValue = {
    ...data, persistence: "local", filters, setFilters,
    createCustomer: async (name, country, region) => {
      const latest = current.current!.data;
      const result = createBlankDemoCustomer(latest, name, country, region, `demo-custom-${crypto.randomUUID()}`);
      if (result.error) return { error: result.error };
      if (result.state === latest) return { error: null, organisationId: result.organisationId };
      const error = await change({ ...latest, ...result.state });
      return { error, organisationId: error ? undefined : result.organisationId };
    },
    saveField: async (id, key, value) => {
      const latest = current.current!.data;
      const result = updateDemoField(latest, id, key, value, new Date().toISOString());
      return result.error ?? await change({ ...latest, ...result.state });
    },
    saveOrganisation: async (organisation) => {
      const latest = current.current!.data;
      const invalid = validateDemoOrganisation(organisation);
      if (invalid) return invalid;
      if (!latest.organisations.some((item) => item.id === organisation.id && item.origin === "demonstration")) return "Existing fictional identities only.";
      if (findExistingOrganisation(organisation.name, organisation.country, latest.organisations.filter((item) => item.id !== organisation.id))) return "Organisation already exists. Reuse its identity.";
      return change({
        ...latest, organisations: latest.organisations.map((item) => item.id === organisation.id ? organisation : item),
        handovers: latest.handovers.map((item) => item.organisationId === organisation.id ? { ...item, updatedAt: new Date().toISOString() } : item),
      });
    },
  };
  return (
    <Context.Provider value={{ snapshot, backups, change, backup, restore }}>
      <CustomerDemoContext.Provider value={customerContext}>
        <aside className="customer-demo-notice">
          <strong>Isolated local prototype - fictional data only</strong>
          <p>Save persists to SQLite on this Mac, outside Git and OneDrive. No corporate approval for real records. No emails, phone numbers, real transcripts or Salesforce account entry. Unsaved drafts are not persisted. This page locks after 30 minutes.</p>
        </aside>
        {error && <p className="customer-error" role="alert">{error} Reload to get the latest saved workspace; copy only fictional draft text if needed.</p>}
        <button className="secondary-button" type="button" onClick={async () => {
          try { await request("/local-api/lock", "POST", {}); window.location.replace("/unlock"); }
          catch (failure) { setError(failure instanceof Error ? failure.message : "Lock failed."); }
        }}>Lock workspace</button>
        {children}
      </CustomerDemoContext.Provider>
    </Context.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(Context);
  if (!context) throw new Error("Local workspace is not loaded.");
  return context;
}
