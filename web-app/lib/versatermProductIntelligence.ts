import { versatermProducts, type VersatermProductId } from "./versatermProducts";

export const productIntelligenceSections = [
  { id: "overview", title: "Product overview", research: "Verify the current product scope and official description." },
  { id: "capabilities", title: "Key capabilities and features", research: "Verify current capabilities, versions and limitations against official documentation." },
  { id: "customers", title: "Target customers and sectors", research: "Verify intended users and sectors. Do not infer customer relationships or deployments." },
  { id: "integrations", title: "Integrations and compatibility", research: "Verify named integrations, supported versions and compatibility from primary sources." },
  { id: "competitors", title: "Competitors and differentiators", research: "Research evidence-backed comparisons; distinguish analysis from verified product facts." },
  { id: "markets", title: "ANZ and European market considerations", research: "Verify Australia, New Zealand and European availability, localization, procurement, hosting and regulatory considerations separately." },
] as const;

export type ProductIntelligenceSectionId = typeof productIntelligenceSections[number]["id"];
export type ProductSource = {
  id: string;
  title: string;
  url: string;
  publisher: string;
};
export type ProductIntelligenceClaim = {
  text: string;
  sourceIds: string[];
  lastVerified: string;
};
export type ProductIntelligenceProfile = {
  product: typeof versatermProducts[number];
  sections: Record<ProductIntelligenceSectionId, ProductIntelligenceClaim[]>;
  sources: ProductSource[];
  lastVerified: string | null;
};

// Identity is canonical; empty evidence is intentional, not invented product intelligence.
export function getProductIntelligenceProfile(id: string): ProductIntelligenceProfile | undefined {
  const product = versatermProducts.find((item) => item.id === id);
  if (!product) return undefined;
  return {
    product,
    sections: { overview: [], capabilities: [], customers: [], integrations: [], competitors: [], markets: [] },
    sources: [],
    lastVerified: null,
  };
}

export function getProductProfileHref(id: VersatermProductId): string {
  return `/versaterm-products/${id}`;
}
