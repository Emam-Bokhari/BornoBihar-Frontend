import { Fragment } from "react";

import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import FeaturedBookCard from "./FeaturedBookCard";
import { TProduct } from "@/types";
import { getAllProducts } from "@/services/Product";

export default async function FeaturedBooks() {
  const { data: products }: { data: TProduct[] } = await getAllProducts();

  return (
    <Fragment>
      <Container className="mt-12">
        <SectionTitle title="Featured Books" viewAllUrl="/books" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {products?.map((product) => (
            <FeaturedBookCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </Fragment>
  );
}
