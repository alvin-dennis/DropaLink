import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import type { UpdatePasswordValues } from "../schemas/auth.schema";

export function useUpdatePassword() {
  return useMutation({
    mutationFn: (data: UpdatePasswordValues) => authApi.updateUserPassword(data),
  });
}
