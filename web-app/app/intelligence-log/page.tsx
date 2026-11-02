import type { Metadata } from "next";
import AppShell from "../../components/AppShell";
import IntelligenceLogBrowser from "../../components/IntelligenceLogBrowser";
import { getLogOrganisations } from "../../lib/intelligenceLog";
import "./intelligence-log.css";

export const metadata: Metadata = {
  title: "Intelligence Log",
  description: "A fictional, memory-only notebook for intelligence-writing workflow demonstrations.",
};
export const dynamic = "force-dynamic";

export default function IntelligenceLogPage() {
  return (
    <AppShell activePath="/intelligence-log" eyebrow="DAILY NOTEBOOK" title="Intelligence Log" description="A flexible writing space for daily intelligence, research and fictional meeting or handover notes.">
      <IntelligenceLogBrowser organisations={getLogOrganisations()} />
    </AppShell>
  );
}
