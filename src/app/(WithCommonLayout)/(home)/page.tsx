import BannerSection from "@/components/modules/Home/Banner";
import BookCategoryCarousel from "@/components/modules/Home/BookCategoryCarousel";
import FeaturedBooks from "@/components/modules/Home/FeaturedBooks";
import { Fragment } from "react";

export default function HomePage() {
  return (
    <Fragment>
      <BannerSection />
      <BookCategoryCarousel />
      <FeaturedBooks />
    </Fragment>
  );
}
