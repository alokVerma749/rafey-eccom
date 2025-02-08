'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import {BadgePlus} from 'lucide-react'
import ProductCard from "@/app/components/Admin/Products/ProductCard";
import { Product } from "@/types/product_type";
import Loader from "@/app/components/Loader";
import { Button } from "@/components/ui/button"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/admin/product');
        const data = await response.json();
        setProducts(data.product);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full mx-10 my-6">
      <div className="flex flex-col sm:flex-row justify-between items-center my-2">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">All Products</h1>
        <Link href={`/admin/list_product`}><Button className="flex justify-start items-center text-sm px-1 sm:px-4" ><BadgePlus/>ADD NEW PRODUCT</Button></Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <Loader />
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-xl font-semibold">No items registered</p>
        </div>
      ) : (
        <ProductCard products={products} />
      )}
    </div>
  );
}
