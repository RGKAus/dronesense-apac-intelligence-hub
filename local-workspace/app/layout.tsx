import type { Metadata } from "next";
import Link from "next/link";
import WorkspaceProvider from "../components/WorkspaceProvider";
import "../../web-app/app/globals.css";
import "../../web-app/app/customers/customers.css";
import "../../web-app/app/intelligence-log/intelligence-log.css";
import "./local.css";

export const metadata: Metadata = { title: "Local Fictional Workspace | Versaterm Intelligence Hub", robots: { index: false, follow: false } };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><header className="local-header">
    <strong>Versaterm Intelligence Hub - Local Prototype</strong>
    <nav aria-label="Local workspace"><Link href="/customers">Customers &amp; Opportunities</Link><Link href="/intelligence-log">Intelligence Log</Link><Link href="/backups">Backup / Restore</Link></nav>
  </header><main className="local-main customer-stack"><WorkspaceProvider>{children}</WorkspaceProvider></main></body></html>;
}
