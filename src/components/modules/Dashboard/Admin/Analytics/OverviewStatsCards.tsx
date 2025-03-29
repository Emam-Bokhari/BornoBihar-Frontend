import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStats } from "@/services/Analytics";
import { ShoppingCart, Users, DollarSign, Package } from "lucide-react";

export default async function OverviewStatsCard() {
  const { data } = await getStats();

  const stats = [
    {
      title: "Total Orders",
      value: data.totalOrders,
      icon: <ShoppingCart />,
      color: "text-blue-500",
    },
    {
      title: "Total Sales",
      value: `$${data.totalSales}`,
      icon: <DollarSign />,
      color: "text-green-500",
    },
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: <Users />,
      color: "text-purple-500",
    },
    {
      title: "Total Products",
      value: data.totalProducts,
      icon: <Package />,
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
