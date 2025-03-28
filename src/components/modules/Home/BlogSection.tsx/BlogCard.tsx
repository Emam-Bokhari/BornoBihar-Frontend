import { TBlog } from "@/types";
import moment from "moment-timezone";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ blog }: { blog: TBlog }) {
  return (
    <Link href={`/blogs/${blog._id}`} className="block group">
      <div
        key={blog._id}
        className="flex flex-col lg:flex-row gap-4 lg:items-center"
      >
        {/* Image */}
        <div className="w-full h-[200px] md:h-[250px] lg:w-[190px]  lg:h-[130px] relative overflow-hidden rounded-lg">
          <Image
            src={blog?.thumbnail}
            alt="Thumbnail Image"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="space-y-2 flex-1 sm:flex-1">
          <p className="text-[#8a8a8a] text-base">
            {moment.utc(blog?.createdAt).format("DD MMMM, YYYY")}
          </p>

          <p className="text-lg font-semibold text-[#100E18] group-hover:text-[#F65D4E] cursor-pointer">
            {blog?.title?.length > 40
              ? `${blog?.title?.slice(0, 40)}...`
              : blog?.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
