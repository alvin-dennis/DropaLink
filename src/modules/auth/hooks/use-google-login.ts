import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";

export function useGoogleLogin() {
  return useMutation({
    mutationFn: () => authApi.signInWithGoogle(),
  });
}
