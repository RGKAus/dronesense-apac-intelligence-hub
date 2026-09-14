"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type RefreshResult = {
  error?: string;
  message?: string;
  warning?: string;
  sources?: Array<{
    source: string;
    newCount: number;
    existingCount: number;
    error?: string;
  }>;
};

function getPayloadMessage(payload: RefreshResult | null, status: number): string {
  if (payload?.error && payload.error.length > 0) {
    return payload.error;
  }

  if (payload?.message && payload.message.length > 0) {
    return payload.message;
  }

  return `Refresh failed (${status}).`;
}

function buildSummary(payload: RefreshResult | null): string | null {
  if (!payload?.sources?.length) return null;

  return payload.sources
    .map((source) => {
      if (source.error) return `${source.source}: failed`;
      return `${source.source}: ${source.newCount} new / ${source.existingCount} existing`;
    })
    .join(" | ");
}

export default function DashboardRefreshButton() {
  const router = useRouter();
  const [isRefreshingRequest, setIsRefreshingRequest] = useState(false);
  const [isRevalidating, startRevalidation] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const isBusy = isRefreshingRequest || isRevalidating;

  const handleRefresh = async () => {
    if (isBusy) {
      return;
    }

    setIsRefreshingRequest(true);
    setMessage(null);

    try {
      const response = await fetch("/api/intelligence/refresh", {
        method: "POST",
        credentials: "same-origin",
      });

      const text = await response.text();
      let payload: RefreshResult | null = null;

      if (text) {
        try {
          payload = JSON.parse(text) as RefreshResult;
        } catch {
          payload = { error: text };
        }
      }

      if (!response.ok) {
        setMessage({ type: "error", text: getPayloadMessage(payload, response.status) });
        return;
      }

      const summary = buildSummary(payload);
      if (summary) {
        setMessage({ type: payload?.warning ? "error" : "success", text: payload?.warning ? `${summary} | ${payload.warning}` : summary });
      }

      startRevalidation(() => {
        router.refresh();
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Refresh request failed.";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setIsRefreshingRequest(false);
    }
  };

  return (
    <div className="refresh-tools">
      <button
        className="secondary-button"
        disabled={isBusy}
        onClick={handleRefresh}
        type="button"
      >
        {isBusy ? "Refreshing..." : "Refresh Intelligence"}
      </button>

      {message ? (
        <span
          className="refresh-message"
          style={message.type === "error" ? { color: "#b42318" } : undefined}
        >
          {message.text}
        </span>
      ) : null}
    </div>
  );
}
