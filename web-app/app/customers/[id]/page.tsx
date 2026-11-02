import { notFound } from "next/navigation";
import CustomerProfile from "../../../components/CustomerProfile";
import { demoOrganisations } from "../../../lib/customerDemo";
import { getCanonicalCustomerOrganisations } from "../../../lib/customerOrganisations";

export default async function CustomerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isTemporaryId = /^demo-custom-[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/.test(id);
  if (!isTemporaryId && ![...demoOrganisations, ...getCanonicalCustomerOrganisations()].some((organisation) => organisation.id === id)) {
    notFound();
  }
  return <CustomerProfile key={id} organisationId={id} />;
}
