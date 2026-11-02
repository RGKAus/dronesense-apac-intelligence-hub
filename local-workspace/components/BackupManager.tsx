"use client";

import { useState } from "react";
import { useWorkspace } from "./WorkspaceProvider";

export default function BackupManager() {
  const { backups, backup, restore } = useWorkspace();
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  return <section className="panel customer-stack">
    <h1>Local backup and restore</h1>
    <p>Checksummed, versioned fictional JSON snapshots are stored beside the local database in its backups folder, never in OneDrive. Backups on the same disk do not protect against disk loss. No automatic retention or external sync.</p>
    <button className="primary-button" disabled={busy} onClick={async () => {
      setBusy(true); const error = await backup(); setMessage(error ?? "Backup created and flushed to local disk."); setBusy(false);
    }}>Create backup</button>
    <label className="customer-field">Available backup<select className="filter-control" value={selected} onChange={(event) => setSelected(event.target.value)}>
      <option value="">Select a backup</option>{backups.map((file) => <option key={file}>{file}</option>)}
    </select></label>
    <button className="secondary-button" disabled={!selected || busy} onClick={async () => {
      if (!window.confirm("Replace the current fictional workspace with this backup? A pre-restore backup will be created. Unsaved drafts in other tabs cannot be restored.")) return;
      setBusy(true); const error = await restore(selected); setMessage(error ?? "Workspace restored. A pre-restore backup was retained. Reload other tabs."); setBusy(false);
    }}>Restore selected backup</button>
    {message && <p role="status">{message}</p>}
  </section>;
}
