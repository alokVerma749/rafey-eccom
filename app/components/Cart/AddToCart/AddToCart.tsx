'use client'

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cartContext";
import { toast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react";

type AddToCartProps = {
  product: {
    _id: string;
    name: string;
    price: number;
    stock: number;
    images: string[];
  };
};

export const AddToCart = ({ product }: AddToCartProps) => {
  const { state, dispatch } = useCart();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (state.items.some(item => item.productId === product._id)) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [state])


  const handleAddToCart = () => {
    const newItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      stock: product.stock,
      images: product.images,
      _id: product._id
    };

    dispatch({ type: 'ADD_ITEM', payload: newItem });

    toast({
      title: 'Item added to the cart'
    })
  };

  return (
    <>
      {isDisabled ?
        <p className="text-sm text-green-500">Item already in cart</p>
        :
        <div className="flex justify-center md:justify-start items-center gap-x-6 py-4">
          <div className="flex justify-start items-center gap-x-6">
            <div className="flex justify-center items-center bg-[#3A3845] w-fit py-[1px] px-4 sm:px-16 rounded-md cursor-pointer" onClick={handleAddToCart}>
              <ShoppingCart className="text-white" />
              <Button
                disabled={isDisabled}
                className="bg-transparent hover:bg-transparent w-full"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      }
    </>
  );
};
