import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import { TBlog } from "@/types";
import moment from "moment-timezone";
import Image from "next/image";
import BlogCard from "./BlogCard";
import Link from "next/link";

export const BlogSection = ({ blogs }: { blogs: TBlog[] }) => {
  return (
    <Container className="my-12">
      <SectionTitle title="Latest Blog Post" viewAllUrl="/blogs" />

      <div className="mt-4  grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
        {/* column 01 */}
        <div className="space-y-4 ">
          {blogs?.slice(0, 3).map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>

        {/* column 02 - Full Width & Height */}
        <div className="col-span-1 hidden xl:flex items-center justify-center">
          <div className="w-full h-full relative overflow-hidden rounded-lg group">
            <Image
              src={blogs[3]?.thumbnail}
              alt="Thumbnail Image"
              fill
              className="object-cover"
            />

            <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300"></div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white text-center w-full px-4">
              <p className="text-base">
                {moment.utc(blogs[3]?.createdAt).format("DD MMMM, YYYY")}
              </p>

              <Link href={`/blogs/${blogs[3]._id}`} className="block">
                <p className="text-3xl font-semibold hover:text-[#F65D4E] cursor-pointer">
                  {blogs[3]?.title}
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* column 03 */}
        <div className="space-y-4">
          {blogs?.slice(4, 7).map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </Container>
  );
};
