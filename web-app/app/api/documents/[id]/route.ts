import { NextResponse } from "next/server";
import { verifySessionToken } from "../../../../lib/auth";
import { getSupabaseAdmin } from "../../../../lib/supabaseServer";
import { DOCUMENTS_BUCKET, extractSessionFromCookie } from "../../../../lib/documentsShared";

type Params = Promise<{ id: string }>;

export async function DELETE(request: Request, context: { params: Params }) {
  const token = extractSessionFromCookie(request.headers.get("cookie")) ?? undefined;
  const authenticated = await verifySessionToken(token);
  if (!authenticated) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "Missing document id." }, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data: row, error: loadError } = await supabaseAdmin
    .from("documents")
    .select("id,file_path")
    .eq("id", id)
    .single();

  if (loadError || !row) {
    return NextResponse.json({ error: loadError?.message || "Document not found." }, { status: 404 });
  }

  const { error: storageError } = await supabaseAdmin.storage
    .from(DOCUMENTS_BUCKET)
    .remove([row.file_path]);

  if (storageError) {
    return NextResponse.json({ error: `Storage delete failed: ${storageError.message}` }, { status: 500 });
  }

  const { error: deleteError } = await supabaseAdmin
    .from("documents")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: `Metadata delete failed: ${deleteError.message}` }, { status: 500 });
  }

  return NextResponse.json({ deleted: true, id });
}
