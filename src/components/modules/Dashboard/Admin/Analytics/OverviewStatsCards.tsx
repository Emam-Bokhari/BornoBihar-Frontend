import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStats } from "@/services/Analytics";
import { TStats } from "@/types";
import { ShoppingCart, Users, DollarSign, Package } from "lucide-react";

export default async function OverviewStatsCard({
  initialData,
}: {
  initialData?: TStats;
}) {
  const data = initialData || (await getStats())?.data || {
    totalOrders: 0,
    totalSales: 0,
    totalUsers: 0,
    totalProducts: 0,
  };

  const stats = [
    {
      title: "Total Orders",
      value: (data.totalOrders ?? 0).toLocaleString(),
      icon: <ShoppingCart className="w-5 h-5" />,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Total Sales",
      value: `$${(Number(data.totalSales) || 0).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      title: "Total Users",
      value: (data.totalUsers ?? 0).toLocaleString(),
      icon: <Users className="w-5 h-5" />,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      title: "Total Products",
      value: (data.totalProducts ?? 0).toLocaleString(),
      icon: <Package className="w-5 h-5" />,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
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
              <span className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}>
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
