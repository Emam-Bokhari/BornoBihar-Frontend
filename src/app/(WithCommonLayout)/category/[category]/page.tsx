import BookCard from "@/components/modules/Books/BookCard";
import CategoryCard from "@/components/modules/Category/CategoryCard";
import Container from "@/components/shared/Container";

import { getProductsByCategory } from "@/services/Product";
import { TProduct } from "@/types";
import { Fragment } from "react";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const { data: products }: { data: TProduct[] } = await getProductsByCategory(
    category
  );
  console.log(category);

  if (!(products ?? false)) {
    return (
      <Fragment>
        <p className="text-center mt-[5%] text-gray-500 text-lg">
          No data found with this category
        </p>
      </Fragment>
    );
  }

  return (
    <Container className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {products?.map((product) => (
          <BookCard key={product._id} product={product} />
        ))}
      </div>
    </Container>
  );
}
