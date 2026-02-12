import type { ReactNode } from "react";

interface SharedLinkShellProps {
  children: ReactNode;
  footer: ReactNode;
  variant?: "public" | "private";
}

export function SharedLinkShell({ children, footer, variant = "public" }: SharedLinkShellProps) {
  const isPublic = variant === "public";

  return (
    <main className={`relative min-h-screen px-4 py-8 overflow-hidden ${
      isPublic ? "bg-shared-link-view-public" : "bg-shared-link-view-private"
    }`}>
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className={isPublic ? "grid-pattern-public" : "grid-pattern-private"} />
        
        {/* Animated gradient blurs */}
        <div
          className={`absolute -top-[15%] -left-[15%] h-[50%] w-[50%] rounded-full blur-[100px] opacity-50 transition-colors duration-1000 ${
            isPublic ? "shared-link-shell-glow-top-public animated-blur-public" : "shared-link-shell-glow-top-private animated-blur-private"
          }`}
        />
        <div
          className={`absolute -bottom-[15%] -right-[15%] h-[50%] w-[50%] rounded-full blur-[100px] opacity-50 transition-colors duration-1000 ${
            isPublic
              ? "shared-link-shell-glow-bottom-public animated-blur-public"
              : "shared-link-shell-glow-bottom-private animated-blur-private"
          }`}
        />
        
        {/* Accent decorative dots */}
        {isPublic ? (
          <>
            <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full opacity-20 blur-sm" style={{ backgroundColor: 'var(--public-accent)' }} />
            <div className="absolute top-3/4 right-1/3 w-3 h-3 rounded-full opacity-15 blur-sm" style={{ backgroundColor: 'var(--public-accent)' }} />
          </>
        ) : (
          <>
            <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full opacity-20 blur-sm" style={{ backgroundColor: 'var(--private-accent)' }} />
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full opacity-15 blur-sm" style={{ backgroundColor: 'var(--private-accent)' }} />
          </>
        )}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[620px] flex-col items-center justify-center gap-16 py-12">
        <div className="w-full space-y-12">{children}</div>
        {footer}
      </div>
    </main>
  );
}
