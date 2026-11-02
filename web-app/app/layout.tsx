import type { Metadata } from "next";
import "./globals.css";
import { applicationBrand } from "../lib/branding";

export const metadata: Metadata = {
  title: { default: applicationBrand.title, template: `%s | ${applicationBrand.title}` },
  applicationName: applicationBrand.title,
  description: applicationBrand.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
