"use client";
import Image from "next/image";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import React, { Fragment } from "react";
import { TProduct } from "@/types";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { FaHeart } from "react-icons/fa6";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";

const BookCard = ({ product }: { product: TProduct }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  // add to wishlist
  const handleAddToWishlist = () => {
    if (!isInWishlist) {
      dispatch(addToWishlist(product));
    }
  };

  // remove from  wishlist
  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(product._id));
  };

  // add to cart
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product added to your cart!");
  };

  return (
    <Fragment>
      {/* Book Card */}
      <div className="border-2 border-[#EBEBEB] p-4 relative group  rounded-lg">
        {/* image */}
        <div className="h-[280px] relative overflow-hidden rounded-lg">
          <Image
            src={product?.images[0]}
            alt="Thumbnail Image"
            fill
            className="object-cover rounded-lg"
          />
          {/* Hover Icons */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={
                isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist
              }
              className={`bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition cursor-pointer${
                isInWishlist ? "text-red-500 cursor-pointer" : ""
              }`}
            >
              {isInWishlist ? (
                <FaHeart className="w-5 h-5 text-red-500" />
              ) : (
                <Heart className="w-5 h-5" />
              )}
            </button>
            <Link href={`/books/${product?._id}`}>
              <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition cursor-pointer">
                <Eye className="w-5 h-5 text-blue-500" />
              </button>
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={product?.quantity <= 0}
              className="bg-white p-2 rounded-full shadow-md transition cursor-pointer 
    hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              title={product?.quantity <= 0 ? "Out of Stock" : ""}
            >
              <ShoppingCart className="w-5 h-5 text-green-500" />
            </button>
          </div>
        </div>
        {/* text */}
        <div className=" mt-2">
          <h3 className="text-lg font-semibold text-[#100E18]">
            {product?.title?.length > 36
              ? `${product.title.slice(0, 36)}...`
              : product.title}
          </h3>
          <p className="text-[#8a8a8a] text-base">
            {product?.author?.length > 30
              ? `${product.title.slice(0, 30)}...`
              : product.author}
          </p>
          <p className="text-[#F65D4E] font-bold text-xl">${product?.price}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default BookCard;
