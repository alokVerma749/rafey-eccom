import { Product } from "@/types/product_type";
import Image from "next/image";
import Link from "next/link";
interface NewArrivalsProps {
  products: Product[];
}
export const NewArrivals = ({ products }: NewArrivalsProps) => {
  return (
    <section className="px-2 sm:px-10 my-12 text-center">
      <h2 className="text-3xl font-bold">Products On Sale</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/product/${product._id}`} key={product._id} className="rounded-lg shadow text-start w-full">
            <div className="relative overflow-hidden">
              <Image
                src={product.images.medium}
                alt={product.name}
                width={200}
                height={200}
                className="w-full max-h-44 object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-start">
                <p className="bg-yellow-600 text-white px-4 py-1 text-xs font-bold rotate-45 absolute top-2 left-2">
                  On Sale
                </p>
              </div>
            </div>
            <h3 className="text-lg font-bold mt-2">{product.name}</h3>
            <div className='flex flex-col gap-y-1 sm:flex-row sm:gap-x-4'>
              <p className="text-base font-semibold text-black">
                ₹{(product.price - (product.price * (product.discount?.percentage ?? 0)) / 100).toFixed(2)}
              </p>
              <p className="text-gray-600 text-sm line-through">MRP ₹{product.price}</p>
              <p className="text-orange-500 text-sm font-medium">(₹{((product.price * (product.discount?.percentage ?? 0)) / 100).toFixed(2)} OFF)</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
