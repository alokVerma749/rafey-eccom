import getProductsAction from '@/actions/get-products';
import { Product } from '@/types/product_type';
import Image from 'next/image';
import Link from 'next/link';

async function Section2() {
  const response: string = await getProductsAction({ category: 'candles', limit: 4 });
  const products: Product[] = response ? JSON.parse(response) : [];

  return (
    <div className="flex flex-col gap-5 md:p-10 py-4">
      <div className="flex justify-between items-center">
        <h1 className="relative group cursor-pointer text-sm xs:text-lg md:text-2xl font-bold">
          BEST OF CANDLES
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </h1>
        <Link
          href="/shop/candles"
          className="relative group cursor-pointer text-xs xs:text-sm md:text-base text-gray-600 font-medium"
        >
          VIEW ALL
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>

      <div className="flex flex-wrap w-full gap-5 justify-between">
        {products.map((product, index) => (
          <Link
            key={index}
            href={`/product/${product._id}`}
            className="border border-gray-300 rounded text-center transition-transform duration-300 hover:scale-105 w-full xs:w-5/12 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5"
          >
            <Image
              height={200}
              width={200}
              src={(product.images as any).medium}
              alt={product.name}
              className="h-auto w-full mb-4 rounded"
            />
            <div className="flex flex-col items-start pl-2">
              <p className="font-semibold text-base xs:text-lg md:text-xl text-black text-start">
              ₹{product.price}
              </p>
              <h2 className="text-sm xs:text-base md:text-lg font-medium mb-2 text-start uppercase">
                {product.name}
              </h2>
              <p className="text-xs xs:text-sm text-gray-600 mb-2 text-start">
                {product.description.length > 40
                  ? `${product.description.substring(0, 40)}...`
                  : product.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Section2;