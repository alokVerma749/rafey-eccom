"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/cart";

export const Personalize = ({ product, cart_id }: { product: CartItem, cart_id: string }) => {
  const [customization, setCustomization] = useState("");

  const handlePersonalization = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/product/personalization', {
      method: 'POST',
      body: JSON.stringify({
        product_id: product._id,
        cart_id: cart_id,
        customization: customization
      })
    })
    console.log("Customization:", customization);
  };

  return (
    <form className="flex items-center gap-x-2" onSubmit={handlePersonalization}>
      <Input
        placeholder="Add Personalization here..."
        value={customization}
        onChange={(e) => setCustomization(e.target.value)}
      />
      <Button type="submit">Personalize</Button>
    </form>
  );
};
