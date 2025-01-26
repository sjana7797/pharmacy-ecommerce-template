import { getAllCategories } from "@/admin/features/category/api/category";
import { PaginationRequest } from "@repo/common/schema";
import { useQuery } from "@tanstack/react-query";

export function useGetAllCategories(paginationRequest: PaginationRequest) {
  return useQuery({
    queryKey: ["categories", paginationRequest.limit, paginationRequest.cursor],
    queryFn: async () => await getAllCategories(paginationRequest),
    enabled: !!paginationRequest.limit && !!paginationRequest.cursor,
  });
}
