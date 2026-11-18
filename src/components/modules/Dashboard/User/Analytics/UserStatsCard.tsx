import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderHistory } from "@/services/Order";
import { ShoppingCart, Clock, DollarSign, PackageCheck } from "lucide-react";
import { TOrder } from "@/types";

interface Order {
  totalAmount?: number;
  status?: string;
  [key: string]: unknown;
}

export default async function UserStatsCard({
  initialOrders,
}: {
  initialOrders?: TOrder[] | Order[];
}) {
  const orderData: Order[] =
    initialOrders || (await getOrderHistory())?.data || [];

  const totalOrders = orderData.length || 0;
  const totalSpent =
    orderData.reduce(
      (sum: number, order: Order) => sum + (Number(order.totalAmount) || 0),
      0
    ) || 0;
  const pendingOrders =
    orderData.filter(
      (order: Order) => order.status?.toLowerCase() === "pending"
    ).length || 0;
  const lastOrderStatusRaw =
    orderData.length > 0 ? orderData[0]?.status : "N/A";
  const lastOrderStatus =
    lastOrderStatusRaw && lastOrderStatusRaw !== "N/A"
      ? lastOrderStatusRaw.charAt(0).toUpperCase() +
        lastOrderStatusRaw.slice(1).toLowerCase()
      : "N/A";

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      icon: <ShoppingCart className="w-5 h-5" />,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Total Spent",
      value: `$${(Number(totalSpent) || 0).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.toLocaleString(),
      icon: <Clock className="w-5 h-5" />,
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      title: "Last Order Status",
      value: lastOrderStatus,
      icon: <PackageCheck className="w-5 h-5" />,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];

  return (
    <div className="p-4 pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="shadow-xs rounded-2xl p-4 border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center space-y-0 space-x-4 p-0 pb-3">
              <span
                className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}
              >
                {stat.icon}
              </span>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
