import { customerRegions, type CustomerCountry, type CustomerOrganisation } from "./customerOrganisations";
import {
  createEmptyHandover, handoverSections, handoverStatuses, procurementMethods, taxTreatments,
  patchHandoverField, getCompletionError,
  type CustomerContract, type CustomerHandover, type HandoverSections,
  type IntelligenceValue, type EditableHandoverKey, type EditableHandoverFields,
} from "./customers";
import { versatermProducts } from "./versatermProducts";

export const DEMO_SOURCE = "Fictional training scenario - not customer intelligence";
export const demoSectors = ["Unknown", "Public Safety", "Critical Infrastructure & Industry", "Defence / Military", "Partners"];

export const demoOrganisations: CustomerOrganisation[] = [
  { id: "demo-wa", name: "Example WA Response Service (fictional)", country: "AU", region: "western-australia", sector: "Public Safety", origin: "demonstration" },
  { id: "demo-nsw", name: "Example NSW Emergency Group (fictional)", country: "AU", region: "new-south-wales", sector: "Public Safety", origin: "demonstration" },
  { id: "demo-vic", name: "Example VIC Infrastructure Group (fictional)", country: "AU", region: "victoria", sector: "Critical Infrastructure & Industry", origin: "demonstration" },
  { id: "demo-qld", name: "Example QLD Response Service (fictional)", country: "AU", region: "queensland", sector: "Public Safety", origin: "demonstration" },
  { id: "demo-sa", name: "Example SA Response Service (fictional)", country: "AU", region: "south-australia", sector: "Public Safety", origin: "demonstration" },
  { id: "demo-tas", name: "Example TAS Response Service (fictional)", country: "AU", region: "tasmania", sector: "Public Safety", origin: "demonstration" },
  { id: "demo-act", name: "Example ACT Response Service (fictional)", country: "AU", region: "australian-capital-territory", sector: "Public Safety", origin: "demonstration" },
  { id: "demo-nt", name: "Example NT Response Service (fictional)", country: "AU", region: "northern-territory", sector: "Public Safety", origin: "demonstration" },
  { id: "demo-auckland", name: "Example Auckland Response Service (fictional)", country: "NZ", region: "auckland", sector: "Public Safety", origin: "demonstration" },
  { id: "demo-canterbury", name: "Example Canterbury Utilities (fictional)", country: "NZ", region: "canterbury", sector: "Critical Infrastructure & Industry", origin: "demonstration" },
  { id: "demo-wellington", name: "Example Wellington Response Service (fictional)", country: "NZ", region: "wellington", sector: "Public Safety", origin: "demonstration" },
];

export function fictionalTextError(value: string): string | null {
  if (!value.trim()) return null;
  const withoutDates = value.replace(/\b\d{4}-\d{2}-\d{2}\b/g, "");
  if (/\S+@\S+|(?:https?:\/\/|mailto:|tel:)|(?:\+?\d[\s().-]*){8,}/i.test(withoutDates)) {
    return "Emails, phone numbers and URLs are not permitted in demonstration text.";
  }
  if (value.length > 5000) return "Keep demonstration text under 5,000 characters.";
  if (!/fictional|\bdemo\b/i.test(value)) {
    return 'Use fictional content only and label it with "Fictional:" or "(fictional)".';
  }
  return null;
}

function validDate(value: string | null): boolean {
  return value === null || (/^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value);
}

function validAmount(value: string | null): boolean {
  return value === null || /^(?:0|[1-9]\d{0,11})(?:\.\d{1,2})?$/.test(value);
}

export function validateCustomerContract(contract: CustomerContract): string | null {
  if (!contract.id || !validProducts(contract.products)) return "Select valid contract products.";
  if (!validAmount(contract.value) || [...contract.invoices, ...contract.payments].some((item) => !validAmount(item.amount))) {
    return "Amounts must be non-negative with at most two decimal places. Leave unknown amounts blank.";
  }
  if (![null, "AUD", "NZD", "USD", "Other"].includes(contract.currency)) return "Select a valid currency.";
  if (contract.currency === "Other" && !/^[A-Z]{3}$/.test(contract.otherCurrency)) return "Specify a three-letter currency code.";
  if (!taxTreatments.includes(contract.taxTreatment) || !procurementMethods.includes(contract.procurementMethod)) {
    return "Select a valid tax treatment and procurement method.";
  }
  if (![contract.startDate, contract.expiryDate, contract.renewalDate, ...contract.invoices.map((item) => item.date), ...contract.payments.map((item) => item.date)].every(validDate)) {
    return "Enter valid calendar dates or leave unknown dates blank.";
  }
  if (contract.startDate && contract.expiryDate && contract.expiryDate < contract.startDate) {
    return "Contract expiry must not precede its start date.";
  }
  if (!["unknown", "reported", "confirmed"].includes(contract.evidence)) return "Select contract evidence.";
  if (contract.evidence !== "unknown" && !contract.source.trim()) return "Reported/confirmed contracts require an information source.";
  for (const text of [
    contract.taxNotes, contract.paymentArrangement, contract.jurisdictionDetails,
    contract.reference, contract.renewalPlans, contract.source,
  ]) {
    const error = fictionalTextError(text);
    if (error) return error;
  }
  return null;
}

