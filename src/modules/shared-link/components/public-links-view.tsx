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
    <SharedLinkShell footer={<SharedLinkFooter appName="DropaLink" />}>
      <SharedLinkHeader sharedBy={collection.sharedBy} />

      <section className="space-y-5 text-center">
        <h1 className="text-4xl font-black leading-tight text-primary">{collection.title}</h1>
        <p className="mx-auto max-w-xl whitespace-pre-line text-sm text-muted-foreground">
          {collection.description}
        </p>
        <SharedLinkBadges
          privacyStatus="Public"
          expiryDate={collection.expiryDate}
          totalLinks={String(collection.links.length)}
        />
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
