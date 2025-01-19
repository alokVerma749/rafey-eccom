import getProductsAction from '@/actions/get-products';
import { Product } from '@/types/product_type';
import Image from 'next/image';
import Link from 'next/link';

async function Section2() {
  const response: string = await getProductsAction({ category: 'candles', limit: 4 });
  const products: Product[] = response ? JSON.parse(response) : [];

  return (
    <div className="flex flex-col flex-wrap gap-5 justify-center p-10">
      <div className='flex justify-between items-center'>
        <h1 className='relative group cursor-pointer'>
          BEST OF CANDLES
          <span className='absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full'></span>
        </h1>
        <Link href={"/shop/candles"} className="relative group cursor-pointer">VIEW ALL
          <span className='absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full'></span>
        </Link>
      </div>

      <div className="flex flex-wrap gap-5 justify-between">
        {products.map((product, index) => (
          <Link
            key={index}
            href={`/product/${product._id}`}
            className="border border-gray-300 p-5 w-fit sm:w-1/3 md:w-1/4 lg:w-1/5 text-center rounded-lg transition-transform duration-300"
          >
            <Image
              height={200}
              width={200}
              src={(product.images as any).medium}
              alt={product.name}
              className="w-full h-auto max-w-xs mx-auto mb-4"
            />
            <p className="font-bold text-xl text-black text-start">${product.price}</p>
            <h2 className="text-lg font-semibold mb-2 text-start">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2 text-start">{product.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Section2;
