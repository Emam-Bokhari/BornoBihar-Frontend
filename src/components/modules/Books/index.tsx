import BookCard from "@/components/modules/Books/BookCard";
import CommonBannerSection from "@/components/shared/CommonBannerSection";
import Container from "@/components/shared/Container";
import { Fragment } from "react";
import SidebarFilter from "./SidebarFilter";

export default function Books() {
  const totalCards = 12; // Total number of cards
  return (
    <Fragment>
      <CommonBannerSection title="Book Collection" />
      <Container className="mt-12">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {/* Search Bar */}
          <div className="flex items-center border-2 border-[#EBEBEB] rounded-lg w-full">
            <input
              type="text"
              className="w-full p-2 text-lg border-none outline-none"
              placeholder="Search for books..."
            />
          </div>

          {/* Price Filter */}
          <div className="flex items-center border-2 border-[#EBEBEB] rounded-lg min-w-3xs">
            <select className="w-full p-2 text-lg border-none outline-none">
              <option value="">Sort by Price</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </Container>

      <Container className="flex gap-4 mt-4">
        <div className="border-2 border-red-500 hidden lg:block">
          <SidebarFilter />
        </div>

        {/* book grid */}
        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 border-2 border-red-500 w-full">
          {Array.from({ length: totalCards }).map((_, index) => (
            <Fragment key={index}>
              {/* Book Card */}
              <BookCard />
              {/* Row-wise Horizontal Line */}
              {(index + 1) % 4 === 0 && index !== totalCards - 1 && (
                <div className="col-span-4 border-t-2 border-[#EBEBEB] my-2 hidden 2xl:block"></div>
              )}
            </Fragment>
          ))}
        </div>
      </Container>
    </Fragment>
  );
}
