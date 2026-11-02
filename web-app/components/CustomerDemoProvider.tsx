"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import type { CustomerCountry, CustomerOrganisation } from "../lib/customerOrganisations";
import {
  createBlankDemoCustomer, demoOrganisations, findExistingOrganisation, getInitialDemoHandovers,
  updateDemoField, validateDemoOrganisation, type CustomerDemoState,
} from "../lib/customerDemo";
import {
  emptyCustomerFilters, type CustomerFilters, type CustomerHandover,
  type EditableHandoverFields, type EditableHandoverKey,
} from "../lib/customers";

export type CustomerDemoContextValue = {
  organisations: CustomerOrganisation[];
  handovers: CustomerHandover[];
  filters: CustomerFilters;
  setFilters: (filters: CustomerFilters) => void;
  createCustomer: (name: string, country: CustomerCountry, region: string) => { error: string | null; organisationId?: string } | Promise<{ error: string | null; organisationId?: string }>;
  saveField: <K extends EditableHandoverKey>(id: string, key: K, value: EditableHandoverFields[K]) => string | null | Promise<string | null>;
  saveOrganisation: (organisation: CustomerOrganisation) => string | null | Promise<string | null>;
  persistence?: "local";
};

export const CustomerDemoContext = createContext<CustomerDemoContextValue | null>(null);

export default function CustomerDemoProvider({
  canonicalOrganisations, children,
}: { canonicalOrganisations: CustomerOrganisation[]; children: ReactNode }) {
  const [state, setState] = useState<CustomerDemoState>(() => ({
    organisations: [...demoOrganisations, ...canonicalOrganisations],
    handovers: getInitialDemoHandovers(),
  }));
  // Event handlers always patch the latest state, including back-to-back section saves.
  const current = useRef(state);
  const [filters, setFilters] = useState<CustomerFilters>(emptyCustomerFilters);

  function commit(next: CustomerDemoState) {
    current.current = next;
    setState(next);
  }

  function createCustomer(name: string, country: CustomerCountry, region: string) {
    const result = createBlankDemoCustomer(current.current, name, country, region, `demo-custom-${crypto.randomUUID()}`);
    if (!result.error) commit(result.state);
    return { error: result.error, organisationId: result.organisationId };
  }

  function saveField<K extends EditableHandoverKey>(id: string, key: K, value: EditableHandoverFields[K]): string | null {
    const result = updateDemoField(current.current, id, key, value, new Date().toISOString());
    if (!result.error) commit(result.state);
    return result.error;
  }

  function saveOrganisation(organisation: CustomerOrganisation): string | null {
    const error = validateDemoOrganisation(organisation);
    if (error) return error;
    if (!current.current.organisations.some((item) => item.id === organisation.id && item.origin === "demonstration")) return "This demonstration identity is no longer available.";
    const duplicate = findExistingOrganisation(organisation.name, organisation.country, current.current.organisations.filter((item) => item.id !== organisation.id));
    if (duplicate) return "This organisation already exists. Open its existing profile rather than creating a duplicate identity.";
    commit({
      organisations: current.current.organisations.map((item) => item.id === organisation.id ? { ...organisation } : item),
      handovers: current.current.handovers.map((item) => item.organisationId === organisation.id ? { ...item, updatedAt: new Date().toISOString() } : item),
    });
    return null;
  }

  return (
    <CustomerDemoContext.Provider value={{ ...state, filters, setFilters, createCustomer, saveField, saveOrganisation }}>
      <aside className="customer-demo-notice" aria-label="Demonstration data boundary">
        <strong>Fictional demonstration only - real customer-data entry is locked.</strong>
        <p>Use fictional names and label free text with &quot;Fictional:&quot;. No emails, phone numbers, URLs or real intelligence. Changes stay in memory while navigating this module and reset on reload or leaving it. Nothing is sent to Supabase or stored in your browser.</p>
      </aside>
      {children}
    </CustomerDemoContext.Provider>
  );
}

export function useCustomerDemo(): CustomerDemoContextValue {
  const context = useContext(CustomerDemoContext);
  if (!context) throw new Error("Customer components must be inside CustomerDemoProvider.");
  return context;
}
