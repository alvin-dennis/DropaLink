import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { Button } from "./ui/button";

export async function AuthButton() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  return user ? (
    <div className="flex items-center gap-3 text-sm">
      <Link href="/dashboard" className="hidden text-muted-foreground hover:text-foreground md:inline">
        Welcome back, {user.email}
      </Link>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
