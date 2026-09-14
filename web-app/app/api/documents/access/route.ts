import { NextResponse } from "next/server";
import { verifySessionToken } from "../../../../lib/auth";
import { getSupabaseAdmin } from "../../../../lib/supabaseServer";
import { DOCUMENTS_BUCKET, extractSessionFromCookie } from "../../../../lib/documentsShared";

export async function GET(request: Request) {
  const token = extractSessionFromCookie(request.headers.get("cookie")) ?? undefined;
  const authenticated = await verifySessionToken(token);
  if (!authenticated) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const mode = searchParams.get("mode") === "download" ? "download" : "open";

  if (!id) {
    return NextResponse.json({ error: "Missing document id." }, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data: row, error: loadError } = await supabaseAdmin
    .from("documents")
    .select("file_path,file_name")
    .eq("id", id)
    .single();

  if (loadError || !row) {
    return NextResponse.json({ error: loadError?.message || "Document not found." }, { status: 404 });
  }

  const options = mode === "download"
    ? { download: row.file_name }
    : undefined;

  const { data: signed, error: signedError } = await supabaseAdmin.storage
    .from(DOCUMENTS_BUCKET)
    .createSignedUrl(row.file_path, 60 * 5, options);

  if (signedError || !signed) {
    return NextResponse.json({ error: signedError?.message || "Unable to create signed URL." }, { status: 500 });
  }

  return NextResponse.json({ url: signed.signedUrl });
}
