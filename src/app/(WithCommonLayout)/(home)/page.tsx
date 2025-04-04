import BannerSection from "@/components/modules/Home/Banner";
import { BlogSection } from "@/components/modules/Home/BlogSection.tsx";

import BookCategoryCarousel from "@/components/modules/Home/BookCategoryCarousel";
import BookOfTheMonthSection from "@/components/modules/Home/BookOfTheMonth";
import FeaturedBooks from "@/components/modules/Home/FeaturedBooks";
import NewArrivalsBooks from "@/components/modules/Home/NewArrivalsBooks";
import NewsletterSection from "@/components/modules/Home/Newsletter";
import PromotionalBanner from "@/components/modules/Home/PromotionalBanner";
import PromotionSummaryBar from "@/components/modules/Home/PromotionSummaryBar";
import { getAllBlogs } from "@/services/Blog";
import { getAllProducts } from "@/services/Product";

import { Fragment } from "react";

export default async function HomePage() {
  const { data } = await getAllBlogs();
  const blogs = data ?? [];

  const { data: products } = await getAllProducts();

  return (
    <Fragment>
      <BannerSection />
      <BookCategoryCarousel />
      <PromotionalBanner />
      <FeaturedBooks />
      <NewArrivalsBooks products={products} />
      <BookOfTheMonthSection />
      <BlogSection blogs={blogs} />
      <NewsletterSection />
      <PromotionSummaryBar />
    </Fragment>
  );
}
