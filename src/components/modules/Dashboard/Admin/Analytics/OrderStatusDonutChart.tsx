"use client";

import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TOrderStatusItem } from "@/types";
import { PieChart as PieChartIcon } from "lucide-react";

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; badgeBg: string; textClass: string }
> = {
  delivered: {
    label: "Delivered",
    color: "#10B981", // Emerald 500
    badgeBg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
    textClass: "text-emerald-600",
  },
  shipping: {
    label: "Shipping",
    color: "#3B82F6", // Blue 500
    badgeBg: "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
    textClass: "text-blue-600",
  },
  pending: {
    label: "Pending",
    color: "#F59E0B", // Amber 500
    badgeBg: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
    textClass: "text-amber-600",
  },
  cancelled: {
    label: "Cancelled",
    color: "#EF4444", // Red 500
    badgeBg: "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300",
    textClass: "text-red-600",
  },
  returned: {
    label: "Returned",
    color: "#8B5CF6", // Purple 500
    badgeBg: "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300",
    textClass: "text-purple-600",
  },
};

const FALLBACK_COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#14B8A6", "#EC4899"];

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload as TOrderStatusItem;
    const config = STATUS_CONFIG[item.status.toLowerCase()] || {
      label: item.status,
      color: payload[0].color || "#6B7280",
    };

    return (
      <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 text-xs">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="w-3 h-3 rounded-full inline-block"
            style={{ backgroundColor: config.color }}
          />
          <p className="font-semibold capitalize text-foreground text-sm">
            {config.label || item.status}
          </p>
        </div>
        <div className="space-y-1 text-muted-foreground">
          <div className="flex justify-between gap-4">
            <span>Orders:</span>
            <span className="font-medium text-foreground">{item.count}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Percentage:</span>
            <span className="font-medium text-foreground">{item.percentage}%</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Amount:</span>
            <span className="font-medium text-foreground">
              ${Number(item.totalAmount || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function OrderStatusDonutChart({
  data = [],
}: {
  data: TOrderStatusItem[];
}) {
  const totalCount = useMemo(
    () => data.reduce((sum, item) => sum + (item.count || 0), 0),
    [data]
  );

  const totalRevenue = useMemo(
    () => data.reduce((sum, item) => sum + (Number(item.totalAmount) || 0), 0),
    [data]
  );

  return (
    <Card className="shadow-xs rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col">
      <CardHeader className="p-5 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-[#F65D4E]" />
              Order Status Distribution
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Breakdown of {totalCount} total orders
            </CardDescription>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            ${totalRevenue.toLocaleString()} Total
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0 flex-1 flex flex-col justify-between">
        {data.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-muted-foreground text-sm">
            <PieChartIcon className="w-10 h-10 mb-2 opacity-30" />
            <p>No order distribution data available</p>
          </div>
        ) : (
          <>
            <div className="relative h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={data}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    cornerRadius={5}
                  >
                    {data.map((entry, index) => {
                      const color =
                        STATUS_CONFIG[entry.status.toLowerCase()]?.color ||
                        FALLBACK_COLORS[index % FALLBACK_COLORS.length];
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Center Donut Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-foreground">
                  {totalCount}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  Total Orders
                </span>
              </div>
            </div>

            {/* Status Legend Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-zinc-800/80">
              {data.map((item, index) => {
                const config = STATUS_CONFIG[item.status.toLowerCase()] || {
                  label: item.status,
                  color: FALLBACK_COLORS[index % FALLBACK_COLORS.length],
                  badgeBg: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
                };
                return (
                  <div
                    key={item.status || index}
                    className="flex items-center justify-between p-2 rounded-xl bg-zinc-50/70 dark:bg-zinc-800/40 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/80 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: config.color }}
                      />
                      <span className="text-xs font-medium capitalize text-foreground">
                        {config.label || item.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-foreground">
                        {item.count} <span className="text-[11px] font-normal text-muted-foreground">({item.percentage}%)</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        ${Number(item.totalAmount || 0).toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
