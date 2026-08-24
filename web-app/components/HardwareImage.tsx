"use client";

import { useEffect, useState, useRef } from "react";

type Props = { slug: string };

export default function HardwareImage({ slug }: Props) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

  async function fetchImage() {
    try {
      const res = await fetch(`/api/hardware/images?slug=${encodeURIComponent(slug)}`);
      if (!res.ok) return setUrl(null);
      const data = await res.json();
      setUrl(data.url || null);
    } catch (e) {
      setUrl(null);
    }
  }

  useEffect(() => { fetchImage(); }, [slug]);

  useEffect(() => {
    if (!selectedFile) { setPreview(null); return; }
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result));
    reader.readAsDataURL(selectedFile);
    return () => { reader.abort && reader.abort(); };
  }, [selectedFile]);

  function handleChoose(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const f = e.target.files?.[0] || null;
    if (!f) return;
    if (!f.type.startsWith("image/")) { setError("Please select an image file"); return; }
    if (f.size > MAX_BYTES) { setError("File exceeds 10 MB maximum"); return; }
    setSelectedFile(f);
  }

  async function doUpload() {
    if (!selectedFile) return;
    setLoading(true); setError(null);
    try {
      const fd = new FormData();
      fd.append('slug', slug);
      fd.append('file', selectedFile);
      const res = await fetch('/api/hardware/images', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setUrl(data.url);
      setSelectedFile(null);
      setPreview(null);
    } catch (err: any) {
      setError(err.message || String(err));
    } finally { setLoading(false); }
  }

  async function doRemove() {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`/api/hardware/images?slug=${encodeURIComponent(slug)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Remove failed');
      setUrl(null);
    } catch (err: any) {
      setError(err.message || String(err));
    } finally { setLoading(false); }
  }

  const [showConfirm, setShowConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function triggerFileInput() {
    fileInputRef.current?.click();
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {url ? (
        <div style={{ width: '100%', height: '100%' }}>
          <div className="image-wrapper">
            <img src={url} alt="product" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10 }} />

            <div className="image-controls">
              <button
                className="icon-btn"
                onClick={() => triggerFileInput()}
                aria-label="Change product image"
                title="Change image"
                type="button"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/><path d="M20.71 7.04a1.003 1.003 0 0 0 0-1.41l-2.34-2.34a1.003 1.003 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={handleChoose} style={{ display: 'none' }} />
              </button>

              <button
                className="icon-btn"
                onClick={() => setShowConfirm(true)}
                aria-label="Delete product image"
                title="Delete image"
                type="button"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
              </button>

              {showConfirm && (
                <div className="confirm-pop" role="dialog" aria-modal="true">
                  <p style={{ fontWeight: 700 }}>Delete product image?</p>
                  <p style={{ marginTop: 6, color: 'var(--secondary)' }}>This will remove the current image from this hardware profile.</p>
                  <div className="confirm-actions" style={{ marginTop: 8 }}>
                    <button className="btn cancel" onClick={() => setShowConfirm(false)}>Cancel</button>
                    <button className="btn delete" onClick={async () => { setShowConfirm(false); await doRemove(); }}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ width: 180, height: 140, borderRadius: 8, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div style={{ color: 'var(--secondary)' }}>No product image</div>
          <div>
            <label style={{ cursor: 'pointer', background: 'var(--navy)', color: 'white', padding: '8px 12px', borderRadius: 8 }}>
              Upload Image
              <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={handleChoose} style={{ display: 'none' }} />
            </label>
          </div>
          {preview && (
            <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
              <img src={preview} alt="preview" style={{ width: 120, height: 80, objectFit: 'contain', borderRadius: 6, border: '1px solid var(--border)' }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={doUpload} disabled={loading} style={{ background: 'var(--navy)', color: 'white', padding: '8px 10px', borderRadius: 8 }}>Save</button>
                <button onClick={() => { setSelectedFile(null); setPreview(null); }} style={{ background: 'transparent', border: '1px solid var(--border)', padding: '8px 10px', borderRadius: 8 }}>Cancel</button>
              </div>
            </div>
          )}
          {error && <div style={{ color: '#b91c1c' }}>{error}</div>}
        </div>
      )}
    </div>
  );
}
