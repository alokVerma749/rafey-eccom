'use client'

import { Product } from "@/types/product_type";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useEffect } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => { 
    const fetchProducts = async () => {
      const response = await fetch('/api/product');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  console.log(products);
  return <div>
    <h1>Products</h1>
    {products.map((product) => (
      <Link href={`/admin/products/${product.id}`} key={product.id}>
        <h2>{product.name}</h2>
        <Image src={product.image} alt={product.name} width={100} height={100} />
        <p>{product.description}</p>
        <p>{product.price}</p>
        <p>{product.stock}</p>
      </Link>
    ))}
  </div>
}
