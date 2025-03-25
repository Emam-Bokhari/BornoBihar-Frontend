import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Fragment } from "react";
import { MdFavoriteBorder } from "react-icons/md";

export default function FeaturedBookCard() {
  return (
    <Fragment>
      <div className="border-2 border-[#EBEBEB] p-4 rounded-lg">
        <div className="flex gap-4">
          {/* image */}
          <div className="w-[120px] h-[120px] relative overflow-hidden rounded-lg ">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktoNpsu4s9DMHTtXkuuItwSp2ArmLW4YjdA&s"
              alt="Thumbnail Image"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-between">
            {/* title and author name */}
            <div>
              <h3 className="text-lg font-semibold text-[#100E18]">
                Lorem ipsum dolor sit amet.
              </h3>
              <p className="text-[#8a8a8a] text-base">Moshfiqur Rahman</p>
              <p className="text-[#F65D4E] font-bold text-base">$120</p>
            </div>
            {/* actions */}
            <div className="flex items-center gap-4">
              <span className="text-2xl block">
                <MdFavoriteBorder />
              </span>
              <Button variant="outline" className="cursor-pointer">
                Details
              </Button>
              <Button className="bg-[#F65D4E] hover:bg-[#D84C3F] cursor-pointer text-white">
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
