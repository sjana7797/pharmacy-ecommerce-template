import { ColumnDef } from "@tanstack/react-table";
import type { Category } from "@repo/db";
import { Link } from "@tanstack/react-router";
import { LinkIcon } from "lucide-react";
import Render from "@repo/ui/components/render";

export const columns: ColumnDef<
  Category & { index: number; parentCategory: Category | null }
>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: false,
    enableColumnFilter: false,
    accessorFn: (row) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "slug",
    header: "Slug",
    enableSorting: true,
    enableColumnFilter: true,
    accessorFn: (row) => row.slug,
    cell: ({ getValue }) => (
      <Link
        to="/category/$categorySlug"
        params={{ categorySlug: getValue() as string }}
        className="inline-flex items-center gap-1 cursor-pointer"
      >
        {getValue() as string}
        <LinkIcon className="h-3 w-3" />
      </Link>
    ),
  },
  {
    accessorKey: "categoryParent",
    header: "Parent ID",
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({ row }) => (
      <Render renderIf={!!row.original.parentCategory}>
        <Link
          to={`/category/$categorySlug`}
          params={{ categorySlug: row.original.parentCategory?.slug ?? "" }}
          className="inline-flex items-center gap-1 cursor-pointer"
        >
          {row.original.parentCategory?.name}
          <LinkIcon className="h-3 w-3" />
        </Link>
      </Render>
    ),
  },
  {
    accessorKey: "actions",
    header: "",
  },
];
