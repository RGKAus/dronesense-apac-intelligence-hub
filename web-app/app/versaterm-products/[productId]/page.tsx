import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VersatermProductProfile from "../../../components/VersatermProductProfile";
import { versatermProducts } from "../../../lib/versatermProducts";
import { getProductIntelligenceProfile } from "../../../lib/versatermProductIntelligence";

type Props = { params: Promise<{ productId: string }> };

export function generateStaticParams() {
  return versatermProducts.map((product) => ({ productId: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = getProductIntelligenceProfile((await params).productId);
  if (!profile) notFound();
  return { title: profile.product.name, description: `${profile.product.name} product intelligence. Unverified details are marked Research Required.` };
}

export default async function ProductProfilePage({ params }: Props) {
  const profile = getProductIntelligenceProfile((await params).productId);
  if (!profile) notFound();
  return <VersatermProductProfile profile={profile} />;
}
