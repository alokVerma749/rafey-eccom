import { Header } from "@/app/components/Header"
import { Footer } from "@/app/components/Footer"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
      <div className="h-[25dvh] bg-background">
        <Footer />
      </div>
    </div>
  )
}

