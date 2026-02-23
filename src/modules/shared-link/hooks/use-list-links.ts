import { useQuery } from "@tanstack/react-query";
import { linksApi } from "../api/links.api";

export function useListLinks() {
  return useQuery({
    queryKey: ["links", "listByUser"],
    queryFn: () => linksApi.listLinksByUser(),
  });
}
