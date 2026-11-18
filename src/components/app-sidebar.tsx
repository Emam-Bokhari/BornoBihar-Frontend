"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Home,
  History,
  BookOpen,
  Users,
  Package,
  PlusCircle,
  ClipboardList,
  FileText,
  PenSquare,
  Mail,
  Send,
  HelpCircle,
  ChevronsUpDown,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const data = {
  navMain: [
    {
      title: "Books",
      items: [
        {
          title: "Order History",
          url: "/user/dashboard/orders/order-history",
          icon: History,
        },
        {
          title: "Recently Viewed Books",
          url: "/user/dashboard/books/recent-viewed-books",
          icon: BookOpen,
        },
      ],
    },
  ],
  navUser: [
    {
      title: "Application",
      items: [{ title: "Home", url: "/user/dashboard", icon: Home }],
    },
    {
      title: "Supports",
      items: [
        {
          title: "Support/Help",
          url: "/user/dashboard/supports/add-support",
          icon: HelpCircle,
        },
      ],
    },
  ],
  adminNav: [
    {
      title: "Application",
      items: [{ title: "Home", url: "/admin/dashboard", icon: Home }],
    },
    {
      title: "Users",
      items: [{ title: "Users", url: "/admin/dashboard/users", icon: Users }],
    },
    {
      title: "Products",
      items: [
        { title: "Products", url: "/admin/dashboard/products", icon: Package },
        {
          title: "Add Product",
          url: "/admin/dashboard/products/add-product",
          icon: PlusCircle,
        },
      ],
    },
    {
      title: "Orders",
      items: [{ title: "Orders", url: "/admin/dashboard/orders", icon: ClipboardList }],
    },
    {
      title: "Blogs",
      items: [
        { title: "Blogs", url: "/admin/dashboard/blogs", icon: FileText },
        {
          title: "Add Blog",
          url: "/admin/dashboard/blogs/add-blog",
          icon: PenSquare,
        },
      ],
    },
    {
      title: "Contacts",
      items: [
        { title: "Contacts", url: "/admin/dashboard/contacts", icon: Mail },
        {
          title: "Newsletters",
          url: "/admin/dashboard/newsletters",
          icon: Send,
        },
      ],
    },
    {
      title: "Supports",
      items: [{ title: "Supports", url: "/admin/dashboard/supports", icon: HelpCircle }],
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: {
    role?: string;
    [key: string]: unknown;
  } | null;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const isAdmin = user?.role === "admin" || pathname?.startsWith("/admin");

  const sidebarData = React.useMemo(() => {
    if (isAdmin) {
      return [
        data.adminNav.find((section) => section.title === "Application"),
        ...data.navMain,
        ...data.adminNav.filter(
          (section) =>
            section.title !== "Application" && section.title !== "Supports"
        ),
        data.adminNav.find((section) => section.title === "Supports"),
      ].filter(Boolean) as {
        title: string;
        items: {
          title: string;
          url: string;
          icon: React.ComponentType<{ className?: string }>;
        }[];
      }[];
    }

    return [
      ...data.navUser.filter((section) => section.title !== "Supports"),
      ...data.navMain,
      data.navUser.find((section) => section.title === "Supports"),
    ].filter(Boolean) as {
      title: string;
      items: {
        title: string;
        url: string;
        icon: React.ComponentType<{ className?: string }>;
      }[];
    }[];
  }, [isAdmin]);

  const isItemActive = (url: string) => {
    if (!pathname) return false;
    if (url === "/admin/dashboard" || url === "/user/dashboard") {
      return pathname === url;
    }
    return pathname === url || pathname.startsWith(url + "/");
  };

  return (
    <Sidebar {...props}>
      {/* Brand Header */}
      <SidebarHeader className="p-3 pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="h-auto p-2 rounded-xl hover:bg-zinc-100/70 dark:hover:bg-zinc-800/60 transition-colors group cursor-pointer"
            >
              <Link href="/" className="flex items-center gap-2.5 w-full">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/70 dark:border-zinc-700/70 p-1">
                  <Image
                    src={logo}
                    width={28}
                    height={28}
                    alt="logo"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col min-w-0 flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                    ReSellBD
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                    New Deals, Endless Possibilities
                  </span>
                </div>
                <ChevronsUpDown className="size-4 text-zinc-400 shrink-0 ml-auto group-data-[collapsible=icon]:hidden" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation Sections */}
      <SidebarContent className="px-3 py-2 gap-4 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-200 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-800">
        {sidebarData.map((section) => {
          if (!section || !section.items?.length) return null;

          return (
            <SidebarGroup key={section.title} className="p-0">
              <SidebarGroupLabel className="px-3 pb-1 text-[11px] font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase select-none h-auto group-data-[collapsible=icon]:hidden">
                {section.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  {section.items.map((item) => {
                    const active = isItemActive(item.url);
                    const Icon = item.icon;

                    return (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton
                          asChild
                          isActive={active}
                          tooltip={item.title}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 h-9 rounded-xl text-sm font-medium transition-all duration-150 group cursor-pointer",
                            active
                              ? "bg-zinc-100 text-zinc-900 font-semibold shadow-xs dark:bg-zinc-800 dark:text-zinc-50"
                              : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/60"
                          )}
                        >
                          <Link
                            href={item.url}
                            className="flex items-center gap-3 w-full"
                          >
                            <Icon
                              className={cn(
                                "size-[18px] shrink-0 stroke-[1.8] transition-colors",
                                active
                                  ? "text-zinc-900 dark:text-zinc-50"
                                  : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
                              )}
                            />
                            <span className="truncate group-data-[collapsible=icon]:hidden">
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
