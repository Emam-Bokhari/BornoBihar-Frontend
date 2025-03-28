import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import BookCard from "../../Books/BookCard";
import { TProduct } from "@/types";

export default function NewArrivalsBooks({
  products,
}: {
  products: TProduct[];
}) {
  // Sort books by createdAt in descending order (newest first)
  const newArrivalsBooks = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    ?.slice(0, 5);
  return (
    <Container className="my-12">
      <SectionTitle title="New Arrivals" viewAllUrl="/books" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4">
        {newArrivalsBooks.map((product) => (
          <BookCard key={product._id} product={product} />
        ))}
      </div>
    </Container>
  );
}
