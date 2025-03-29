import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/services/Auth";
import logo from "@/assets/logo.png";

const data = {
  navMain: [
    {
      title: "Books",
      items: [
        { title: "Order History", url: "/user/dashboard/orders/order-history" },
        {
          title: "Recently Viewed Books",
          url: "/user/dashboard/books/recent-viewed-books",
        },
      ],
    },
  ],
  navUser: [
    {
      title: "Application",
      items: [{ title: "Home", url: "/user/dashboard" }],
    },
    {
      title: "Supports",
      items: [
        { title: "Support/Help", url: "/user/dashboard/supports/add-support" },
      ],
    },
  ],
  adminNav: [
    {
      title: "Application",
      items: [{ title: "Home", url: "/admin/dashboard" }],
    },
    {
      title: "Users",
      items: [{ title: "Users", url: "/admin/dashboard/users" }],
    },
    {
      title: "Products",
      items: [
        { title: "Products", url: "/admin/dashboard/products" },
        { title: "Add Product", url: "/admin/dashboard/products/add-product" },
      ],
    },
    {
      title: "Orders",
      items: [{ title: "Orders", url: "/admin/dashboard/orders" }],
    },
    {
      title: "Blogs",
      items: [
        { title: "Blogs", url: "/admin/dashboard/blogs" },
        { title: "Add Blog", url: "/admin/dashboard/blogs/add-blog" },
      ],
    },
    {
      title: "Contacts",
      items: [
        { title: "Contacts", url: "/admin/dashboard/contacts" },
        {
          title: "Newsletters",
          url: "/admin/dashboard/newsletters",
        },
      ],
    },
    {
      title: "Supports",
      items: [{ title: "Supports", url: "/admin/dashboard/supports" }],
    },
  ],
};

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = await getCurrentUser();
  const isAdmin = user?.role === "admin";
  const sidebarData = [
    ...(isAdmin
      ? [
          data.adminNav.find((section) => section.title === "Application"),
          ...data.navMain,
          ...data.adminNav.filter(
            (section) =>
              section.title !== "Application" && section.title !== "Supports"
          ),
          data.adminNav.find((section) => section.title === "Supports"),
        ]
      : [
          ...data.navUser.filter((section) => section.title !== "Supports"),
          ...data.navMain,
          data.navUser.find((section) => section.title === "Supports"),
        ]),
  ].filter(Boolean);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image src={logo} width={35} height={35} alt="logo" />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">ReSellBD</span>
                  <span>New Deals, Endless Possibilities</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarData.map((item) => {
              if (!item) return null;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
