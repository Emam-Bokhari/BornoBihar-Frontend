import Container from "@/components/shared/Container";
import { TBlog } from "@/types";
import BlogCard from "./BlogCard";
import RecentPosts from "./RecentPosts";

export default function AllBlogs({ blogs }: { blogs: TBlog[] }) {
  const recentPosts = [...blogs]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    ?.slice(0, 5);
  return (
    <Container className=" my-12">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-4">
        <div className="flex-1 space-y-4">
          {blogs?.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>

        <div>
          <RecentPosts posts={recentPosts} />
        </div>
      </div>
    </Container>
  );
}
