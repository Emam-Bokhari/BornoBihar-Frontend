import UserOrderAnalytics from "./UserOrderAnalytics";
import UserStatsCard from "./UserStatsCard";
import { getOrderHistory } from "@/services/Order";

export default async function UserDashboard() {
  const response = await getOrderHistory();
  const orderData = Array.isArray(response?.data) ? response.data : [];

  return (
    <div className="space-y-6 pb-12">
      {/* Stat Cards */}
      <UserStatsCard initialOrders={orderData} />

      {/* Analytics Charts */}
      <div className="px-4">
        <UserOrderAnalytics orderData={orderData} />
      </div>
    </div>
  );
}
