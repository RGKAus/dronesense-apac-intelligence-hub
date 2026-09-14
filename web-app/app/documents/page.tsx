import AppShell from "../../components/AppShell";
import DocumentsLibrary from "../../components/DocumentsLibrary";
import { getSupabaseAdmin } from "../../lib/supabaseServer";
import type { DocumentRow } from "../../lib/documentsShared";

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

async function loadDocuments(): Promise<DocumentRow[]> {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("documents")
      .select("id,title,file_name,file_path,file_type,file_size,document_type,country,region,organisation,topic,document_date,source,uploaded_by,tags,confidentiality,notes,created_at,updated_at")
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error || !data) {
      return [];
    }

    return data.map(mapRow);
  } catch {
    return [];
  }
}

export default async function DocumentsPage() {
  const initialDocuments = await loadDocuments();

  return (
    <AppShell
      activePath="/documents"
      eyebrow="KNOWLEDGE LIBRARY"
      title="Documents"
      description="Upload, classify and securely retrieve important files used across intelligence operations."
    >
      <DocumentsLibrary initialDocuments={initialDocuments} />
    </AppShell>
  );
}
