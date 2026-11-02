"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomerProfile from "../../web-app/components/CustomerProfile";
import { getLogEntriesForOrganisation } from "../../web-app/lib/intelligenceLog";
import { useWorkspace } from "./WorkspaceProvider";

export default function LocalCustomer({ id }: { id: string }) {
  const { snapshot: { data }, change } = useWorkspace();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const entries = getLogEntriesForOrganisation(data.entries, id);
  const fictional = data.organisations.some((item) => item.id === id && item.origin === "demonstration");
  return <div className="customer-stack">
    <CustomerProfile organisationId={id} />
    <section className="panel customer-stack"><h2>Linked Intelligence Log entries</h2>
      {entries.length ? <ul>{entries.map((entry) => <li key={entry.id}>{entry.title}</li>)}</ul> : <p>No linked entries.</p>}
      <Link href="/intelligence-log" className="secondary-button">Open Intelligence Log</Link>
    </section>
    {fictional && <section className="panel customer-stack"><h2>Delete fictional customer</h2>
      <p>Deletes this profile, contracts, follow-ups and fictional organisation. Linked log entries are retained and explicitly unlinked. Backups are retained.</p>
      {error && <p role="alert">{error}</p>}
      <button className="secondary-button" type="button" onClick={async () => {
        if (!window.confirm("Delete this fictional customer and remove its log links?")) return;
        const failure = await change({
          organisations: data.organisations.filter((item) => item.id !== id),
          handovers: data.handovers.filter((item) => item.organisationId !== id),
          entries: data.entries.map((entry) => entry.organisationIds.includes(id) ? {
            ...entry, organisationIds: entry.organisationIds.filter((linked) => linked !== id),
            revision: entry.revision + 1, updatedAt: new Date().toISOString(),
          } : entry),
        });
        setError(failure);
        if (!failure) router.push("/customers");
      }}>Delete customer</button>
    </section>}
  </div>;
}
