import { ArrowUpRight, CheckCircle2, Crown } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";
import { MotionDiv, MotionP } from "@/components/framer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hero } from "@/lib/data";

export default function Home() {
  return (
    <main className="bg-landing">
      <div className="relative">
        <div className="grid-rails" />
        <nav className="nav-shell">
          <div className="nav-inner max-w-none">
            <div className="flex items-center gap-3 font-semibold">
              <div className="brand-mark h-9 w-9">
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

        <div className="page-container flex flex-col gap-16 pb-24 pt-12">
          <section className="hero-panel">
            <div className="pointer-events-none absolute inset-0 grid-overlay opacity-70" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-6">
                <MotionDiv
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Badge className="section-pill mb-4" variant="secondary">
                    Public or private, always controlled
                  </Badge>
                  <h1 className="font-display text-4xl leading-tight md:text-5xl">
                    Drop a link. Keep the control.
                    <span className="block text-gradient">Every share stays yours.</span>
                  </h1>
                </MotionDiv>

                <MotionP
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 }}
                  className="text-base text-muted-foreground md:text-lg"
                >
                  DropaLink supports both public and private links, with expiry, view limits, and
                  instant revocation so you decide how long content lives and who can access it.
                </MotionP>

                <MotionDiv
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.16 }}
                  className="flex flex-wrap gap-3"
                >
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/auth/sign-up">
                      Create your first drop
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/dashboard">View dashboard</Link>
                  </Button>
                </MotionDiv>

                <div className="grid gap-4 pt-2 md:grid-cols-3">
                  {hero.stats.map((stat, index) => (
                    <MotionDiv
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.08 }}
                      className="glass-panel rounded-2xl px-4 py-3"
                    >
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="text-lg font-semibold">{stat.value}</p>
                    </MotionDiv>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                {hero.features.map((feature, index) => (
                  <MotionDiv
                    key={feature.title}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.08 }}
                    className="glass-panel flex items-start gap-4 rounded-2xl p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.text}</p>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <Badge variant="secondary" className="section-pill">
                Built for teams who care
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl">
                Public reach with private-grade control.
              </h2>
              <p className="text-muted-foreground">
                Share links publicly or keep them private. DropaLink keeps collaboration fast while
                guarding every view with clear controls and audit trails.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  SOC-ready audit trails
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Public or private toggles
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Viewer notifications
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              {hero.featureCards.map((feature) => (
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
                <Badge variant="secondary" className="section-pill">
                  Simple setup
                </Badge>
                <h2 className="font-display text-3xl md:text-4xl">Start in minutes.</h2>
              </div>
              <Button asChild variant="outline" className="hidden md:inline-flex">
                <Link href="/auth/sign-up">Create a free account</Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {hero.steps.map((step, index) => (
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
                <Badge className="section-pill" variant="secondary">
                  Launch ready
                </Badge>
                <h3 className="font-display text-3xl">Ready to share publicly or privately?</h3>
                <p className="text-muted-foreground">
                  Spin up your first link in under a minute. Keep every share tracked, expiring, and
                  fully under your control.
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
          <div className="page-container flex flex-col gap-4 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <span>DropaLink © 2026. Built for public and private sharing.</span>
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
