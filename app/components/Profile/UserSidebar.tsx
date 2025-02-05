import Link from "next/link"
import { CircleUser, History, MapPinHouse, MessageCircleQuestion } from "lucide-react"

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

// Menu items.
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
  {
    title: "Support",
    url: "/profile/support",
    icon: MessageCircleQuestion,
  },
]

export function UserSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
        <Link href="/" className="sm:text-2xl text-xl font-bellefair my-auto text-[#523012] font-semibold sm:py-2">Wonders Tapestry</Link>
        <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <h1 className="text-base md:text-lg font-semibold my-4">MY ACCOUNT</h1>
            <div className="mb-10">
              Welcome, <span className="font-semibold text-base">Sachin Chauhan</span>
            </div>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} >
                      <item.icon size={24}/>
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
