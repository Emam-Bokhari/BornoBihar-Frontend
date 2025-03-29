import Books from "@/components/modules/Books";
import { getAllProducts } from "@/services/Product";
import { TProduct } from "@/types";
import { Fragment } from "react";

export default async function BooksPage() {
  const { data: products }: { data: TProduct[] } = await getAllProducts();

  return (
    <Fragment>
      <Books products={products} />
    </Fragment>
  );
}
