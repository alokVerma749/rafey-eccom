import { Footer } from "@/app/components/Footer"
import { Header } from "@/app/components/Header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      {children}
      <div className="h-[25dvh] bg-background">
        <Footer />
      </div>
    </div>
  )
}