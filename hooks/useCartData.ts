import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserAccount } from "@/models/user_model";
import { CartItem as CartItemModel } from '@/models/cart-model';
import { getUserAccount } from "@/db_services/user";
import { CartItem } from "@/types/cart";

const DELIVERY_FEE = 100;

export const useCartData = () => {
  const session = useSession();
  
  const [cart, setCart] = useState<CartItemModel[]>([]);
  const [cart_id, setCartId] = useState<string>("");
  const [cartProducts, setCartProducts] = useState<(CartItem & { quantity: number, description: string, customization: string })[]>([]);
  const [user, setUser] = useState<UserAccount | null>(null);
  const [threshold, setThreshold] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const [voucherCode, setVoucherCode] = useState("");
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherError, setVoucherError] = useState("");

  // Fetch threshold setting
  useEffect(() => {
    const fetchThreshold = async () => {
      try {
        const response = await fetch("/api/admin/settings");
        const data = await response.json();
        setThreshold(data.settings.siteSettings?.freeDeliveryThreshold);
      } catch (error) {
        console.error("Error fetching threshold:", error);
      }
    };

    fetchThreshold();
  }, []);

  // Fetch user cart & user details
  useEffect(() => {
    const fetchCart = async () => {
      if (!session.data?.user?.email) return;
      try {
        const cartResponse = await fetch(`/api/cart?userId=${session.data.user.email}`);
        const cartData = await cartResponse.json();
        setCart(cartData.cart.items);
        setCartId(cartData.cart._id);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    const fetchUser = async () => {
      try {
        if (!session.data?.user?.email) return;
        const userAccount = await getUserAccount(session.data.user.email);
        const userAccountData = JSON.parse(userAccount);
        setUser(userAccountData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchCart(), fetchUser()]);
      setLoading(false);
    };

    fetchData();
  }, [session.data?.user?.email]);

  // Fetch cart products
  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const products = await Promise.all(
          cart.map(async (item: CartItemModel) => {
            const productResponse = await fetch(`/api/product?productId=${item.productId}`);
            const productData = await productResponse.json();

            return {
              ...productData.product,
              quantity: item.quantity,
              customization: item.customization,
            };
          })
        );
        setCartProducts(products);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };

    if (cart.length > 0) {
      fetchCartProducts();
    }
  }, [cart]);

  return {
    cart,
    cart_id,
    cartProducts,
    user,
    threshold,
    loading,
    voucherCode,
    setVoucherCode,
    voucherDiscount,
    setVoucherDiscount,
    voucherError,
    setVoucherError,
    DELIVERY_FEE,
    setCartProducts,
    setUser,
    setCart,
  };
};
