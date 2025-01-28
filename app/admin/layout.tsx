import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "../components/Admin/Home/AdminSidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <div>
      <SidebarProvider>
        <AdminSidebar />
        <div className="w-full">
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
