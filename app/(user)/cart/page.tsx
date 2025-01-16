'use client'

import { CartList } from "@/app/components/Cart/CartList"
import { useSession } from "next-auth/react";

function Cart() {
  const session = useSession();

  const handleCheckout = async () => {
    const cartResponse = await fetch('/api/cart', {
      method: 'GET',
      body: JSON.stringify({ userId: session.data?.user?.email }),
    });
    const cartData = await cartResponse.json();
    console.log(cartData, '###');

    const res = await fetch('/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({ items: cartData.items }),
    });

    await res.json();
  }

  return (
    <div>
      <CartList />
      <button onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  )
}

export default Cart
