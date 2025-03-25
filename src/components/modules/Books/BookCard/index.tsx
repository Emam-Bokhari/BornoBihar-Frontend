import Image from "next/image";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import React, { Fragment } from "react";

const BookCard = () => {
  return (
    <Fragment>
      {/* Book Card */}
      <div className="border-2 border-[#EBEBEB] p-4 relative group  rounded-lg">
        {/* image */}
        <div className="h-[280px] relative overflow-hidden rounded-lg">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktoNpsu4s9DMHTtXkuuItwSp2ArmLW4YjdA&s"
            alt="Thumbnail Image"
            fill
            className="object-cover rounded-lg"
          />
          {/* Hover Icons */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
              <Heart className="w-5 h-5 text-red-500" />
            </button>
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
              <Eye className="w-5 h-5 text-blue-500" />
            </button>
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
              <ShoppingCart className="w-5 h-5 text-green-500" />
            </button>
          </div>
        </div>
        {/* text */}
        <div className=" mt-2">
          <h3 className="text-lg font-semibold text-[#100E18]">
            Lorem ipsum dolor sit amet.
          </h3>
          <p className="text-[#8a8a8a] text-base">Moshfiqur Rahman</p>
          <p className="text-[#F65D4E] font-bold text-xl">$120</p>
        </div>
      </div>
    </Fragment>
  );
};

export default BookCard;
