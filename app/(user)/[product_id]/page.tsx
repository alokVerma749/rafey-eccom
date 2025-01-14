// ProductPage.tsx

import Image from "next/image";
import { Metadata } from "next";
import { Product } from "@/types/product_type";
import getProductAction from "@/actions/get-product";
import { AddToCart } from "@/app/components/Cart/AddToCart";

type productProps = {
  params: Promise<{ product_id: string }>;
};

export async function generateMetadata({ params }: productProps): Promise<Metadata> {
  const { product_id } = await params;

  const response: string = await getProductAction({ product_id })
  const product: Product = response ? JSON.parse(response as string) : [];

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product was not found.",
    };
  }

  return {
    title: product.name,
    description: product.description.slice(0, 150),
  };
}

export default async function ProductPage({ params }: productProps) {
  const { product_id } = await params;

  const response: string = await getProductAction({ product_id })
  const product: Product = response ? JSON.parse(response as string) : [];

  const defaultImage = "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/product-thumbnails/b4lxfvb1qgkefdbybuor.jpg";
  const imageSrc = product?.images.thumbnail || defaultImage;

  if (!product) {
    return <p>No products found</p>;
  }

  return (
    <div>
      <div className="w-full mx-auto relative">
        <div className="w-full h-[60%] bg-[#1A1A1A] lg:bg-foreground absolute top-0 z-0"></div>
        <div className="relative z-10 px-2 lg:px-0">
          <div className="lg:w-3/4 lg:mx-auto border rounded-lg overflow-hidden border-gray-800 lg:rounded-none lg:rounded-b-xl shadow-lg shadow-slate-700 custom-height-1 custom-height-2 custom-height-3">
            <Image
              alt={`${product.name} thumbnail`}
              className="flex-shrink-0 w-full h-96 object-cover object-center"
              src={imageSrc}
              width={2000}
              height={2000}
            />

            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>

            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
