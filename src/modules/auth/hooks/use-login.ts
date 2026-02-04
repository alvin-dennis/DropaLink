import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import type { LoginValues } from "../schemas/auth.schema";

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginValues) => authApi.signInWithEmail(data),
  });
}
