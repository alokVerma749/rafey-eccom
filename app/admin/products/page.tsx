'use client'

import { useState, useEffect } from "react";
import ProductCard from "@/app/components/Admin/Products/ProductCard";
import { Product } from "@/types/product_type";
import Loader from "@/app/components/Loader";
import { Button } from "@/components/ui/button"
import {BadgePlus} from 'lucide-react'
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loader state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch('/api/admin/product');
        const data = await response.json();
        setProducts(data.product);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full m-4">
      <div className="flex flex-col sm:flex-row justify-between items-center my-2">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold p-2">All Products</h1>
        <Link href={`/admin/list_product`}><Button className="flex justify-start items-center" ><BadgePlus/>ADD NEW PRODUCT</Button></Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
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
