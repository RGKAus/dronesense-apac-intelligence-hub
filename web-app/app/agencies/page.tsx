import AppShell from "../../components/AppShell";
import AgenciesDirectoryBrowser from "../../components/AgenciesDirectoryBrowser";

export default function AgenciesPage() {
  return (
    <AppShell
      activePath="/agencies"
      eyebrow="GLOBAL AGENCY DIRECTORY"
      title="Agencies"
      description="Browse organisations by country, region, type and sector, or use natural-language search."
    >
      <AgenciesDirectoryBrowser />
    </AppShell>
  );
}