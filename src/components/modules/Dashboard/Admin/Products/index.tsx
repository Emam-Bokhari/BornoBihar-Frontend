"use client";

import * as React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
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
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { TProduct } from "@/types";
import { deleteProductById } from "@/services/Product";
import { CategoryType, getCategoryColor } from "@/app/utils/getCategoryColor";

export default function ManageProducts({ products }: { products: TProduct[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // delete a product
  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await deleteProductById(id);
      if (response?.success) {
        toast.success("Product deleted successfully");
      } else {
        toast.error(response.error[0]?.message);
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const columns: ColumnDef<TProduct>[] = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => {
        const images = row.getValue("images") as string[];
        const firstImage = images?.[0];

        return firstImage ? (
          <div className="w-[60px] h-[60px] relative overflow-hidden rounded-lg ">
            <Image
              src={firstImage}
              alt="Thumbnail Image"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-[50px] h-[50px] flex items-center justify-center bg-gray-200">
            <span className="text-xs text-gray-500">No Image</span>
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="font-medium capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as CategoryType;
        const categoryColor = getCategoryColor(category);

        return (
          <div className="flex items-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${categoryColor}`}
            >
              {category}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => (
        <div className="font-medium capitalize">{row.getValue("author")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        return (
          <div className="font-medium capitalize">${row.getValue("price")}</div>
        );
      },
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        const rating = row.getValue("rating") as number;
        return (
          <div className="flex items-center">
            <span className="text-yellow-500">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>{index < rating ? "★" : "☆"}</span>
              ))}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: "Available Stock",
      cell: ({ row }) => {
        const quantity = row.getValue("quantity") as number;
        return (
          <div className={`${quantity > 0 ? "" : "text-red-500"}`}>
            {quantity > 0 ? quantity : "Out of Stock"}
          </div>
        );
      },
    },
    {
      accessorKey: "publishedDate",
      header: "Published Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("publishedDate"));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Button variant="ghost" className="h-8 w-8 p-0 ">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href={`/admin/dashboard/products/update-product/${product?._id}`}
                  className="flex gap-2"
                >
                  <FaEdit className="mr-2 text-green-500" /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteProduct(product?._id)}
                className="cursor-pointer"
              >
                <FaTrash className="mr-2 text-red-600" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: products,
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
          placeholder="Filter products by title..."
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
      <div className="rounded-md border mt-4">
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
                  No products data found.
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
