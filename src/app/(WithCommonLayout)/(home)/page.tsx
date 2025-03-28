import BannerSection from "@/components/modules/Home/Banner";
import BookCategoryCarousel from "@/components/modules/Home/BookCategoryCarousel";
import FeaturedBooks from "@/components/modules/Home/FeaturedBooks";
import PromotionalBanner from "@/components/modules/Home/PromotionalBanner";

import { Fragment } from "react";

export default function HomePage() {
  return (
    <Fragment>
      <BannerSection />
      <BookCategoryCarousel />
      <PromotionalBanner />
      <FeaturedBooks />
    </Fragment>
  );
}
