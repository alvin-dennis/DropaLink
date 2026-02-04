import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import type { ForgotPasswordValues } from "../schemas/auth.schema";

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordValues) => authApi.resetPasswordForEmail(data),
  });
}
