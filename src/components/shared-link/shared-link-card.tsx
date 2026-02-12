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
    <article className="group relative flex items-center gap-6 rounded-[2rem] border border-border/40 bg-card/60 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:bg-card hover:shadow-2xl hover:shadow-primary/10 hover:ring-4 hover:ring-primary/5 backdrop-blur-sm">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/10 bg-primary/10 text-primary shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:border-primary/30 group-hover:bg-primary/20">
        <Globe className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <h3 className="truncate text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="truncate text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
          {description}
        </p>
      </div>
      <Button
        asChild
        className="h-12 rounded-[1.25rem] bg-primary px-6 text-sm font-bold text-white shadow-xl hover:bg-black hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <Link href={href} target="_blank" rel="noreferrer">
          Visit
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </article>
  );
}
