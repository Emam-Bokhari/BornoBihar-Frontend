"use client";
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

// Sample order data (replace this with actual data fetching logic)
const sampleOrders = [
  {
    products: [{ productId: "1", quantity: 5 }],
    totalAmount: 100,
    status: "delivered",
    orderDate: new Date("2025-03-01"),
  },
  {
    products: [{ productId: "2", quantity: 3 }],
    totalAmount: 60,
    status: "delivered",
    orderDate: new Date("2025-03-02"),
  },
  {
    products: [{ productId: "1", quantity: 2 }],
    totalAmount: 40,
    status: "delivered",
    orderDate: new Date("2025-03-03"),
  },
  {
    products: [{ productId: "1", quantity: 5 }],
    totalAmount: 100,
    status: "delivered",
    orderDate: new Date("2025-03-04"),
  },
  {
    products: [{ productId: "2", quantity: 3 }],
    totalAmount: 60,
    status: "delivered",
    orderDate: new Date("2025-03-05"),
  },
  {
    products: [{ productId: "1", quantity: 2 }],
    totalAmount: 40,
    status: "delivered",
    orderDate: new Date("2025-03-06"),
  },
  {
    products: [{ productId: "1", quantity: 5 }],
    totalAmount: 100,
    status: "delivered",
    orderDate: new Date("2025-03-07"),
  },
  {
    products: [{ productId: "2", quantity: 3 }],
    totalAmount: 60,
    status: "delivered",
    orderDate: new Date("2025-03-08"),
  },
  {
    products: [{ productId: "1", quantity: 2 }],
    totalAmount: 40,
    status: "delivered",
    orderDate: new Date("2025-03-09"),
  },
  {
    products: [{ productId: "1", quantity: 5 }],
    totalAmount: 100,
    status: "delivered",
    orderDate: new Date("2025-03-10"),
  },
  {
    products: [{ productId: "2", quantity: 3 }],
    totalAmount: 60,
    status: "delivered",
    orderDate: new Date("2025-03-11"),
  },
  {
    products: [{ productId: "1", quantity: 2 }],
    totalAmount: 40,
    status: "delivered",
    orderDate: new Date("2025-03-12"),
  },
];

export default function SalesOverviewChart() {
  const [lineChartData, setLineChartData] = useState<any[]>([]);
  const [barChartData, setBarChartData] = useState<any[]>([]);

  useEffect(() => {
    // Line chart data: sales trend over time
    const lineData = sampleOrders.map((order) => ({
      date: order.orderDate?.toLocaleDateString(),
      sales: order.totalAmount || 0,
    }));

    // Bar chart data: total sales per order
    const barData = sampleOrders.map((order, index) => ({
      orderId: `Order ${index + 1}`,
      sales: order.totalAmount || 0,
    }));

    setLineChartData(lineData);
    setBarChartData(barData);
  }, []);

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
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
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
            <Bar dataKey="sales" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
