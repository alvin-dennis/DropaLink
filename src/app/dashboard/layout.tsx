import { Crown } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";
import { ProfileMenu } from "@/components/dashboard/profile-menu";
import { Badge } from "@/components/ui/badge";
import { getProfileDisplayName, getProfileInitials } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  const profileName = getProfileDisplayName(user);
  const profileInitials = getProfileInitials(profileName, user?.email);

  return (
    <main className="bg-dashboard min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col">
        <nav className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur">
          <div className="flex h-16 w-full items-center justify-between px-6 text-sm">
            <div className="flex items-center gap-3 font-semibold">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Crown className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-3">
                <Link href="/" className="font-display text-base">
                  DropaLink
                </Link>
                <Badge variant="secondary" className="hidden md:inline-flex">
                  Dashboard
                </Badge>
              </div>
            </div>
            {user ? (
              <ProfileMenu name={profileName} email={user.email} initials={profileInitials} />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </nav>

        <div className="flex-1 px-6 pb-16 pt-10">{children}</div>

        <footer className="border-t border-border/60">
          <div className="flex flex-col gap-2 px-6 py-10 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>DropaLink Dashboard</p>
            <p>Private sharing with full control.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
