export const dynamic = "force-dynamic";
import OrderHistory from "@/components/modules/Dashboard/User/Orders/OrderHistory";
import { getOrderHistory } from "@/services/Order";

export default async function OrderHistoryPage() {
  const { data } = await getOrderHistory();
  const orderHistory = data ?? [];
  return (
    <div className="p-4">
      <OrderHistory orderHistory={orderHistory} />
    </div>
  );
}
