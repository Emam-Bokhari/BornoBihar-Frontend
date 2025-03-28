import Image from "next/image";
import saleOfBanner from "@/assets/saleOff.png";
import Link from "next/link";

export default function NovelDiscountBanner() {
  return (
    <div className="bg-[#D89600] p-6 rounded-xl flex items-center gap-6   text-white w-full group">
      <div className="relative w-1/2">
        <Image
          src={saleOfBanner}
          alt="Novel Book"
          width={300}
          height={300}
          className="rounded-lg transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="w-1/2">
        <p className="text-sm font-bold">NOVELS EVERY DAY!</p>
        <h2 className="text-4xl font-bold mt-1">Sale 10% Off</h2>
        <p className="text-lg mt-2">It all begins with a great book!</p>
        <Link href="/books" className="block">
          <button className="mt-4 bg-white hover:bg-gray-100 cursor-pointer text-black font-bold py-2 px-4 rounded-full flex items-center gap-2">
            Shop Now <span className="text-red-500">→</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
