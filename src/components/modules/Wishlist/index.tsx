import CommonBannerSection from "@/components/shared/CommonBannerSection";
import { Fragment } from "react";
import BookCard from "../Books/BookCard";
import Container from "@/components/shared/Container";

export default function Wishlist() {
  return (
    <Fragment>
      <CommonBannerSection title="Your Personalized Wishlist" />
      <Container className="my-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <BookCard key={index} />
          ))}
        </div>
      </Container>
    </Fragment>
  );
}
