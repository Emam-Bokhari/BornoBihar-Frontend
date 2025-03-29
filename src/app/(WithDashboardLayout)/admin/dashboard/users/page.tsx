export const dynamic = "force-dynamic";
import ManageUsers from "@/components/modules/Dashboard/Admin/Users";
import { getAllUsers } from "@/services/User";

export default async function UsersManagementPage() {
  const { data } = await getAllUsers();
  const users = data ?? [];
  return (
    <div className="p-4">
      <ManageUsers users={users} />
    </div>
  );
}
