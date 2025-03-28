import ManageBlogs from "@/components/modules/Dashboard/Admin/Blogs";
import { getAllBlogs } from "@/services/Blog";

export const dynamic = "force-dynamic";

export default async function BlogsManagementPage() {
  const { data } = await getAllBlogs();
  const blogs = data ?? [];

  return (
    <div className="p-4">
      <ManageBlogs blogs={blogs} />
    </div>
  );
}
