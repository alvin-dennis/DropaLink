import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { SharedLinkBadges } from "@/components/shared-link/shared-link-badges";
import { SharedLinkFooter } from "@/components/shared-link/shared-link-footer";
import { SharedLinkHeader } from "@/components/shared-link/shared-link-header";
import { SharedLinkShell } from "@/components/shared-link/shared-link-shell";
import { Button } from "@/components/ui/button";
import type { SharedCollection } from "@/lib/shared-links";

interface PrivateLinksViewProps {
  collection: SharedCollection;
}

export function PrivateLinksView({ collection }: PrivateLinksViewProps) {
  return (
    <SharedLinkShell variant="private" footer={<SharedLinkFooter appName="DropaLink" />}>
      <SharedLinkHeader variant="private" sharedBy={collection.sharedBy} />

      <section className="space-y-6 text-center">
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600 ring-1 ring-rose-500/10 mb-2">
          <Lock className="h-3 w-3" />
          Secure Vault
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            {collection.title}
          </h1>
          <p className="mx-auto max-w-lg whitespace-pre-line text-lg leading-relaxed text-muted-foreground/80">
            {collection.description}
          </p>
        </div>
        <SharedLinkBadges
          variant="private"
          privacyStatus="Private"
          expiryDate={collection.expiryDate}
          totalLinks={String(collection.links.length)}
        />
      </section>

      <section
        className="relative space-y-4"
        aria-label="Shared links"
      >
        {collection.links.map((link) => (
          <article
            key={link.title}
            className="group relative flex items-center gap-6 rounded-[2rem] border border-border/40 bg-card/60 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-rose-500/30 hover:bg-card hover:shadow-2xl hover:shadow-rose-500/10 hover:ring-4 hover:ring-rose-500/5 backdrop-blur-sm"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-rose-500/10 bg-rose-500/5 text-rose-500 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:border-rose-500/30 group-hover:bg-rose-500/10">
              <Lock className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1 space-y-1.5">
              <h3 className="truncate text-lg font-bold text-foreground group-hover:text-rose-600 transition-colors">
                {link.title}
              </h3>
              <p className="truncate text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                {link.description}
              </p>
            </div>
            <Button
              asChild
              className="h-12 rounded-[1.25rem] bg-rose-600 px-6 text-sm font-bold text-white shadow-xl hover:bg-rose-500 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Link href={link.href} target="_blank" rel="noreferrer">
                Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </article>
        ))}
      </section>
    </SharedLinkShell>
  );
}
