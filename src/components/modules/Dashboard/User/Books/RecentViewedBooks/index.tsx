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
  BookOpen,
  Search,
  SlidersHorizontal,
  ExternalLink,
  Trash2,
  Star,
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
import { TProduct } from "@/types";
import { CategoryType, getCategoryColor } from "@/app/utils/getCategoryColor";
import { DataTablePagination } from "@/components/modules/Dashboard/Shared/DataTablePagination";
import { toast } from "sonner";

export default function RecentViewedBooks() {
  const [recentBooks, setRecentBooks] = React.useState<TProduct[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    try {
      const storedBooks = localStorage.getItem("recentBooks");
      const parsedBooks = storedBooks ? JSON.parse(storedBooks) : [];
      setRecentBooks(parsedBooks);
    } catch {
      setRecentBooks([]);
    }
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem("recentBooks");
    setRecentBooks([]);
    toast.success("Recently viewed history cleared");
  };

  const handleRemoveBook = (id?: string) => {
    if (!id) return;
    const updated = recentBooks.filter((book) => book._id !== id);
    setRecentBooks(updated);
    localStorage.setItem("recentBooks", JSON.stringify(updated));
    toast.success("Removed from history");
  };

  const columns: ColumnDef<TProduct>[] = [
    {
      accessorKey: "title",
      header: "Book Details",
      cell: ({ row }) => {
        const book = row.original;
        const image = book.images?.[0];
        return (
          <div className="flex items-center gap-3 py-1">
            <div className="relative w-10 h-14 shrink-0 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-2xs">
              {image ? (
                <Image
                  src={image}
                  alt={book.title || "Book cover"}
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
                title={book.title}
              >
                {book.title}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                by {book.author || "Unknown"}
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
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        const rating = Number(row.getValue("rating")) || 0;
        return (
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{rating.toFixed(1)}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: "Stock",
      cell: ({ row }) => {
        const qty = Number(row.original.quantity) || 0;
        const inStock = qty > 0;
        return (
          <span
            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
              inStock
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300"
            }`}
          >
            {inStock ? `${qty} in stock` : "Out of stock"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const book = row.original;
        return (
          <div className="flex items-center gap-2">
            <Link href={`/books/${book._id}`}>
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2.5 text-[11px] gap-1 rounded-lg border-gray-200 dark:border-zinc-800 text-[#F65D4E] hover:bg-[#F65D4E]/10"
              >
                View
                <ExternalLink className="w-3 h-3" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveBook(book._id)}
              className="h-7 w-7 text-muted-foreground hover:text-red-600 rounded-lg"
              title="Remove from history"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        );
      },
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
    <Card className="shadow-xs rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      {/* Header */}
      <CardHeader className="p-5 pb-4 border-b border-gray-100 dark:border-zinc-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#F65D4E]" />
              Recently Viewed Books
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Books you recently browsed on BornoBihar
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {recentBooks.length} Books
            </span>
            {recentBooks.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearHistory}
                className="h-8 text-xs rounded-xl text-red-600 border-red-200 dark:border-red-950/60 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                Clear History
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      {/* Toolbar */}
      <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-100 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-zinc-900/40">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by title..."
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
                      <BookOpen className="w-10 h-10 mb-2 opacity-30 text-[#F65D4E]" />
                      <p className="font-semibold text-foreground text-sm">
                        No recently viewed books
                      </p>
                      <p className="text-muted-foreground mt-0.5">
                        Explore books from the store to see them listed here.
                      </p>
                      <Link href="/books" className="mt-3">
                        <Button
                          size="sm"
                          className="h-8 text-xs bg-[#F65D4E] hover:bg-[#e04f41] text-white rounded-xl"
                        >
                          Browse Books
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
