import BannerSection from "@/components/modules/Home/Banner";
import BookCategoryCarousel from "@/components/modules/Home/BookCategoryCarousel";
import { Fragment } from "react";

export default function HomePage() {
  return (
    <Fragment>
      <BannerSection />
      <BookCategoryCarousel />
    </Fragment>
  );
}
