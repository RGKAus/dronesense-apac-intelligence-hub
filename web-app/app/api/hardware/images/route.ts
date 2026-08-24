import { getSupabaseAdmin } from "../../../../lib/supabaseServer";
import { NextResponse } from "next/server";
import { verifySessionToken } from "../../../../lib/auth";

const BUCKET = "hardware-images";
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

function extractSessionFromCookie(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/rpas_session=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export async function POST(request: Request) {
  const cookie = request.headers.get("cookie");
  const token = extractSessionFromCookie(cookie);
  const ok = await verifySessionToken(token || undefined);
  if (!ok) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const form = await request.formData();
  const slug = form.get("slug") as string | null;
  const file = form.get("file") as any | null;

  if (!slug || !file) {
    return NextResponse.json({ error: "missing slug or file" }, { status: 400 });
  }

  const path = `${slug}/product-image`;

  try {
    const buffer = await file.arrayBuffer();
    if (buffer.byteLength > MAX_BYTES) {
      return NextResponse.json({ error: "File exceeds 10 MB maximum" }, { status: 413 });
    }
    const supabaseAdmin = getSupabaseAdmin();
    const res = await supabaseAdmin.storage.from(BUCKET).upload(path, Buffer.from(buffer), {
      upsert: true,
      contentType: file.type,
    });

    if (res.error) {
      return NextResponse.json({ error: res.error.message }, { status: 500 });
    }

    // Create a signed URL valid for 24 hours
    const { data: signed, error: signedError } = await supabaseAdmin.storage.from(BUCKET).createSignedUrl(path, 60 * 60 * 24);
    if (signedError || !signed) {
      return NextResponse.json({ error: signedError?.message || "failed to create signed url" }, { status: 500 });
    }

    return NextResponse.json({ url: signed.signedUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const cookie = request.headers.get("cookie");
  const token = extractSessionFromCookie(cookie);
  const ok = await verifySessionToken(token || undefined);
  if (!ok) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) return NextResponse.json({ error: "missing slug" }, { status: 400 });

  const path = `${slug}/product-image`;
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.storage.from(BUCKET).remove([path]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ removed: true });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) return NextResponse.json({ error: "missing slug" }, { status: 400 });

  const path = `${slug}/product-image`;

  // Use signed URL so buckets can remain private
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin.storage.from(BUCKET).createSignedUrl(path, 60 * 60);
  if (error || !data) return NextResponse.json({ error: error?.message || "no signed url" }, { status: 500 });

  return NextResponse.json({ url: data.signedUrl });
}
