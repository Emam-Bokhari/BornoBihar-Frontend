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
  HelpCircle,
  Search,
  SlidersHorizontal,
  Trash2,
  Calendar,
  Phone,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { TSupport } from "@/types";
import moment from "moment-timezone";
import { deleteSupportById } from "@/services/Support";
import { DataTablePagination } from "@/components/modules/Dashboard/Shared/DataTablePagination";

const ISSUE_TYPE_CONFIG: Record<
  string,
  { label: string; badge: string }
> = {
  orderIssue: {
    label: "Order Issue",
    badge: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/50",
  },
  shippingIssue: {
    label: "Shipping Issue",
    badge: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/50",
  },
  returns: {
    label: "Returns & Refund",
    badge: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50",
  },
  technicalSupports: {
    label: "Technical Support",
    badge: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/50",
  },
  other: {
    label: "General Inquiry",
    badge: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
  },
};

export default function ManageSupports({
  supports = [],
}: {
  supports: TSupport[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [activeSupport, setActiveSupport] = React.useState<TSupport | null>(null);

  const handleDeleteSupport = async (id: string) => {
    try {
      const response = await deleteSupportById(id);
      if (response?.success) {
        toast.success("Support ticket deleted successfully");
      } else {
        toast.error(response?.error?.[0]?.message || "Failed to delete ticket");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const columns: ColumnDef<TSupport>[] = [
    {
      accessorKey: "name",
      header: "Customer",
      cell: ({ row }) => {
        const support = row.original;
        const initials = (support.name || "U")
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        return (
          <div className="flex items-center gap-3 py-1">
            <div className="w-8 h-8 rounded-full bg-[#F65D4E]/10 text-[#F65D4E] font-bold text-xs flex items-center justify-center shrink-0 border border-[#F65D4E]/20">
              {initials}
            </div>
            <div className="min-w-0 max-w-[180px]">
              <p className="text-xs font-bold text-foreground truncate capitalize">
                {support.name || "Customer"}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {support.email}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => {
        const phone = row.getValue("phone") as string;
        return (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Phone className="w-3 h-3 opacity-60" />
            {phone || "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "issueType",
      header: "Issue Type",
      cell: ({ row }) => {
        const type = (row.getValue("issueType") as string) || "other";
        const config = ISSUE_TYPE_CONFIG[type] || {
          label: type,
          badge: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800",
        };

        return (
          <Badge
            variant="outline"
            className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${config.badge}`}
          >
            {config.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "issueDescription",
      header: "Message Content",
      cell: ({ row }) => {
        const support = row.original;
        const desc = support.issueDescription || "";
        return (
          <div className="flex items-center gap-2 max-w-[340px]">
            <p className="text-xs text-muted-foreground truncate" title={desc}>
              {desc}
            </p>
            {desc.length > 30 && (
              <button
                type="button"
                onClick={() => setActiveSupport(support)}
                className="text-[11px] text-[#F65D4E] hover:underline font-medium shrink-0 flex items-center gap-0.5 cursor-pointer"
              >
                <Eye className="w-3 h-3" />
                Read More
              </button>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Submitted",
      cell: ({ row }) => {
        const date = row.getValue("createdAt");
        return (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 opacity-60" />
            {date ? moment(date).format("MMM DD, YYYY") : "N/A"}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const support = row.original;
        return (
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDeleteSupport(support?._id)}
              className="h-7 w-7 rounded-lg border-gray-200 dark:border-zinc-800 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
              title="Delete Ticket"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: supports,
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
    <>
      <Card className="shadow-xs rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
        {/* Header */}
        <CardHeader className="p-5 pb-4 border-b border-gray-100 dark:border-zinc-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#F65D4E]" />
                Support & Help Tickets
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Review customer assistance tickets, delivery inquiries, and order complaints
              </CardDescription>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              Total: {supports.length} Tickets
            </span>
          </div>
        </CardHeader>

        {/* Toolbar */}
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-100 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-zinc-900/40">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer email..."
              value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
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
                        <HelpCircle className="w-10 h-10 mb-2 opacity-30 text-[#F65D4E]" />
                        <p className="font-semibold text-foreground text-sm">
                          No support tickets found
                        </p>
                        <p className="text-muted-foreground mt-0.5">
                          No customer complaints or assistance requests currently pending.
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

      {/* Support Details Dialog */}
      <Dialog
        open={!!activeSupport}
        onOpenChange={(open) => !open && setActiveSupport(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold">
              <HelpCircle className="w-4 h-4 text-[#F65D4E]" />
              Support Ticket from {activeSupport?.name}
            </DialogTitle>
            <DialogDescription className="text-xs space-y-1 pt-1">
              <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                <span>{activeSupport?.email}</span>
                {activeSupport?.phone && (
                  <>
                    <span>•</span>
                    <span>{activeSupport?.phone}</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 pt-1">
                {activeSupport?.issueType && (
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      ISSUE_TYPE_CONFIG[activeSupport.issueType]?.badge || ""
                    }`}
                  >
                    {ISSUE_TYPE_CONFIG[activeSupport.issueType]?.label || activeSupport.issueType}
                  </Badge>
                )}
                <span>•</span>
                <span>
                  {activeSupport?.createdAt
                    ? moment(activeSupport.createdAt).format("MMM DD, YYYY [at] h:mm A")
                    : ""}
                </span>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-800 text-xs text-foreground whitespace-pre-wrap leading-relaxed">
            {activeSupport?.issueDescription}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
