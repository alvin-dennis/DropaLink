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
    <SharedLinkShell footer={<SharedLinkFooter appName="DropaLink" />}>
      <SharedLinkHeader sharedBy={collection.sharedBy} />

      <section className="space-y-5 text-center">
        <h1 className="text-4xl font-black leading-tight text-primary">{collection.title}</h1>
        <p className="mx-auto max-w-xl whitespace-pre-line text-sm text-muted-foreground">
          {collection.description}
        </p>
        <SharedLinkBadges
          privacyStatus="Private"
          expiryDate={collection.expiryDate}
          totalLinks={String(collection.links.length)}
        />
      </section>

      <section
        className="space-y-3 rounded-[4px] border border-primary/25 bg-primary/5 p-3"
        aria-label="Shared links"
      >
        {collection.links.map((link) => (
          <article
            key={link.title}
            className="flex items-center gap-4 rounded-[4px] border border-primary/30 bg-card px-4 py-4"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-primary/40 bg-primary/10 text-primary">
              <Lock className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{link.title}</p>
              <p className="truncate text-xs text-muted-foreground">{link.description}</p>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-8 rounded-[4px] border-primary/40 px-3 text-xs shadow-none"
            >
              <Link href={link.href} target="_blank" rel="noreferrer">
                Open
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </article>
        ))}
      </section>
    </SharedLinkShell>
  );
}
