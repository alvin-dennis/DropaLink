import { Badge } from "@/components/ui/badge";

interface SharedLinkBadgesProps {
  privacyStatus: string;
  expiryDate: string;
  totalLinks: string;
}

export function SharedLinkBadges({ privacyStatus, expiryDate, totalLinks }: SharedLinkBadgesProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge
        variant="outline"
        className="rounded-[4px] border-border px-3 py-1 text-[11px] font-medium normal-case tracking-normal"
      >
        Privacy: {privacyStatus}
      </Badge>
      <Badge
        variant="outline"
        className="rounded-[4px] border-border px-3 py-1 text-[11px] font-medium normal-case tracking-normal"
      >
        Expires: {expiryDate}
      </Badge>
      <Badge
        variant="outline"
        className="rounded-[4px] border-border px-3 py-1 text-[11px] font-medium normal-case tracking-normal"
      >
        Total Links: {totalLinks}
      </Badge>
    </div>
  );
}
