export const dynamic = "force-dynamic";
import ManageNewsletters from "@/components/modules/Dashboard/Admin/Newsletters";
import { getAllNewsletters } from "@/services/Newsletter";

export default async function NewslettersManagementPage() {
  const { data } = await getAllNewsletters();
  const newsletters = data ?? [];

  return (
    <div className="p-4">
      <ManageNewsletters newsletters={newsletters} />
    </div>
  );
}
