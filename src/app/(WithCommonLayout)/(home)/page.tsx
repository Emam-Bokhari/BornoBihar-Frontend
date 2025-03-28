import BannerSection from "@/components/modules/Home/Banner";
import { BlogSection } from "@/components/modules/Home/BlogSection.tsx";

import BookCategoryCarousel from "@/components/modules/Home/BookCategoryCarousel";
import FeaturedBooks from "@/components/modules/Home/FeaturedBooks";
import PromotionalBanner from "@/components/modules/Home/PromotionalBanner";
import PromotionSummaryBar from "@/components/modules/Home/PromotionSummaryBar";
import { getAllBlogs } from "@/services/Blog";

import { Fragment } from "react";

export default async function HomePage() {
  const { data } = await getAllBlogs();
  const blogs = data ?? [];

  return (
    <Fragment>
      <BannerSection />
      <BookCategoryCarousel />
      <PromotionalBanner />
      <FeaturedBooks />
      <BlogSection blogs={blogs} />
      <PromotionSummaryBar />
    </Fragment>
  );
}
