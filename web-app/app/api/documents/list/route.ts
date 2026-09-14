import { NextResponse } from "next/server";
import { verifySessionToken } from "../../../../lib/auth";
import { getSupabaseAdmin } from "../../../../lib/supabaseServer";
import { extractSessionFromCookie, type DocumentRow } from "../../../../lib/documentsShared";

function mapRow(row: any): DocumentRow {
  return {
    id: String(row.id),
    title: String(row.title),
    fileName: String(row.file_name),
    filePath: String(row.file_path),
    fileType: String(row.file_type),
    fileSize: Number(row.file_size),
    documentType: row.document_type ?? null,
    country: row.country ?? null,
    region: row.region ?? null,
    organisation: row.organisation ?? null,
    topic: row.topic ?? null,
    documentDate: row.document_date ?? null,
    source: row.source ?? null,
    uploadedBy: row.uploaded_by ?? null,
    tags: Array.isArray(row.tags) ? row.tags : [],
    confidentiality: row.confidentiality ?? "Internal",
    notes: row.notes ?? null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export async function GET(request: Request) {
  const token = extractSessionFromCookie(request.headers.get("cookie")) ?? undefined;
  const authenticated = await verifySessionToken(token);
  if (!authenticated) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("documents")
    .select("id,title,file_name,file_path,file_type,file_size,document_type,country,region,organisation,topic,document_date,source,uploaded_by,tags,confidentiality,notes,created_at,updated_at")
    .order("created_at", { ascending: false })
    .limit(1000);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const documents = (data ?? []).map(mapRow);
  return NextResponse.json({ documents });
}
