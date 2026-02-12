import Link from "next/link";

interface SharedLinkFooterProps {
  appName: string;
}

export function SharedLinkFooter({ appName }: SharedLinkFooterProps) {
  return (
    <footer className="w-full border-t border-border pt-4 text-center text-[11px] text-muted-foreground">
      <p>
        <Link href="/report" className="underline underline-offset-2 hover:text-foreground">
          Report this link
        </Link>
        {" | "}
        Powered by {appName}
      </p>
    </footer>
  );
}
