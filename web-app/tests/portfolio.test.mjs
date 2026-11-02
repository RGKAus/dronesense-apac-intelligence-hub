import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = mkdtempSync(join(tmpdir(), "portfolio-tests-"));
process.on("exit", () => rmSync(output, { recursive: true, force: true }));
const compile = spawnSync(process.execPath, [
  join(root, "node_modules/typescript/bin/tsc"),
  "lib/branding.ts", "lib/versatermProductIntelligence.ts", "components/navigation.ts",
  "--module", "commonjs", "--target", "ES2022", "--strict", "--skipLibCheck", "--outDir", output,
], { cwd: root, encoding: "utf8" });
assert.equal(compile.status, 0, compile.stdout + compile.stderr);
const load = async (path) => (await import(pathToFileURL(join(output, path)).href)).default;
const { applicationBrand } = await load("lib/branding.js");
const { versatermProducts } = await load("lib/versatermProducts.js");
const intelligence = await load("lib/versatermProductIntelligence.js");
const { primaryNavigation } = await load("components/navigation.js");
const read = (path) => readFileSync(join(root, path), "utf8");

test("application identity is Versaterm, while DroneSense remains a canonical product", () => {
  assert.equal(applicationBrand.title, "Versaterm Intelligence Hub");
  assert.equal(applicationBrand.name, "Versaterm");
  assert.doesNotMatch(JSON.stringify(applicationBrand), /DroneSense/);
  assert.equal(versatermProducts.find((product) => product.id === "dronesense").name, "DroneSense");
  for (const path of ["components/AppShell.tsx", "components/MobileNavigation.tsx", "app/login/page.tsx", "app/layout.tsx"]) {
    assert.match(read(path), /applicationBrand/);
    assert.doesNotMatch(read(path), /by Versaterm|>DroneSense<|>DS<|Versaterm DroneSense Intelligence/);
  }
});

test("shared navigation replaces Hardware only and preserves other modules", () => {
  assert.equal(primaryNavigation.filter((item) => item.href === "/versaterm-products").length, 1);
  assert.equal(primaryNavigation.some((item) => item.href === "/hardware"), false);
  for (const href of ["/technology-watch", "/competitors", "/agencies", "/customers", "/countries", "/documents"]) {
    assert.ok(primaryNavigation.some((item) => item.href === href));
  }
  assert.match(read("components/AppShell.tsx"), /primaryNavigation\.map/);
  assert.match(read("components/MobileNavigation.tsx"), /primaryNavigation\.map/);
});

test("all six canonical product identities resolve to profiles without duplicate catalogues", () => {
  assert.deepEqual(versatermProducts.map((product) => product.id), ["iapro", "adashi", "mindbase", "visual-labs", "cad", "dronesense"]);
  for (const product of versatermProducts) {
    const profile = intelligence.getProductIntelligenceProfile(product.id);
    assert.deepEqual(profile.product, product);
    assert.equal(intelligence.getProductProfileHref(product.id), `/versaterm-products/${product.id}`);
  }
  assert.equal(intelligence.getProductIntelligenceProfile("unknown-product"), undefined);
  assert.equal(intelligence.getProductIntelligenceProfile("constructor"), undefined);
  assert.match(read("app/versaterm-products/page.tsx"), /versatermProducts\.map/);
  assert.match(read("app/versaterm-products/[productId]/page.tsx"), /versatermProducts\.map/);
});

test("profiles cover every requested evidence area and do not fabricate verification, sources or claims", () => {
  assert.deepEqual(intelligence.productIntelligenceSections.map((section) => section.id), [
    "overview", "capabilities", "customers", "integrations", "competitors", "markets",
  ]);
  for (const product of versatermProducts) {
    const profile = intelligence.getProductIntelligenceProfile(product.id);
    assert.equal(profile.lastVerified, null);
    assert.deepEqual(profile.sources, []);
    for (const section of intelligence.productIntelligenceSections) {
      assert.deepEqual(profile.sections[section.id], []);
      assert.ok(section.research.length > 0);
    }
  }
  const component = read("components/VersatermProductProfile.tsx");
  assert.match(component, /Supporting documents and source references/);
  assert.match(component, /Last verified \/ research required/);
  assert.match(component, /Research Required/);
});

test("profile data cannot be mutated across requests", () => {
  const first = intelligence.getProductIntelligenceProfile("iapro");
  first.sections.overview.push({ text: "Test", sourceIds: [], lastVerified: "2026-01-01" });
  assert.deepEqual(intelligence.getProductIntelligenceProfile("iapro").sections.overview, []);
});

test("hardware remains linked from Technology Watch at existing URLs", () => {
  assert.match(read("app/technology-watch/page.tsx"), /href="\/hardware"/);
  assert.match(read("app/hardware/page.tsx"), /\/hardware\/fotokite-sigma/);
  assert.match(read("app/hardware/page.tsx"), /activePath="\/technology-watch"/);
  const fotokite = read("app/hardware/fotokite-sigma/page.tsx");
  assert.match(fotokite, /HardwareImage slug="fotokite-sigma"/);
  assert.match(fotokite, /href="\/hardware"/);
  assert.match(fotokite, /activePath="\/technology-watch"/);
});
