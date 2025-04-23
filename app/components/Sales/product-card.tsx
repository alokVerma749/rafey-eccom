import Image from "next/image"
import { Heart } from "lucide-react"
import type { Product } from "@/types/product_type"
import { AddToCartSales } from "./CartButton"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.discount?.percentage || 0;
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative group flex flex-col justify-between">
      <Link href={`/product/${product._id}`}>
        {product.discount && (
          <div className="absolute top-3 left-3 bg-[#e25c3c] text-white font-bold px-2 py-1 rounded-md z-10">
            SAVE {product.discount.percentage}%
          </div>
        )}

        {product.isBestSeller && (
          <div className="absolute top-3 right-3 bg-[#2a8a9d] text-white font-bold px-2 py-1 rounded-md z-10">
            BEST SELLER
          </div>
        )}

        {product.isCustomizable && (
          <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <Heart className="w-5 h-5 text-gray-600 hover:text-[#e25c3c]" />
          </button>
        )}

        <div className="relative">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover"
          />
          {product.stock && product.stock < 20 && (
            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-70 text-white text-center py-1 text-sm">
              {product.stock < 6 ? (
                <span>Almost sold out! Only {product.stock} left</span>
              ) : (
                <span>
                  {product.stock < 13 ? "Selling fast!" : "Popular item!"} Only {product.stock} left
                </span>
              )}
            </div>
          )}
        </div>

        <div className="p-4 flex-grow">
          <h3 className="text-lg font-bold mb-1 truncate">{product.name}</h3>

          <div className="flex items-baseline gap-2 mb-2">
          <span className="text-xl font-bold text-[#e25c3c]">₹{Math.round(product.price - (product.price * discountPercentage) / 100)}</span>
          <span className="text-gray-500 line-through">₹{product.price}</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        </div>
      </Link>

      <div className="p-4">
        <AddToCartSales product={product} />
      </div>
    </div>
  )
}
