interface SharedLinkHeaderProps {
  sharedBy: string;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function SharedLinkHeader({ sharedBy }: SharedLinkHeaderProps) {
  return (
    <header className="flex items-center justify-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-[11px] font-semibold text-foreground">
        {getInitials(sharedBy)}
      </div>
      <p className="text-[12px] text-muted-foreground">
        Shared by <span className="text-foreground">{sharedBy}</span>
      </p>
    </header>
  );
}
