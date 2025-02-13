'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetail from "@/app/components/Admin/Products/ProductDetail";
import { Product } from "@/types/product_type";

export default function ProductPage() {
  const { product_id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/admin/product?productId=${product_id}`);
      const data = await response.json();
      setProduct(data.product[0]);
    };
    fetchProduct();
  }, []);


  return (
    <div className="w-full px-2 sm:px-10 mt-6 font-bellefair">
      <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold p-2">Product Detail</h1>
      {product && <ProductDetail product={product} />}
    </div>
  )
}
