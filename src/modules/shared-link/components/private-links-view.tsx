import { Lock } from "lucide-react";
import { SharedLinkBadges } from "@/components/shared-link/shared-link-badges";
import { SharedLinkCard } from "@/components/shared-link/shared-link-card";
import { SharedLinkFooter } from "@/components/shared-link/shared-link-footer";
import { SharedLinkHeader } from "@/components/shared-link/shared-link-header";
import { SharedLinkShell } from "@/components/shared-link/shared-link-shell";
import type { SharedCollection } from "@/lib/shared-links";

interface PrivateLinksViewProps {
  collection: SharedCollection;
}

export function PrivateLinksView({ collection }: PrivateLinksViewProps) {
  return (
    <SharedLinkShell variant="private" footer={<SharedLinkFooter appName="DropaLink" />}>
      <SharedLinkHeader variant="private" sharedBy={collection.sharedBy} />

      <section className="space-y-6 text-center">
        <div className="shared-link-vault-pill">
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

      <section className="relative space-y-4" aria-label="Shared links">
        {collection.links.map((link) => (
          <SharedLinkCard
            key={link.title}
            title={link.title}
            description={link.description}
            href={link.href}
            variant="private"
          />
        ))}
      </section>
    </SharedLinkShell>
  );
}
