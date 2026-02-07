import { AuthShell } from "@/modules/auth/components/auth-shell";
import { SignupForm } from "@/modules/auth/components/signup-form";

export default async function Page() {
  return (
    <AuthShell>
      <SignupForm />
    </AuthShell>
  );
}
