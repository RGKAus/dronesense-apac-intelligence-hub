import type { ReactNode } from "react";
import AppShell from "../../components/AppShell";
import CustomerDemoProvider from "../../components/CustomerDemoProvider";
import { getCanonicalCustomerOrganisations } from "../../lib/customerOrganisations";
import "./customers.css";

export const dynamic = "force-dynamic";

export default function CustomersLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell
      activePath="/customers"
      eyebrow="AUSTRALIA & NEW ZEALAND"
      title="Customers & Opportunities"
      description="State-by-state customer and prospect handover, evidence quality and outstanding next steps."
    >
      <CustomerDemoProvider canonicalOrganisations={getCanonicalCustomerOrganisations()}>
        {children}
      </CustomerDemoProvider>
    </AppShell>
  );
}
