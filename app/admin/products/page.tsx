'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product_type";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => { 
    const fetchProducts = async () => {
      const response = await fetch('/api/admin/product');
      const data = await response.json();
      setProducts(data.product);
    };
    fetchProducts();
  }, []);

  return <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
    <h1>Products</h1>
    {products.map((product) => (
      <Link href={`/admin/products/${product._id}`} key={product._id}>
        <h2>{product.name}</h2>
        <Image src={product.images.thumbnail} alt={product.name} width={100} height={100} />
        <p>{product.description}</p>
        <p>{product.price}</p>
        <p>{product.stock}</p>
      </Link>
    ))}
  </div>
}
