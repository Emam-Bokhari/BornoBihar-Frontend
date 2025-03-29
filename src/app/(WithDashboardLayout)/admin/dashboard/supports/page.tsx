export const dynamic = "force-dynamic";
import ManageSupports from "@/components/modules/Dashboard/Admin/Supports";
import { getAllSupports } from "@/services/Support";

export default async function SupportManagementPage() {
  const { data } = await getAllSupports();
  const supports = data ?? [];

  return (
    <div className="p-4">
      <ManageSupports supports={supports} />
    </div>
  );
}
