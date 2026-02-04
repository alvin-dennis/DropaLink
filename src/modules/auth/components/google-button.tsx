"use client";

import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "../hooks/use-google-login";

export function GoogleButton() {
  const googleLoginMutation = useGoogleLogin();

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full"
      onClick={() => googleLoginMutation.mutate()}
      disabled={googleLoginMutation.isPending}
    >
      {googleLoginMutation.isPending ? "Redirecting..." : "Sign in with Google"}
    </Button>
  );
}
