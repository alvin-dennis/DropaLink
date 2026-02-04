import { AuthShell } from "@/modules/auth/components/auth-shell";
import { LoginForm } from "@/modules/auth/components/login-form";

export default function Page() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}
