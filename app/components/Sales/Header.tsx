import Link from "next/link"
import { ShoppingCart, Search, Menu } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-3xl font-bold text-[#e25c3c]">
              ArtCraft
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#2a8a9d]">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-[#2a8a9d]">
              Shop
            </Link>
            <Link href="/ceramics" className="text-gray-700 hover:text-[#2a8a9d]">
              Ceramics
            </Link>
            <Link href="/candles" className="text-gray-700 hover:text-[#2a8a9d]">
              Candles
            </Link>
            <Link href="/resin-art" className="text-gray-700 hover:text-[#2a8a9d]">
              Resin Art
            </Link>
            <Link href="/sale" className="text-[#e25c3c] font-semibold hover:text-[#d04c2e]">
              Sale
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#2a8a9d]">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#2a8a9d]">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-[#2a8a9d]">
              <Search className="w-6 h-6" />
            </button>
            <button className="text-gray-700 hover:text-[#2a8a9d] relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-[#e25c3c] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            <button className="md:hidden text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
