import ManageOrders from "@/components/modules/Dashboard/Admin/Orders";
import { getAllOrders } from "@/services/Order";

export default async function OrdersManagementPage() {
  const { data } = await getAllOrders();
  const orders = data ?? [];

  return (
    <div className="p-4">
      <ManageOrders orders={orders} />
    </div>
  );
}
