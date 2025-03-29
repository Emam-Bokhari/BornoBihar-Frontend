import { Fragment } from "react";
import { TBlog } from "@/types";
import { getBlogById } from "@/services/Blog";
import BlogDetails from "@/components/modules/Blogs/BlogDetails";

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: blog }: { data: TBlog } = await getBlogById(id);

  return (
    <Fragment>
      <BlogDetails blog={blog} />
    </Fragment>
  );
}
