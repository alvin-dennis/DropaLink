import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { sharedCollections } from "@/lib/shared-links";

export const metadata: Metadata = {
  title: "Shared Links - Private",
};

export default function SharedPrivatePage() {
  const firstPrivate = sharedCollections.find((item) => item.visibility === "private");

  if (!firstPrivate) {
    redirect("/");
  }

  redirect(`/shared/${firstPrivate.slug}`);
}
