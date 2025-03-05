'use client'

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cartContext";
import { toast } from "@/hooks/use-toast";

type AddToCartProps = {
  product: {
    _id: string;
    name: string;
    price: number;
    stock: number;
    images: string[];
  };
  classNameGen?: string;
};

export const AddToCartSales = ({ product, classNameGen }: AddToCartProps) => {
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
        <Button
          disabled={isDisabled}
          className={cn("w-full bg-[#2a8a9d] hover:bg-[#1f7a8d] text-white", classNameGen)}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      }
    </>
  );
};
