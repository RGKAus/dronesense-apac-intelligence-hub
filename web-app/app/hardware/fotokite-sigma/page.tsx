"use client";

import AppShell from "../../../components/AppShell";
import Link from "next/link";
import HardwareImage from "../../../components/HardwareImage";

export default function FotokiteSigmaPage() {
  return (
    <AppShell activePath="/hardware" eyebrow="HARDWARE" title="Fotokite Sigma" description="Supported hardware profile">
      <section className="product-hero">
        <div className="hero-left">
          <div className="eyebrow-small">SUPPORTED HARDWARE</div>
          <h2 className="product-title">Fotokite Sigma</h2>
          <div className="product-subtitle">Actively Tethered UAS</div>

          <div className="badge-row" style={{ marginBottom: 12 }}>
            <div className="status-supported">SUPPORTED</div>
            <div className="badge-early-access">EARLY ACCESS INTEGRATION</div>
          </div>

          <div className="hero-actions">
            <a className="external-button" href="https://fotokite.com/" target="_blank" rel="noreferrer">View Fotokite Website ↗</a>
          </div>
        </div>

        <div className="hero-image">
          <HardwareImage slug="fotokite-sigma" />
        </div>
      </section>
    </AppShell>
  );
}
