import { TBlog } from "@/types";
import Image from "next/image";
import moment from "moment-timezone";
import Link from "next/link";

export default function RecentPosts({ posts }: { posts: TBlog[] }) {
  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Recent Posts</h2>

      {posts?.map((post) => (
        <div key={post._id} className="flex items-start mb-4 ">
          <div className="w-24 h-20 md:w-32 md:h-24 relative mr-4">
            <Image
              src={post.thumbnail}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="flex-1">
            <span className="text-xs text-[#8a8a8a]">
              {moment.utc(post?.createdAt).format("MMMM DD, YYYY")}
            </span>
            <Link href={`/blogs/${post._id}`}>
              <p className="text-sm font-semibold text-[#100E18] hover:text-[#F65D4E] hover:underline cursor-pointer break-words">
                {post?.title?.length > 40
                  ? `${post?.title?.slice(0, 40)}...`
                  : post?.title}
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
