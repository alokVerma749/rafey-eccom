import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CartItem as CartItemModel } from '@/models/cart-model';

export const useFetchCart = () => {
  const [cart, setCart] = useState<CartItemModel[]>([]);
  const [cart_id, setCart_id] = useState<string>('');
  const session = useSession();

  useEffect(() => {
    const fetchCart = async () => {
      if (!session.data?.user?.email) return;
      const cartResponse = await fetch(`/api/cart?userId=${session.data.user.email}`);
      const cartData = await cartResponse.json();
      setCart(cartData.cart.items);
      setCart_id(cartData.cart._id);
    };

    fetchCart();
  }, [session.data?.user?.email]);

  return { cart, cart_id };
};