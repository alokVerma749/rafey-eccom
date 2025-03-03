import Link from 'next/link';
import Image from 'next/image';
import getProductsAction from '@/actions/get-products';
import { Product } from '@/types/product_type';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

type SimilarProductProps = {
	category: "candles" | "ceramic art" | "resin art";
	excludeProductId: string;
};

const SimilarProduct = async ({ category, excludeProductId }: SimilarProductProps) => {
	const response: string = await getProductsAction({ category: category, limit: 5 });
	const products: Product[] = response ? JSON.parse(response) : [];
	const filteredProducts = products.filter(product => product._id !== excludeProductId);

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

			{/* Similar Products Carousel */}
			<div className="container mx-auto w-[95%] mt-4">
				<Carousel>
					<CarouselContent>
						{filteredProducts.map((similarProduct) => (
							<CarouselItem key={similarProduct._id} className="sm:basis-1/2 lg:basis-1/3 p-2">
								<Link href={`/product/${similarProduct._id}`} className="block bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition">
									<Image
										src={similarProduct.images[0] || "/placeholder.svg"}
										alt={similarProduct.name}
										width={200}
										height={200}
										className="w-full h-48 object-cover rounded-md"
									/>
									<div className="mt-2">
										<h3 className="text-sm font-medium text-gray-700">{similarProduct.name}</h3>
										<div className="flex justify-between items-center mt-1 text-gray-600">
											<p className="text-sm font-semibold">₹{(similarProduct.price - (similarProduct.price * (similarProduct.discount?.percentage ?? 0)) / 100).toFixed(2)}</p>
											{similarProduct.discount && similarProduct.discount?.percentage > 0 && (
												<p className="text-xs text-orange-500">
													{similarProduct.discount.percentage}% OFF
												</p>
											)}
										</div>
									</div>
								</Link>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</div>
	)
}

export default SimilarProduct
