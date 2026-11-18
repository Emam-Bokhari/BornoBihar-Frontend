import UpdateBlogForm from "@/components/modules/Dashboard/Admin/Blogs/UpdateBlog";
import { getBlogById } from "@/services/Blog";
import { notFound } from "next/navigation";
import { Fragment } from "react";

export default async function UpdateBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getBlogById(id);
  const blog = res?.data;

  if (!blog) {
    return notFound();
  }

  return (
    <Fragment>
      <UpdateBlogForm blog={blog} />
    </Fragment>
  );
}
