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
  variant = "public" 
}: SharedLinkBadgesProps & { variant?: "public" | "private" }) {
  const isPrivate = variant === "private";
  const pillClass = isPrivate 
    ? "inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/[0.03] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600/80 shadow-sm backdrop-blur-md transition-all"
    : "section-pill transition-all";

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div className={pillClass}>
        Privacy: {privacyStatus}
      </div>
      <div className={pillClass}>
        Expires: {expiryDate}
      </div>
      <div className={pillClass}>
        Total Links: {totalLinks}
      </div>
    </div>
  );
}
