"use client";
import CommonBannerSection from "@/components/shared/CommonBannerSection";
import { Fragment } from "react";
import BookCard from "../Books/BookCard";
import Container from "@/components/shared/Container";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Wishlist() {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  return (
    <Fragment>
      <CommonBannerSection title="Your Personalized Wishlist" />
      <Container className="my-12">
        {/* empty wishlist message */}
        {wishlistItems.length === 0 && (
          <p className="text-center w-full  ">
            Your wishlist is currently empty. Start adding your favorite items
            today!
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {wishlistItems?.map((product) => (
            <BookCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </Fragment>
  );
}
