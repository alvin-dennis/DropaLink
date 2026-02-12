import { ArrowRight, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SharedLinkCardProps {
  title: string;
  description: string;
  href: string;
}

export function SharedLinkCard({ title, description, href }: SharedLinkCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-[4px] border border-border bg-card px-4 py-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-border bg-background text-muted-foreground">
        <Globe className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{description}</p>
      </div>
      <Button
        asChild
        variant="outline"
        size="sm"
        className="h-8 rounded-[4px] border-border px-3 text-xs shadow-none transition-none hover:translate-y-0 hover:bg-secondary/60 hover:text-foreground active:translate-y-0"
      >
        <Link href={href} target="_blank" rel="noreferrer">
          Visit
          <ArrowRight className="h-3 w-3" />
        </Link>
      </Button>
    </article>
  );
}
