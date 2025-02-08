import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product_type';

function ShopCard({ filteredProducts }: { filteredProducts: Product[] }) {
  return (
    <div className="flex-1 grid grid-col-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => {
          const discountPercentage = item.discount?.percentage || 0;
          return (
            <Link href={`/product/${item._id}`} key={item._id} className="bg-white shadow-sm rounded-md mb-4 w-full">
              <Image
                height={200}
                width={200}
                src={item.images.thumbnail}
                alt={item.name}
                className="w-full h-54 object-cover rounded-t-md h-[70%]"
              />
              <div className='p-2'>
                <h3 className="text-sm md:text-sm lg:text-base text-gray-600">{item.name}</h3>
                {discountPercentage > 0 && (
                  <div className="flex justify-start items-center mt-1 gap-x-4 font-medium">
                    <p className='text-sm md:text-base font-semibold text-green-600'> ₹{(item.price - (item.price * discountPercentage) / 100).toFixed(2)}</p>
                    <p className="font-semibold text-black text-sm line-through">₹{item.price}</p>
                    <p className="text-green-600 text-sm">{discountPercentage} % OFF</p>
                  </div>
                )}
                <p className="text-sm text-gray-400">{item.category}</p>
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

export default ShopCard
