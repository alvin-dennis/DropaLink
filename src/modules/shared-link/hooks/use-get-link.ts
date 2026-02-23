import { useMutation, useQuery } from "@tanstack/react-query";
import { linksApi } from "../api/links.api";

export function useGetLink(slug: string | null) {
  return useQuery({
    queryKey: ["links", "get", slug],
    enabled: !!slug,
    queryFn: () => linksApi.getLinkBySlug(slug as string),
  });
}

export function useRevokeLink() {
  return useMutation({
    mutationFn: (slug: string) => linksApi.revokeLink(slug),
  });
}
