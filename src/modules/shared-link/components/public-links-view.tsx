import { SharedLinkBadges } from "@/components/shared-link/shared-link-badges";
import { SharedLinkCard } from "@/components/shared-link/shared-link-card";
import { SharedLinkFooter } from "@/components/shared-link/shared-link-footer";
import { SharedLinkHeader } from "@/components/shared-link/shared-link-header";
import { SharedLinkShell } from "@/components/shared-link/shared-link-shell";
import type { SharedCollection } from "@/lib/shared-links";

interface PublicLinksViewProps {
  collection: SharedCollection;
}

export function PublicLinksView({ collection }: PublicLinksViewProps) {
  return (
    <SharedLinkShell variant="public" footer={<SharedLinkFooter appName="DropaLink" />}>
      <SharedLinkHeader variant="public" sharedBy={collection.sharedBy} />

      <section className="space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary">
            {collection.title}
          </h1>
          <p className="mx-auto max-w-lg whitespace-pre-line text-lg leading-relaxed text-muted-foreground/80">
            {collection.description}
          </p>
        </div>
        <div className="mt-4">
          <SharedLinkBadges
            variant="public"
            privacyStatus="Public"
            expiryDate={collection.expiryDate}
            totalLinks={String(collection.links.length)}
          />
        </div>
      </section>

      <section className="space-y-3" aria-label="Shared links">
        {collection.links.map((link) => (
          <SharedLinkCard
            key={link.title}
            title={link.title}
            description={link.description}
            href={link.href}
          />
        ))}
      </section>
    </SharedLinkShell>
  );
}
