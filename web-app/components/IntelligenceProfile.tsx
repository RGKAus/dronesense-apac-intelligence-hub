import type { FC, ReactNode } from "react";

type HeaderField = { label: string; value?: string };

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  headerFields?: HeaderField[];
  children?: ReactNode;
};

export default function IntelligenceProfile({
  eyebrow,
  title,
  description,
  headerFields = [],
  children,
}: Props) {
  return (
    <div>
      <section className="panel">
        <div style={{ padding: 18 }}>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, padding: 18 }}>
          {headerFields.map((f) => (
            <div key={f.label} className="panel" style={{ padding: 12 }}>
              <p style={{ color: "#667085", fontSize: 12, margin: 0 }}>{f.label}</p>
              <strong style={{ marginTop: 8, display: "block" }}>{f.value ?? "Research required"}</strong>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gap: 12, marginTop: 18 }}>{children}</section>
    </div>
  );
}
