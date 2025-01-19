// ProductPage.tsx

import Image from "next/image";
import { Metadata } from "next";
import { Product } from "@/types/product_type";
import getProductAction from "@/actions/get-product";
import { AddToCart } from "@/app/components/Cart/AddToCart";
import { Minus, Plus } from "lucide-react"
import ProductInfo from "@/app/components/Product/ProductInfo";
import { Button } from "@/components/ui/button";
import SimilarProduct from "@/app/components/Product/SimilarProduct";
import ProductQuantity from "@/app/components/Product/ProductQuantity";

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
      <div className="container mx-auto bg-white border-2 py-10 px-5 lg:px-20">
        <div className="flex justify-center md:items-start md:flex-row items-center flex-col gap-x-10">
          <Image
            alt={`${product.name} thumbnail`}
            className="flex-shrink-0 w-full object-cover object-center pl-20 md:w-3/5 pr-10"
            src={imageSrc}
            width={2000}
            height={2000}
          />
          <div className="">
            <h1 className="text-xl font-semibold uppercase">{product.name}</h1>
            <h1 className="text-green-600">In Stock:  {product.stock}</h1>

            <div className="flex justify-between items-center gap-x-4 font-medium py-2">
                    <div className='flex flex-col gap-y-1 md:flex-row justify-start items-center md:gap-x-4'>
                    <p className="text-lg font-semibold text-black">
                      ${(product.price - (product.price * (product.discount?.percentage ?? 0)) / 100).toFixed(2)}
                    </p>
                    <p className="text-gray-600 text-sm line-through">MRP ${product.price}</p>
                    <p className="text-orange-500 text-sm font-medium">(${((product.price * (product.discount?.percentage ?? 0)) / 100).toFixed(2)} OFF)</p>
                    </div>
                  </div>
            <ProductQuantity product={product} />

            {/* <div className="flex justify-start items-center border-2 w-fit rounded-md">
              <div className="px-4 border-r-2 py-1"><Minus /></div><span className="text-xl px-4">0</span><div className="px-4 border-l-2 py-1"><Plus /></div>
            </div> */}
            <AddToCart product={product} />

            <ProductInfo product={product}/>

            <div className="py-4">
              {/* Personalization Section */}
              <div>
                <label className="block text-base font-semibold">🎨 PERSONALIZE HERE</label>
                <input
                  type="text"
                  placeholder="Type Here..."
                  className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Customize Your Product By Adding Your Name For A Personal Touch
                </p>
              </div>

              {/* Delivery Options */}
              <div>
                <label className="block text-base font-semibold pt-4">🚚 DELIVERY OPTIONS</label>
                <div className="flex flex-col md:flex-row items-start md:justify-between md:items-center mt-2 space-x-2">
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    className="flex-1 border border-gray-300 rounded-md p-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Button className="m-4 md:m-0">Check</Button>
                  
                </div>
                <ul className="text-sm text-gray-500 mt-2 list-disc pl-5">
                  <li>100% Original Products</li>
                  <li>Pay On Delivery Might Be Available</li>
                  <li>Easy 7 Days Returns And Exchanges</li>
                </ul>
              </div>

              {/* Best Offers */}
              <div className="py-4">
                <h3 className="text-lg font-semibold text-gray-700">BEST OFFERS</h3>
                <p className="text-indigo-600">Best Price: ₹690</p>
                <ul className="text-sm text-gray-500 mt-2 list-disc pl-5 space-y-1">
                  <li>
                    Applicable On: Purchase Of 4 Or More Items
                    <br />
                    <span className="text-gray-800 font-medium">Coupon Code:</span>{' '}
                    <span className="text-indigo-600 font-semibold">EORSHOME15</span>
                    <br />
                    <span className="text-gray-800 font-medium">Coupon Discount:</span> 15% Off (Your Total
                    Saving: Rs. 809)
                  </li>
                </ul>

                {/* Additional Offers */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 underline cursor-pointer">
                    VIEW ELIGIBLE PRODUCTS
                  </h4>
                  <ul className="text-sm text-gray-500 mt-2 list-disc pl-5 space-y-1">
                    <li>
                      10% Discount On Kotak Credit And Debit Cards. <br />
                      Min Spend ₹3500, Max Discount ₹1000.
                    </li>
                    <li>
                      10% Discount On BOBCARD Credit Cards And Credit Card EMI.
                      <br />
                      Min Spend ₹2500, Max Discount ₹1000.
                    </li>
                  </ul>
                </div>

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
      </div>
      <SimilarProduct category={product.category}/>
    </div>
  );
}
