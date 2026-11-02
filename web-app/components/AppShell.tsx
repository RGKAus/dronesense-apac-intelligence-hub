import Link from "next/link";
import { logout } from "../app/logout/actions";
import type { ReactNode } from "react";
import { primaryNavigation } from "./navigation";
import MobileNavigation from "./MobileNavigation";

type AppShellProps = {
  activePath: string;
  eyebrow: string;
  title: string;
  description: string;
  headingAction?: ReactNode;
  children: ReactNode;
};

export default function AppShell({
  activePath,
  eyebrow,
  title,
  description,
  headingAction,
  children,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">DS</div>

          <div className="brand-copy">
            <p className="brand-name">DroneSense</p>
            <p className="brand-subtitle">by Versaterm</p>
            <p className="brand-product">Intelligence Hub</p>
          </div>
        </div>

        <nav className="navigation">
          {primaryNavigation.map((item, index) => (
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
          <p>Platform v2.0</p>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="mobile-brand">
            <strong>DroneSense</strong>
            <span>by Versaterm · Intelligence Hub</span>
          </div>

          <MobileNavigation activePath={activePath} />

          <div className="search-box">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search intelligence, agencies and regulations"
            />
          </div>

          <div className="user-profile" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div className="user-avatar">RG</div>

              <div>
                <strong>Rachael</strong>
                <span>Administrator</span>
              </div>
            </div>

            <form action={logout}>
              <button className="secondary-button" type="submit">
                Log out
              </button>
            </form>
          </div>
        </header>

        <div className="content">
          <section className="page-heading">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>

            {headingAction ?? null}
          </section>

          {children}
        </div>
      </main>
    </div>
  );
}