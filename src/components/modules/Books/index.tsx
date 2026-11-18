"use client";
import BookCard from "@/components/modules/Books/BookCard";
import CommonBannerSection from "@/components/shared/CommonBannerSection";
import Container from "@/components/shared/Container";
import { Fragment, useEffect, useRef, useState } from "react";
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
import { Loader2 } from "lucide-react";

const ITEMS_PER_BATCH = 12;

export default function Books({ products = [] }: { products: TProduct[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  // Reset pagination when any filter changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_BATCH);
  }, [searchTerm, sortOrder, selectedCategories, isAvailable, priceRange]);

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

  const displayedProducts = filteredProducts?.slice(0, visibleCount);
  const hasMore = visibleCount < (filteredProducts?.length || 0);

  // Scroll to view (Infinite scroll) observer
  useEffect(() => {
    const target = observerTarget.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loadingRef.current) {
          loadingRef.current = true;
          setIsLoadingMore(true);

          setTimeout(() => {
            setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
            setIsLoadingMore(false);
            loadingRef.current = false;
          }, 350);
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, visibleCount]);

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
          {/* Items count summary */}
          <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing{" "}
              <strong className="text-foreground">
                {displayedProducts?.length || 0}
              </strong>{" "}
              of{" "}
              <strong className="text-foreground">
                {filteredProducts?.length || 0}
              </strong>{" "}
              books
            </span>
          </div>

          {displayedProducts?.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-base font-medium">
                No books found matching your criteria.
              </p>
              <p className="text-xs mt-1">
                Try adjusting your filters or search term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full">
              {displayedProducts?.map((product) => (
                <Fragment key={product?._id}>
                  <BookCard product={product} />
                </Fragment>
              ))}
            </div>
          )}

          {/* Scroll to view sentinel trigger */}
          {hasMore && (
            <div
              ref={observerTarget}
              className="h-10 w-full flex items-center justify-center mt-6"
            />
          )}

          {/* Loading indicator when fetching more */}
          {isLoadingMore && (
            <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin text-[#F65D4E]" />
              <span className="text-sm font-medium">Loading more books...</span>
            </div>
          )}

          {/* End of collection indicator */}
          {!hasMore && (filteredProducts?.length || 0) > 0 && (
            <div className="text-center py-8 text-xs text-muted-foreground border-t border-dashed border-gray-200 dark:border-zinc-800 mt-8">
              All {filteredProducts?.length} books loaded
            </div>
          )}
        </div>
      </Container>
    </Fragment>
  );
}
