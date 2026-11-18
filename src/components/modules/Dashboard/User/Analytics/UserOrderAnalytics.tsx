"use client";

import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TOrder } from "@/types";
import {
  TrendingUp,
  ShoppingBag,
  Calendar,
  DollarSign,
  Package,
} from "lucide-react";

interface TooltipPayloadItem {
  value?: number | string;
  payload?: Record<string, unknown>;
  [key: string]: unknown;
}

interface TooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const CustomSpendingTooltip = ({
  active,
  payload,
  label,
}: TooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 text-xs min-w-[160px]">
        <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-gray-100 dark:border-zinc-800">
          <Calendar className="w-3.5 h-3.5 text-[#F65D4E]" />
          <span className="font-semibold text-foreground text-sm">
            {item.fullDate || label}
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-[#F65D4E]" />
              Total Spent:
            </span>
            <span className="font-bold text-[#F65D4E]">
              ${Number(payload[0].value || 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const CustomProductsTooltip = ({
  active,
  payload,
  label,
}: TooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 text-xs min-w-[160px]">
        <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-gray-100 dark:border-zinc-800">
          <Package className="w-3.5 h-3.5 text-blue-500" />
          <span className="font-semibold text-foreground text-sm">
            {item.orderId || label}
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Books Purchased:
            </span>
            <span className="font-bold text-foreground">
              {payload[0].value} {Number(payload[0].value) === 1 ? "unit" : "units"}
            </span>
          </div>
          {item.date && (
            <div className="flex items-center justify-between gap-4 pt-1 border-t border-gray-100 dark:border-zinc-800 text-muted-foreground">
              <span>Date:</span>
              <span className="font-medium text-foreground">{item.date}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function UserOrderAnalytics({
  orderData = [],
}: {
  orderData: TOrder[];
}) {
  const sortedOrders = useMemo(() => {
    if (!orderData || !Array.isArray(orderData)) return [];
    return [...orderData].sort(
      (a, b) =>
        new Date(a.createdAt || 0).getTime() -
        new Date(b.createdAt || 0).getTime()
    );
  }, [orderData]);

  const spendingData = useMemo(() => {
    return sortedOrders.map((order, index) => {
      const dateObj = new Date(order.createdAt);
      const isDateValid = !isNaN(dateObj.getTime());
      const dateStr = isDateValid
        ? dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : `Order ${index + 1}`;
      const fullDateStr = isDateValid
        ? dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : `Order ${index + 1}`;

      return {
        date: dateStr,
        fullDate: fullDateStr,
        spending: Number(order.totalAmount || 0),
        orderIndex: index + 1,
      };
    });
  }, [sortedOrders]);

  const productsData = useMemo(() => {
    return sortedOrders.map((order, index) => {
      const dateObj = new Date(order.createdAt);
      const isDateValid = !isNaN(dateObj.getTime());
      const dateStr = isDateValid
        ? dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : `Order ${index + 1}`;

      const totalQuantity = (order.products || []).reduce(
        (sum, item) => sum + (Number(item?.quantity) || 1),
        0
      );

      return {
        orderId: `Order #${index + 1}`,
        date: dateStr,
        productsPurchased: totalQuantity,
        amount: Number(order.totalAmount || 0),
      };
    });
  }, [sortedOrders]);

  const totalSpent = useMemo(
    () =>
      sortedOrders.reduce(
        (sum, order) => sum + (Number(order.totalAmount) || 0),
        0
      ),
    [sortedOrders]
  );

  const totalProductsPurchased = useMemo(
    () =>
      sortedOrders.reduce(
        (sum, order) =>
          sum +
          (order.products || []).reduce(
            (pSum, p) => pSum + (Number(p?.quantity) || 1),
            0
          ),
        0
      ),
    [sortedOrders]
  );

  const avgSpendingPerOrder = useMemo(
    () => (sortedOrders.length > 0 ? totalSpent / sortedOrders.length : 0),
    [sortedOrders, totalSpent]
  );

  const avgProductsPerOrder = useMemo(
    () =>
      sortedOrders.length > 0
        ? (totalProductsPurchased / sortedOrders.length).toFixed(1)
        : "0",
    [sortedOrders, totalProductsPurchased]
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Card 1: Spending Trends */}
      <Card className="shadow-xs rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col">
        <CardHeader className="p-5 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#F65D4E]" />
                Spending Trends
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Your book spending history over time
              </CardDescription>
            </div>

            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F65D4E]/10 text-[#F65D4E] flex items-center gap-1 self-start sm:self-auto">
              <DollarSign className="w-3.5 h-3.5" />
              ${totalSpent.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}{" "}
              Total
            </span>
          </div>

          {/* Quick Summary Pill Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-muted-foreground">
            <div>
              Total Orders:{" "}
              <span className="font-bold text-foreground">
                {sortedOrders.length}
              </span>
            </div>
            <span className="text-gray-300 dark:text-zinc-700">•</span>
            <div>
              Average / Order:{" "}
              <span className="font-bold text-[#F65D4E]">
                ${avgSpendingPerOrder.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 pt-2 flex-1">
          {spendingData.length === 0 ? (
            <div className="h-72 flex flex-col items-center justify-center text-muted-foreground text-sm">
              <TrendingUp className="w-10 h-10 mb-2 opacity-30" />
              <p>No spending trends recorded yet</p>
            </div>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={spendingData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="userColorSpending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F65D4E" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#F65D4E" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                    className="stroke-gray-200 dark:stroke-zinc-800"
                  />
                  <XAxis
                    dataKey="date"
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
                    tickFormatter={(val) => `$${val}`}
                  />
                  <Tooltip content={<CustomSpendingTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="spending"
                    stroke="#F65D4E"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#userColorSpending)"
                    activeDot={{
                      r: 6,
                      fill: "#F65D4E",
                      stroke: "#FFFFFF",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Card 2: Products Purchased */}
      <Card className="shadow-xs rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col">
        <CardHeader className="p-5 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-500" />
                Products Purchased
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Quantity of books purchased per order
              </CardDescription>
            </div>

            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 flex items-center gap-1 self-start sm:self-auto">
              <Package className="w-3.5 h-3.5" />
              {totalProductsPurchased}{" "}
              {totalProductsPurchased === 1 ? "Book" : "Books"} Total
            </span>
          </div>

          {/* Quick Summary Pill Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-muted-foreground">
            <div>
              Orders Count:{" "}
              <span className="font-bold text-foreground">
                {productsData.length}
              </span>
            </div>
            <span className="text-gray-300 dark:text-zinc-700">•</span>
            <div>
              Avg Books / Order:{" "}
              <span className="font-bold text-blue-600">
                {avgProductsPerOrder}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 pt-2 flex-1">
          {productsData.length === 0 ? (
            <div className="h-72 flex flex-col items-center justify-center text-muted-foreground text-sm">
              <ShoppingBag className="w-10 h-10 mb-2 opacity-30" />
              <p>No product purchase records yet</p>
            </div>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={productsData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                    className="stroke-gray-200 dark:stroke-zinc-800"
                  />
                  <XAxis
                    dataKey="orderId"
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
                    allowDecimals={false}
                    tickFormatter={(val) => `${val}`}
                  />
                  <Tooltip content={<CustomProductsTooltip />} />
                  <Bar
                    dataKey="productsPurchased"
                    name="Books"
                    fill="#3B82F6"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={45}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
