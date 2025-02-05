import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { UserSidebar } from "@/app/components/Profile/UserSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <Header />
      <SidebarProvider>
        <UserSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <div className="w-full">
            {children}
          </div>
        </main>
      </SidebarProvider>
      <div className="h-[25dvh] bg-background">
        <Footer />
      </div>
    </div>
  )
}
