export type SharedVisibility = "public" | "private";

export interface SharedResourceLink {
  title: string;
  description: string;
  href: string;
}

export interface SharedCollection {
  slug: string;
  sharedBy: string;
  title: string;
  description: string;
  visibility: SharedVisibility;
  expiryDate: string;
  links: SharedResourceLink[];
}

export const sharedCollections: SharedCollection[] = [
  {
    slug: "brand-assets-2026",
    sharedBy: "Alex Rivera",
    title: "Brand Asset Directory",
    description:
      "Primary logos, icon exports, and typography guidelines.\nUse these assets for approved partner channels only.",
    visibility: "public",
    expiryDate: "March 15, 2026",
    links: [
      {
        title: "Logo Kit",
        description: "SVG, PNG, and monochrome variants",
        href: "https://example.com/logo-kit",
      },
      {
        title: "Typography Guide",
        description: "Usage rules and spacing standards",
        href: "https://example.com/type-guide",
      },
      {
        title: "Press Usage",
        description: "Approved media and attribution requirements",
        href: "https://example.com/press-usage",
      },
    ],
  },
  {
    slug: "investor-room-q1",
    sharedBy: "Alex Rivera",
    title: "Q1 Investor Materials",
    description:
      "Confidential files for approved stakeholders only.\nShared in a private-view layout for focused access.",
    visibility: "private",
    expiryDate: "March 22, 2026",
    links: [
      {
        title: "Quarterly Letter",
        description: "CEO summary and highlights",
        href: "https://example.com/q1-letter",
      },
      {
        title: "Financial Pack",
        description: "Balance sheet and forecasts",
        href: "https://example.com/financial-pack",
      },
      {
        title: "Roadmap Notes",
        description: "Pipeline and strategic priorities",
        href: "https://example.com/roadmap-notes",
      },
    ],
  },
  {
    slug: "engineering-handoff",
    sharedBy: "Alex Rivera",
    title: "Engineering Handoff",
    description:
      "Technical specs and release instructions for deployment.\nReference this package during implementation.",
    visibility: "public",
    expiryDate: "April 2, 2026",
    links: [
      {
        title: "API Spec",
        description: "Endpoints, contracts, and versioning",
        href: "https://example.com/api-spec",
      },
      {
        title: "Release Checklist",
        description: "Preflight and post-release checks",
        href: "https://example.com/release-checklist",
      },
      {
        title: "Monitoring Dashboard",
        description: "SLO, alerts, and runbook links",
        href: "https://example.com/monitoring",
      },
    ],
  },
];

export function getSharedCollectionBySlug(slug: string) {
  return sharedCollections.find((collection) => collection.slug === slug);
}
