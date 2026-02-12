"use client";

import { Check, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ShareLinkActionsProps {
  path: string;
}

export function ShareLinkActions({ path }: ShareLinkActionsProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    if (typeof window === "undefined") return;
    const fullUrl = `${window.location.origin}${path}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={copyLink}
        className="h-8 rounded-[4px] px-3"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy"}
      </Button>
      <Button asChild variant="outline" size="sm" className="h-8 rounded-[4px] px-3">
        <Link href={path} target="_blank" rel="noreferrer">
          Open
        </Link>
      </Button>
    </div>
  );
}
