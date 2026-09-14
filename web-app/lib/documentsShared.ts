export const DOCUMENTS_BUCKET = "documents";
export const MAX_DOCUMENT_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB (matches existing upload convention)

export const DOCUMENT_TYPE_OPTIONS = [
  "Regulation",
  "Procurement",
  "Tender / RFP",
  "Competitor Intelligence",
  "Partner",
  "Hardware",
  "Training",
  "Policy",
  "Research",
  "Presentation",
  "Contract",
  "Other",
] as const;

export const CONFIDENTIALITY_OPTIONS = ["Public", "Internal", "Confidential"] as const;
export const DEFAULT_CONFIDENTIALITY = "Internal" as const;

export type DocumentTypeOption = (typeof DOCUMENT_TYPE_OPTIONS)[number];
export type ConfidentialityOption = (typeof CONFIDENTIALITY_OPTIONS)[number];

export const ALLOWED_DOCUMENT_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
  "csv",
  "jpg",
  "jpeg",
  "png",
] as const;

export const ALLOWED_DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "text/csv",
  "image/jpeg",
  "image/png",
] as const;

export type DocumentRow = {
  id: string;
  title: string;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  documentType: string | null;
  country: string | null;
  region: string | null;
  organisation: string | null;
  topic: string | null;
  documentDate: string | null;
  source: string | null;
  uploadedBy: string | null;
  tags: string[];
  confidentiality: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export function extractSessionFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/rpas_session=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function slugifyFileName(fileName: string): string {
  const dotIndex = fileName.lastIndexOf(".");
  const base = dotIndex >= 0 ? fileName.slice(0, dotIndex) : fileName;
  const ext = dotIndex >= 0 ? fileName.slice(dotIndex + 1) : "";

  const safeBase = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  const safeExt = ext.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 12);

  if (!safeExt) {
    return safeBase || "document";
  }

  return `${safeBase || "document"}.${safeExt}`;
}

export function getFileExtension(fileName: string): string {
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex < 0) return "";
  return fileName.slice(dotIndex + 1).toLowerCase();
}

export function parseTags(raw: string): string[] {
  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
    .slice(0, 20);
}

export function formatBytes(value: number): string {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}
