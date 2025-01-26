import { apiClient } from "@/admin/server/client";
import { PaginationRequest } from "@repo/common/schema";
import type { GetAllResponse } from "@repo/common/types";
import type { Category } from "@repo/db/types";

/**
 * Get all categories
 * @returns
 * @param paginatedRequestParams
 */
export async function getAllCategories(
  paginatedRequestParams: PaginationRequest,
) {
  try {
    const response = await apiClient.get<
      GetAllResponse<{
        categories: Category;
        category_parent: Category | null;
      }>
    >("/categories", {
      params: {
        ...paginatedRequestParams,
        page: paginatedRequestParams.cursor,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
