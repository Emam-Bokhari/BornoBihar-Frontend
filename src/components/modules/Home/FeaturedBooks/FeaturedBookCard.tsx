"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/redux/features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { RootState } from "@/redux/store";
import { TProduct } from "@/types";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function FeaturedBookCard({ product }: { product: TProduct }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  // add to wishlist
  const handleAddToWishlist = () => {
    if (!isInWishlist) {
      dispatch(addToWishlist(product));
    }
  };

  // remove wishlist
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
      <div className="border-2 border-[#EBEBEB] p-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          {/* image */}
          <div className="w-full md:w-[160px] h-[120px] relative overflow-hidden rounded-lg ">
            <Image
              src={product?.images[0]}
              alt="Thumbnail Image"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-between w-full ">
            {/* title and author name */}
            <div>
              <h3 className="text-lg font-semibold text-[#100E18]">
                {product?.title}
              </h3>
              <p className="text-[#8a8a8a] text-base">{product?.title}</p>
              <p className="text-[#F65D4E] font-bold text-lg">
                ${product?.price}
              </p>
              <Badge
                className={
                  product?.quantity > 0
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }
              >
                {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            {/* actions */}
            <div className="flex justify-end items-center gap-4 ">
              <button
                onClick={
                  isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist
                }
                className={`text-2xl block cursor-pointer ${
                  isInWishlist ? "text-red-500 cursor-pointer" : ""
                }`}
              >
                {isInWishlist ? (
                  <FaHeart className="w-5 h-5 text-red-500" />
                ) : (
                  <Heart className="w-5 h-5" />
                )}
              </button>
              <Link href={`/books/${product?._id}`} className="block">
                <Button variant="outline" className="cursor-pointer">
                  Details
                </Button>
              </Link>
              <Button
                onClick={handleAddToCart}
                disabled={product?.quantity <= 0}
                className="bg-[#F65D4E] hover:bg-[#D84C3F] cursor-pointer text-white"
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
