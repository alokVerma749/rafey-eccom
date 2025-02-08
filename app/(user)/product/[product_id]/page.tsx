import { Metadata } from "next";
import Image from "next/image";
import { Product } from "@/types/product_type";
import getProductAction from "@/actions/get-product";
import ProductInfo from "@/app/components/Product/ProductInfo";
import { Button } from "@/components/ui/button";
import SimilarProduct from "@/app/components/Product/SimilarProduct";
import { AddToCart } from "@/app/components/Cart/AddToCart/AddToCart";

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
    return <div className="h-[100vh] text-center m-8">No products found</div>;
  }

  return (
    <div>
      <div className="container mx-auto mt-2 rounded-sm bg-white border shadow-lg py-10 px-5 lg:px-20">
        <div className="flex justify-evenly md:items-start md:flex-row items-center flex-col gap-x-6 md:gap-x-10">
          {/* Image */}
          <Image
            alt={`${product.name} thumbnail`}
            className="flex-shrink-0 max-w-full object-contain object-center pl-10 md:w-[50%] pr-6"
            src={imageSrc}
            width={2000}
            height={2000}
          />

          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <h1 className="text-xl font-semibold uppercase text-center md:text-left">{product.name}</h1>
            <h1 className="text-green-600 text-center md:text-left">In Stock: {product.stock}</h1>

            {/* Price Details */}
            <div className="flex justify-between items-center gap-x-4 font-medium py-2">
              <div className="flex flex-row gap-x-2 gap-y-1 md:flex-row justify-start items-center md:gap-x-4">
                <p className="text-lg font-semibold text-black">
                  ₹{(product.price - (product.price * (product.discount?.percentage ?? 0)) / 100).toFixed(2)}
                </p>
                <p className="text-gray-600 text-sm line-through">MRP ₹{product.price}</p>
                <p className="text-orange-500 text-sm font-medium">
                  (₹{((product.price * (product.discount?.percentage ?? 0)) / 100).toFixed(2)} OFF)
                </p>
              </div>
            </div>

            <AddToCart product={product} />

            <ProductInfo product={product} />

            {/* Delivery Options */}
            <div className="py-4">
              <label className="block text-base font-semibold pt-4">🚚 DELIVERY OPTIONS</label>
              <div className="flex flex-col md:flex-row items-start md:justify-between md:items-center mt-2 md:space-x-2 space-y-2 md:space-y-0">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="flex-1 border border-gray-300 rounded-md p-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <Button className="mt-2 md:mt-0">Check</Button>
              </div>
              <ul className="text-sm text-gray-500 mt-2 list-disc pl-5">
                <li>100% Original Products</li>
                <li>Only Prepaid payment is acceptable</li>
                <li>No return and exchange available</li>
              </ul>
            </div>

            {/* Best Offers */}
            <div className="py-4">
              {/* Terms and Conditions */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-indigo-600 underline cursor-pointer">
                  TERMS & CONDITIONS
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SimilarProduct category={product.category} />
    </div>
  );
}
