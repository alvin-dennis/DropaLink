import { Lock, Shield, Sparkles, Timer, Zap } from "lucide-react";

export const hero = {
  headline: "Share anything. Control everything.",
  subheadline:
    "Send links privately or publicly with auto-expiry, viewer limits, and instant revocation — built for speed and peace of mind.",
  ctas: [
    { label: "Create a secure link", href: "/signup", variant: "primary" },
    { label: "See how it works", href: "#how-it-works", variant: "secondary" },
  ],
  stats: [
    { label: "Avg. time-to-share", value: "14s" },
    { label: "Public + private", value: "Both modes" },
    { label: "Link expiry control", value: "1 click" },
  ],
  features: [
    {
      icon: Lock,
      title: "Private drops",
      text: "One-time access and viewer limits built in.",
    },
    {
      icon: Timer,
      title: "Auto-expire",
      text: "Set minutes, hours, or days with no manual cleanup.",
    },
    {
      icon: Zap,
      title: "Public sharing",
      text: "Turn any link public with optional limits and analytics.",
    },
  ],
  featureCards: [
    {
      title: "Private or public",
      description: "Choose visibility per link and switch anytime.",
      icon: Shield,
    },
    {
      title: "Timed expiration",
      description: "Choose exact expiration windows with automatic cleanup.",
      icon: Timer,
    },
    {
      title: "Smart controls",
      description: "Revoke, pause, or extend any link in seconds.",
      icon: Sparkles,
    },
  ],
  steps: [
    {
      title: "Drop your content",
      text: "Paste a URL, add a file, or connect a workspace destination.",
    },
    {
      title: "Set the rules",
      text: "Choose visibility, expiry, views, and alerts.",
    },
    {
      title: "Share with confidence",
      text: "Track views, revoke instantly, and stay in control.",
    },
  ],
};
