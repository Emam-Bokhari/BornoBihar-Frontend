"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TInventoryAlert } from "@/types";
import { AlertTriangle, BookOpen, CheckCircle2, ExternalLink, ShieldAlert } from "lucide-react";
import { CategoryType, getCategoryColor } from "@/app/utils/getCategoryColor";

const formatCategoryName = (cat: string) => {
  if (!cat) return "Unknown";
  return cat
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

export default function InventoryAlertTable({
  alerts = [],
}: {
  alerts: TInventoryAlert[];
}) {
  const outOfStockCount = useMemo(
    () => alerts.filter((item) => (item.currentStock === 0 || item.stockStatus?.toLowerCase().includes("out"))).length,
    [alerts]
  );

  const lowStockCount = useMemo(
    () => alerts.length - outOfStockCount,
    [alerts, outOfStockCount]
  );

  return (
    <Card className="shadow-xs rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col">
      <CardHeader className="p-5 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              Inventory Stock Alerts
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Items at or below restock threshold (≤ 10 units)
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            {outOfStockCount > 0 && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                {outOfStockCount} Out of Stock
              </span>
            )}
            {lowStockCount > 0 && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {lowStockCount} Low Stock
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1">
        {alerts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm flex flex-col items-center justify-center">
            <CheckCircle2 className="w-10 h-10 mb-2 text-emerald-500 opacity-80" />
            <p className="font-semibold text-foreground">Stock levels healthy</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              No products are currently low or out of stock.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-zinc-50/70 dark:bg-zinc-800/40">
                <TableRow>
                  <TableHead className="text-xs font-semibold">Book</TableHead>
                  <TableHead className="text-xs font-semibold">Category</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Price</TableHead>
                  <TableHead className="text-xs font-semibold text-center">Remaining</TableHead>
                  <TableHead className="text-xs font-semibold text-center">Status</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((item, index) => {
                  const isOut =
                    item.currentStock === 0 ||
                    item.stockStatus?.toLowerCase().includes("out");
                  const categoryColor = getCategoryColor(
                    item.category as CategoryType
                  );

                  return (
                    <TableRow
                      key={item.productId || index}
                      className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      {/* Image + Title & Author */}
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-14 shrink-0 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-2xs">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.title || "Book cover"}
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
                          <div className="min-w-0 max-w-[200px]">
                            <p
                              className="text-xs font-bold text-foreground truncate hover:text-[#F65D4E] transition-colors"
                              title={item.title}
                            >
                              {item.title}
                            </p>
                            <p className="text-[11px] text-muted-foreground truncate">
                              {item.author || "Unknown Author"}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Category */}
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] px-2 py-0.5 rounded-md font-medium border-0 ${categoryColor}`}
                        >
                          {formatCategoryName(item.category)}
                        </Badge>
                      </TableCell>

                      {/* Price */}
                      <TableCell className="text-right text-xs font-semibold text-foreground">
                        ${Number(item.price || 0).toFixed(2)}
                      </TableCell>

                      {/* Remaining Stock Units */}
                      <TableCell className="text-center">
                        <span
                          className={`inline-block font-bold text-xs px-2.5 py-1 rounded-full ${
                            isOut
                              ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
                          }`}
                        >
                          {item.currentStock} {item.currentStock === 1 ? "unit" : "units"}
                        </span>
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell className="text-center">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                            isOut
                              ? "bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400"
                              : "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50 dark:text-amber-400"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isOut ? "bg-red-500 animate-pulse" : "bg-amber-500"
                            }`}
                          />
                          {item.stockStatus || (isOut ? "Out of Stock" : "Low Stock")}
                        </span>
                      </TableCell>

                      {/* Action */}
                      <TableCell className="text-right">
                        <Link
                          href="/admin/dashboard/products"
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#F65D4E] hover:underline"
                        >
                          Manage
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
