export const dynamic = "force-dynamic";

import ManageContacts from "@/components/modules/Dashboard/Admin/Contacts";
import { getAllContacts } from "@/services/Contact";

export default async function ContactManagementPage() {
  const { data } = await getAllContacts();
  const contacts = data ?? [];

  return (
    <div className="p-4">
      <ManageContacts contacts={contacts} />
    </div>
  );
}
