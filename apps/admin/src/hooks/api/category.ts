import { getAllCategories } from "@/admin/api/functions/categories";
import { PaginationRequest } from "@repo/schema";
import { useQuery } from "@tanstack/react-query";

export function useGetAllCategories(paginationRequest: PaginationRequest) {
  return useQuery({
    queryKey: ["categories", paginationRequest.limit, paginationRequest.page],
    queryFn: async () => await getAllCategories(paginationRequest),
    enabled: !!paginationRequest.limit && !!paginationRequest.page,
  });
}
