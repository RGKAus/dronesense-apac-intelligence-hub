import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const build = mkdtempSync(join(tmpdir(), "customers-tests-"));
process.on("exit", () => rmSync(build, { recursive: true, force: true }));
const compile = spawnSync(process.execPath, [
  join(root, "node_modules/typescript/bin/tsc"),
  "lib/customerDemo.ts", "lib/customerOrganisations.ts", "lib/customers.ts",
  "--module", "commonjs", "--target", "ES2022", "--strict", "--skipLibCheck", "--outDir", build,
], { cwd: root, encoding: "utf8" });
assert.equal(compile.status, 0, compile.stdout + compile.stderr);

const { default: customers } = await import(pathToFileURL(join(build, "customers.js")).href);
const { default: demo } = await import(pathToFileURL(join(build, "customerDemo.js")).href);
const { default: organisations } = await import(pathToFileURL(join(build, "customerOrganisations.js")).href);
const { default: canonical } = await import(pathToFileURL(join(build, "australiaStateDirectory.js")).href);
const { default: products } = await import(pathToFileURL(join(build, "versatermProducts.js")).href);

const initialState = () => ({
  organisations: [...structuredClone(demo.demoOrganisations), ...organisations.getCanonicalCustomerOrganisations()],
  handovers: demo.getInitialDemoHandovers(),
});
const reviewed = (value, evidence = "reported") => ({ value, evidence, review: "reviewed", source: demo.DEMO_SOURCE });
const reviewedUnknown = () => ({ value: null, evidence: "unknown", review: "reviewed", source: "" });
const stamp = "2026-10-29T00:00:00.000Z";

test("canonical identity projection preserves every ID, never copying leadership or customer status", () => {
  const records = organisations.getCanonicalCustomerOrganisations();
  const originals = Object.values(canonical.australiaStateDirectory).flat();
  assert.equal(records.length, originals.length);
  assert.equal(new Set(records.map((record) => record.id)).size, records.length);
  for (const record of records) {
    assert.equal(record.name, originals.find((item) => item.id === record.id).name);
    assert.deepEqual(Object.keys(record).sort(), ["country", "id", "name", "origin", "region", "sector"]);
  }
});

test("AU and NZ jurisdictions retain state, regional, national and unknown choices", () => {
  assert.equal(organisations.customerRegions.AU.length, 10);
  assert.equal(organisations.customerRegions.NZ.length, 19);
  assert.equal(organisations.getCustomerRegionName("NZ", "canterbury"), "Canterbury");
});

test("blank profiles inherit jurisdiction and contain no invented information", () => {
  const state = initialState();
  const result = demo.createBlankDemoCustomer(state, "Example Coastal Response (fictional)", "AU", "tasmania", "demo-custom-test");
  assert.equal(result.error, null);
  const organisation = result.state.organisations.find((item) => item.id === result.organisationId);
  assert.equal(organisation.country, "AU");
  assert.equal(organisation.region, "tasmania");
  assert.equal(organisation.sector, "Unknown");
  const record = result.state.handovers.find((item) => item.organisationId === result.organisationId);
  assert.equal(record.classification.value, null);
  assert.equal(record.status, "Not Started");
  assert.equal(record.salesforceAccountUrl, null);
  assert.deepEqual(record.actions, []);
  for (const field of Object.values(record.sections)) {
    assert.deepEqual(field, { value: null, evidence: "unknown", review: "not-reviewed", source: "" });
  }
  assert.equal(customers.getHandoverCompleteness(record).notReviewed, 8);
  assert.equal(state.handovers.length + 1, result.state.handovers.length);
});

test("new customer workflow validates fictional names and concrete jurisdiction", () => {
  for (const [name, country, region] of [
    ["Real Commercial Account", "AU", "tasmania"],
    ["Example (fictional)", "AU", "all"],
    ["Example (fictional)", "NZ", "western-australia"],
    ["Example (fictional)", "AU", "unknown"],
    ["Fictional: person@example.invalid", "AU", "victoria"],
  ]) assert.ok(demo.createBlankDemoCustomer(initialState(), name, country, region, "demo-new").error);
});

test("canonical matching opens read-only identity and never creates a duplicate or handover", () => {
  const state = initialState();
  const result = demo.createBlankDemoCustomer(state, "  WESTERN AUSTRALIA POLICE FORCE ", "AU", "western-australia", "demo-new");
  assert.equal(result.error, null);
  assert.equal(result.organisationId, "wa-police");
  assert.equal(result.state, state);
  assert.equal(state.handovers.some((item) => item.organisationId === "wa-police"), false);
  const disguised = demo.createBlankDemoCustomer(state, "Western Australia Police Force (fictional)", "AU", "western-australia", "demo-new");
  assert.equal(disguised.organisationId, "wa-police");
});

