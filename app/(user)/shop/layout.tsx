import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {FilterSidebar} from "@/app/components/Shop/FilterSidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <FilterSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
