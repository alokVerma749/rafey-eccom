'use client'

import ProductDetail from "@/app/components/Admin/Products/ProductDetail";
import { Product } from "@/types/product_type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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


  return(
    <div className="w-full mt-6">
      <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold p-2">Product Detail</h1>
    {product && <ProductDetail product={product} />}
    </div>
  )
}
