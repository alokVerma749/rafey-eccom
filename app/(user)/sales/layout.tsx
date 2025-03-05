import { Header } from "@/app/components/Header"
import { Footer } from "@/app/components/Sales/Footer"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-marcellus">
      <Header />
      <main className="w-full">
        {children}
        <Footer />
      </main>
    </div>
  )
}
