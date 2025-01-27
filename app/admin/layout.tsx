import { Footer } from "../components/Footer";
import { getSession } from "@/utils/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "../components/Admin/Home/AdminSidebar";

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession()
  console.log(session)
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
