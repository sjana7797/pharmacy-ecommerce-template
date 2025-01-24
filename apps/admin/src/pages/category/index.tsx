import { RefreshCcw } from "lucide-react";
import { useEffect } from "react";
import { usePagination } from "@/admin/hooks/api/pagination";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { columns } from "@/admin/components/category/columns";
import { DataTable } from "@/admin/components/global/data-table";
import PageTitle from "@/admin/components/global/title";
import { useGetAllCategories } from "@/admin/hooks/api/category";
import { Link } from "@tanstack/react-router";
import { api } from "@/admin/trpc/react";

function CategoryPage() {
  // hooks
  const queryClient = useQueryClient();
  const { limit, page, nextPageHandler, prevPageHandler, setLimitHandler } =
    usePagination();
  const { data, isRefetching, refetch } = useGetAllCategories({
    limit,
    cursor: page,
  });

  const categories =
    data?.data.map((c, index) => ({
      ...c.categories,
      index,
      parentCategory: c.category_parent,
    })) ?? [];

  const nextCursor = data?.nextCursor;

  api.category.getAllCategories.useQuery();

  // side effect
  useEffect(() => {
    // const query = queryClient.getQueryData(["categories", limit, page]);
    // if (!query) {
    //   refetch();
    // }
  }, [limit, page, queryClient, refetch]);

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <PageTitle
        title="Categories"
        actionsBar={
          <div className="flex items-center space-x-2">
            <Link to="/category/add" className={cn(buttonVariants({}))}>
              Add New Category
            </Link>
            <Button
              size="icon"
              onClick={() => refetch()}
              disabled={isRefetching}
            >
              <RefreshCcw className={cn(isRefetching && "animate-spin")} />
            </Button>
          </div>
        }
      />
      <DataTable
        data={categories}
        columns={columns}
        nextPageHandler={nextPageHandler}
        prevPageHandler={prevPageHandler}
        setLimitHandler={setLimitHandler}
        limit={limit}
        page={page}
        nextCursor={nextCursor}
      />
    </main>
  );
}

export default CategoryPage;
