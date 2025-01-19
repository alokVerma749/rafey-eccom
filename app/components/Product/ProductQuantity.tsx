"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const ProductQuantity = ({ product }: { product: any }) => {
  
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const discountedPrice = (
    product.price -
    (product.price * (product.discount?.percentage ?? 0)) / 100
  ).toFixed(2);

  const totalPrice = (quantity * parseFloat(discountedPrice)).toFixed(2);

  return (
    <div className="flex justify-between items-center gap-x-4 font-medium">  
      <div className="flex justify-start items-center w-fit rounded-md mt-auto mb-2">
        <div
          className="px-2 border py-1 cursor-pointer mx-1 rounded"
          onClick={handleDecreaseQuantity}
        >
          <Minus size={20} />
        </div>
        <span className="text-base px-10 border py-[2px] rounded">{quantity}</span>
        <div
          className="px-2 border-l-2 py-1 cursor-pointer border mx-1 rounded"
          onClick={handleIncreaseQuantity}
        >
          <Plus size={20} />
        </div>
      </div>
      <p >Total Price: <span className="text-base font-semibold text-black">${totalPrice}</span></p>
    </div>
  );
};

export default ProductQuantity;
