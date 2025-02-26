import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserAccount } from "@/models/user_model";
import { CartItem as CartItemModel } from '@/models/cart-model';
import { getUserAccount } from "@/db_services/user";
import { CartItem } from "@/types/cart";

const DELIVERY_FEE = 100;
// TODO: Add warehouse pincode to .env
const WAREHOUSE_PINCODE = process.env.NEXT_PUBLIC_WAREHOUSE_PINCODE;

export const useCartData = () => {
  const session = useSession();

  const [cart, setCart] = useState<CartItemModel[]>([]);
  const [cart_id, setCartId] = useState<string>("");
  const [cartProducts, setCartProducts] = useState<(CartItem & { quantity: number, description: string, customization: string, isCustomizable: boolean })[]>([]);
  const [user, setUser] = useState<UserAccount | null>(null);
  const [threshold, setThreshold] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const [voucherCode, setVoucherCode] = useState("");
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherError, setVoucherError] = useState("");
  const [shippingCost, setShippingCost] = useState<number | null>(DELIVERY_FEE);

  // Fetch threshold setting
  useEffect(() => {
    const fetchThreshold = async () => {
      try {
        const response = await fetch("/api/settings");
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

  // Calculate Shipping Cost using Delhivery API
  useEffect(() => {
    const calculateShippingCost = async () => {
      if (!user?.pincode || cartProducts.length === 0) return;

      const destinationPincode = user.pincode;
      const totalWeight = cartProducts.reduce((sum, item) => sum + item.quantity * Number(item.weight), 0);

      try {
        const response = await fetch(
          `/api/shipment/calculate-shipping-cost?d_pin=${destinationPincode}&o_pin=${WAREHOUSE_PINCODE}&cgm=${totalWeight}&pt=Pre-paid&cod=0`
        );
        const data = await response.json();

        if (response.ok) {
          setShippingCost(data[0]?.total_amount || DELIVERY_FEE);
        } else {
          console.error("Error fetching shipping cost:", data);
          setShippingCost(DELIVERY_FEE);
        }
      } catch (error) {
        console.error("Error calculating shipping cost:", error);
        setShippingCost(DELIVERY_FEE);
      }
    };

    calculateShippingCost();
  }, [user, cartProducts]);

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
    shippingCost,
    setCartProducts,
    setUser,
    setCart,
  };
};
