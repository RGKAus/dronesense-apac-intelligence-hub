import {
  demoOrganisations, getInitialDemoHandovers, validateDemoHandover, validateDemoOrganisation,
  normaliseOrganisationName, type CustomerDemoState,
} from "../../web-app/lib/customerDemo";
import { getCanonicalCustomerOrganisations } from "../../web-app/lib/customerOrganisations";
import { getCompletionError, type CustomerContract } from "../../web-app/lib/customers";
import { getDemoLogEntries, validateLogEntry, type IntelligenceLogEntry } from "../../web-app/lib/intelligenceLog";

export type Workspace = CustomerDemoState & { entries: IntelligenceLogEntry[] };
export type Snapshot = { revision: number; data: Workspace };

export function parseSnapshot(value: unknown): Snapshot {
  if (!value || typeof value !== "object" || !("revision" in value) ||
    typeof value.revision !== "number" || !Number.isSafeInteger(value.revision) || value.revision < 1 ||
    !("data" in value)) throw new Error("Invalid local workspace response.");
  validateWorkspace(value.data);
  return { revision: value.revision, data: value.data };
}

export function initialWorkspace(): Workspace {
  return {
    organisations: [...getCanonicalCustomerOrganisations(), ...structuredClone(demoOrganisations)],
    handovers: getInitialDemoHandovers(), entries: getDemoLogEntries(),
  };
}

type Shape = "string" | "number" | "boolean" | "nullable-string" | { array: Shape } |
  { object: Record<string, Shape> } | { nullable: Shape };
const array = (value: Shape): Shape => ({ array: value });
const object = (value: Record<string, Shape>): Shape => ({ object: value });
const intelligence = (value: Shape): Shape => object({
  value: { nullable: value }, evidence: "string", review: "string", source: "string",
});
const action = object({ id: "string", title: "string", dueDate: "nullable-string", completed: "boolean" });
const transaction = object({ id: "string", amount: "nullable-string", date: "nullable-string" });
const contractFields: Record<keyof CustomerContract, Shape> = {
  id: "string", products: array("string"), value: "nullable-string", currency: "nullable-string", otherCurrency: "string",
  taxTreatment: "string", taxNotes: "string", paymentArrangement: "string", invoices: array(transaction), payments: array(transaction),
  startDate: "nullable-string", expiryDate: "nullable-string", renewalDate: "nullable-string", procurementMethod: "string",
  jurisdictionDetails: "string", reference: "string", renewalPlans: "string", source: "string", evidence: "string",
};
const logFields: Record<keyof IntelligenceLogEntry, Shape> = {
  id: "string", title: "string", occurredAt: "string", type: "string", notes: "string", tags: array("string"),
  organisationIds: array("string"), country: "nullable-string", jurisdiction: "nullable-string", actions: array(action),
  source: "string", evidence: "string", createdAt: "string", updatedAt: "string", createdBy: "nullable-string",
  updatedBy: "nullable-string", revision: "number",
};
const workspaceShape = object({
  organisations: array(object({ id: "string", name: "string", country: "string", region: "string", sector: "string", origin: "string" })),
  handovers: array(object({
    organisationId: "string", classification: intelligence("string"), status: "string",
    sections: object({
      versatermProducts: intelligence(array("string")), competitorProducts: intelligence("string"),
      contacts: intelligence(array(object({ name: "string", jobTitle: "string" }))),
      notes: intelligence("string"), opportunities: intelligence("string"), procurement: intelligence("string"),
      contracts: intelligence(array(object(contractFields))),
    }),
    actions: array(action), salesforceAccountUrl: "nullable-string", updatedAt: "nullable-string", source: "string",
  })),
  entries: array(object(logFields)),
});

function matches(value: unknown, shape: Shape): boolean {
  if (typeof shape === "string") {
    if (shape === "nullable-string") return value === null || typeof value === "string";
    return typeof value === shape && (typeof value !== "number" || Number.isSafeInteger(value));
  }
  if ("nullable" in shape) return value === null || matches(value, shape.nullable);
  if ("array" in shape) return Array.isArray(value) && value.length <= 5000 && value.every((item) => matches(item, shape.array));
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const keys = Object.keys(shape.object);
  return Object.keys(value).length === keys.length && keys.every((key) => key in value &&
    matches(Reflect.get(value, key), shape.object[key]));
}

function isWorkspace(value: unknown): value is Workspace {
  return matches(value, workspaceShape);
}

function unique(values: string[], label: string) {
  if (new Set(values).size !== values.length || values.some((value) => !/^[a-zA-Z0-9][a-zA-Z0-9-]{0,199}$/.test(value))) throw new Error(`${label} identities must be unique, nonempty IDs.`);
}

export function validateWorkspace(value: unknown): asserts value is Workspace {
  if (!isWorkspace(value)) throw new Error("Invalid workspace schema; unsupported fields or types. Restore a compatible fictional backup.");
  if (new TextEncoder().encode(JSON.stringify(value)).length > 6_000_000) throw new Error("Prototype workspace limit is 6 MB. No records were saved; review the fictional test data.");
  unique(value.organisations.map((item) => item.id), "Organisation");
  unique(value.handovers.map((item) => item.organisationId), "Customer");
  unique(value.entries.map((item) => item.id), "Entry");
  const canonical = getCanonicalCustomerOrganisations();
  const canonicalMap = new Map(canonical.map((item) => [item.id, item]));
  if (value.organisations.filter((item) => item.origin === "agency").length !== canonical.length) throw new Error("Canonical Agency identities cannot be added or removed.");
  for (const organisation of value.organisations) {
    const error = organisation.origin === "agency"
      ? JSON.stringify(organisation) !== JSON.stringify(canonicalMap.get(organisation.id)) ? "Canonical Agency identity is read-only." : null
      : validateDemoOrganisation(organisation);
    if (error) throw new Error(error);
  }
  const names = value.organisations.map((item) => `${item.country}:${normaliseOrganisationName(item.name)}`);
  if (new Set(names).size !== names.length) throw new Error("Organisation name already exists; reuse the existing identity.");
  for (const record of value.handovers) {
    if (!value.organisations.some((item) => item.id === record.organisationId && item.origin === "demonstration")) throw new Error("Customer must reference an existing fictional organisation.");
    const error = validateDemoHandover(record) ?? getCompletionError(record);
    if (error) throw new Error(error);
    unique(record.actions.map((item) => item.id), "Follow-up");
    if (record.updatedAt !== null && !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/.test(record.updatedAt)) throw new Error("Invalid customer update timestamp.");
    unique((record.sections.contracts.value ?? []).map((item) => item.id), "Contract");
    for (const contract of record.sections.contracts.value ?? []) {
      if (!/^(?:[A-Z]{3})?$/.test(contract.otherCurrency)) throw new Error("Currency must be blank or a three-letter code.");
      unique(contract.invoices.map((item) => item.id), "Invoice");
      unique(contract.payments.map((item) => item.id), "Payment");
    }
  }
  for (const entry of value.entries) {
    const error = validateLogEntry(entry, value.organisations);
    if (error) throw new Error(error);
    if (!Number.isSafeInteger(entry.revision) || entry.revision < 1 ||
      [entry.occurredAt, entry.createdAt, entry.updatedAt].some((date) => !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/.test(date) || Number.isNaN(Date.parse(date))) ||
      entry.createdBy !== null || entry.updatedBy !== null) throw new Error("Invalid demo entry revision, timestamps or attribution.");
  }
}

export const workspaceSchemaVersion = 1;
