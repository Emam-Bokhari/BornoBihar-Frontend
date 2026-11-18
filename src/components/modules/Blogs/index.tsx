"use client";

import Container from "@/components/shared/Container";
import { TBlog } from "@/types";
import { useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import RecentPosts from "./RecentPosts";
import { Loader2 } from "lucide-react";

const ITEMS_PER_BATCH = 5;

export default function AllBlogs({ blogs = [] }: { blogs: TBlog[] }) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const recentPosts = [...(blogs || [])]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    ?.slice(0, 5);

  const displayedBlogs = (blogs || []).slice(0, visibleCount);
  const hasMore = visibleCount < (blogs?.length || 0);

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
    <Container className="my-12">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
        <div className="flex-1 space-y-8">
          {displayedBlogs?.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-base font-medium">No articles available.</p>
            </div>
          ) : (
            displayedBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))
          )}

          {/* Scroll to view sentinel trigger */}
          {hasMore && (
            <div
              ref={observerTarget}
              className="h-10 w-full flex items-center justify-center"
            />
          )}

          {/* Loading indicator */}
          {isLoadingMore && (
            <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin text-[#F65D4E]" />
              <span className="text-sm font-medium">
                Loading more articles...
              </span>
            </div>
          )}

          {/* End of results indicator */}
          {!hasMore && (blogs?.length || 0) > 0 && (
            <div className="text-center py-8 text-xs text-muted-foreground border-t border-dashed border-gray-200 dark:border-zinc-800 mt-8">
              All {blogs?.length} articles loaded
            </div>
          )}
        </div>

        <div className="lg:w-80 shrink-0">
          <div className="sticky top-24">
            <RecentPosts posts={recentPosts} />
          </div>
        </div>
      </div>
    </Container>
  );
}
