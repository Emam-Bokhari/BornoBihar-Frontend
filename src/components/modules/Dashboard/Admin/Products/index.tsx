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
import {
  ChevronDown,
  Package,
  Search,
  SlidersHorizontal,
  Plus,
  BookOpen,
  Edit3,
  Trash2,
  Star,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { TProduct } from "@/types";
import { deleteProductById } from "@/services/Product";
import { CategoryType, getCategoryColor } from "@/app/utils/getCategoryColor";
import moment from "moment-timezone";
import { DataTablePagination } from "@/components/modules/Dashboard/Shared/DataTablePagination";

export default function ManageProducts({ products = [] }: { products: TProduct[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await deleteProductById(id);
      if (response?.success) {
        toast.success("Product deleted successfully");
      } else {
        toast.error(response?.error?.[0]?.message || "Failed to delete product");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const columns: ColumnDef<TProduct>[] = [
    {
      accessorKey: "title",
      header: "Book Details",
      cell: ({ row }) => {
        const product = row.original;
        const image = product.images?.[0];

        return (
          <div className="flex items-center gap-3 py-1">
            <div className="relative w-10 h-14 shrink-0 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-2xs">
              {image ? (
                <Image
                  src={image}
                  alt={product.title || "Book cover"}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                </div>
              )}
            </div>
            <div className="min-w-0 max-w-[220px]">
              <p
                className="text-xs font-bold text-foreground truncate hover:text-[#F65D4E] transition-colors"
                title={product.title}
              >
                {product.title}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                by {product.author || "Unknown"}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        const colorClass = getCategoryColor(category as CategoryType);

        return (
          <Badge
            variant="secondary"
            className={`text-[10px] px-2 py-0.5 rounded-md font-medium border-0 capitalize ${colorClass}`}
          >
            {category || "General"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = Number(row.getValue("price")) || 0;
        return (
          <div className="text-xs font-bold text-foreground">
            ${price.toFixed(2)}
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: "Stock Level",
      cell: ({ row }) => {
        const quantity = Number(row.getValue("quantity")) || 0;
        const isOut = quantity === 0;
        const isLow = quantity > 0 && quantity <= 10;

        return (
          <span
            className={`inline-block font-semibold text-xs px-2.5 py-0.5 rounded-full ${
              isOut
                ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                : isLow
                ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
            }`}
          >
            {isOut ? "Out of Stock" : `${quantity} in stock`}
          </span>
        );
      },
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        const rating = Number(row.getValue("rating")) || 0;
        return (
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "publishedDate",
      header: "Published",
      cell: ({ row }) => {
        const date = row.getValue("publishedDate");
        return (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 opacity-60" />
            {date ? moment.utc(date).format("MMM DD, YYYY") : "N/A"}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-1.5">
            <Link
              href={`/admin/dashboard/products/update-product/${product?._id}`}
            >
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 rounded-lg border-gray-200 dark:border-zinc-800 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                title="Edit Product"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDeleteProduct(product?._id)}
              className="h-7 w-7 rounded-lg border-gray-200 dark:border-zinc-800 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
              title="Delete Product"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
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
    <Card className="shadow-xs rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      {/* Header */}
      <CardHeader className="p-5 pb-4 border-b border-gray-100 dark:border-zinc-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <Package className="w-5 h-5 text-[#F65D4E]" />
              Product Catalog
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Manage book inventory, categories, pricing, and stock levels
            </CardDescription>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              Total: {products.length} Products
            </span>
            <Link href="/admin/dashboard/products/add-product">
              <Button
                size="sm"
                className="h-8 text-xs bg-[#F65D4E] hover:bg-[#e04f41] text-white rounded-xl gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Book
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>

      {/* Toolbar */}
      <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-100 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-zinc-900/40">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by book title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="pl-9 h-9 text-xs rounded-xl border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus-visible:ring-1 focus-visible:ring-[#F65D4E]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 text-xs rounded-xl border-gray-200 dark:border-zinc-800 gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Columns
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize text-xs"
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

      {/* Table Content */}
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-zinc-50/80 dark:bg-zinc-800/40">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3.5"
                    >
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
                    className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/50 transition-colors border-b border-gray-100 dark:border-zinc-800/60"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-2.5">
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
                    className="h-44 text-center"
                  >
                    <div className="flex flex-col items-center justify-center text-muted-foreground text-xs">
                      <Package className="w-10 h-10 mb-2 opacity-30 text-[#F65D4E]" />
                      <p className="font-semibold text-foreground text-sm">
                        No products found
                      </p>
                      <p className="text-muted-foreground mt-0.5">
                        Try modifying your search or add a new book.
                      </p>
                      <Link
                        href="/admin/dashboard/products/add-product"
                        className="mt-3"
                      >
                        <Button
                          size="sm"
                          className="h-8 text-xs bg-[#F65D4E] hover:bg-[#e04f41] text-white rounded-xl gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add First Book
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <DataTablePagination table={table} />
      </CardContent>
    </Card>
  );
}
