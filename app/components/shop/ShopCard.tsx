'use client'

import Image from 'next/image';
import Link from 'next/link';

interface Item {
  _id: string;
  images: {
    thumbnail: string;
  };
  name: string;
  price: number;
  discount?: {
    percentage: number;
  };
}

function ShopCard({ item }: { item: Item }) {
  const discountPercentage = item.discount?.percentage || 0;
  return (
    <Link href={`/product/${item._id}`} key={item._id} className="bg-white rounded mb-4">
      <Image
        height={200}
        width={200}
        src={item.images.thumbnail}
        alt={item.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-sm text-gray-600">{item.name}</h3>
      {discountPercentage > 0 && (
        <div className="flex justify-start items-center gap-x-4 font-medium">
          <p className='text-base font-semibold text-green-600'> ${(item.price - (item.price * discountPercentage) / 100).toFixed(2)}</p>
          <p className="font-semibold text-black text-sm line-through">${item.price}</p>
          <p className="text-green-600 text-sm">{discountPercentage} % OFF</p>
        </div>
      )}
      {/* <p className="text-sm text-gray-400">{item.category}</p> */}
    </Link>
  )
}

export default ShopCard
