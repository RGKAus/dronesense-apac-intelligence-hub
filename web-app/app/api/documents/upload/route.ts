import { NextResponse } from "next/server";
import { verifySessionToken } from "../../../../lib/auth";
import { getSupabaseAdmin } from "../../../../lib/supabaseServer";
import {
  ALLOWED_DOCUMENT_EXTENSIONS,
  ALLOWED_DOCUMENT_MIME_TYPES,
  CONFIDENTIALITY_OPTIONS,
  DEFAULT_CONFIDENTIALITY,
  DOCUMENTS_BUCKET,
  DOCUMENT_TYPE_OPTIONS,
  MAX_DOCUMENT_UPLOAD_BYTES,
  extractSessionFromCookie,
  getFileExtension,
  parseTags,
  slugifyFileName,
} from "../../../../lib/documentsShared";

function normalizeOptional(value: FormDataEntryValue | null): string | null {
  const text = String(value ?? "").trim();
  return text.length > 0 ? text : null;
}

function normalizeDocumentType(value: string | null): string | null {
  if (!value) return null;
  return DOCUMENT_TYPE_OPTIONS.includes(value as (typeof DOCUMENT_TYPE_OPTIONS)[number]) ? value : null;
}

function normalizeConfidentiality(value: string | null): string {
  if (!value) return DEFAULT_CONFIDENTIALITY;
  return CONFIDENTIALITY_OPTIONS.includes(value as (typeof CONFIDENTIALITY_OPTIONS)[number])
    ? value
    : DEFAULT_CONFIDENTIALITY;
}

async function ensureDocumentsBucket() {
  const supabaseAdmin = getSupabaseAdmin();
  const { data: existing } = await supabaseAdmin.storage.getBucket(DOCUMENTS_BUCKET);
  if (existing) {
    return supabaseAdmin;
  }

  const { error } = await supabaseAdmin.storage.createBucket(DOCUMENTS_BUCKET, {
    public: false,
    fileSizeLimit: MAX_DOCUMENT_UPLOAD_BYTES,
    allowedMimeTypes: [...ALLOWED_DOCUMENT_MIME_TYPES],
  });

  if (error && !error.message.toLowerCase().includes("already exists")) {
    throw new Error(error.message);
  }

  return supabaseAdmin;
}

export async function POST(request: Request) {
  const token = extractSessionFromCookie(request.headers.get("cookie")) ?? undefined;
  const authenticated = await verifySessionToken(token);
  if (!authenticated) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const form = await request.formData();
  const fileEntry = form.get("file");
  const title = String(form.get("title") ?? "").trim();

  if (!fileEntry || typeof fileEntry === "string") {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  const file = fileEntry;
  const extension = getFileExtension(file.name);

  if (!ALLOWED_DOCUMENT_EXTENSIONS.includes(extension as (typeof ALLOWED_DOCUMENT_EXTENSIONS)[number])) {
    return NextResponse.json({ error: "File type is not supported." }, { status: 400 });
  }

  if (file.size > MAX_DOCUMENT_UPLOAD_BYTES) {
    return NextResponse.json({ error: "File exceeds 10 MB maximum." }, { status: 413 });
  }

  if (file.type && !ALLOWED_DOCUMENT_MIME_TYPES.includes(file.type as (typeof ALLOWED_DOCUMENT_MIME_TYPES)[number])) {
    return NextResponse.json({ error: "File MIME type is not allowed." }, { status: 400 });
  }

  const now = new Date();
  const yyyy = String(now.getUTCFullYear());
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const safeName = slugifyFileName(file.name);
  const path = `${yyyy}/${mm}/${crypto.randomUUID()}-${safeName}`;

  const documentType = normalizeDocumentType(normalizeOptional(form.get("documentType")));
  const confidentiality = normalizeConfidentiality(normalizeOptional(form.get("confidentiality")));
  const country = normalizeOptional(form.get("country"));
  const region = normalizeOptional(form.get("region"));
  const organisation = normalizeOptional(form.get("organisation"));
  const topic = normalizeOptional(form.get("topic"));
  const source = normalizeOptional(form.get("source"));
  const notes = normalizeOptional(form.get("notes"));
  const documentDate = normalizeOptional(form.get("documentDate"));
  const tags = parseTags(String(form.get("tags") ?? ""));

  let uploaded = false;

  try {
    const supabaseAdmin = await ensureDocumentsBucket();
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await supabaseAdmin.storage
      .from(DOCUMENTS_BUCKET)
      .upload(path, fileBuffer, {
        upsert: false,
        contentType: file.type || undefined,
      });

    if (uploadResult.error) {
      return NextResponse.json({ error: uploadResult.error.message }, { status: 500 });
    }

    uploaded = true;

    const { data: row, error: insertError } = await supabaseAdmin
      .from("documents")
      .insert({
        title,
        file_name: file.name,
        file_path: path,
        file_type: file.type || extension,
        file_size: file.size,
        document_type: documentType,
        country,
        region,
        organisation,
        topic,
        document_date: documentDate,
        source,
        uploaded_by: "Prototype User",
        tags,
        confidentiality,
        notes,
      })
      .select("id,title,file_name,file_path,file_type,file_size,document_type,country,region,organisation,topic,document_date,source,uploaded_by,tags,confidentiality,notes,created_at,updated_at")
      .single();

    if (insertError || !row) {
      if (uploaded) {
        await supabaseAdmin.storage.from(DOCUMENTS_BUCKET).remove([path]);
      }

      return NextResponse.json({ error: insertError?.message || "Failed to save document metadata." }, { status: 500 });
    }

    return NextResponse.json({
      document: {
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
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Upload failed." }, { status: 500 });
  }
}
