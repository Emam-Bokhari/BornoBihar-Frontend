import { Fragment } from "react";
import { getProductById } from "@/services/Product";
import { TProduct } from "@/types";
import BookDetails from "@/components/modules/Books/BookDetails";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: product }: { data: TProduct } = await getProductById(id);

  return (
    <Fragment>
      <BookDetails product={product} />
    </Fragment>
  );
}
