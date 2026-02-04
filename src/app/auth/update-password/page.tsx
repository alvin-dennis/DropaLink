import { AuthShell } from "@/modules/auth/components/auth-shell";
import { UpdatePasswordForm } from "@/modules/auth/components/update-password-form";

export default function Page() {
  return (
    <AuthShell>
      <UpdatePasswordForm />
    </AuthShell>
  );
}
