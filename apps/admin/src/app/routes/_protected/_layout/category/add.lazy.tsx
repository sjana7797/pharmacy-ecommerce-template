import PageTitle from "@/admin/components/global/title";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_protected/_layout/category/add")({
  component: AddCategory,
});

function AddCategory() {
  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <PageTitle title="Add New Category" />
      <div></div>
    </main>
  );
}
