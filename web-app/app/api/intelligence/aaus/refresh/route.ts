import { NextResponse } from "next/server";
import { verifySessionToken } from "../../../../../lib/auth";
import { refreshAllIntelligenceSources } from "../../../../../lib/intelligence";

function readSessionToken(cookieHeader: string | null): string | undefined {
  const match = cookieHeader?.match(/rpas_session=([^;]+)/);
  return match?.[1];
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    const candidate = (error as { message?: unknown }).message;
    if (typeof candidate === "string" && candidate.length > 0) {
      return candidate;
    }

    try {
      return JSON.stringify(error);
    } catch {
      return "Unknown refresh error";
    }
  }

  if (typeof error === "string" && error.length > 0) {
    return error;
  }

  return "Unknown refresh error";
}

export async function POST(request: Request) {
  const ok = await verifySessionToken(readSessionToken(request.headers.get("cookie")));
  if (!ok) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  try {
    const result = await refreshAllIntelligenceSources();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Intelligence refresh failed", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
