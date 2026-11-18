"use client";

import React, { useMemo } from "react";
import Image from "next/image";
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
import { TTopSellingBook } from "@/types";
import { Award, BookOpen, TrendingUp } from "lucide-react";
import { CategoryType, getCategoryColor } from "@/app/utils/getCategoryColor";

const formatCategoryName = (cat: string) => {
  if (!cat) return "Unknown";
  return cat
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

export default function TopSellingBooksTable({
  books = [],
}: {
  books: TTopSellingBook[];
}) {
  const maxSold = useMemo(
    () => (books.length > 0 ? Math.max(...books.map((b) => b.totalSold || 0)) : 1),
    [books]
  );

  return (
    <Card className="shadow-xs rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Top Selling Books
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Ranked by total copies sold and revenue generated
            </CardDescription>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            Top {books.length}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1">
        {books.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm flex flex-col items-center justify-center">
            <BookOpen className="w-10 h-10 mb-2 opacity-30" />
            <p>No top selling books recorded yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-zinc-50/70 dark:bg-zinc-800/40">
                <TableRow>
                  <TableHead className="w-12 text-center text-xs font-semibold">
                    #
                  </TableHead>
                  <TableHead className="text-xs font-semibold">Book Details</TableHead>
                  <TableHead className="text-xs font-semibold">Category</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Price</TableHead>
                  <TableHead className="text-xs font-semibold">Units Sold</TableHead>
                  <TableHead className="text-xs font-semibold text-center">Stock</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book, index) => {
                  const rank = index + 1;
                  const rankStyles =
                    rank === 1
                      ? "bg-amber-500 text-white font-bold"
                      : rank === 2
                      ? "bg-slate-400 text-white font-bold"
                      : rank === 3
                      ? "bg-amber-700 text-white font-bold"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium";

                  const soldPercentage = maxSold > 0 ? (book.totalSold / maxSold) * 100 : 0;
                  const categoryColor = getCategoryColor(
                    book.category as CategoryType
                  );

                  return (
                    <TableRow
                      key={book.productId || index}
                      className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      {/* Rank */}
                      <TableCell className="text-center font-medium">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${rankStyles}`}
                        >
                          {rank}
                        </span>
                      </TableCell>

                      {/* Book Image + Title & Author */}
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-14 shrink-0 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-2xs">
                            {book.image ? (
                              <Image
                                src={book.image}
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
                              {book.author || "Unknown Author"}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Category Badge */}
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] px-2 py-0.5 rounded-md font-medium border-0 ${categoryColor}`}
                        >
                          {formatCategoryName(book.category)}
                        </Badge>
                      </TableCell>

                      {/* Price */}
                      <TableCell className="text-right text-xs font-semibold text-foreground">
                        ${Number(book.price || 0).toFixed(2)}
                      </TableCell>

                      {/* Units Sold with mini bar */}
                      <TableCell>
                        <div className="w-28 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-bold text-foreground">
                              {book.totalSold}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              copies
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#F65D4E] transition-all"
                              style={{ width: `${Math.max(soldPercentage, 8)}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>

                      {/* Current Stock */}
                      <TableCell className="text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            book.currentStock === 0
                              ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                              : book.currentStock <= 10
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                          }`}
                        >
                          {book.currentStock} left
                        </span>
                      </TableCell>

                      {/* Total Revenue */}
                      <TableCell className="text-right">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          ${Number(book.totalRevenue || 0).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
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
