import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "../components/Admin/Home/AdminSidebar";
'use client'

import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes('admin');

  return (
    <div>
      <SidebarProvider>
        <AdminSidebar />
        <div>
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