test("name normalization reuses existing fictional identities even with case/spacing differences", () => {
  const state = initialState();
  const result = demo.createBlankDemoCustomer(state, "example wa response service (FICTIONAL)", "AU", "western-australia", "demo-new");
  assert.equal(result.organisationId, "demo-wa");
  assert.equal(result.state, state);
  const add = demo.createBlankDemoCustomer(state, "Example New Agency (fictional)", "NZ", "canterbury", "demo-new");
  const again = demo.createBlankDemoCustomer(add.state, "EXAMPLE NEW AGENCY (fictional)", "NZ", "auckland", "demo-duplicate");
  assert.equal(again.organisationId, "demo-new");
  assert.equal(again.state, add.state);
});

test("Reviewed Unknown counts toward review completeness, unlike Not yet reviewed", () => {
  const record = demo.createDemoHandover("demo-new");
  record.sections.notes = reviewedUnknown();
  record.sections.opportunities = reviewed("Fictional: Briefing planned");
  record.sections.contacts = reviewed([], "confirmed");
  const score = customers.getHandoverCompleteness(record);
  assert.equal(score.resolved, 3);
  assert.equal(score.percent, 38);
  assert.equal(score.unknown, 1);
  assert.equal(score.confirmed, 1);
  assert.equal(score.reported, 1);
  assert.equal(score.notReviewed, 5);
  assert.equal(score.missing.length, 5);
});

test("empty values without evidence/source are not counted as reviewed assertions", () => {
  const record = demo.createDemoHandover("demo-new");
  record.sections.notes = reviewed(" ");
  record.sections.opportunities = { ...reviewed("Fictional: A plan"), source: " " };
  assert.equal(customers.getHandoverCompleteness(record).resolved, 0);
});

test("section patches preserve concurrent drafts, other section saves and input immutability", () => {
  let state = initialState();
  const before = structuredClone(state);
  const notesDraft = reviewed("Fictional: State handover briefing");
  const competitorDraft = reviewed("Fictional: Example company, product and contract rumour");
  const first = demo.updateDemoField(state, "demo-nsw", "notes", notesDraft, stamp);
  assert.equal(first.error, null);
  state = first.state;
  const second = demo.updateDemoField(state, "demo-nsw", "competitorProducts", competitorDraft, stamp);
  assert.equal(second.error, null);
  const saved = second.state.handovers.find((item) => item.organisationId === "demo-nsw");
  assert.deepEqual(saved.sections.notes, notesDraft);
  assert.deepEqual(saved.sections.competitorProducts, competitorDraft);
  assert.deepEqual(saved.sections.contacts, before.handovers.find((item) => item.organisationId === "demo-nsw").sections.contacts);
  notesDraft.value = "Fictional: unsaved draft edit";
  assert.equal(saved.sections.notes.value, "Fictional: State handover briefing");
});

test("cancelled drafts do not change saved sections", () => {
  const state = initialState();
  const record = state.handovers[0];
  const before = structuredClone(record);
  const draft = structuredClone(record.sections.notes);
  draft.value = "Fictional: This edit will be cancelled";
  assert.deepEqual(record, before);
});

test("canonical product list supports multiple independent selections and removal", () => {
  assert.deepEqual(products.versatermProducts.map((item) => item.name), ["IAPro", "Adashi", "Mindbase", "Visual Labs", "CAD", "DroneSense"]);
  const state = initialState();
  const first = demo.updateDemoField(state, "demo-nsw", "versatermProducts", reviewed(["iapro", "cad", "dronesense"]), stamp);
  assert.equal(first.error, null);
  const second = demo.updateDemoField(first.state, "demo-nsw", "versatermProducts", reviewed(["iapro", "dronesense"]), stamp);
  assert.equal(second.error, null);
  assert.deepEqual(second.state.handovers.find((item) => item.organisationId === "demo-nsw").sections.versatermProducts.value, ["iapro", "dronesense"]);
  assert.ok(demo.updateDemoField(state, "demo-nsw", "versatermProducts", reviewed(["invented-product"]), stamp).error);
});

