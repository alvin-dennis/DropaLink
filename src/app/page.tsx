import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight, CheckCircle2, Crown, Shield, Sparkles, Timer } from "lucide-react";
import { AuthButton } from "@/components/auth-button";
import { LandingHero } from "@/components/landing/landing-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const featureCards = [
  {
    title: "One-time access",
    description: "Limit a link to a single open. Perfect for sensitive docs.",
    icon: Shield,
  },
  {
    title: "Timed expiration",
    description: "Choose exact expiration windows with automatic cleanup.",
    icon: Timer,
  },
  {
    title: "Smart controls",
    description: "Revoke, pause, or extend links without sharing again.",
    icon: Sparkles,
  },
];

const steps = [
  {
    title: "Drop your content",
    text: "Paste a URL, add a file, or connect a workspace destination.",
  },
  {
    title: "Set the rules",
    text: "Choose expiry, views, and alerts. Keep it as strict as you need.",
  },
  {
    title: "Share with confidence",
    text: "Track views, revoke instantly, and stay in control.",
  },
];

export default function Home() {
  return (
    <main className="bg-landing">
      <div className="relative">
        <nav className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 text-sm">
            <div className="flex items-center gap-3 font-semibold">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Crown className="h-4 w-4" />
              </div>
              <Link href="/" className="font-display text-base">
                DropaLink
              </Link>
            </div>
            <Suspense>
              <AuthButton />
            </Suspense>
          </div>
        </nav>

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-12">
          <LandingHero />

          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                Built for teams who care
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl">
                Security-first sharing that still feels effortless.
              </h2>
              <p className="text-muted-foreground">
                DropaLink keeps collaboration fast while guarding every view. Give teammates the
                right access without sacrificing speed.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  SOC-ready audit trails
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Access revocation in seconds
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Viewer notifications
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              {featureCards.map((feature) => (
                <Card key={feature.title} className="glass-panel">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid gap-6">
            <div className="flex items-center justify-between gap-6">
              <div>
                <Badge variant="secondary" className="w-fit">
                  Simple setup
                </Badge>
                <h2 className="font-display text-3xl md:text-4xl">Start in minutes.</h2>
              </div>
              <Button asChild variant="outline" className="hidden md:inline-flex">
                <Link href="/auth/sign-up">Create a free account</Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <Card key={step.title} className="glass-panel">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <span className="text-sm font-semibold">0{index + 1}</span>
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{step.text}</CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="glass-panel rounded-[2rem] px-8 py-10 md:px-12">
            <div className="grid gap-6 md:grid-cols-[1.3fr_0.7fr] md:items-center">
              <div className="space-y-3">
                <Badge className="w-fit" variant="secondary">
                  Launch ready
                </Badge>
                <h3 className="font-display text-3xl">Ready to share with more control?</h3>
                <p className="text-muted-foreground">
                  Spin up your first secure link in under a minute. Keep every share tracked,
                  expiring, and entirely yours.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/auth/sign-up">
                    Get started
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/dashboard">View dashboard</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>

        <footer className="border-t border-border/60">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <span>DropaLink © 2026. Built for private sharing.</span>
            <div className="flex flex-wrap gap-4">
              <Link href="/auth/login" className="hover:text-foreground">
                Sign in
              </Link>
              <Link href="/auth/sign-up" className="hover:text-foreground">
                Create account
              </Link>
              <Link href="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
