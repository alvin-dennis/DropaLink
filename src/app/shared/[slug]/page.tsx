import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSharedCollectionBySlug } from "@/lib/shared-links";
import { PrivateLinksView } from "@/modules/shared-link/components/private-links-view";
import { PublicLinksView } from "@/modules/shared-link/components/public-links-view";

interface SharedPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SharedPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getSharedCollectionBySlug(slug);

  if (!collection) {
    return {
      title: "Shared Link Not Found",
    };
  }

  return {
    title: `${collection.title} - Shared Link`,
  };
}

export default async function SharedLinkPage({ params }: SharedPageProps) {
  const { slug } = await params;
  const collection = getSharedCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  if (collection.visibility === "private") {
    return <PrivateLinksView collection={collection} />;
  }

  return <PublicLinksView collection={collection} />;
}