test("multiple contracts retain financial, payment, procurement, evidence and renewal details independently", () => {
  const first = {
    ...customers.createEmptyContract("first"), products: ["iapro", "dronesense"], value: "120000.50",
    currency: "AUD", taxTreatment: "GST/tax exclusive", paymentArrangement: "Fictional: Annual instalments",
    invoices: [{ id: "invoice-1", amount: "30000", date: "2027-01-15" }, { id: "invoice-2", amount: null, date: null }],
    payments: [{ id: "payment-1", amount: "15000.25", date: "2027-02-01" }],
    startDate: "2027-01-01", expiryDate: "2028-01-01", renewalDate: "2027-10-01",
    procurementMethod: "Selective/Limited Tender", jurisdictionDetails: "Fictional: Local process term, not a legal equivalence",
    reference: "DEMO-CONTRACT-1", renewalPlans: "Fictional: Review scope", source: demo.DEMO_SOURCE, evidence: "reported",
  };
  const second = { ...customers.createEmptyContract("second"), products: ["adashi"] };
  const result = demo.updateDemoField(initialState(), "demo-nsw", "contracts", reviewed([first, second]), stamp);
  assert.equal(result.error, null);
  const saved = result.state.handovers.find((item) => item.organisationId === "demo-nsw").sections.contracts.value;
  assert.deepEqual(saved, [first, second]);
  assert.equal(saved[1].value, null);
  assert.equal(saved[1].currency, null);
  assert.deepEqual(saved[1].payments, []);
  assert.equal(saved[1].evidence, "unknown");
});

test("contract validation preserves null vs zero, rejects invalid financial values and dates", () => {
  const blank = customers.createEmptyContract("blank");
  assert.equal(demo.validateCustomerContract(blank), null);
  assert.equal(demo.validateCustomerContract({ ...blank, value: "0" }), null);
  for (const value of ["-1", "1.999", "abc", "NaN", "1e9"]) assert.ok(demo.validateCustomerContract({ ...blank, value }));
  assert.ok(demo.validateCustomerContract({ ...blank, startDate: "2027-02-30" }));
  assert.ok(demo.validateCustomerContract({ ...blank, startDate: "2027-03-01", expiryDate: "2027-02-01" }));
  assert.ok(demo.validateCustomerContract({ ...blank, evidence: "confirmed" }));
  assert.ok(demo.validateCustomerContract({ ...blank, currency: "Other", otherCurrency: "" }));
  assert.equal(demo.validateCustomerContract({ ...blank, currency: "Other", otherCurrency: "EUR" }), null);
});

test("procurement options retain Unknown and jurisdiction-specific distinctions separately", () => {
  assert.deepEqual(customers.procurementMethods, ["Unknown", "Open Tender", "Selective/Limited Tender", "Sole Source/Direct Award", "Panel/Framework", "Other"]);
  assert.equal(customers.createEmptyContract("blank").jurisdictionDetails, "");
});

test("competitor free text retains reported status and attribution without verification promotion", () => {
  const text = "Fictional: Example competitor supplies an aircraft platform; contract scope and expiry remain unverified.";
  const result = demo.updateDemoField(initialState(), "demo-nsw", "competitorProducts", reviewed(text), stamp);
  assert.equal(result.error, null);
  const field = result.state.handovers.find((item) => item.organisationId === "demo-nsw").sections.competitorProducts;
  assert.equal(field.value, text);
  assert.equal(field.evidence, "reported");
  assert.equal(field.source, demo.DEMO_SOURCE);
});

test("fictional free-text boundary rejects contact details, real text and URLs across surfaces", () => {
  for (const text of ["A real conversation", "Fictional: person@example.invalid", "Fictional: +61 400 000 000", "Fictional: https://example.invalid"]) {
    assert.ok(demo.fictionalTextError(text));
    assert.ok(demo.updateDemoField(initialState(), "demo-nsw", "competitorProducts", reviewed(text), stamp).error);
    assert.ok(demo.validateCustomerContract({ ...customers.createEmptyContract("blank"), reference: text }));
  }
  assert.equal(demo.fictionalTextError("Fictional: Contract review on 2027-01-01"), null);
  assert.ok(demo.updateDemoField(initialState(), "wa-police", "notes", reviewed("Fictional: Not allowed"), stamp).error);
});

test("new and edited organisation names cannot alter canonical identities", () => {
  const original = demo.demoOrganisations[0];
  assert.equal(demo.validateDemoOrganisation({ ...original, country: "NZ", region: "auckland" }), null);
  assert.ok(demo.validateDemoOrganisation({ ...original, name: "Real Organisation" }));
  assert.ok(demo.validateDemoOrganisation({ ...original, country: "NZ", region: "western-australia" }));
});

