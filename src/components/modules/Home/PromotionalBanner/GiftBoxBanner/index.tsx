import Image from "next/image";
import giftBoxBanner from "@/assets/gift-box-banner.png";

export default function GiftBoxBanner() {
  return (
    <div className="bg-[#7D4ED2] p-6 rounded-xl flex items-center gap-6   text-white group w-full">
      <div className="relative w-1/2">
        <Image
          src={giftBoxBanner}
          alt="Gift Box"
          width={300}
          height={300}
          className="rounded-lg transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-6 left-6 bg-pink-500 text-white font-bold text-lg rounded-full p-4 flex flex-col items-center justify-center w-20 h-20">
          <span className="text-sm">Sale</span>
          <span className="text-2xl">20%</span>
        </div>
      </div>
      <div className="w-1/2">
        <h2 className="text-4xl font-bold">
          Books Make
          <br />
          Great Gifts
        </h2>
        <p className="text-lg mt-2">
          Consider the timeless gift of a book— <br />a thoughtful way to
          inspire and connect with family & friends.
        </p>
      </div>
    </div>
  );
}
