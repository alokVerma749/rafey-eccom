import Image from 'next/image';
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
import { Product } from '@/types/product_type';

function ProductCard({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
      {products.length > 0 ? (
        products.map((product) => {
          const discountPercentage = product.discount?.percentage || 0;
          const discountedPrice = (product.price - (product.price * discountPercentage) / 100).toFixed(2);

          return (
            <Link href={`/admin/products/${product._id}`} key={product._id} className="bg-white rounded-xl shadow-md p-4 w-full border border-gray-200">
              <div className="flex justify-between items-start">
                <Image
                  height={60}
                  width={60}
                  src={product.images.thumbnail}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="text-base font-semibold mt-2">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-lg font-semibold mt-1">₹{discountedPrice}</p>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <h4 className="text-sm font-medium mt-3">Summary</h4>
              <p className="text-xs text-gray-500">{product.description}</p>
              <div className="mt-3 p-2 bg-gray-100 rounded-lg">
                <div className="flex justify-between text-sm font-medium mt-2">
                  <p>Remaining Products</p>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-orange-400 rounded-full"></div>
                    <p>{product.stock}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="col-span-full text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
}

export default ProductCard;
