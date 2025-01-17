'use client'

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cartContext";
import { toast } from "@/hooks/use-toast";
import {ShoppingCart, Heart} from "lucide-react"

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
    <div className="flex justify-start items-center gap-x-6 my-6">

    <div className="flex justify-center items-center bg-[#3A3845] w-fit py-[1px] px-16 rounded-md">
    <ShoppingCart className="text-white"/>
    <Button
      onClick={handleAddToCart}
      className="bg-transparent"
      >
      Add to Cart 
    </Button>
      </div>
      <Heart/>
        </div>
  );
};
