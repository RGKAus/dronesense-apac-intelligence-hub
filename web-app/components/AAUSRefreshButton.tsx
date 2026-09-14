"use client";

import { useState, useTransition } from "react";

type SourceResult = {
  source: string;
  newCount: number;
  existingCount: number;
  error?: string;
};

type RefreshPayload = {
  error?: string;
  sources?: SourceResult[];
  warning?: string;
};

function buildSummary(payload: RefreshPayload | null): string {
  if (!payload?.sources?.length) return "Intelligence refreshed.";

  const segments = payload.sources.map((source) => {
    if (source.error) return `${source.source}: failed`;
    return `${source.source}: ${source.newCount} new / ${source.existingCount} existing`;
  });

  return segments.join(" | ");
}

export default function AAUSRefreshButton() {
  const [message, setMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(async () => {
      setMessage("");

      try {
        const response = await fetch("/api/intelligence/refresh", {
          method: "POST",
          credentials: "same-origin",
        });

        const text = await response.text();
        let payload: RefreshPayload | null = null;

        if (text) {
          try {
            payload = JSON.parse(text) as RefreshPayload;
          } catch {
            payload = { error: text };
          }
        }

        if (!response.ok) {
          setMessage(payload?.error ?? `Refresh failed (${response.status}).`);
          return;
        }

        setMessage(buildSummary(payload));
        window.location.reload();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Refresh request failed.";
        setMessage(message);
      }
    });
  };

  return (
    <div className="refresh-tools">
      <button
        className="secondary-button"
        disabled={isPending}
        onClick={handleRefresh}
        type="button"
      >
        {isPending ? "Refreshing..." : "Refresh Intelligence"}
      </button>

      {message ? <span className="refresh-message">{message}</span> : null}
    </div>
  );
}