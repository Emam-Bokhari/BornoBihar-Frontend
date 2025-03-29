"use client";
import { TOrder } from "@/types";
import { useState, useEffect } from "react";
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

export default function UserOrderAnalytics({
  orderData,
}: {
  orderData: TOrder[];
}) {
  const [lineChartData, setLineChartData] = useState<any[]>([]);
  const [barChartData, setBarChartData] = useState<any[]>([]);

  useEffect(() => {
    if (!orderData || orderData.length === 0) return;

    const lineData = orderData.map((order) => ({
      date: new Date(order.createdAt).toLocaleDateString(),
      spending: order.totalAmount || 0,
    }));

    const barData = orderData.map((order, index) => ({
      orderId: `Order ${index + 1}`,
      productsPurchased: order.products.reduce(
        (total, product) => total + product.quantity,
        0
      ),
    }));

    setLineChartData(lineData);
    setBarChartData(barData);
  }, [orderData]);

  return (
    <div className="p-4 flex flex-col 2xl:flex-row gap-4">
      <div className="flex-1">
        {/* Spending Trends Line Chart */}
        <h2 className="text-xl font-semibold mb-4">Spending Trends</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="spending" stroke="#F65D4E" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex-1">
        {/* Total Products Purchased Bar Chart */}
        <h2 className="text-xl font-semibold mb-4">Total Products Purchased</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="orderId" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="productsPurchased" fill="#F65D4E" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
