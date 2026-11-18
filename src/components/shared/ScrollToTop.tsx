"use client";

import React, { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Check if current page is one of the 3 target pages: Home (/), Books (/books), or Blogs (/blogs)
  const isTargetPage = useMemo(() => {
    if (!pathname) return false;
    return (
      pathname === "/" ||
      pathname === "/books" ||
      pathname.startsWith("/books/") ||
      pathname === "/blogs" ||
      pathname.startsWith("/blogs/")
    );
  }, [pathname]);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Show button when scrolled down more than 320px
      if (scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll progress percentage (0 - 100)
      if (totalHeight > 0) {
        const progress = Math.min(
          100,
          Math.max(0, (scrollY / totalHeight) * 100)
        );
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!mounted || !isTargetPage) {
    return null;
  }

  // Circular progress ring calculations
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 transition-all duration-300 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-6 scale-75 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        type="button"
        title="Scroll to top"
        aria-label="Scroll to top"
        className="relative w-12 h-12 rounded-full bg-[#F65D4E] hover:bg-[#D84C3F] text-white shadow-lg shadow-[#F65D4E]/35 hover:shadow-xl hover:shadow-[#F65D4E]/45 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F65D4E] focus-visible:ring-offset-2"
      >
        {/* Progress Circle Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 48 48"
        >
          {/* Subtle track ring */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-white/25 fill-transparent"
            strokeWidth="2.5"
          />
          {/* Active progress ring */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-white fill-transparent transition-[stroke-dashoffset] duration-150 ease-linear"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Upward Chevron Icon with micro-animation */}
        <ChevronUp className="w-5 h-5 stroke-[2.5] text-white transition-transform duration-200 group-hover:-translate-y-1 relative z-10" />
      </button>
    </div>
  );
}
