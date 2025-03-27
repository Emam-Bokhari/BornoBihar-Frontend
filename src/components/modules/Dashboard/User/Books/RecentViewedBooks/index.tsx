"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import moment from "moment-timezone";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TProduct } from "@/types";

export default function RecentViewedBooks() {
  const [recentBooks, setRecentBooks] = React.useState<TProduct[]>([]);

  React.useEffect(() => {
    const storedBooks = localStorage.getItem("recentBooks");
    const parsedBooks = storedBooks ? JSON.parse(storedBooks) : [];
    setRecentBooks(parsedBooks);
  }, []);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<TProduct>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="font-medium capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => (
        <div className="font-medium capitalize">{row.getValue("author")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="font-medium capitalize">{row.getValue("category")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="font-medium">$ {row.getValue("price")}</div>
      ),
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("rating")} / 5</div>
      ),
    },
    {
      accessorKey: "format",
      header: "Format",
      cell: ({ row }) => (
        <div className="font-medium capitalize">{row.getValue("format")}</div>
      ),
    },
    {
      accessorKey: "language",
      header: "Language",
      cell: ({ row }) => (
        <div className="font-medium capitalize">{row.getValue("language")}</div>
      ),
    },
    {
      accessorKey: "publisher",
      header: "Publisher",
      cell: ({ row }) => (
        <div className="font-medium capitalize">
          {row.getValue("publisher")}
        </div>
      ),
    },
    {
      accessorKey: "publishedDate",
      header: "Published Date",
      cell: ({ row }) => {
        const publishedDate = row.getValue("publishedDate");
        return (
          <div className="font-medium">
            {publishedDate
              ? moment(publishedDate).format("DD-MMM-YYYY")
              : "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "edition",
      header: "Edition",
      cell: ({ row }) => (
        <div className="font-medium capitalize">
          {row.getValue("edition") || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "pages",
      header: "Pages",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("pages") || "N/A"}</div>
      ),
    },
  ];

  const table = useReactTable({
    data: recentBooks,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex gap-4 items-center ">
        <Input
          placeholder="Filter recent viewed books by title"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Button variant="outline">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border mt-4 w-full overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center "
                >
                  No recent book viewing data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          <p>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
