import Link from "next/link";
import type { ReactNode } from "react";

const navigation = [
  { label: "Dashboard", href: "/" },
  { label: "Live Intelligence", href: "/live-intelligence" },
  { label: "Countries", href: "/countries" },
  { label: "Agencies", href: "/agencies" },
  { label: "Regulations", href: "/regulations" },
  { label: "Procurement", href: "/procurement" },
  { label: "Technology Watch", href: "/technology-watch" },
  { label: "Reports", href: "/reports" },
];

type AppShellProps = {
  activePath: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export default function AppShell({
  activePath,
  eyebrow,
  title,
  description,
  children,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">DS</div>

          <div>
            <p className="brand-name">Versaterm DroneSense</p>
            <p className="brand-subtitle">Intelligence Platform</p>
          </div>
        </div>

        <nav className="navigation">
          {navigation.map((item, index) => (
            <Link
              href={item.href}
              className={
                item.href === activePath ? "nav-item active" : "nav-item"
              }
              key={item.label}
            >
              <span className="nav-symbol">{index + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <a href="#" className="nav-item">
            <span className="nav-symbol">A</span>
            Administration
          </a>

          <p>Platform v2.0</p>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="mobile-brand">DS Intelligence</div>

          <div className="search-box">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search intelligence, agencies and regulations"
            />
          </div>

          <div className="user-profile">
            <div className="user-avatar">RG</div>

            <div>
              <strong>Rachael</strong>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        <div className="content">
          <section className="page-heading">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
          </section>

          {children}
        </div>
      </main>
    </div>
  );
}