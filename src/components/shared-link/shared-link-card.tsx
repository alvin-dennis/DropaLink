import { ArrowRight, Globe, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SharedLinkCardProps {
  title: string;
  description: string;
  href: string;
  variant?: "public" | "private";
}

export function SharedLinkCard({
  title,
  description,
  href,
  variant = "public",
}: SharedLinkCardProps) {
  const isPrivate = variant === "private";

  return (
    <article
      className={`group relative flex items-center gap-6 rounded-[2rem] border border-border/40 bg-card/60 p-6 transition-all duration-500 hover:-translate-y-2 hover:bg-card hover:shadow-2xl hover:ring-4 backdrop-blur-sm ${
        isPrivate ? "shared-link-card-private" : "shared-link-card-public"
      }`}
    >
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-110 ${
          isPrivate ? "shared-link-card-icon-private" : "shared-link-card-icon-public"
        }`}
      >
        {isPrivate ? <Lock className="h-6 w-6" /> : <Globe className="h-6 w-6" />}
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <h3
          className={`truncate text-lg font-bold text-foreground transition-colors ${
            isPrivate ? "shared-link-card-title-private" : "shared-link-card-title-public"
          }`}
        >
          {title}
        </h3>
        <p className="truncate text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
          {description}
        </p>
      </div>
      <Button
        asChild
        className={`h-12 rounded-[1.25rem] px-6 text-sm font-bold text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 ${
          isPrivate ? "shared-link-card-button-private" : "shared-link-card-button-public"
        }`}
      >
        <Link href={href} target="_blank" rel="noreferrer">
          {isPrivate ? "Access" : "Visit"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </article>
  );
}
