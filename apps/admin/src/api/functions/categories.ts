import { PaginationRequest } from "@repo/schema";
import { apiClient } from "../client";
import type { GetAllResponse } from "@repo/types";
import type { Category } from "@repo/db";

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
        parent_category: Category | null;
      }>
    >("/categories", {
      params: paginatedRequestParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
