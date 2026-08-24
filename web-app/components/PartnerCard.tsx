import Link from "next/link";
import type { FC } from "react";

type Props = {
  name: string;
  code?: string;
  href: string;
  subtitle?: string;
  status?: string;
};

const PartnerCard: FC<Props> = ({ name, code = "", href, subtitle, status }) => {
  return (
    <Link className="country-card" href={href} key={name}>
      <div className="country-symbol">{code || name.charAt(0)}</div>

      <div>
        <strong>{name}</strong>
        <span>{subtitle ?? status ?? "View profile →"}</span>
      </div>
    </Link>
  );
};

export default PartnerCard;
