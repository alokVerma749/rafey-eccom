import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "../components/Admin/Home/AdminSidebar";
import { AdminHeader } from "../components/Admin/AdminHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <div>
      <AdminHeader />
      <SidebarProvider>
        <AdminSidebar />
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </div>
  );
}
