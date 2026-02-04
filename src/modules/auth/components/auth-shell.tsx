import { Crown, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-auth">
      <div className="mx-auto flex min-h-svh w-full max-w-6xl items-stretch px-6 py-12">
        <div className="relative hidden w-full max-w-md flex-col justify-between gap-12 rounded-[2.25rem] border border-border/60 bg-card/70 p-10 lg:flex">
          <div className="space-y-8">
            <div className="flex items-center gap-3 font-semibold">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Crown className="h-4 w-4" />
              </div>
              <Link href="/" className="font-display text-lg">
                DropaLink
              </Link>
            </div>
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                Secure sharing
              </Badge>
              <h1 className="font-display text-3xl">Give access on your terms.</h1>
              <p className="text-sm text-muted-foreground">
                Build private links that expire, lock after one view, or stay open for your team.
              </p>
            </div>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-primary" />
              One-time access controls
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-primary" />
              Smart alerts and audit trails
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center lg:pl-12">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
