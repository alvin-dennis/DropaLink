"use client";

import { SiGoogle } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "../hooks/use-google-login";

export function GoogleButton() {
  const googleLoginMutation = useGoogleLogin();

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full gap-2"
      onClick={() => googleLoginMutation.mutate()}
      disabled={googleLoginMutation.isPending}
    >
      <SiGoogle className="h-4 w-4" />
      {googleLoginMutation.isPending ? "Redirecting..." : "Continue with Google"}
    </Button>
  );
}
