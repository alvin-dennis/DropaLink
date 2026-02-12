import type { ReactNode } from "react";

interface SharedLinkShellProps {
  children: ReactNode;
  footer: ReactNode;
  variant?: "public" | "private";
}

export function SharedLinkShell({ children, footer, variant = "public" }: SharedLinkShellProps) {
  const isPublic = variant === "public";

  return (
    <main className="relative min-h-screen bg-landing px-4 py-8 overflow-hidden">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full blur-[120px] opacity-40 transition-colors duration-1000 ${
            isPublic ? "shared-link-shell-glow-top-public" : "shared-link-shell-glow-top-private"
          }`}
        />
        <div
          className={`absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full blur-[120px] opacity-40 transition-colors duration-1000 ${
            isPublic
              ? "shared-link-shell-glow-bottom-public"
              : "shared-link-shell-glow-bottom-private"
          }`}
        />
        <div className="grid-overlay pointer-events-none absolute inset-0 opacity-40" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[620px] flex-col items-center justify-center gap-16 py-12">
        <div className="w-full space-y-12">{children}</div>
        {footer}
      </div>
    </main>
  );
}
