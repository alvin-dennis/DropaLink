import { Link2, ShieldCheck, Timer, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfileDisplayName, getProfileInitials } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";

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
                Here&apos;s what is happening with your active drops.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/dashboard">Create new drop</Link>
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
              <p className="text-2xl font-semibold">12</p>
              <p className="text-xs text-muted-foreground">3 expiring today</p>
            </CardContent>
          </Card>
          <Card className="glass-panel">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Private views</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">184</p>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>
          <Card className="glass-panel">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Auto-expiring</CardTitle>
              <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">7</p>
              <p className="text-xs text-muted-foreground">Scheduled this week</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-lg">Recent drops</CardTitle>
            <CardDescription>Quick view of your latest shared links.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Q1 investor update.pdf", meta: "Expires in 6 hours" },
              { title: "Product launch deck", meta: "1 view left" },
              { title: "Contract review", meta: "Viewed 4 times" },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-secondary/40 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.meta}</p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            ))}
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
