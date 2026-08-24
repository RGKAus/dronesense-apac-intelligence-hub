import Link from "next/link";
import type { FC } from "react";

type Props = {
  name: string;
  code?: string;
  href: string;
  subtitle?: string;
};

const CompetitorCard: FC<Props> = ({ name, code = "", href, subtitle }) => {
  return (
    <Link className="country-card" href={href} key={name}>
      <div className="country-symbol">{code || name.charAt(0)}</div>

      <div>
        <strong>{name}</strong>
        <span>{subtitle ?? "View intelligence →"}</span>
      </div>
    </Link>
  );
};

export default CompetitorCard;
