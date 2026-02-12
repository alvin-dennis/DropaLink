import type { ReactNode } from "react";

interface SharedLinkShellProps {
  children: ReactNode;
  footer: ReactNode;
}

export function SharedLinkShell({ children, footer }: SharedLinkShellProps) {
  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[600px] flex-col items-center justify-between gap-10">
        <div className="w-full space-y-10">{children}</div>
        {footer}
      </div>
    </main>
  );
}