test("completion allows reviewed unknowns, blocks unreviewed areas and visible follow-up", () => {
  const state = initialState();
  assert.match(demo.updateDemoField(state, "demo-nsw", "status", "Completed", stamp).error, /Review all eight/);
  const record = demo.createDemoHandover("demo-nsw");
  record.classification = reviewedUnknown();
  for (const { key } of customers.handoverSections) record.sections[key] = reviewedUnknown();
  record.status = "Completed";
  assert.equal(customers.getCompletionError(record), null);
  assert.equal(customers.getHandoverCompleteness(record).percent, 100);
  record.actions = [{ id: "todo", title: "Fictional: Verify unknown dates", dueDate: null, completed: false }];
  assert.match(customers.getCompletionError(record), /outstanding/);
});

test("editing a completed handover demotes status only if completion becomes invalid", () => {
  const state = initialState();
  const result = demo.updateDemoField(state, "demo-auckland", "notes", customers.unknownValue(), stamp);
  assert.equal(result.error, null);
  assert.equal(result.state.handovers.find((item) => item.organisationId === "demo-auckland").status, "In Progress");
  const remains = demo.updateDemoField(state, "demo-auckland", "notes", reviewedUnknown(), stamp);
  assert.equal(remains.state.handovers.find((item) => item.organisationId === "demo-auckland").status, "Completed");
  const followup = demo.updateDemoField(state, "demo-auckland", "actions", [{ id: "todo", title: "Fictional: Validate unknown", dueDate: null, completed: false }], stamp);
  assert.equal(followup.state.handovers.find((item) => item.organisationId === "demo-auckland").status, "In Progress");
});

test("invalid section saves leave every section unchanged", () => {
  const state = initialState();
  const rejected = demo.updateDemoField(state, "demo-nsw", "notes", reviewed("person@example.invalid"), stamp);
  assert.equal(rejected.state, state);
  assert.ok(rejected.error);
});

test("initial records are fictional and no Salesforce account URLs are fabricated", () => {
  for (const record of demo.getInitialDemoHandovers()) {
    assert.equal(demo.validateDemoHandover(record), null);
    assert.equal(record.salesforceAccountUrl, null);
  }
});

test("state filters compose with search, customer classification, status and follow-up", () => {
  const record = demo.getInitialDemoHandovers()[0];
  const organisation = demo.demoOrganisations[0];
  const filters = { ...customers.emptyCustomerFilters, country: "AU", region: "western-australia", search: "wa RESPONSE", classification: "Prospect", status: "Follow-up Required", outstandingOnly: true };
  assert.equal(customers.matchesCustomerFilters(organisation, record, filters), true);
  assert.equal(customers.matchesCustomerFilters(organisation, record, { ...filters, country: "NZ" }), false);
  assert.equal(customers.matchesCustomerFilters(organisation, { ...record, actions: [] }, filters), false);
  const canonicalOrganisation = organisations.getCanonicalCustomerOrganisations()[0];
  assert.equal(customers.matchesCustomerFilters(canonicalOrganisation, undefined, { ...customers.emptyCustomerFilters, includeAgencies: true, classification: "Customer" }), false);
});

test("Salesforce validation permits only direct HTTPS Account records, not home/login or redirect URLs", () => {
  const path = `/lightning/r/Account/001${"A".repeat(12)}/view`;
  const url = new URL(path, "https://unit-test.my.salesforce.com");
  assert.equal(customers.getSalesforceAccountUrl(url.href), url.href);
  for (const value of [
    null, "", "javascript:alert(1)", "https://login.salesforce.com/", "https://example.invalid/",
    url.href.replace("https:", "http:"), `${url.href}?retURL=evil`, `${url.href}#redirect`,
    url.href.replace(".com/", ".com.evil.invalid/"), url.href.replace("https://", "https://person:password@"),
  ]) assert.equal(customers.getSalesforceAccountUrl(value), null);
});

test("demo components contain no persistence transport, storage or new database access", () => {
  for (const name of ["CustomerDemoProvider", "CustomerProfile", "CustomerSectionEditor", "CustomerCommercialHistory", "CustomersDirectory"]) {
    const text = readFileSync(join(root, `components/${name}.tsx`), "utf8");
    assert.doesNotMatch(text, /\b(fetch|localStorage|sessionStorage|indexedDB|getSupabaseAdmin|createClient)\b/);
  }
  const sql = readFileSync(join(root, "db/migrations/0008_customer_handover_foundation.sql"), "utf8");
  assert.equal((sql.match(/CREATE TABLE /g) ?? []).length, 2);
  assert.equal((sql.match(/FORCE ROW LEVEL SECURITY/g) ?? []).length, 2);
  assert.doesNotMatch(sql, /CREATE POLICY|GRANT /);
});
