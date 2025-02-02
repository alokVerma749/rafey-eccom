"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { LayoutDashboard, PackageSearch, ListOrdered, Shapes, SquareStackIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

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
    title: "Category",
    url: "/admin/categories",
    icon: Shapes,
  },
];

export function AdminSidebar() {
  const pathname = usePathname(); 

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl text-black font-bellefair my-4">Wonders Tapestry</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url; // Check if current path matches the menu item

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
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
