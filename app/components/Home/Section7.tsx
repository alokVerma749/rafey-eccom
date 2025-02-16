import getProductsAction from '@/actions/get-products';
import { Product } from '@/types/product_type';
import Image from 'next/image';

async function Section7() {
  const response: string = await getProductsAction({ limit:10 });
  const products: Product[] = response ? JSON.parse(response) : [];

  return (
    <div className="flex justify-start items-center overflow-x-scroll gap-1 p-10 no-scrollbar">
      {products.map((product, index) => (
        <div key={index} className="text-center min-w-[200px]">
          <Image
            height={200}
            width={200}
            src={(product.images && product.images[0])}
            alt={product.name}
            className="w-full h-auto max-w-xs mx-auto mb-4"
          />
        </div>
      ))}
    </div>
  );
}

export default Section7;