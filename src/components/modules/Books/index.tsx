"use client";
import BookCard from "@/components/modules/Books/BookCard";
import CommonBannerSection from "@/components/shared/CommonBannerSection";
import Container from "@/components/shared/Container";
import { Fragment, useState } from "react";
import SidebarFilter from "./SidebarFilter";
import { TProduct } from "@/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Books({ products }: { products: TProduct[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProducts = products
    ?.filter((product) =>
      [product.title, product.category, product.author].some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    ?.filter((product) =>
      selectedCategories.length === 0
        ? true
        : selectedCategories.includes(product.category)
    )
    ?.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    ?.filter((product) => (isAvailable ? product.quantity > 0 : true))
    ?.sort((a, b) => {
      if (sortOrder === "low-to-high") return a.price - b.price;
      if (sortOrder === "high-to-low") return b.price - a.price;
      return 0;
    });

  //  pagination
  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Fragment>
      <CommonBannerSection title="Book Collection" />
      <Container className="mt-12 ">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {/* Search Bar */}
          <div className="flex items-center border-2 border-[#EBEBEB] rounded-lg w-full">
            <Input
              type="text"
              className="w-full p-2 text-lg border-none outline-none"
              placeholder="Search books by title, category & author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Price Filter */}
          <div className="flex items-center border-2 border-[#EBEBEB] rounded-lg ">
            <Select onValueChange={setSortOrder}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low-to-high">Low to High</SelectItem>
                <SelectItem value="high-to-low">High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Container>

      <Container className=" mt-4  flex gap-4">
        <div className=" hidden lg:block w-64">
          <SidebarFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            setIsAvailable={setIsAvailable}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>

        {/* book grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full">
            {paginatedProducts?.map((product) => (
              <Fragment key={product?._id}>
                {/* Book Card */}
                <BookCard product={product} />
                {/* Row-wise Horizontal Line */}
              </Fragment>
            ))}
          </div>
          {/* pagination actions */}
          <div className="flex justify-end items-center gap-2 mt-[40%]">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              size="sm"
              className="bg-[#F65D4E] hover:bg-[#D84C3F] text-white cursor-pointer"
            >
              Previous
            </Button>
            <span className="text-sm font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              size="sm"
              className="bg-[#F65D4E] hover:bg-[#D84C3F] text-white cursor-pointer"
            >
              Next
            </Button>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}
