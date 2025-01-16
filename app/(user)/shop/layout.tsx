import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { FilterSidebar } from "@/app/components/Shop/FilterSidebar"
import { Header } from "@/app/components/Header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="flex-1">
        <SidebarProvider>
          <div className="flex">
            <FilterSidebar />
            <main className="flex-1">
              <SidebarTrigger />
              {children}
            </main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  )
}
