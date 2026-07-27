import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Versaterm DroneSense Intelligence Platform",
  description: "Global public safety, regulatory and RPAS intelligence platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
