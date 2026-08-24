import Link from "next/link";
import type { FC } from "react";

type Props = {
  name: string;
  manufacturer?: string;
  category?: string;
  integration?: string;
  status?: string;
  maturity?: string;
  href: string;
};

const HardwareCard: FC<Props> = ({ name, manufacturer, category, integration, status, maturity, href }) => {
  return (
    <Link className="country-card" href={href}>
      <div className="country-symbol">{name.split(" ").map((s) => s[0]).slice(0,2).join("")}</div>

      <div>
        <strong>{name}</strong>
        <span>{manufacturer ?? "Manufacturer: Research required"}</span>
        <div style={{ color: "#667085", fontSize: 12, marginTop: 8 }}>
          <div>Category: {category ?? "Research required"}</div>
          <div>Integration: {integration ?? "Research required"}</div>
          <div style={{ marginTop: 6 }}>
            {status === "Supported" ? <span className="status-supported">Supported</span> : <span>Status: {status ?? "Research required"}</span>}
          </div>
          <div style={{ marginTop: 6 }}>Integration maturity: {maturity ?? "Research required"}</div>
        </div>
      </div>
    </Link>
  );
};

export default HardwareCard;
