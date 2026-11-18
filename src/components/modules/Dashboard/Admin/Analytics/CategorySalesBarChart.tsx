"use client";

import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { TooltipProps } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TCategorySalesItem } from "@/types";
import { BarChart3, Layers, DollarSign, Package } from "lucide-react";

// Format camelCase category names to readable title case
const formatCategoryName = (cat: string) => {
  if (!cat) return "Unknown";
  // Insert space before capital letters and capitalize first letter
  const formatted = cat
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
  return formatted.trim();
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload as TCategorySalesItem;
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 text-xs min-w-[170px]">
        <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-gray-100 dark:border-zinc-800">
          <Layers className="w-3.5 h-3.5 text-[#F65D4E]" />
          <span className="font-semibold text-foreground text-sm">
            {formatCategoryName(item.category || label)}
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-[#F65D4E]" />
              Revenue:
            </span>
            <span className="font-bold text-[#F65D4E]">
              ${Number(item.totalRevenue || 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              Units Sold:
            </span>
            <span className="font-semibold text-foreground">
              {item.totalQuantitySold} pcs
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Orders:
            </span>
            <span className="font-semibold text-foreground">
              {item.orderCount} orders
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function CategorySalesBarChart({
  data = [],
}: {
  data: TCategorySalesItem[];
}) {
  const [viewMode, setViewMode] = useState<"both" | "revenue" | "quantity">(
    "both"
  );

  const formattedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      displayCategory: formatCategoryName(item.category),
    }));
  }, [data]);

  const totalCategories = data.length;
  const topCategory = useMemo(() => {
    if (!data.length) return null;
    return [...data].sort((a, b) => (b.totalRevenue || 0) - (a.totalRevenue || 0))[0];
  }, [data]);

  return (
    <Card className="shadow-xs rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <CardHeader className="p-5 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#F65D4E]" />
              Sales & Revenue by Category
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Performance breakdown across {totalCategories} categories
              {topCategory && (
                <span className="ml-1 text-foreground font-medium">
                  • Top: {formatCategoryName(topCategory.category)} ($
                  {Number(topCategory.totalRevenue).toLocaleString()})
                </span>
              )}
            </CardDescription>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 self-start sm:self-auto">
            <button
              onClick={() => setViewMode("both")}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "both"
                  ? "bg-white dark:bg-zinc-900 text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Combined
            </button>
            <button
              onClick={() => setViewMode("revenue")}
              type="button"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "revenue"
                  ? "bg-white dark:bg-zinc-900 text-[#F65D4E] shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              Revenue
            </button>
            <button
              onClick={() => setViewMode("quantity")}
              type="button"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "quantity"
                  ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              Quantity
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-2">
        {data.length === 0 ? (
          <div className="h-80 flex flex-col items-center justify-center text-muted-foreground text-sm">
            <BarChart3 className="w-10 h-10 mb-2 opacity-30" />
            <p>No category sales data recorded yet</p>
          </div>
        ) : (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={formattedData}
                margin={{ top: 15, right: 15, left: -5, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                  className="stroke-gray-200 dark:stroke-zinc-800"
                />
                <XAxis
                  dataKey="displayCategory"
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  yAxisId="left"
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) =>
                    viewMode === "quantity" ? `${val}` : `$${val}`
                  }
                />
                {viewMode === "both" && (
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `${val} pcs`}
                  />
                )}
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: 10 }}
                  formatter={(value) => (
                    <span className="text-xs font-medium text-foreground">
                      {value}
                    </span>
                  )}
                />
                {(viewMode === "both" || viewMode === "revenue") && (
                  <Bar
                    yAxisId="left"
                    dataKey="totalRevenue"
                    name="Revenue ($)"
                    fill="#F65D4E"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={45}
                  />
                )}
                {(viewMode === "both" || viewMode === "quantity") && (
                  <Bar
                    yAxisId={viewMode === "both" ? "right" : "left"}
                    dataKey="totalQuantitySold"
                    name="Quantity Sold (Pcs)"
                    fill="#3B82F6"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={45}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
