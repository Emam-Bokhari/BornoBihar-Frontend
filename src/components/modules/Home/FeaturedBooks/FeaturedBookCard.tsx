import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { MdFavoriteBorder } from "react-icons/md";

export default function FeaturedBookCard({ product }: { product: TProduct }) {
  console.log(product);
  return (
    <Fragment>
      <div className="border-2 border-[#EBEBEB] p-4 rounded-lg">
        <div className="flex gap-4">
          {/* image */}
          <div className="w-[160px] h-[120px] relative overflow-hidden rounded-lg ">
            <Image
              src={product?.images[0]}
              alt="Thumbnail Image"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-between w-full">
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
              <span className="text-2xl block">
                <MdFavoriteBorder />
              </span>
              <Link href={`/books/${product?._id}`} className="block">
                <Button variant="outline" className="cursor-pointer">
                  Details
                </Button>
              </Link>
              <Button
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
