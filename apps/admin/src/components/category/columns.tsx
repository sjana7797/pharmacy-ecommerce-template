import { ColumnDef } from "@tanstack/react-table";
import type { Category } from "@repo/db";
import { Link } from "@tanstack/react-router";
import { LinkIcon } from "lucide-react";

export const columns: ColumnDef<Category & { index: number }>[] = [
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
    cell: ({ row, getValue }) => (
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
    accessorKey: "parentId",
    header: "Parent ID",
    enableSorting: true,
    enableColumnFilter: true,
  },
];
