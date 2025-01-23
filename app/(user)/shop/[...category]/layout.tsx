import ShopFilter from "@/app/components/shop/ShopFilter"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 space-y-6 flex flex-col">
      <ShopFilter/>
      <div>

      {children}
      </div>
    </div>
  )
}