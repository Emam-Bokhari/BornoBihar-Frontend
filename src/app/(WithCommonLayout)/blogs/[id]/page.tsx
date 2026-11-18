import { Fragment } from "react";
import { TBlog } from "@/types";
import { getBlogById } from "@/services/Blog";
import BlogDetails from "@/components/modules/Blogs/BlogDetails";
import { notFound } from "next/navigation";

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getBlogById(id);
  const blog: TBlog | undefined = res?.data;

  if (!blog) {
    return notFound();
  }

  return (
    <Fragment>
      <BlogDetails blog={blog} />
    </Fragment>
  );
}
