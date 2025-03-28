import ManageProducts from "@/components/modules/Dashboard/Admin/Products";
import { getAllProducts } from "@/services/Product";

export default async function ProductsManagementPage() {
  const { data } = await getAllProducts();
  const products = data ?? [];

  return (
    <div className="p-4">
      <ManageProducts products={products} />
    </div>
  );
}
