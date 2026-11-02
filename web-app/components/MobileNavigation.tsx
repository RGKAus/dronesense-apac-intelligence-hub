"use client";

import Link from "next/link";
import { useRef } from "react";
import { primaryNavigation } from "./navigation";
import { applicationBrand } from "../lib/branding";

export default function MobileNavigation({ activePath }: { activePath: string }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);

  function close(restoreFocus = false) {
    if (menu.current) menu.current.open = false;
    if (restoreFocus) trigger.current?.focus();
  }

  return (
    <details className="mobile-nav-menu" ref={menu} onKeyDown={(event) => {
      if (event.key === "Escape") close(true);
    }}>
      <summary className="mobile-menu-button" ref={trigger}>
        <span className="mobile-menu-icon" aria-hidden="true"><span /><span /><span /></span>
        <span className="mobile-menu-label mobile-menu-label-open">Menu</span>
        <span className="mobile-menu-label mobile-menu-label-close">Close</span>
      </summary>
      <div className="mobile-nav-backdrop" onClick={(event) => {
        if (event.target === event.currentTarget) close(true);
      }}>
        <aside className="mobile-nav-drawer" aria-label="Primary navigation">
          <div className="mobile-nav-drawer-header">
            <div className="mobile-nav-brand">
              <strong>{applicationBrand.name}</strong>
              <span>{applicationBrand.product}</span>
            </div>
            <button type="button" className="mobile-nav-close" onClick={() => close(true)}>Close</button>
          </div>
          <nav className="mobile-nav-links" aria-label="Mobile primary navigation">
            {primaryNavigation.map((item, index) => (
              <Link
                href={item.href}
                className={item.href === activePath ? "nav-item active" : "nav-item"}
                key={`mobile-${item.label}`}
                aria-current={item.href === activePath ? "page" : undefined}
                onClick={() => close()}
              >
                <span className="nav-symbol">{index + 1}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </details>
  );
}
