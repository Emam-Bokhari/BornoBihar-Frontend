import Books from "@/components/modules/Books";
import { getAllProducts } from "@/services/Product";
import { TProduct } from "@/types";
import { Fragment } from "react";

export default async function BooksPage() {
  const res = await getAllProducts();
  const products: TProduct[] = res?.data ?? [];

  return (
    <Fragment>
      <Books products={products} />
    </Fragment>
  );
}
