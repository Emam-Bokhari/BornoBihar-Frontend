import { Badge } from "@/components/ui/badge";
import { TBlog } from "@/types";
import moment from "moment-timezone";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default function BlogCard({ blog }: { blog: TBlog }) {
  return (
    <Fragment>
      <div className="rounded-lg overflow-hidden">
        <div className="w-full h-[200px] md:h-[400px] relative overflow-hidden rounded-lg ">
          <Image
            src={blog?.thumbnail}
            alt={`${blog?.title} - thumbnail image`}
            fill
            className="object-cover"
          />
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2 text-sm text-[#8a8a8a]">
            <span>{moment.utc(blog?.createdAt).format("MMMM DD, YYYY")}</span>
            <span>By {blog?.authorName}</span>
          </div>
          <h2 className="text-2xl font-bold text-[#100E18] mb-2">
            {blog?.title}
          </h2>
          <p className="text-[#100E18] mb-4">{blog?.introduction}</p>

          <Link
            href={`/blogs/${blog?._id}`}
            className="text-[#F65D4E] hover:text-[#D84C3F] hover:underline block"
          >
            Read More ›
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
