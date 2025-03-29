"use client";
import { TOrder } from "@/types";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function SalesOverviewChart({
  orderData,
}: {
  orderData: TOrder[];
}) {
  console.log(orderData);

  const [lineChartData, setLineChartData] = useState<any[]>([]);
  const [barChartData, setBarChartData] = useState<any[]>([]);

  useEffect(() => {
    const lineData = orderData.map((order) => ({
      date: new Date(order.createdAt).toLocaleDateString(),
      sales: order.totalAmount || 0,
    }));

    const barData = orderData.map((order, index) => ({
      orderId: `Order ${index + 1}`,
      sales: order.totalAmount || 0,
    }));

    setLineChartData(lineData);
    setBarChartData(barData);
  }, [orderData]);

  return (
    <div className="p-4 flex flex-col 2xl:flex-row gap-4">
      <div className="flex-1">
        {/* Sales Overview Line Chart */}
        <h2 className="text-xl font-semibold mb-4">Sales Overview (Trend)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#F65D4E" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex-1">
        {/* Sales by Order Bar Chart */}
        <h2 className="text-xl font-semibold mb-4">Sales by Order</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="orderId" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#F65D4E" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
