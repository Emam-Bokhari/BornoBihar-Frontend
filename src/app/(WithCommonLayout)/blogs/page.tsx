import AllBlogs from "@/components/modules/Blogs";
import { getAllBlogs } from "@/services/Blog";
import { TBlog } from "@/types";
import { Fragment } from "react";

export default async function BlogsPage() {
  const { data: blogs }: { data: TBlog[] } = await getAllBlogs();

  return (
    <Fragment>
      <AllBlogs blogs={blogs} />
    </Fragment>
  );
}
