"use client";

import React, { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TooltipProps } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TMonthlySalesTrendItem } from "@/types";
import { TrendingUp, Calendar, DollarSign, ShoppingBag } from "lucide-react";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload as TMonthlySalesTrendItem;
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 text-xs min-w-[160px]">
        <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-gray-100 dark:border-zinc-800">
          <Calendar className="w-3.5 h-3.5 text-[#F65D4E]" />
          <span className="font-semibold text-foreground text-sm">
            {item.label || label}
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-[#F65D4E]" />
              Total Sales:
            </span>
            <span className="font-bold text-[#F65D4E]">
              ${Number(item.totalSales || 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
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

export default function MonthlySalesTrendChart({
  data = [],
}: {
  data: TMonthlySalesTrendItem[];
}) {
  const [metric, setMetric] = useState<"sales" | "orders">("sales");

  const totalSalesSum = useMemo(
    () => data.reduce((acc, curr) => acc + (Number(curr.totalSales) || 0), 0),
    [data]
  );

  const totalOrdersSum = useMemo(
    () => data.reduce((acc, curr) => acc + (curr.orderCount || 0), 0),
    [data]
  );

  const avgMonthlySales = useMemo(
    () => (data.length > 0 ? totalSalesSum / data.length : 0),
    [data, totalSalesSum]
  );

  return (
    <Card className="shadow-xs rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col">
      <CardHeader className="p-5 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#F65D4E]" />
              Monthly Sales Trend
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Sales performance & order volume over months
            </CardDescription>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 self-start sm:self-auto">
            <button
              onClick={() => setMetric("sales")}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                metric === "sales"
                  ? "bg-white dark:bg-zinc-900 text-[#F65D4E] shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              Sales ($)
            </button>
            <button
              onClick={() => setMetric("orders")}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                metric === "orders"
                  ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Orders
            </button>
          </div>
        </div>

        {/* Quick Summary Pill Bar */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-muted-foreground">
          <div>
            Period Sales:{" "}
            <span className="font-bold text-foreground">
              ${totalSalesSum.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
          <span className="text-gray-300 dark:text-zinc-700">•</span>
          <div>
            Period Orders:{" "}
            <span className="font-bold text-foreground">
              {totalOrdersSum.toLocaleString()}
            </span>
          </div>
          <span className="text-gray-300 dark:text-zinc-700">•</span>
          <div>
            Monthly Avg:{" "}
            <span className="font-bold text-[#F65D4E]">
              ${avgMonthlySales.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-2">
        {data.length === 0 ? (
          <div className="h-72 flex flex-col items-center justify-center text-muted-foreground text-sm">
            <TrendingUp className="w-10 h-10 mb-2 opacity-30" />
            <p>No monthly trend data recorded yet</p>
          </div>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F65D4E" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#F65D4E" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                  className="stroke-gray-200 dark:stroke-zinc-800"
                />
                <XAxis
                  dataKey="label"
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) =>
                    metric === "sales" ? `$${val}` : `${val}`
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                {metric === "sales" ? (
                  <Area
                    type="monotone"
                    dataKey="totalSales"
                    stroke="#F65D4E"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorSales)"
                    activeDot={{ r: 6, fill: "#F65D4E", stroke: "#FFFFFF", strokeWidth: 2 }}
                  />
                ) : (
                  <Area
                    type="monotone"
                    dataKey="orderCount"
                    stroke="#3B82F6"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorOrders)"
                    activeDot={{ r: 6, fill: "#3B82F6", stroke: "#FFFFFF", strokeWidth: 2 }}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
