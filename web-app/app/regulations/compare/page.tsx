import AppShell from "../../../components/AppShell";
import RegulationsCompare from "../../../components/RegulationsCompare";
import { listRegulatoryGuides } from "../../../lib/regulatoryData";

export default function RegulationsComparePage() {
  const guides = listRegulatoryGuides();

  return (
    <AppShell
      activePath="/regulations"
      eyebrow="REGULATIONS"
      title="Compare Countries"
      description="Compare RPAS regulatory frameworks side-by-side without relying on free-text country entry."
    >
      <RegulationsCompare guides={guides} />
    </AppShell>
  );
}
