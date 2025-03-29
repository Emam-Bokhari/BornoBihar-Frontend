import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getCurrentUser } from "@/services/Auth";
import { ReactNode } from "react";

export default async function CommonLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <div>
      <Navbar user={user} />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}
