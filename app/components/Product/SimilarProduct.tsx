import React from 'react'
import getProductsAction from '@/actions/get-products';
import { Product } from '@/types/product_type';
import Link from 'next/link';
import Image from 'next/image';

type SimilarProductProps = {

  category: "candles" | "ceramic art" | "resin art";

};

const SimilarProduct = async ({ category }: SimilarProductProps) => {
  const response: string = await getProductsAction({ category: category, limit: 5 });
  const products: Product[] = response ? JSON.parse(response) : [];

  return (
    <div className="flex flex-col flex-wrap gap-5 justify-center p-10">
			<div className='flex justify-between items-center'>
				<h1 className='relative group cursor-pointer'>
					SIMILAR PRODUCTS
					<span className='absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full'></span>
				</h1>
				<Link href={"/shop/resin_art"} className="relative group cursor-pointer">VIEW ALL
					<span className='absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full'></span>
				</Link>
			</div>

			<div className="flex flex-wrap gap-5 justify-between">
				{products.map((product, index) => (
					<Link
						href={`/product/${product._id}`}
						key={index}
						className="border border-gray-300 w-fit sm:w-1/3 md:w-1/4 lg:w-1/6 text-center rounded-lg transition-transform duration-300"
					>
						<Image
							height={200}
							width={200}
							src={(product.images as any).medium}
							alt={product.name}
							className="w-full h-auto max-w-xs mx-auto mb-4"
						/>
						<div className='px-2'>
							<p className="font-bold text-base md:text-lg text-black text-start">₹{product.price}</p>
							<h2 className="text-base font-medium mb-2 text-start">{product.name}</h2>
							<p className="text-sm text-gray-600 mb-2 text-start">{product.description}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
  )
}

export default SimilarProduct
