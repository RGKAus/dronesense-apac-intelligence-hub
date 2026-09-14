export type NavigationItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Live Intelligence", href: "/live-intelligence" },
  { label: "Market Environment", href: "/market-environment" },
  { label: "Countries", href: "/countries" },
  { label: "Agencies", href: "/agencies" },
  { label: "Regulations", href: "/regulations" },
  { label: "Procurement", href: "/procurement" },
  { label: "Technology Watch", href: "/technology-watch" },
  { label: "Hardware", href: "/hardware" },
  { label: "Competitors", href: "/competitors" },
  { label: "Partners", href: "/partners" },
  { label: "Reports", href: "/reports" },
  { label: "Documents", href: "/documents" },
  { label: "Administration", href: "#" },
];