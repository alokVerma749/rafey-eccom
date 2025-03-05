'use client';

import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/app/components/Sales/product-grid";
import { Product } from '@/types/product_type';

export const FeaturedProducts = ({ products }: { products: Product[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      {products.length > 0 && <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#2a8a9d] mb-2">Featured Deals</h2>
          <div className="w-24 h-1 bg-[#e25c3c] mx-auto mb-6"></div>
          <p className="text-center text-gray-600 mb-12">
            Our most popular items now available at incredible prices. Limited stock available!
          </p>

          <div className="flex overflow-x-auto gap-4 pb-4 mb-8">
            <Button
              className={`rounded-md whitespace-nowrap ${selectedCategory === "all" ? "bg-[#e25c3c] text-white hover:bg-[#d04c2e]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              onClick={() => setSelectedCategory("all")}
            >
              All Products
            </Button>
            <Button
              className={`rounded-md whitespace-nowrap ${selectedCategory === "candles" ? "bg-[#e25c3c] text-white hover:bg-[#d04c2e]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              onClick={() => setSelectedCategory("candles")}
            >
              Candles
            </Button>
            <Button
              className={`rounded-md whitespace-nowrap ${selectedCategory === "ceramic art" ? "bg-[#e25c3c] text-white hover:bg-[#d04c2e]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              onClick={() => setSelectedCategory("ceramic art")}
            >
              Ceramic Arts
            </Button>
            <Button
              className={`rounded-md whitespace-nowrap ${selectedCategory === "resin art" ? "bg-[#e25c3c] text-white hover:bg-[#d04c2e]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              onClick={() => setSelectedCategory("resin art")}
            >
              Resin Arts
            </Button>
          </div>

          <ProductGrid products={filteredProducts} />
        </div>
      </section>}
    </>
  )
}

