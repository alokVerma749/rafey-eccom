'use client'

import { Product } from "@/types/product_type";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { product_id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/product/${product_id}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, []);


  return <div>
    <h1>Product {product_id}</h1>
    <p>{product?.name}</p>
    <p>{product?.description}</p>
    <p>{product?.price}</p>
    <p>{product?.stock}</p>
    <Image src={product?.image || ''} alt={product?.name || ''} width={100} height={100} />
  </div>
}
