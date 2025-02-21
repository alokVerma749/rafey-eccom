"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/cart";

export const Personalize = ({ product, cart_id }: { product: CartItem; cart_id: string }) => {
  const [customization, setCustomization] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [savedCustomization, setSavedCustomization] = useState("");

  const handlePersonalization = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/product/personalization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product._id,
          cart_id: cart_id,
          customization: customization,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setSavedCustomization(customization);
      } else {
        throw new Error("Failed to personalize product");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col items-start gap-y-2" onSubmit={handlePersonalization}>
      <div className="flex justify-start gap-x-2 items-center">
        <Input
          placeholder="Add Personalization here..."
          value={customization}
          onChange={(e) => setCustomization(e.target.value)}
          disabled={isSubmitting || success}
        />
        <Button type="submit" disabled={isSubmitting || success}>
          {isSubmitting ? "Personalizing..." : "Personalize"}
        </Button>
      </div>
      {success && (
        <p className="text-green-600">
          You have added a customization to the product: <strong>{savedCustomization}</strong>
        </p>
      )}
    </form>
  );
};
