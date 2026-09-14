"use client";

import { useMemo, useState } from "react";
import { australiaJurisdictions } from "../lib/australiaStateDirectory";
import { supportedCountries } from "../lib/countries";
import {
  CONFIDENTIALITY_OPTIONS,
  DEFAULT_CONFIDENTIALITY,
  DOCUMENT_TYPE_OPTIONS,
  MAX_DOCUMENT_UPLOAD_BYTES,
  formatBytes,
  type DocumentRow,
} from "../lib/documentsShared";

const ACCEPTED_FILE_TYPES = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.jpg,.jpeg,.png";

const COUNTRY_OPTIONS = [
  "All Countries",
  ...supportedCountries.map((country) => country.name),
];

function normalize(value: string | null | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

function formatDate(value: string | null): string {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });
}

function matchesSearch(document: DocumentRow, query: string): boolean {
  if (!query.trim()) return true;

  const value = normalize(query);
  const haystack = [
    document.title,
    document.organisation,
    document.topic,
    document.source,
    document.notes,
    document.tags.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(value);
}

type UploadFormState = {
  file: File | null;
  title: string;
  documentType: string;
  country: string;
  region: string;
  organisation: string;
  topic: string;
  documentDate: string;
  source: string;
  tags: string;
  confidentiality: string;
  notes: string;
};

const EMPTY_UPLOAD_STATE: UploadFormState = {
  file: null,
  title: "",
  documentType: "",
  country: "",
  region: "",
  organisation: "",
  topic: "",
  documentDate: "",
  source: "",
  tags: "",
  confidentiality: DEFAULT_CONFIDENTIALITY,
  notes: "",
};

export default function DocumentsLibrary({ initialDocuments }: { initialDocuments: DocumentRow[] }) {
  const [documents, setDocuments] = useState<DocumentRow[]>(initialDocuments);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [region, setRegion] = useState("All Regions");
  const [documentType, setDocumentType] = useState("All Types");
  const [confidentiality, setConfidentiality] = useState("All Levels");

  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadForm, setUploadForm] = useState<UploadFormState>(EMPTY_UPLOAD_STATE);

  const refreshDocuments = async () => {
    setError(null);
    const response = await fetch("/api/documents/list", { cache: "no-store" });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to refresh documents.");
    }

    setDocuments(data.documents ?? []);
  };

  const regionOptions = useMemo(() => {
    if (country === "All Countries") {
      const fromRows = Array.from(new Set(documents.map((item) => item.region).filter(Boolean) as string[])).sort();
      return ["All Regions", ...fromRows];
    }

    if (country === "Australia") {
      return ["All Regions", ...australiaJurisdictions.map((state) => state.name)];
    }

    const fromRows = Array.from(
      new Set(
        documents
          .filter((item) => item.country === country)
          .map((item) => item.region)
          .filter(Boolean) as string[],
      ),
    ).sort();

    return ["All Regions", ...fromRows];
  }, [country, documents]);

  const filteredDocuments = useMemo(() => {
    return documents.filter((item) => {
      if (country !== "All Countries" && item.country !== country) return false;
      if (region !== "All Regions" && item.region !== region) return false;
      if (documentType !== "All Types" && item.documentType !== documentType) return false;
      if (confidentiality !== "All Levels" && item.confidentiality !== confidentiality) return false;
      return matchesSearch(item, search);
    });
  }, [confidentiality, country, documentType, documents, region, search]);

  const clearFilters = () => {
    setSearch("");
    setCountry("All Countries");
    setRegion("All Regions");
    setDocumentType("All Types");
    setConfidentiality("All Levels");
  };

  const updateUploadForm = (key: keyof UploadFormState, value: string | File | null) => {
    setUploadForm((current) => ({ ...current, [key]: value }));
  };

  const openDocument = async (documentId: string, mode: "open" | "download") => {
    setError(null);

    const response = await fetch(`/api/documents/access?id=${encodeURIComponent(documentId)}&mode=${mode}`);
    const data = await response.json();

    if (!response.ok || !data.url) {
      throw new Error(data.error || "Unable to open document.");
    }

    window.open(data.url, "_blank", "noopener,noreferrer");
  };

  const removeDocument = async (documentId: string, title: string) => {
    const confirmed = window.confirm(`Delete "${title}"? This removes the stored file and metadata.`);
    if (!confirmed) return;

    setError(null);
    setMessage(null);

    const response = await fetch(`/api/documents/${encodeURIComponent(documentId)}`, { method: "DELETE" });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Delete failed.");
    }

    setMessage("Document deleted.");
    await refreshDocuments();
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (!uploadForm.file) {
      setError("File is required.");
      return;
    }

    if (!uploadForm.title.trim()) {
      setError("Title is required.");
      return;
    }

    if (uploadForm.file.size > MAX_DOCUMENT_UPLOAD_BYTES) {
      setError("File exceeds 10 MB maximum.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", uploadForm.file);
      formData.append("title", uploadForm.title.trim());
      formData.append("documentType", uploadForm.documentType);
      formData.append("country", uploadForm.country);
      formData.append("region", uploadForm.region);
      formData.append("organisation", uploadForm.organisation);
      formData.append("topic", uploadForm.topic);
      formData.append("documentDate", uploadForm.documentDate);
      formData.append("source", uploadForm.source);
      formData.append("tags", uploadForm.tags);
      formData.append("confidentiality", uploadForm.confidentiality || DEFAULT_CONFIDENTIALITY);
      formData.append("notes", uploadForm.notes);

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      await refreshDocuments();
      setUploadForm(EMPTY_UPLOAD_STATE);
      setUploadOpen(false);
      setMessage("Document uploaded successfully.");
    } catch (uploadError: any) {
      setError(uploadError?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="documents-shell">
      <section className="panel documents-top-panel">
        <div className="documents-top-actions">
          <button className="primary-button" onClick={() => setUploadOpen(true)} type="button">
            Upload Document
          </button>

          <span className="documents-limit-note">
            Allowed: PDF, Office docs, TXT, CSV, JPG, PNG up to {formatBytes(MAX_DOCUMENT_UPLOAD_BYTES)}.
          </span>
        </div>

        {message ? <p className="documents-success-message">{message}</p> : null}
        {error ? <p className="documents-error-message">{error}</p> : null}
      </section>

      {uploadOpen ? (
        <div className="documents-modal-backdrop" role="dialog" aria-modal="true" aria-label="Upload document">
          <div className="documents-modal panel">
            <div className="documents-modal-header">
              <h2>Upload Document</h2>
              <button className="secondary-button" onClick={() => setUploadOpen(false)} type="button">Close</button>
            </div>

            <form className="documents-upload-form" onSubmit={handleUpload}>
              <label>
                File *
                <input
                  className="filter-control"
                  type="file"
                  accept={ACCEPTED_FILE_TYPES}
                  onChange={(event) => updateUploadForm("file", event.target.files?.[0] ?? null)}
                  required
                />
              </label>

              <label>
                Title *
                <input
                  className="filter-control"
                  type="text"
                  value={uploadForm.title}
                  onChange={(event) => updateUploadForm("title", event.target.value)}
                  required
                />
              </label>

              <label>
                Document Type
                <select
                  className="filter-control"
                  value={uploadForm.documentType}
                  onChange={(event) => updateUploadForm("documentType", event.target.value)}
                >
                  <option value="">Select type</option>
                  {DOCUMENT_TYPE_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label>
                Country
                <select
                  className="filter-control"
                  value={uploadForm.country}
                  onChange={(event) => {
                    const nextCountry = event.target.value;
                    updateUploadForm("country", nextCountry);
                    if (nextCountry !== "Australia") {
                      updateUploadForm("region", "");
                    }
                  }}
                >
                  <option value="">Select country</option>
                  {supportedCountries.map((option) => (
                    <option key={option.slug} value={option.name}>{option.name}</option>
                  ))}
                </select>
              </label>

              <label>
                State / Region
                <input
                  className="filter-control"
                  type="text"
                  value={uploadForm.region}
                  onChange={(event) => updateUploadForm("region", event.target.value)}
                  list={uploadForm.country === "Australia" ? "au-region-list" : undefined}
                />
                <datalist id="au-region-list">
                  {australiaJurisdictions.map((state) => (
                    <option key={state.slug} value={state.name} />
                  ))}
                </datalist>
              </label>

              <label>
                Organisation
                <input
                  className="filter-control"
                  type="text"
                  value={uploadForm.organisation}
                  onChange={(event) => updateUploadForm("organisation", event.target.value)}
                />
              </label>

              <label>
                Topic
                <input
                  className="filter-control"
                  type="text"
                  value={uploadForm.topic}
                  onChange={(event) => updateUploadForm("topic", event.target.value)}
                />
              </label>

              <label>
                Document Date
                <input
                  className="filter-control"
                  type="date"
                  value={uploadForm.documentDate}
                  onChange={(event) => updateUploadForm("documentDate", event.target.value)}
                />
              </label>

              <label>
                Source
                <input
                  className="filter-control"
                  type="text"
                  value={uploadForm.source}
                  onChange={(event) => updateUploadForm("source", event.target.value)}
                />
              </label>

              <label>
                Tags
                <input
                  className="filter-control"
                  type="text"
                  value={uploadForm.tags}
                  onChange={(event) => updateUploadForm("tags", event.target.value)}
                  placeholder="Comma separated"
                />
              </label>

              <label>
                Confidentiality
                <select
                  className="filter-control"
                  value={uploadForm.confidentiality}
                  onChange={(event) => updateUploadForm("confidentiality", event.target.value)}
                >
                  {CONFIDENTIALITY_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="documents-upload-notes">
                Notes
                <textarea
                  className="filter-control"
                  value={uploadForm.notes}
                  onChange={(event) => updateUploadForm("notes", event.target.value)}
                  rows={4}
                />
              </label>

              <div className="documents-upload-actions">
                <button className="secondary-button" type="button" onClick={() => setUploadOpen(false)} disabled={uploading}>Cancel</button>
                <button className="primary-button" type="submit" disabled={uploading}>
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <section className="panel documents-filter-panel">
        <div className="documents-filters-grid">
          <div>
            <label htmlFor="documents-search">Search</label>
            <input
              id="documents-search"
              className="filter-control"
              type="search"
              placeholder="Search documents..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="documents-country">Country</label>
            <select
              id="documents-country"
              className="filter-control"
              value={country}
              onChange={(event) => {
                setCountry(event.target.value);
                setRegion("All Regions");
              }}
            >
              {COUNTRY_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="documents-region">State / Region</label>
            <select
              id="documents-region"
              className="filter-control"
              value={region}
              onChange={(event) => setRegion(event.target.value)}
            >
              {regionOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="documents-type">Document Type</label>
            <select
              id="documents-type"
              className="filter-control"
              value={documentType}
              onChange={(event) => setDocumentType(event.target.value)}
            >
              <option value="All Types">All Types</option>
              {DOCUMENT_TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="documents-confidentiality">Confidentiality</label>
            <select
              id="documents-confidentiality"
              className="filter-control"
              value={confidentiality}
              onChange={(event) => setConfidentiality(event.target.value)}
            >
              <option value="All Levels">All Levels</option>
              {CONFIDENTIALITY_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="documents-filter-actions">
          <button className="secondary-button" type="button" onClick={clearFilters}>Clear Filters</button>
          <span>{filteredDocuments.length} result{filteredDocuments.length === 1 ? "" : "s"}</span>
        </div>
      </section>

      <section className="panel documents-table-panel">
        {filteredDocuments.length === 0 ? (
          <p className="documents-empty">No documents match the current search and filters.</p>
        ) : (
          <div className="documents-table-scroll">
            <table className="documents-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Document Type</th>
                  <th>Country</th>
                  <th>Region</th>
                  <th>Organisation</th>
                  <th>Document Date</th>
                  <th>Confidentiality</th>
                  <th>Uploaded</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredDocuments.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.title}</strong>
                      <p className="documents-file-note">{item.fileName} · {formatBytes(item.fileSize)}</p>
                    </td>
                    <td>{item.documentType || "-"}</td>
                    <td>{item.country || "-"}</td>
                    <td>{item.region || "-"}</td>
                    <td>{item.organisation || "-"}</td>
                    <td>{formatDate(item.documentDate)}</td>
                    <td>
                      <span className={`documents-confidentiality documents-confidentiality-${normalize(item.confidentiality) || "internal"}`}>
                        {item.confidentiality}
                      </span>
                    </td>
                    <td>{formatDate(item.createdAt)}</td>
                    <td>
                      <div className="documents-row-actions">
                        <button
                          className="secondary-button"
                          type="button"
                          onClick={() => openDocument(item.id, "open")}
                        >
                          Open
                        </button>
                        <button
                          className="secondary-button"
                          type="button"
                          onClick={() => openDocument(item.id, "download")}
                        >
                          Download
                        </button>
                        <button
                          className="documents-delete-button"
                          type="button"
                          onClick={() => removeDocument(item.id, item.title)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
