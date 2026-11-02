// Product identity only; inclusion does not imply any organisation uses a product.
export const versatermProducts = [
  { id: "iapro", name: "IAPro" },
  { id: "adashi", name: "Adashi" },
  { id: "mindbase", name: "Mindbase" },
  { id: "visual-labs", name: "Visual Labs" },
  { id: "cad", name: "CAD" },
  { id: "dronesense", name: "DroneSense" },
] as const;

export type VersatermProductId = typeof versatermProducts[number]["id"];

export function getVersatermProductNames(ids: readonly VersatermProductId[]): string {
  return ids.map((id) => versatermProducts.find((product) => product.id === id)?.name ?? id).join(", ");
}
