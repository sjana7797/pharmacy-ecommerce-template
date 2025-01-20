import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { PaginationLimit } from "@/admin/hooks/api/pagination";
import { Button } from "@repo/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { EditIcon, MoreVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { useModal } from "@/admin/hooks/modal";
import DeleteModal from "../modal/delete";
import { useState } from "react";
import Render from "@repo/ui/components/render";

interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setLimitHandler: (limit: PaginationLimit) => void;
  limit: PaginationLimit;
  page: number;
  nextPageHandler: () => void;
  prevPageHandler: () => void;
  nextCursor?: number | null;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  limit,
  nextPageHandler,
  page,
  prevPageHandler,
  setLimitHandler,
  nextCursor,
}: IDataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { isModalOpen, toggleModal } = useModal();

  const [selected, setSelected] = useState<TData | null>(null);

  // handlers
  const deleteModalHandler = (data: TData) => {
    setSelected(data);
    toggleModal();
  };

  const deleteHandler = () => {
    console.log("delete", selected);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <>
                    <Render renderIf={header.column.id === "id"}>
                      <TableHead
                        key={header.id}
                        className="text-sm border-r last:border-r-0 w-10"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    </Render>
                    <Render
                      renderIf={!["actions", "id"].includes(header.column.id)}
                    >
                      <TableHead
                        key={header.id}
                        className="text-sm border-r last:border-r-0 w-52"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    </Render>
                    <Render renderIf={header.column.id === "actions"}>
                      <TableHead
                        key={header.id}
                        className="text-sm border-r last:border-r-0 w-8 flex items-center justify-center"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    </Render>
                  </>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <>
                    <Render renderIf={cell.column.id === "id"}>
                      <TableCell
                        key={cell.id}
                        className="text-sm border-r last:border-r-0 p-1 w-fit truncate h-8"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    </Render>
                    <Render
                      renderIf={!["actions", "id"].includes(cell.column.id)}
                    >
                      <TableCell
                        key={cell.id}
                        className="text-sm border-r last:border-r-0 p-1 w-52 truncate h-8"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    </Render>
                    <Render renderIf={cell.column.id === "actions"}>
                      <TableCell
                        key={cell.id}
                        className="text-sm border-r last:border-r-0 p-1 w-8 items-center justify-center"
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 text-center"
                            >
                              <MoreVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="start"
                            side="right"
                            className="w-[var(--dropdown-menu-trigger-width)]"
                          >
                            <DropdownMenuItem className="flex items-center gap-2">
                              <EditIcon />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive flex items-center gap-2"
                              onClick={() => deleteModalHandler(row.original)}
                            >
                              <Trash />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </Render>
                  </>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TableFooter className="flex items-center gap-2 py-2 px-4 w-full self-end">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={prevPageHandler}
            disabled={page === 1}
            size="sm"
          >
            Prev
          </Button>
          <span>Page {page}</span>
          <Button
            variant="outline"
            onClick={nextPageHandler}
            disabled={!nextCursor}
            size="sm"
          >
            Next
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select
            defaultValue="10"
            onValueChange={(value) => {
              setLimitHandler(Number(value) as PaginationLimit);
            }}
            value={limit.toString()}
          >
            <SelectTrigger className="w-fit">
              <SelectValue
                placeholder="Limit"
                className="text-sm font-medium"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </TableFooter>
      <DeleteModal
        open={isModalOpen}
        onConfirm={deleteHandler}
        description="This action cannot be undone. This will permanently delete category."
        title="Are you absolutely sure?"
        toggleModal={toggleModal}
      />
    </div>
  );
}