function validProducts(products: readonly string[]): boolean {
  return new Set(products).size === products.length && products.every((id) => versatermProducts.some((product) => product.id === id));
}

function validateIntelligence(field: IntelligenceValue<unknown>): string | null {
  if (!["reviewed", "not-reviewed"].includes(field.review) || !["unknown", "reported", "confirmed"].includes(field.evidence)) return "Select a valid review/evidence status.";
  if (field.review === "not-reviewed" || field.evidence === "unknown") {
    if (field.value !== null || field.evidence !== "unknown") return "Unreviewed/unknown areas must not contain asserted facts.";
  } else if (field.value === null || !field.source.trim() || (typeof field.value === "string" && !field.value.trim())) {
    return "Reported/confirmed information requires a value and source. Otherwise select Reviewed - unknown.";
  }
  return fictionalTextError(field.source);
}

export function createDemoHandover(organisationId: string): CustomerHandover {
  return { ...createEmptyHandover(organisationId), source: DEMO_SOURCE };
}

function reported<T>(value: T): IntelligenceValue<T> {
  return { value, evidence: "reported", review: "reviewed", source: DEMO_SOURCE };
}

export const demoSectionValues: HandoverSections = {
  versatermProducts: reported(["dronesense"]),
  competitorProducts: reported("Fictional: Example competitor platform reportedly used; no contract verified."),
  contacts: reported([{ name: "Alex Example (fictional)", jobTitle: "Fictional: Programme Lead" }]),
  notes: reported("Fictional: The demonstration team requested an operational briefing. No real meeting is represented."),
  opportunities: reported("Fictional: Arrange a briefing, validate requirements and agree the next review."),
  procurement: reported("Fictional: A requirements review is planned. No real tender or commitment is represented."),
  contracts: { value: null, evidence: "unknown", review: "reviewed", source: "" },
};

export function getInitialDemoHandovers(): CustomerHandover[] {
  const wa = createDemoHandover("demo-wa");
  wa.sections.notes = structuredClone(demoSectionValues.notes);
  wa.status = "Follow-up Required";
  wa.classification = reported("Prospect");
  wa.actions = [{ id: "demo-wa-review", title: "Fictional: Verify reported product usage", dueDate: "2027-01-15", completed: false }];
  wa.updatedAt = "2026-10-01T00:00:00.000Z";
  const vic = createDemoHandover("demo-vic");
  vic.sections.procurement = structuredClone(demoSectionValues.procurement);
  vic.status = "In Progress";
  const auckland = createDemoHandover("demo-auckland");
  auckland.sections = structuredClone(demoSectionValues);
  auckland.classification = { ...reported("Customer"), evidence: "confirmed" };
  auckland.status = "Completed";
  const canterbury = createDemoHandover("demo-canterbury");
  canterbury.status = "In Progress";
  canterbury.actions = [{ id: "demo-canterbury-briefing", title: "Fictional: Arrange a handover briefing", dueDate: null, completed: false }];
  return [wa, createDemoHandover("demo-nsw"), vic, auckland, canterbury];
}

