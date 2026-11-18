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
  Users,
  Search,
  SlidersHorizontal,
  Trash2,
  Shield,
  UserCheck,
  Check,
  UserX,
  Calendar,
} from "lucide-react";
import Image from "next/image";
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
import { TUser } from "@/types";
import {
  deleteUserById,
  updateUserRoleById,
  updateUserStatusById,
} from "@/services/User";
import { toast } from "sonner";
import moment from "moment-timezone";
import { DataTablePagination } from "@/components/modules/Dashboard/Shared/DataTablePagination";

export default function ManageUsers({ users = [] }: { users: TUser[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const adminCount = React.useMemo(
    () => users.filter((u) => u.role === "admin").length,
    [users]
  );
  const activeCount = React.useMemo(
    () => users.filter((u) => u.status === "active" || !u.status).length,
    [users]
  );

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await deleteUserById(id);
      if (response?.success) {
        toast.success("User deleted successfully");
      } else {
        toast.error(response?.error?.[0]?.message || "Failed to delete user");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const handleUpdateUserStatus = async (id: string, status: string) => {
    try {
      const response = await updateUserStatusById(id, { status });
      if (response?.success) {
        toast.success(`User marked as ${status}`);
      } else {
        toast.error(response?.error?.[0]?.message || "Failed to update status");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const handleUpdateUserRole = async (id: string, role: string) => {
    try {
      const response = await updateUserRoleById(id, { role });
      if (response?.success) {
        toast.success(`User role changed to ${role}`);
      } else {
        toast.error(response?.error?.[0]?.message || "Failed to update role");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: "name",
      header: "User Details",
      cell: ({ row }) => {
        const user = row.original;
        const initials = (user.name || user.email || "U")
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        return (
          <div className="flex items-center gap-3 py-1">
            {user.image ? (
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#F65D4E]/10 text-[#F65D4E] font-bold text-xs flex items-center justify-center shrink-0 border border-[#F65D4E]/20">
                {initials}
              </div>
            )}
            <div className="min-w-0 max-w-[200px]">
              <p className="text-xs font-bold text-foreground truncate">
                {user.name || "Unnamed User"}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {user.email || "No email"}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const user = row.original;
        const isAdmin = user.role === "admin";
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`h-7 px-2.5 text-[11px] font-semibold rounded-full border gap-1 cursor-pointer transition-all ${
                  isAdmin
                    ? "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800"
                    : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800"
                }`}
              >
                <Shield className="w-3 h-3" />
                <span className="capitalize">{user.role || "user"}</span>
                <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="text-xs">
              <DropdownMenuLabel className="text-[11px] text-muted-foreground">
                Assign Role
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer gap-2"
                onClick={() => handleUpdateUserRole(user._id, "user")}
              >
                {!isAdmin && <Check className="w-3.5 h-3.5 text-[#F65D4E]" />}
                User
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer gap-2"
                onClick={() => handleUpdateUserRole(user._id, "admin")}
              >
                {isAdmin && <Check className="w-3.5 h-3.5 text-[#F65D4E]" />}
                Admin
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const user = row.original;
        const isActive = user.status === "active" || !user.status;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`h-7 px-2.5 text-[11px] font-semibold rounded-full border gap-1.5 cursor-pointer transition-all ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                    : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                />
                <span className="capitalize">{user.status || "Active"}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="text-xs">
              <DropdownMenuLabel className="text-[11px] text-muted-foreground">
                Account Status
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer gap-2"
                onClick={() => handleUpdateUserStatus(user._id, "active")}
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                Active
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer gap-2 text-rose-600"
                onClick={() => handleUpdateUserStatus(user._id, "banned")}
              >
                <UserX className="w-3.5 h-3.5" />
                Banned
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Joined Date",
      cell: ({ row }) => {
        const date = row.original.createdAt;
        return (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 opacity-60" />
            {date ? moment(date).format("MMM DD, YYYY") : "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "city",
      header: "Location",
      cell: ({ row }) => {
        const user = row.original;
        const location = [user.city, user.country].filter(Boolean).join(", ");
        return (
          <div className="text-xs text-muted-foreground capitalize">
            {location || "N/A"}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteUser(user._id)}
              className="h-8 w-8 text-muted-foreground hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
              title="Delete user"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users,
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
              <Users className="w-5 h-5 text-[#F65D4E]" />
              User Management
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Manage user accounts, assign admin privileges, and track members
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              Total: {users.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
              Admins: {adminCount}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              Active: {activeCount}
            </span>
          </div>
        </div>
      </CardHeader>

      {/* Toolbar */}
      <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-100 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-zinc-900/40">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
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
                      <Users className="w-10 h-10 mb-2 opacity-30 text-[#F65D4E]" />
                      <p className="font-semibold text-foreground text-sm">
                        No users found
                      </p>
                      <p className="text-muted-foreground mt-0.5">
                        Try modifying your search filter.
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
