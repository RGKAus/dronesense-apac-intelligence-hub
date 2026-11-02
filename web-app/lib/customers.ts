import type { CustomerOrganisation } from "./customerOrganisations";
import { getVersatermProductNames, type VersatermProductId } from "./versatermProducts";

export const handoverStatuses = [
  "Not Started", "In Progress", "Completed", "Follow-up Required",
] as const;
export type HandoverStatus = typeof handoverStatuses[number];
export type EvidenceStatus = "unknown" | "reported" | "confirmed";
export type CustomerClassification = "Customer" | "Prospect";

export type IntelligenceValue<T> = {
  value: T | null;
  evidence: EvidenceStatus;
  review: "not-reviewed" | "reviewed";
  source: string;
};

export const handoverSections = [
  { key: "versatermProducts", label: "Versaterm products currently used" },
  { key: "competitorProducts", label: "Competitor intelligence" },
  { key: "contacts", label: "Key contacts - names and job titles only" },
  { key: "notes", label: "Conversation history / handover notes" },
  { key: "opportunities", label: "Known opportunities and next steps" },
  { key: "procurement", label: "Procurement plans, tenders and RFPs" },
  { key: "contracts", label: "Versaterm Commercial & Contract History" },
] as const;
export type HandoverSectionKey = typeof handoverSections[number]["key"];
export type CustomerContact = { name: string; jobTitle: string };
export const procurementMethods = [
  "Unknown", "Open Tender", "Selective/Limited Tender", "Sole Source/Direct Award",
  "Panel/Framework", "Other",
] as const;
export const taxTreatments = ["Unknown", "GST/tax inclusive", "GST/tax exclusive", "Exempt / not applicable", "Other"] as const;
export type ContractTransaction = { id: string; amount: string | null; date: string | null };
export type CustomerContract = {
  id: string;
  products: VersatermProductId[];
  value: string | null;
  currency: "AUD" | "NZD" | "USD" | "Other" | null;
  otherCurrency: string;
  taxTreatment: typeof taxTreatments[number];
  taxNotes: string;
  paymentArrangement: string;
  invoices: ContractTransaction[];
  payments: ContractTransaction[];
  startDate: string | null;
  expiryDate: string | null;
  renewalDate: string | null;
  procurementMethod: typeof procurementMethods[number];
  jurisdictionDetails: string;
  reference: string;
  renewalPlans: string;
  source: string;
  evidence: EvidenceStatus;
};

export function createEmptyContract(id: string): CustomerContract {
  return {
    id, products: [], value: null, currency: null, otherCurrency: "",
    taxTreatment: "Unknown", taxNotes: "", paymentArrangement: "", invoices: [], payments: [],
    startDate: null, expiryDate: null, renewalDate: null, procurementMethod: "Unknown",
    jurisdictionDetails: "", reference: "", renewalPlans: "", source: "", evidence: "unknown",
  };
}

export type HandoverSections = {
  versatermProducts: IntelligenceValue<VersatermProductId[]>;
  competitorProducts: IntelligenceValue<string>;
  contacts: IntelligenceValue<CustomerContact[]>;
  notes: IntelligenceValue<string>;
  opportunities: IntelligenceValue<string>;
  procurement: IntelligenceValue<string>;
  contracts: IntelligenceValue<CustomerContract[]>;
};
export type FollowUpAction = {
  id: string;
  title: string;
  dueDate: string | null;
  completed: boolean;
};
export type CustomerHandover = {
  organisationId: string;
  classification: IntelligenceValue<CustomerClassification>;
  status: HandoverStatus;
  sections: HandoverSections;
  actions: FollowUpAction[];
  salesforceAccountUrl: string | null;
  updatedAt: string | null;
  source: string;
};

export function unknownValue<T>(): IntelligenceValue<T> {
  return { value: null, evidence: "unknown", review: "not-reviewed", source: "" };
}

export function createEmptyHandover(organisationId: string): CustomerHandover {
  return {
    organisationId,
    classification: unknownValue(),
    status: "Not Started",
    sections: {
      versatermProducts: unknownValue(),
      competitorProducts: unknownValue(),
      contacts: unknownValue(),
      notes: unknownValue(),
      opportunities: unknownValue(),
      procurement: unknownValue(),
      contracts: unknownValue(),
    },
    actions: [],
    salesforceAccountUrl: null,
    updatedAt: null,
    source: "",
  };
}

function isResolved(value: IntelligenceValue<unknown>): boolean {
  if (value.review !== "reviewed") return false;
  if (value.evidence === "unknown") return value.value === null;
  if (value.value === null || !value.source.trim()) return false;
  if (typeof value.value === "string") return value.value.trim().length > 0;
  return true;
}

export function getHandoverCompleteness(record: CustomerHandover) {
  const checks = [
    { key: "classification", label: "Customer/prospect classification", ...record.classification },
    ...handoverSections.map(({ key, label }) => ({ key, label, ...record.sections[key] })),
  ];
  const resolved = checks.filter(isResolved).length;
  const confirmed = checks.filter((check) => isResolved(check) && check.evidence === "confirmed").length;
  const reported = checks.filter((check) => isResolved(check) && check.evidence === "reported").length;
  const unknown = checks.filter((check) => isResolved(check) && check.evidence === "unknown").length;
  return {
    total: checks.length,
    resolved,
    confirmed,
    reported,
    unknown,
    notReviewed: checks.length - resolved,
    percent: Math.round((resolved / checks.length) * 100),
    missing: checks.filter((check) => !isResolved(check)).map(({ key, label }) => ({ key, label })),
  };
}