export function validateDemoHandover(record: CustomerHandover): string | null {
  if (!record.organisationId.startsWith("demo-")) return "Real organisation intelligence is locked.";
  if (record.salesforceAccountUrl !== null || record.source !== DEMO_SOURCE) return "Real customer intelligence and Salesforce entry remain locked.";
  if (!handoverStatuses.includes(record.status)) return "Select a valid handover status.";
  const classificationError = validateIntelligence(record.classification);
  if (classificationError) return classificationError;
  if (record.classification.value !== null && !["Customer", "Prospect"].includes(record.classification.value)) return "Select a valid classification.";
  for (const { key } of handoverSections) {
    const error = validateIntelligence(record.sections[key]);
    if (error) return error;
  }
  if (!validProducts(record.sections.versatermProducts.value ?? [])) return "Select products from the canonical Versaterm product list.";
  for (const key of ["competitorProducts", "notes", "opportunities", "procurement"] as const) {
    const error = fictionalTextError(record.sections[key].value ?? "");
    if (error) return error;
  }
  for (const contact of record.sections.contacts.value ?? []) {
    if (!contact.name.trim()) return "Contact names are required; job titles can remain unknown.";
    const error = fictionalTextError(contact.name) ?? fictionalTextError(contact.jobTitle);
    if (error) return error;
  }
  const contracts = record.sections.contracts.value ?? [];
  if (new Set(contracts.map((item) => item.id)).size !== contracts.length) return "Contract IDs must be unique.";
  for (const contract of contracts) {
    const error = validateCustomerContract(contract);
    if (error) return error;
  }
  for (const action of record.actions) {
    if (!action.title.trim() || !validDate(action.dueDate)) return "Follow-up actions need a title and a valid or unknown due date.";
    const error = fictionalTextError(action.title);
    if (error) return error;
  }
  return null;
}

export function normaliseOrganisationName(name: string): string {
  return name.normalize("NFKD").replace(/\bfictional\b/gi, "").toLowerCase()
    .replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();
}

export function findExistingOrganisation(name: string, country: CustomerCountry, organisations: CustomerOrganisation[]): CustomerOrganisation | undefined {
  return organisations.find((organisation) => organisation.country === country &&
    normaliseOrganisationName(organisation.name) === normaliseOrganisationName(name));
}

export function validateDemoOrganisation(organisation: CustomerOrganisation): string | null {
  if (organisation.origin !== "demonstration" || !organisation.id.startsWith("demo-")) return "Real organisation identity is locked.";
  if (!organisation.name.trim() || organisation.name.length > 255) return "Enter an organisation name of 1-255 characters.";
  const nameError = fictionalTextError(organisation.name);
  if (nameError) return nameError;
  if (!demoSectors.includes(organisation.sector) || !customerRegions[organisation.country]?.some((region) => region.id === organisation.region)) return "Select a valid sector and jurisdiction.";
  return null;
}

export type CustomerDemoState = { organisations: CustomerOrganisation[]; handovers: CustomerHandover[] };
export function updateDemoField<K extends EditableHandoverKey>(
  state: CustomerDemoState, organisationId: string, key: K, value: EditableHandoverFields[K], updatedAt: string,
): { state: CustomerDemoState; error: string | null } {
  const organisation = state.organisations.find((item) => item.id === organisationId);
  const record = state.handovers.find((item) => item.organisationId === organisationId);
  if (!record || organisation?.origin !== "demonstration") return { state, error: "This profile is unavailable or real organisation intelligence is locked." };
  const updated = patchHandoverField(record, key, value, updatedAt);
  const error = validateDemoHandover(updated) ?? (key === "status" ? getCompletionError(updated) : null);
  if (error) return { state, error };
  return { error: null, state: { ...state, handovers: state.handovers.map((item) => item.organisationId === organisationId ? updated : item) } };
}

export type CreateDemoResult = { error: string; state: CustomerDemoState; organisationId?: never } |
  { error: null; state: CustomerDemoState; organisationId: string };

export function createBlankDemoCustomer(
  state: CustomerDemoState, name: string, country: CustomerCountry, region: string, id: string,
): CreateDemoResult {
  if (!customerRegions[country]?.some((item) => item.id === region) || region === "unknown") {
    return { error: "Select a country and state/region before adding a customer.", state };
  }
  const existing = findExistingOrganisation(name, country, state.organisations);
  if (existing?.origin === "agency") return { error: null, state, organisationId: existing.id };
  const organisation: CustomerOrganisation = existing ?? { id, name: name.trim(), country, region, sector: "Unknown", origin: "demonstration" };
  const error = validateDemoOrganisation(organisation);
  if (error) return { error, state };
  if (state.handovers.some((record) => record.organisationId === organisation.id)) return { error: null, state, organisationId: organisation.id };
  return {
    error: null, organisationId: organisation.id,
    state: {
      organisations: existing ? state.organisations : [...state.organisations, organisation],
      handovers: [...state.handovers, createDemoHandover(organisation.id)],
    },
  };
}
