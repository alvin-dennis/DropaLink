"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock, Timer, Zap } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Avg. time-to-share", value: "14s" },
  { label: "Link expiry control", value: "1 click" },
  { label: "Private by default", value: "100%" },
];

const features = [
  { icon: Lock, title: "Private drops", text: "One-time access and viewer limits built in." },
  {
    icon: Timer,
    title: "Auto-expire",
    text: "Set minutes, hours, or days with no manual cleanup.",
  },
  { icon: Zap, title: "Instant revoke", text: "Kill a link immediately with a single toggle." },
];

export function LandingHero() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-card/70 p-8 md:p-12">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-70" />
      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 w-fit" variant="secondary">
              Private links, shared with intent
            </Badge>
            <h1 className="font-display text-4xl leading-tight md:text-5xl">
              Drop a link. Keep the control.
              <span className="block text-gradient">Every share stays yours.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-base text-muted-foreground md:text-lg"
          >
            DropaLink lets you create private, one-time, and expiring links so you decide how long
            your content lives and who gets to see it.
          </motion.p>

          <motion.div
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
              <Link href="/auth/login">View dashboard</Link>
            </Button>
          </motion.div>

          <div className="grid gap-4 pt-2 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
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
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {features.map((feature, index) => (
            <motion.div
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
