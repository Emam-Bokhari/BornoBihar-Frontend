import OverviewStatsCard from "./OverviewStatsCards";
import OrderStatusDonutChart from "./OrderStatusDonutChart";
import MonthlySalesTrendChart from "./MonthlySalesTrendChart";
import CategorySalesBarChart from "./CategorySalesBarChart";
import TopSellingBooksTable from "./TopSellingBooksTable";
import InventoryAlertTable from "./InventoryAlertTable";
import {
  getStats,
  getOrderStatusDistribution,
  getSalesByCategory,
  getMonthlySalesTrend,
  getTopSellingBooks,
  getInventoryAlerts,
} from "@/services/Analytics";

export default async function AdminDashboard() {
  const [
    statsRes,
    orderStatusRes,
    salesByCategoryRes,
    monthlyTrendRes,
    topSellingBooksRes,
    inventoryAlertsRes,
  ] = await Promise.all([
    getStats(),
    getOrderStatusDistribution(),
    getSalesByCategory(),
    getMonthlySalesTrend(),
    getTopSellingBooks(10),
    getInventoryAlerts(10),
  ]);

  const stats = statsRes?.data || {
    totalOrders: 0,
    totalSales: 0,
    totalUsers: 0,
    totalProducts: 0,
  };
  const orderStatusDistribution = Array.isArray(orderStatusRes?.data)
    ? orderStatusRes.data
    : [];
  const salesByCategory = Array.isArray(salesByCategoryRes?.data)
    ? salesByCategoryRes.data
    : [];
  const monthlySalesTrend = Array.isArray(monthlyTrendRes?.data)
    ? monthlyTrendRes.data
    : [];
  const topSellingBooks = Array.isArray(topSellingBooksRes?.data)
    ? topSellingBooksRes.data
    : [];
  const inventoryAlerts = Array.isArray(inventoryAlertsRes?.data)
    ? inventoryAlertsRes.data
    : [];

  return (
    <div className="space-y-6 pb-12">
      {/* Overview Stat Cards */}
      <OverviewStatsCard initialData={stats} />

      {/* Row 1: Monthly Trend & Order Status Distribution */}
      <div className="px-4 grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-7 2xl:col-span-8">
          <MonthlySalesTrendChart data={monthlySalesTrend} />
        </div>
        <div className="xl:col-span-5 2xl:col-span-4">
          <OrderStatusDonutChart data={orderStatusDistribution} />
        </div>
      </div>

      {/* Row 2: Category Sales & Revenue Bar Chart */}
      <div className="px-4">
        <CategorySalesBarChart data={salesByCategory} />
      </div>

      {/* Row 3: Tabular Reports - Top Selling Books & Inventory Alerts */}
      <div className="px-4 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TopSellingBooksTable books={topSellingBooks} />
        <InventoryAlertTable alerts={inventoryAlerts} />
      </div>
    </div>
  );
}