export function getCompletionError(record: CustomerHandover): string | null {
  if (record.status !== "Completed") return null;
  if (getHandoverCompleteness(record).notReviewed > 0) {
    return "Review all eight handover areas before marking Completed. Reviewed Unknown is allowed.";
  }
  if (record.actions.some((action) => !action.completed)) {
    return "Resolve outstanding follow-up actions before marking the handover Completed.";
  }
  return null;
}

export type EditableHandoverFields = HandoverSections & Pick<CustomerHandover, "classification" | "status" | "actions">;
export type EditableHandoverKey = keyof EditableHandoverFields;

export function getHandoverField<K extends EditableHandoverKey>(record: CustomerHandover, key: K): EditableHandoverFields[K] {
  return { ...record.sections, classification: record.classification, status: record.status, actions: record.actions }[key];
}

// Patch only the named section into the latest record, never a whole stale profile draft.
export function patchHandoverField<K extends EditableHandoverKey>(
  record: CustomerHandover, key: K, value: EditableHandoverFields[K], updatedAt: string,
): CustomerHandover {
  let updated = key === "classification" || key === "status" || key === "actions"
    ? { ...record, [key]: structuredClone(value), updatedAt }
    : { ...record, sections: { ...record.sections, [key]: structuredClone(value) }, updatedAt };
  if (key !== "status" && updated.status === "Completed" && getCompletionError(updated)) {
    updated = { ...updated, status: "In Progress" };
  }
  return updated;
}

export type CustomerFilters = {
  search: string;
  country: string;
  region: string;
  classification: string;
  status: string;
  outstandingOnly: boolean;
  includeAgencies: boolean;
};
export const emptyCustomerFilters: CustomerFilters = {
  search: "", country: "all", region: "all", classification: "all", status: "all",
  outstandingOnly: false, includeAgencies: false,
};

export function matchesCustomerFilters(
  organisation: CustomerOrganisation,
  handover: CustomerHandover | undefined,
  filters: CustomerFilters,
): boolean {
  const classification = handover?.classification.evidence === "unknown"
    ? "Unclassified" : handover?.classification.value ?? "Unclassified";
  return (
    (filters.includeAgencies || handover !== undefined) &&
    organisation.name.toLowerCase().includes(filters.search.trim().toLowerCase()) &&
    (filters.country === "all" || organisation.country === filters.country) &&
    (filters.region === "all" || organisation.region === filters.region) &&
    (filters.classification === "all" || classification === filters.classification) &&
    (filters.status === "all" || (handover?.status ?? "Not Started") === filters.status) &&
    (!filters.outstandingOnly || Boolean(handover?.actions.some((action) => !action.completed)))
  );
}

export function isSalesforceAccountPath(path: string): boolean {
  return /^\/lightning\/r\/Account\/001[a-zA-Z0-9]{12}(?:[a-zA-Z0-9]{3})?\/view\/?$/.test(path) ||
    /^\/001[a-zA-Z0-9]{12}(?:[a-zA-Z0-9]{3})?\/?$/.test(path);
}

export function getSalesforceAccountUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    const approvedHost = /^[a-z0-9-]+(?:\.sandbox)?\.my\.salesforce\.com$/.test(url.hostname) ||
      /^[a-z0-9-]+(?:\.sandbox)?\.lightning\.force\.com$/.test(url.hostname);
    if (
      url.protocol !== "https:" || !approvedHost || url.username || url.password ||
      url.port || url.search || url.hash || !isSalesforceAccountPath(url.pathname)
    ) return null;
    return url.href;
  } catch {
    // An invalid URL is displayed as an explicit unavailable/invalid-link state by the profile.
    return null;
  }
}

export function formatCustomerDate(value: string | null): string {
  if (!value) return "Unknown";
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit", month: "short", year: "numeric", timeZone: "UTC",
  }).format(new Date(value));
}

export function describeSection(key: HandoverSectionKey, sections: HandoverSections): string {
  const field = sections[key];
  if (field.review === "not-reviewed") return "Not yet reviewed";
  if (field.evidence === "unknown" || field.value === null) return "Unknown - research required";
  switch (key) {
    case "contacts": {
      const contacts = sections.contacts.value ?? [];
      return contacts.length ? contacts.map(({ name, jobTitle }) => `${name} - ${jobTitle || "Job title unknown"}`).join("\n") : "No key contacts recorded (reviewed).";
    }
    case "versatermProducts": {
      const products = sections.versatermProducts.value ?? [];
      return products.length ? getVersatermProductNames(products) : "No products recorded (explicitly reviewed).";
    }
    case "contracts": {
      const contracts = sections.contracts.value ?? [];
      return contracts.length ? `${contracts.length} contract records` : "No contracts recorded (explicitly reviewed).";
    }
    default:
      return String(field.value);
  }
}
