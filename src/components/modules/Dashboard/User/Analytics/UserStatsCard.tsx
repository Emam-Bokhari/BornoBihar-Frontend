import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderHistory } from "@/services/Order";
import { ShoppingCart, Clock, DollarSign, PackageCheck } from "lucide-react";

export default async function UserStatsCard() {
  const response = await getOrderHistory();
  const orderData = response?.data || [];

  if (!Array.isArray(orderData) || orderData.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No orders found.</p>;
  }

  const totalOrders = orderData.length;
  const totalSpent = orderData.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );
  const pendingOrders = orderData.filter(
    (order) => order.status === "pending"
  ).length;
  const lastOrderStatus = orderData[0]?.status || "N/A";

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <ShoppingCart />,
      color: "text-blue-500",
    },
    {
      title: "Total Spent",
      value: `$${totalSpent}`,
      icon: <DollarSign />,
      color: "text-green-500",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: <Clock />,
      color: "text-yellow-500",
    },
    {
      title: "Last Order Status",
      value: lastOrderStatus,
      icon: <PackageCheck />,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="shadow-md rounded-2xl p-4 border border-gray-200"
          >
            <CardHeader className="flex items-center space-x-4">
              <span className={`p-3 bg-gray-100 rounded-full ${stat.color}`}>
                {stat.icon}
              </span>
              <CardTitle className="text-lg font-semibold">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
