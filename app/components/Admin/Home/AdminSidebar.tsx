import Link from "next/link"
import { LayoutDashboard, PackageSearch, ListOrdered, Shapes, SquareStackIcon } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

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
    title: "All Praduct",
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
]

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl text-black font-bellefair my-4">Wonders Tapestry</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
