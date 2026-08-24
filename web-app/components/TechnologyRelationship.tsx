import type { FC } from "react";

type Props = {
  from: string;
  relation: string;
  to: string;
};

const TechnologyRelationship: FC<Props> = ({ from, relation, to }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ padding: 12, borderRadius: 8, background: "#f9fafb", border: "1px solid #e6eef9" }}>
        <strong>{from}</strong>
      </div>

      <div style={{ fontSize: 12, color: "#667085" }}>{`→ ${relation}`}</div>

      <div style={{ padding: 12, borderRadius: 8, background: "#f9fafb", border: "1px solid #e6eef9" }}>
        <strong>{to}</strong>
      </div>
    </div>
  );
};

export default TechnologyRelationship;
