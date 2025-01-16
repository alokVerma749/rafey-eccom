'use client'

import { useCart } from "@/context/cartContext";
import { toast } from "@/hooks/use-toast";


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
      quantity: 1,
      images: {
        thumbnail: product.images.thumbnail,
        large: product.images.thumbnail,
        medium: product.images.thumbnail,
      },
      _id: product._id
    };

    dispatch({ type: 'ADD_ITEM', payload: newItem });

    toast({
      title: 'Item added to the cart'
    })
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
