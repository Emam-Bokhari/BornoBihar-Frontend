import { Fragment } from "react";
import { getProductById } from "@/services/Product";
import { TProduct } from "@/types";
import BookDetails from "@/components/modules/Books/BookDetails";
import { notFound } from "next/navigation";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getProductById(id);
  const product: TProduct | undefined = res?.data;

  if (!product) {
    return notFound();
  }

  return (
    <Fragment>
      <BookDetails product={product} />
    </Fragment>
  );
}
