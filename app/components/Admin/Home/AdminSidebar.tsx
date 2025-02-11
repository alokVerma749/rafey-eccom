"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { LayoutDashboard, PackageSearch, ListOrdered, SquareStackIcon, Ticket } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "List Product",
    url: "/admin/list_product",
    icon: SquareStackIcon,
  },
  {
    title: "All Product",
    url: "/admin/products",
    icon: PackageSearch,
  },
  {
    title: "Order List",
    url: "/admin/orders",
    icon: ListOrdered,
  },
  {
    title: "Vouchers",
    url: "/admin/voucher",
    icon: Ticket,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="font-bellefair">
            <Link href="/" className="sm:text-2xl text-xl font-bellefair my-auto text-[#523012] font-semibold sm:py-4">Wonders Tapestry</Link>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 p-2 rounded-lg ${isActive ? "text-indigo-600 bg-gray-100" : "hover:bg-gray-200"}`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-lg">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
