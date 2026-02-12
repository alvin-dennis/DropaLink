interface SharedLinkHeaderProps {
  sharedBy: string;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function SharedLinkHeader({
  sharedBy,
  variant = "public",
}: {
  sharedBy: string;
  variant?: "public" | "private";
}) {
  const isPrivate = variant === "private";

  return (
    <header className="flex flex-col items-center justify-center gap-4">
      <div
        className={`brand-mark flex h-14 w-14 items-center justify-center rounded-2xl text-base font-bold shadow-2xl transition-all duration-500 ${
          isPrivate ? "shared-link-header-mark-private" : "shared-link-header-mark-public"
        }`}
      >
        {getInitials(sharedBy)}
      </div>
      <p className="text-[13px] font-medium tracking-wide text-muted-foreground/80">
        Shared by <span className="font-semibold text-foreground">{sharedBy}</span>
      </p>
    </header>
  );
}
