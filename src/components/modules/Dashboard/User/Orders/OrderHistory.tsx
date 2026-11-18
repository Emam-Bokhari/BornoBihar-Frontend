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
  ShoppingBag,
  Search,
  SlidersHorizontal,
  CreditCard,
  MapPin,
  Calendar,
} from "lucide-react";
import moment from "moment-timezone";
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
import { TOrder } from "@/types/order";
import { DataTablePagination } from "@/components/modules/Dashboard/Shared/DataTablePagination";

const STATUS_CONFIG: Record<
  string,
  { label: string; badge: string; dot: string }
> = {
  delivered: {
    label: "Delivered",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900/50 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  shipping: {
    label: "Shipping",
    badge: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:border-blue-900/50 dark:text-blue-300",
    dot: "bg-blue-500",
  },
  pending: {
    label: "Pending",
    badge: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:border-amber-900/50 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  cancelled: {
    label: "Cancelled",
    badge: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:border-rose-900/50 dark:text-rose-300",
    dot: "bg-rose-500",
  },
};

export default function OrderHistory({
  orderHistory = [],
}: {
  orderHistory: TOrder[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<TOrder>[] = [
    {
      accessorKey: "transactionId",
      header: "Transaction ID",
      cell: ({ row }) => (
        <div className="font-mono text-xs font-semibold text-foreground bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md inline-block">
          {row.getValue("transactionId") || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "orderDate",
      header: "Order Date",
      cell: ({ row }) => {
        const orderDate = row.getValue("orderDate") || row.original.createdAt;
        const formattedDate = orderDate
          ? moment(orderDate).tz("Asia/Dhaka").format("MMM DD, YYYY")
          : "N/A";
        return (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Calendar className="w-3.5 h-3.5 opacity-60" />
            {formattedDate}
          </div>
        );
      },
    },
    {
      accessorKey: "products",
      header: "Items Ordered",
      cell: ({ row }) => {
        const products = row.original.products || [];
        const titles = products
          .map((p) => {
            if (typeof p.productId === "object" && p.productId !== null) {
              return (p.productId as { title?: string }).title || "Book";
            }
            return "Book";
          })
          .filter(Boolean);
        const displayTitles = titles.slice(0, 2).join(", ");
        const remaining = titles.length - 2;

        return (
          <div className="max-w-[240px]">
            <p className="text-xs font-medium text-foreground truncate" title={titles.join(", ")}>
              {displayTitles || "Order Items"}
            </p>
            {remaining > 0 && (
              <span className="text-[10px] text-muted-foreground font-medium">
                +{remaining} more item{remaining > 1 ? "s" : ""}
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "totalAmount",
      header: "Total",
      cell: ({ row }) => {
        const amount = Number(row.getValue("totalAmount")) || 0;
        return (
          <div className="text-xs font-bold text-foreground">
            ${amount.toFixed(2)}
          </div>
        );
      },
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment",
      cell: ({ row }) => {
        const method = (row.getValue("paymentMethod") as string) || "Online";
        const status = row.original.paymentStatus || "completed";
        return (
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-xs font-medium capitalize text-foreground">
              <CreditCard className="w-3 h-3 text-muted-foreground" />
              {method}
            </div>
            <span
              className={`inline-block text-[10px] px-1.5 py-0.2 rounded font-semibold capitalize ${
                status === "completed" || status === "paid"
                  ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40"
                  : "text-amber-600 bg-amber-50 dark:bg-amber-950/40"
              }`}
            >
              {status}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "shippingAddressDetails.city",
      header: "Destination",
      cell: ({ row }) => {
        const city = row.original.shippingAddressDetails?.city;
        return (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 opacity-60" />
            <span className="capitalize">{city || "Bangladesh"}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Order Status",
      cell: ({ row }) => {
        const status = (row.getValue("status") as string)?.toLowerCase() || "pending";
        const config = STATUS_CONFIG[status] || {
          label: status,
          badge: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800",
          dot: "bg-zinc-400",
        };

        return (
          <Badge
            variant="outline"
            className={`text-xs px-2.5 py-0.5 rounded-full font-medium inline-flex items-center gap-1.5 capitalize ${config.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {config.label}
          </Badge>
        );
      },
    },
  ];

  const table = useReactTable({
    data: orderHistory,
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
              <ShoppingBag className="w-5 h-5 text-[#F65D4E]" />
              My Order History
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Track and view all your personal book purchases
            </CardDescription>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            Total: {orderHistory.length} Orders
          </span>
        </div>
      </CardHeader>

      {/* Toolbar */}
      <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-100 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-zinc-900/40">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Filter by transaction ID..."
            value={
              (table.getColumn("transactionId")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("transactionId")?.setFilterValue(event.target.value)
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
                      <TableCell key={cell.id} className="py-3">
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
                      <ShoppingBag className="w-10 h-10 mb-2 opacity-30 text-[#F65D4E]" />
                      <p className="font-semibold text-foreground text-sm">
                        No orders found
                      </p>
                      <p className="text-muted-foreground mt-0.5">
                        You have not placed any orders yet.
                      </p>
                      <Link href="/books" className="mt-3">
                        <Button
                          size="sm"
                          className="h-8 text-xs bg-[#F65D4E] hover:bg-[#e04f41] text-white rounded-xl"
                        >
                          Explore Books
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
