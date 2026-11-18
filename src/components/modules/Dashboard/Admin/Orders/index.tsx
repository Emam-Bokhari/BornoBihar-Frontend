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
  ClipboardList,
  Search,
  SlidersHorizontal,
  CreditCard,
  MapPin,
  Calendar,
  Check,
} from "lucide-react";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TOrder } from "@/types";
import moment from "moment-timezone";
import { updateOrderStatusById } from "@/services/Order";
import { toast } from "sonner";
import { DataTablePagination } from "@/components/modules/Dashboard/Shared/DataTablePagination";

const STATUS_CONFIG: Record<
  string,
  { label: string; badge: string; dot: string }
> = {
  delivered: {
    label: "Delivered",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900/50 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  shipping: {
    label: "Shipping",
    badge: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/40 dark:border-blue-900/50 dark:text-blue-300",
    dot: "bg-blue-500",
  },
  pending: {
    label: "Pending",
    badge: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-950/40 dark:border-amber-900/50 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  cancelled: {
    label: "Cancelled",
    badge: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 dark:bg-rose-950/40 dark:border-rose-900/50 dark:text-rose-300",
    dot: "bg-rose-500",
  },
};

export default function ManageOrders({ orders = [] }: { orders: TOrder[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const pendingCount = React.useMemo(
    () => orders.filter((o) => (o.status || "").toLowerCase() === "pending").length,
    [orders]
  );
  const shippingCount = React.useMemo(
    () => orders.filter((o) => (o.status || "").toLowerCase() === "shipping").length,
    [orders]
  );
  const deliveredCount = React.useMemo(
    () => orders.filter((o) => (o.status || "").toLowerCase() === "delivered").length,
    [orders]
  );

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    try {
      const response = await updateOrderStatusById(id, { status });
      if (response?.success) {
        toast.success(`Order status updated to ${status}`);
      } else {
        toast.error(response?.error?.[0]?.message || "Failed to update order status");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

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
      accessorKey: "userId.name",
      header: "Customer",
      cell: ({ row }) => {
        const order = row.original;
        const name =
          order.userId?.name ||
          order.shippingAddressDetails?.name ||
          "Customer";
        const email = order.userId?.email || order.shippingAddressDetails?.phone || "N/A";

        return (
          <div className="min-w-0 max-w-[180px]">
            <p className="text-xs font-bold text-foreground truncate capitalize">
              {name}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {email}
            </p>
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
          <div className="max-w-[220px]">
            <p className="text-xs font-medium text-foreground truncate" title={titles.join(", ")}>
              {displayTitles || "Order items"}
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
      accessorKey: "orderDate",
      header: "Order Date",
      cell: ({ row }) => {
        const date = row.getValue("orderDate") || row.original.createdAt;
        return (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 opacity-60" />
            {date ? moment(date).format("MMM DD, YYYY") : "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
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
      header: "Status",
      cell: ({ row }) => {
        const order = row.original;
        const currentStatus = (order.status || "pending").toLowerCase();
        const config = STATUS_CONFIG[currentStatus] || {
          label: currentStatus,
          badge: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800",
          dot: "bg-zinc-400",
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`h-7 px-2.5 text-[11px] font-semibold rounded-full border gap-1.5 cursor-pointer transition-all ${config.badge}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                <span className="capitalize">{config.label}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs">
              <DropdownMenuLabel className="text-[11px] text-muted-foreground">
                Update Order Status
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["pending", "shipping", "delivered", "cancelled"].map((st) => (
                <DropdownMenuItem
                  key={st}
                  className="cursor-pointer gap-2 capitalize"
                  onClick={() => handleUpdateOrderStatus(order._id, st)}
                >
                  {currentStatus === st && (
                    <Check className="w-3.5 h-3.5 text-[#F65D4E]" />
                  )}
                  {st}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: orders,
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
              <ClipboardList className="w-5 h-5 text-[#F65D4E]" />
              Store Orders Management
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Comprehensive list of all store customer orders with live status management
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              Total: {orders.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
              Pending: {pendingCount}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
              Shipping: {shippingCount}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              Delivered: {deliveredCount}
            </span>
          </div>
        </div>
      </CardHeader>

      {/* Toolbar */}
      <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-100 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-zinc-900/40">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by transaction ID..."
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
                      <ClipboardList className="w-10 h-10 mb-2 opacity-30 text-[#F65D4E]" />
                      <p className="font-semibold text-foreground text-sm">
                        No orders found
                      </p>
                      <p className="text-muted-foreground mt-0.5">
                        No orders match the current filter criteria.
                      </p>
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
