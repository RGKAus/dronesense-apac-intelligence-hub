export type SupportedCountry = {
  name: string;
  code: string;
  slug: string;
  status: "full" | "placeholder";
};

export const supportedCountries: SupportedCountry[] = [
  { name: "United States", code: "US", slug: "united-states", status: "placeholder" },
  { name: "Australia", code: "AU", slug: "australia", status: "full" },
  { name: "Canada", code: "CA", slug: "canada", status: "placeholder" },
  { name: "New Zealand", code: "NZ", slug: "new-zealand", status: "placeholder" },
  { name: "United Kingdom", code: "UK", slug: "united-kingdom", status: "placeholder" },
  { name: "European Union", code: "EU", slug: "european-union", status: "placeholder" },
  { name: "South Africa", code: "ZA", slug: "south-africa", status: "placeholder" },
];

export function getSupportedCountryCount(): number {
  return supportedCountries.length;
}

export function getSupportedCountryBySlug(slug: string): SupportedCountry | undefined {
  return supportedCountries.find((country) => country.slug === slug);
}
