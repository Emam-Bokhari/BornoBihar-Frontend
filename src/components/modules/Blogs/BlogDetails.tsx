"use client";

import Container from "@/components/shared/Container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TBlog } from "@/types";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import moment from "moment-timezone";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const badgeColors = [
  { base: "bg-blue-50 text-blue-700 border-blue-200", hover: "hover:bg-blue-100" },
  { base: "bg-emerald-50 text-emerald-700 border-emerald-200", hover: "hover:bg-emerald-100" },
  { base: "bg-amber-50 text-amber-700 border-amber-200", hover: "hover:bg-amber-100" },
  { base: "bg-purple-50 text-purple-700 border-purple-200", hover: "hover:bg-purple-100" },
  { base: "bg-rose-50 text-rose-700 border-rose-200", hover: "hover:bg-rose-100" },
  { base: "bg-indigo-50 text-indigo-700 border-indigo-200", hover: "hover:bg-indigo-100" },
  { base: "bg-teal-50 text-teal-700 border-teal-200", hover: "hover:bg-teal-100" },
];

export default function BlogDetails({ blog }: { blog: TBlog }) {
  return (
    <Fragment>
      <Container className="my-8 sm:my-12 max-w-4xl">
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-[#F65D4E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
        </div>

        {/* Category & Title */}
        <div className="space-y-3 mb-6">
          {blog?.category && (
            <span className="inline-block bg-[#F65D4E]/10 text-[#F65D4E] font-medium text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              {blog.category}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight">
            {blog?.title}
          </h1>
        </div>

        {/* Author info and publication date */}
        <div className="flex flex-wrap items-center gap-6 py-4 border-y border-border/60 text-sm text-muted-foreground mb-8">
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9 border border-border">
              <AvatarImage
                src="https://res.cloudinary.com/dvpqm6zct/image/upload/v1742736505/user_ug5gxm.png"
                alt={blog?.authorName || "Author"}
              />
              <AvatarFallback className="text-xs bg-[#F65D4E]/10 text-[#F65D4E] font-semibold">
                {blog?.authorName ? blog.authorName.slice(0, 2).toUpperCase() : <User className="w-4 h-4" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">Written by</p>
              <p className="font-medium text-foreground">{blog?.authorName || "Editorial Team"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-border/60">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>
              {blog?.createdAt
                ? moment.utc(blog.createdAt).format("DD MMMM, YYYY")
                : "Recent"}
            </span>
          </div>
        </div>

        {/* Thumbnail Image */}
        {blog?.thumbnail ? (
          <div className="relative w-full h-[260px] sm:h-[360px] md:h-[450px] rounded-2xl overflow-hidden mb-8 shadow-sm border border-border/60 bg-muted">
            <Image
              src={blog.thumbnail}
              alt={`${blog?.title || "Blog"} - thumbnail image`}
              fill
              priority
              className="object-cover"
            />
          </div>
        ) : null}

        {/* Article Body */}
        <article className="space-y-6">
          {/* Introduction Callout */}
          {blog?.introduction && (
            <div className="p-4 sm:p-5 rounded-xl bg-muted/40 border-l-4 border-[#F65D4E] text-base sm:text-lg text-foreground/90 font-medium leading-relaxed italic">
              {blog.introduction}
            </div>
          )}

          {/* Main content */}
          {blog?.mainContent && (
            <div className="text-base sm:text-lg text-foreground/80 leading-relaxed sm:leading-8 whitespace-pre-line space-y-4 pt-2">
              {blog.mainContent}
            </div>
          )}

          {/* Tags */}
          {blog?.tags && blog.tags.length > 0 && (
            <div className="pt-8 mt-8 border-t border-border/60">
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-foreground">
                <Tag className="w-4 h-4 text-[#F65D4E]" /> Tags:
              </div>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => {
                  const color = badgeColors[index % badgeColors.length];
                  return (
                    <Badge
                      key={index}
                      variant="outline"
                      className={`${color.base} ${color.hover} border px-3 py-1 rounded-md text-xs font-medium transition-colors`}
                    >
                      #{tag}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </article>
      </Container>
    </Fragment>
  );
}
