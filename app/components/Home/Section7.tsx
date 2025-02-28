import Image from 'next/image';
import getProductsAction from '@/actions/get-products';
import { Product } from '@/types/product_type';

async function Section7() {
  const response: string = await getProductsAction({ limit: 10 });
  const products: Product[] = response ? JSON.parse(response) : [];

  return (
    <div className="relative overflow-hidden p-10">
      <div className="flex items-center gap-4 animate-carousel">
        {products.map((product, index) => (
          <div key={index} className="text-center min-w-[300px] w-[200px] h-[200px] flex flex-col items-center">
            <div className="w-[300px] h-[180px] relative">
              <Image
                src={product.images?.[0]}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <p className="text-sm mt-2">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section7;
