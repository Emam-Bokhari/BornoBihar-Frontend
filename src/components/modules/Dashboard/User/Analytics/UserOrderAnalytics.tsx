"use client";
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

// Dummy data for logged-in user orders (replace this with real data fetched from API)
const dummyUserOrders = [
  {
    products: [
      { productId: "1", quantity: 3 },
      { productId: "2", quantity: 1 },
    ],
    totalAmount: 120,
    paymentMethod: "sslCommerz",
    paymentStatus: "completed",
    shippingAddressDetails: {
      name: "Masuda Akter",
      phone: "01915842073",
      address: "Brahmanbaria",
      postalCode: "3600",
      city: "Brahmanbaria",
      country: "Bangladesh",
    },
    status: "delivered",
    orderDate: new Date("2025-03-01"),
    transactionId: "TXN-1234567890",
  },
  {
    products: [
      { productId: "3", quantity: 2 },
      { productId: "4", quantity: 5 },
    ],
    totalAmount: 350,
    paymentMethod: "sslCommerz",
    paymentStatus: "pending",
    shippingAddressDetails: {
      name: "Kamal Hossain",
      phone: "01915842074",
      address: "Dhaka",
      postalCode: "1212",
      city: "Dhaka",
      country: "Bangladesh",
    },
    status: "shipping",
    orderDate: new Date("2025-03-05"),
    transactionId: "TXN-2345678901",
  },
];

// Main component for User Dashboard Analytics
export default function UserOrderAnalytics() {
  const [lineChartData, setLineChartData] = useState<any[]>([]);
  const [barChartData, setBarChartData] = useState<any[]>([]);

  useEffect(() => {
    // Process line chart data (Spending Trends) for the logged-in user
    const lineData = dummyUserOrders.map((order) => ({
      date: order.orderDate.toLocaleDateString(),
      spending: order.totalAmount || 0,
    }));

    // Process bar chart data (Total Products Purchased per Order) for the logged-in user
    const barData = dummyUserOrders.map((order, index) => ({
      orderId: `Order ${index + 1}`,
      booksPurchased: order.products.reduce(
        (total, product) => total + product.quantity,
        0
      ),
    }));

    setLineChartData(lineData);
    setBarChartData(barData);
  }, []);

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
        <h2 className="text-xl font-semibold mb-4">Total Books Purchased</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="orderId" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="booksPurchased" fill="#F65D4E" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
