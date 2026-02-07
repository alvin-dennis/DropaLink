"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AppErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export function AppError({ error, reset }: AppErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-landing min-h-screen">
      <div className="page-container flex min-h-screen items-center justify-center py-12">
        <Card className="glass-panel w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">
              Sorry, something went wrong.
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {error?.message ?? "Something happened. Please try again."}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button onClick={reset}>Try again</Button>

              <Button asChild variant="outline">
                <Link href="/">Go home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
