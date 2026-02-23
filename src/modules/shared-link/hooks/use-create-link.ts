import { useMutation } from "@tanstack/react-query";
import { linksApi } from "../api/links.api";
import type { CreateLinkValues } from "../schemas/links.schema";

export function useCreateLink() {
  return useMutation({
    mutationFn: (data: CreateLinkValues) => linksApi.createLink(data),
  });
}
