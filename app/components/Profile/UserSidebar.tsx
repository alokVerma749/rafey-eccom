import Link from "next/link"
import { CircleUser, History, MapPinHouse } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Account Details",
    url: "/profile/account",
    icon: CircleUser,
  },
  {
    title: "Order History",
    url: "/profile/order-history",
    icon: History,
  },
  {
    title: "Addresses",
    url: "/profile/address",
    icon: MapPinHouse,
  },
]

export function UserSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Link href="/" className="sm:text-2xl text-xl font-marcellus my-auto text-[#523012] font-semibold sm:py-2">Wonders Tapestry</Link>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} >
                      <item.icon size={24} />
                      <span className="text-base">{item.title}</span>
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
