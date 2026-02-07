import { AuthShell } from "@/modules/auth/components/auth-shell";
import { LoginForm } from "@/modules/auth/components/login-form";

export default async function Page() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}
