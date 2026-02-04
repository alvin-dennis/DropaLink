import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import type { SignupValues } from "../schemas/auth.schema";

export function useSignup() {
  return useMutation({
    mutationFn: (data: SignupValues) => authApi.signUpWithEmail(data),
  });
}
