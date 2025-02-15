import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product_type';
import { Pencil } from 'lucide-react';

function ProductCard({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
      {products.length > 0 ? (
        products.map((product) => {
          const discountPercentage = product.discount?.percentage || 0;
          const discountedPrice = (product.price - (product.price * discountPercentage) / 100).toFixed(2);

          return (
            <Link href={`/admin/products/${product._id}`} key={product._id} className="bg-white rounded-xl shadow-md p-4 w-full border border-gray-200 relative overflow-hidden">
              {product.onSale && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-start">
                  <p className="bg-yellow-600 text-white px-4 pl-6 py-1 text-xs font-bold rotate-45 absolute top-2 left-2">
                    On Sale
                  </p>
                </div>
              )}
              {product.isCustomizable && (
                <div className="absolute top-2 left-2 bg-slate-300 text-red-700 text-xs font-bold p-2 rounded-full flex items-center">
                  <Pencil size={14} strokeWidth={1.5} />
                </div>
              )}
              <div className="flex gap-4 items-start">
                <Image
                  height={70}
                  width={70}
                  src={product.images.thumbnail}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-base text-gray-500">{product.category}</p>
                  <p className="text-xl font-semibold mt-1">₹{discountedPrice}</p>
                </div>
              </div>
              <h4 className="text-lg font-medium mt-3">Description</h4>
              <p className="text-base text-gray-500">{product.description}</p>
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
