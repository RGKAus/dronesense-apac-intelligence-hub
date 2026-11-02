import {
  australiaJurisdictions,
  australiaStateDirectory,
} from "./australiaStateDirectory";

export type CustomerCountry = "AU" | "NZ";

export type CustomerOrganisation = {
  id: string;
  name: string;
  country: CustomerCountry;
  region: string;
  sector: string;
  origin: "agency" | "demonstration";
};

export const customerCountries: { code: CustomerCountry; name: string }[] = [
  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },
];

export const customerRegions: Record<CustomerCountry, { id: string; name: string }[]> = {
  AU: [
    ...australiaJurisdictions.map(({ slug, name }) => ({ id: slug, name })),
    { id: "national", name: "National / Commonwealth" },
    { id: "unknown", name: "Region unknown" },
  ],
  NZ: [
    { id: "northland", name: "Northland" },
    { id: "auckland", name: "Auckland" },
    { id: "waikato", name: "Waikato" },
    { id: "bay-of-plenty", name: "Bay of Plenty" },
    { id: "gisborne", name: "Gisborne" },
    { id: "hawkes-bay", name: "Hawke's Bay" },
    { id: "taranaki", name: "Taranaki" },
    { id: "manawatu-whanganui", name: "Manawatu-Whanganui" },
    { id: "wellington", name: "Wellington" },
    { id: "tasman", name: "Tasman" },
    { id: "nelson", name: "Nelson" },
    { id: "marlborough", name: "Marlborough" },
    { id: "west-coast", name: "West Coast" },
    { id: "canterbury", name: "Canterbury" },
    { id: "otago", name: "Otago" },
    { id: "southland", name: "Southland" },
    { id: "chatham-islands", name: "Chatham Islands" },
    { id: "national", name: "National" },
    { id: "unknown", name: "Region unknown" },
  ],
};

export function getCustomerRegionName(country: CustomerCountry, region: string): string {
  return customerRegions[country].find((item) => item.id === region)?.name ?? "Region unknown";
}

// Identity-only projection: never copy agency leadership or infer a commercial relationship.
export function getCanonicalCustomerOrganisations(): CustomerOrganisation[] {
  return australiaJurisdictions.flatMap((state) =>
    australiaStateDirectory[state.slug].map((organisation) => ({
      id: organisation.id,
      name: organisation.name,
      country: "AU" as const,
      region: state.slug,
      sector: organisation.sector,
      origin: "agency" as const,
    })),
  );
}
