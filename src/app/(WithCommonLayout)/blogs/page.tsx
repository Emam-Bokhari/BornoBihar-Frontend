import BlogCard from "@/components/modules/Blogs";
import RecentPosts from "@/components/modules/Blogs/RecentPosts";
import Container from "@/components/shared/Container";

export default function BlogsPage() {
  return (
    <Container className="flex flex-col lg:flex-row gap-12 lg:gap-4 my-12">
      <BlogCard />
      <RecentPosts />
    </Container>
  );
}
