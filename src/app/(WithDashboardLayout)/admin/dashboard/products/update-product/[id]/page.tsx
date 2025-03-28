import UpdateProductForm from "@/components/modules/Dashboard/Admin/Products/UpdateProduct";
import { getProductById } from "@/services/Product";
import { Fragment } from "react";

export default async function UpdateProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: product } = await getProductById(id);
  return (
    <Fragment>
      <UpdateProductForm product={product} />
    </Fragment>
  );
}
