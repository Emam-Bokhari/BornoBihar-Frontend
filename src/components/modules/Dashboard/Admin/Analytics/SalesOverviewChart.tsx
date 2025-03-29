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

// Assuming that `orderData` is passed as a prop from the parent component

export default function SalesOverviewChart({
  orderData,
}: {
  orderData: TOrder[];
}) {
  console.log(orderData);

  const [lineChartData, setLineChartData] = useState<any[]>([]);
  const [barChartData, setBarChartData] = useState<any[]>([]);

  useEffect(() => {
    // Format the data for the Line Chart: sales trend over time
    const lineData = orderData.map((order) => ({
      date: new Date(order.createdAt).toLocaleDateString(), // Format the order date
      sales: order.totalAmount || 0, // Use totalAmount from the order data
    }));

    // Format the data for the Bar Chart: total sales per order
    const barData = orderData.map((order, index) => ({
      orderId: `Order ${index + 1}`, // Display Order number
      sales: order.totalAmount || 0, // Use totalAmount from the order data
    }));

    // Update the state with formatted data
    setLineChartData(lineData);
    setBarChartData(barData);
  }, [orderData]); // Dependency array to update when orderData changes

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
