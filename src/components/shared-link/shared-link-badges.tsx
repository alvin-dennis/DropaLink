import { Badge } from "@/components/ui/badge";

interface SharedLinkBadgesProps {
  privacyStatus: string;
  expiryDate: string;
  totalLinks: string;
}

export function SharedLinkBadges({
  privacyStatus,
  expiryDate,
  totalLinks,
  variant = "public",
}: SharedLinkBadgesProps & { variant?: "public" | "private" }) {
  const isPrivate = variant === "private";
  const pillClass = isPrivate ? "shared-link-badge-private" : "section-pill transition-all";

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div className={pillClass}>Privacy: {privacyStatus}</div>
      <div className={pillClass}>Expires: {expiryDate}</div>
      <div className={pillClass}>Total Links: {totalLinks}</div>
    </div>
  );
}
