import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product_type';
import { Pencil } from 'lucide-react';

function ShopCard({ filteredProducts }: { filteredProducts: Product[] }) {
  return (
    <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-6 px-2">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => {
          const discountPercentage = item.discount?.percentage || 0;
          return (
            <Link href={`/product/${item._id}`} key={item._id} className="bg-white shadow-sm rounded-md md:mb-4 w-full relative overflow-hidden">
              {item.onSale && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-start">
                  <p className="bg-yellow-600 text-white px-4 pl-6 py-1 text-xs font-bold rotate-45 absolute top-2 left-2">
                    On Sale
                  </p>
                </div>
              )}
              {item.isCustomizable && (
                <div className="absolute top-2 left-2 bg-slate-300 text-black text-xs font-bold p-2 rounded-full flex items-center">
                  <Pencil size={14} strokeWidth={1.5} />
                </div>
              )}
              <Image
                height={200}
                width={200}
                src={item.images[0] || "/placeholder.svg"}
                alt={item.name}
                className="w-full object-cover rounded-t-md h-[60%] md:h-[70%]"
              />
              <div className='p-2'>
                <h3 className="text-sm md:text-sm lg:text-base text-gray-600">{item.name}</h3>
                {discountPercentage >= 0 && (
                  <div className="flex justify-start items-center mt-1 gap-x-4 font-medium">
                    <p className='text-sm md:text-base font-semibold text-green-600'> ₹{Math.round(item.price - (item.price * discountPercentage) / 100)}</p>
                    <p className="font-semibold text-black text-sm line-through">₹{item.price}</p>
                    <p className="text-green-600 text-sm">{discountPercentage} % OFF</p>
                  </div>
                )}
                <p className="text-base text-gray-400">{item.category}</p>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="col-span-full text-center text-gray-500">No products found.</p>
      )}
    </div>
  )
}

export default ShopCard;
