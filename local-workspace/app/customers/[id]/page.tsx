import LocalCustomer from "../../../components/LocalCustomer";
export default async function Customer({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LocalCustomer id={id} />;
}
