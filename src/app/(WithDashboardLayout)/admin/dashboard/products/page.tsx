export const dynamic = "force-dynamic";
import ManageProducts from "@/components/modules/Dashboard/Admin/Products";
import { getAllProducts } from "@/services/Product";

export default async function ProductsManagementPage() {
  const res = await getAllProducts();
  const products = res?.data ?? [];

  return (
    <div className="p-4">
      <ManageProducts products={products} />
    </div>
  );
}
