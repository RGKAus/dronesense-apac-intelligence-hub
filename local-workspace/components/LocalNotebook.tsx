"use client";

import IntelligenceLogBrowser from "../../web-app/components/IntelligenceLogBrowser";
import { saveLogEntry } from "../../web-app/lib/intelligenceLog";
import { useWorkspace } from "./WorkspaceProvider";

export default function LocalNotebook() {
  const { snapshot: { data }, change } = useWorkspace();
  return <IntelligenceLogBrowser organisations={data.organisations} storage={{
    entries: data.entries,
    save: async (draft) => {
      const result = saveLogEntry(data.entries, draft, data.organisations, new Date());
      return result.error ?? await change({ ...data, entries: result.entries });
    },
    remove: async (id) => change({ ...data, entries: data.entries.filter((entry) => entry.id !== id) }),
  }} />;
}
