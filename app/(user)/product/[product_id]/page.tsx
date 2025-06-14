import { Metadata } from "next";
import { Product } from "@/types/product_type";
import getProductAction from "@/actions/get-product";
import ProductInfo from "@/app/components/Product/ProductInfo";
import SimilarProduct from "@/app/components/Product/SimilarProduct";
import { AddToCart } from "@/app/components/Cart/AddToCart/AddToCart";
import { ProductImageGallery } from "@/app/components/ProductImageGallery";
import DeliveryOptions from "@/app/components/Product/DeliveryOptions";

type productProps = {
  params: Promise<{ product_id: string }>;
};

export async function generateMetadata({ params }: productProps): Promise<Metadata> {
  const { product_id } = await params;

  const response: string = await getProductAction({ product_id });
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

  const response: string = await getProductAction({ product_id });
  const product: Product = response ? JSON.parse(response as string) : [];
  // TODO: fix this default image
  const defaultImage = "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/product-thumbnails/b4lxfvb1qgkefdbybuor.jpg";

  if (!product) {
    return <div className="h-[100vh] text-center m-8">No product found</div>;
  }

  return (
    <div>
      <div className="container mx-auto mt-2 rounded-sm bg-white border shadow-lg py-10 px-5 lg:px-20">
        <div className="flex justify-evenly sm:items-start sm:flex-row items-center flex-col gap-x-6 sm:gap-x-10">
          {/* Image */}
          <ProductImageGallery images={product.images} productName={product.name} defaultImage={defaultImage} />

          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold uppercase text-center md:text-left">{product.name}</h1>
            <h1 className="text-green-600 text-center md:text-left">In Stock: {product.stock}</h1>

            {/* Price Details */}
            <div className="flex justify-between items-center gap-x-4 font-medium py-2 w-full">
              <div className="flex flex-col gap-x-2 gap-y-1 sm:flex-row justify-center sm:justify-start items-center sm:gap-x-4 w-full">
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
            <DeliveryOptions />
          </div>
        </div>
      </div>
      <SimilarProduct category={product.category} excludeProductId={product._id} />
    </div>
  );
}
