import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { sharedCollections } from "@/lib/shared-links";

export const metadata: Metadata = {
  title: "Shared Links - Public",
};

export default function SharedPublicPage() {
  const firstPublic = sharedCollections.find((item) => item.visibility === "public");

  if (!firstPublic) {
    redirect("/");
  }

  redirect(`/shared/${firstPublic.slug}`);
}
