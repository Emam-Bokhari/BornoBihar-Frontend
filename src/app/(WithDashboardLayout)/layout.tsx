import { AppSidebar } from "@/components/app-sidebar";
import { ProfileMenu } from "@/components/modules/Dashboard/ProfileMenu";
import DynamicBreadcrumb from "@/components/modules/Dashboard/Shared/DynamicBreadcrumb";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getCurrentUser } from "@/services/Auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <SidebarProvider className="bg-zinc-100/70 dark:bg-zinc-950 min-h-screen">
      <AppSidebar variant="inset" user={user} />
      <SidebarInset className="bg-white dark:bg-zinc-900">
        <header className="flex h-16 shrink-0 items-center border-b border-border/70 px-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrumb />
          </div>

          {/* Profile Icon - Right Side */}
          <div className="ml-auto">
            <ProfileMenu />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
