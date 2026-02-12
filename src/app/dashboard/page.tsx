import { Link2, ShieldCheck, Timer, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfileDisplayName, getProfileInitials } from "@/lib/profile";
import { sharedCollections } from "@/lib/shared-links";
import { createClient } from "@/lib/supabase/server";
import { ShareLinkActions } from "@/modules/dashboard/components/share-link-actions";

async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return data.claims;
}

export default async function ProtectedPage() {
  const user = await getUser();
  const displayName = getProfileDisplayName(user);
  const initials = getProfileInitials(displayName, user.email);

  const publicCount = sharedCollections.filter((item) => item.visibility === "public").length;
  const privateCount = sharedCollections.filter((item) => item.visibility === "private").length;

  return (
    <div className="space-y-8">
      <Card className="glass-panel">
        <CardHeader className="space-y-3">
          <Badge className="w-fit" variant="secondary">
            Overview
          </Badge>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl">Hi, {displayName}</h1>
              <p className="text-sm text-muted-foreground">
                Here&apos;s what is happening with your active links.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/dashboard">Create new link</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Card className="glass-panel">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Active links</CardTitle>
              <Link2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{sharedCollections.length}</p>
              <p className="text-xs text-muted-foreground">Public + private share URLs</p>
            </CardContent>
          </Card>
          <Card className="glass-panel">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Public links</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{publicCount}</p>
              <p className="text-xs text-muted-foreground">Directly accessible collections</p>
            </CardContent>
          </Card>
          <Card className="glass-panel">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Private links</CardTitle>
              <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{privateCount}</p>
              <p className="text-xs text-muted-foreground">Password-gated collections</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-lg">Shareable links</CardTitle>
            <CardDescription>
              Copy any URL and paste it in a new tab to open its recipient page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {sharedCollections.map((item) => {
              const path = `/shared/${item.slug}`;
              return (
                <div
                  key={item.slug}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-[4px] border border-border bg-card px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.visibility === "private" ? "Private" : "Public"} | Expires{" "}
                      {item.expiryDate}
                    </p>
                    <p className="text-xs text-muted-foreground">{path}</p>
                  </div>
                  <ShareLinkActions path={path} />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-lg">Profile details</CardTitle>
            <CardDescription>Your account snapshot.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {initials}
              </div>
              <div>
                <p className="font-medium">{displayName}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-secondary/40 p-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                Link access alerts are enabled.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
