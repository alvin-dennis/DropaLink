import { Crown, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-auth">
      <div className="page-container flex min-h-svh items-stretch py-12">
        <div className="hero-panel relative hidden w-full max-w-md flex-col justify-between gap-12 p-10 lg:flex">
          <div className="space-y-8">
            <div className="flex items-center gap-3 font-semibold">
              <div className="brand-mark h-10 w-10">
                <Crown className="h-4 w-4" />
              </div>
              <Link href="/" className="font-display text-lg">
                DropaLink
              </Link>
            </div>
            <div className="space-y-4">
              <Badge variant="secondary" className="section-pill">
                Secure sharing
              </Badge>
              <h1 className="font-display text-3xl">Give access on your terms.</h1>
              <p className="text-sm text-muted-foreground">
                Build public or private links that expire, lock after one view, or stay open for
                your team.
              </p>
            </div>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Public and private modes
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
