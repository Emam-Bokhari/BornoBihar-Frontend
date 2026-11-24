import AllBlogs from "@/components/modules/Blogs";
import { getAllBlogs } from "@/services/Blog";
import { TBlog } from "@/types";
import { Fragment } from "react";

export default async function BlogsPage() {
  const res = await getAllBlogs();
  const blogs: TBlog[] = res?.data ?? [];

  return (
    <Fragment>
      <AllBlogs blogs={blogs} />
    </Fragment>
  );
}
