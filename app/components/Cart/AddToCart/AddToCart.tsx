'use client'

import { useCart } from "@/context/cartContext";


type AddToCartProps = {
  product: {
    _id: string;
    name: string;
    price: number;
    images: {
      thumbnail: string;
    };
  };
};

export const AddToCart = ({ product }: AddToCartProps) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    const newItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1, // Default to 1 for now
      imageUrl: product.images.thumbnail,
      total: product.price, // Initial total is price * 1
    };

    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Add to Cart
    </button>
  );
};
