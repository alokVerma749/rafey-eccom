'use client'

import { DeliveryTracker } from "@/app/components/Profile/DeliveryTracker";
import Image from "next/image";
import { Product } from '@/types/product_type';
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "@/app/components/Loader";
import { UserAccount } from "@/models/user_model";
import { useSession } from "next-auth/react";
import { getUserAccount } from "@/db_services/user";

type OrderData = {
  _id: string;
  createdAt: string;
  orderStatus: string;
  products: { product: string; quantity: number }[];
  totalAmount: number;
  paymentId: string;
  paymentStatus: string;
};

const OrderDetails = () => {
  const [orderData, setOrderData] = useState<{ order: OrderData; productDetails: Product[] } | null>(null);
  const [user, setUser] = useState<UserAccount | null>(null);
  const { order_id } = useParams();
  const session = useSession();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/order?orderId=${order_id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch order data.');
        }

        const fetchedOrder: { message: string; order: OrderData; productDetails: Product[] } = await response.json();
        setOrderData(fetchedOrder);

        toast({
          title: fetchedOrder.message,
          description: fetchedOrder.order.orderStatus,
        });
      } catch (err: any) {
        toast({
          title: 'Error',
          description: err.message || 'Failed to fetch order data.',
        });
      }
    };

    const fetchUser = async () => {
      const userAccount = await getUserAccount(session.data?.user?.email ?? '');
      const userAccountData = JSON.parse(userAccount);
      setUser(userAccountData);
    };

    fetchOrder();
    fetchUser();
  }, [order_id, session.data?.user?.email]);

  if (!orderData) {
    return <div><Loader /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-lg shadow-md my-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold"><strong>ORDER ID: </strong>{orderData.order._id}</h2>
        </div>
      </div>

      <DeliveryTracker />

      <h3 className="text-md font-semibold mb-3">ORDER SUMMARY</h3>
      {orderData.productDetails.map((product, index) => {
        const orderProduct = orderData.order.products.find(p => p.product === product._id);
        const discountPercentage = product.discount?.percentage || 0;
        const discountedPrice = (product.price - (product.price * discountPercentage) / 100).toFixed(2);

        return (
          <div key={index} className="flex justify-between items-center border border-gray-300 rounded-lg p-4 mb-4">
            <div className="flex justify-start items-center gap-x-6">
              <Image
                src={product.images.medium}
                alt={product.name}
                height={80}
                width={80}
                className="object-cover rounded-md"
              />
              <div className="flex-1 text-base text-gray-700">
                <p className="font-semibold">{product.name}</p>
                <p><strong>Category: </strong>{product.category}</p>
                <p><strong>Order Date: </strong>{new Date(orderData.order.createdAt).toLocaleDateString()}</p>
                <p><strong>Quantity: </strong>{orderProduct?.quantity}</p>
                <p>{product.description}</p>
              </div>
            </div>
            {discountPercentage > 0 && (
              <div className="flex flex-col items-start justify-start gap-x-4 font-medium">
                <p className="font-semibold text-black text-base line-through">₹{product.price}</p>
                <p className="text-green-600 text-base">{discountPercentage} % OFF</p>
                <p className='text-base font-semibold text-green-600'> ₹{discountedPrice}</p>
              </div>
            )}
          </div>
        );
      })}

      <div className="text-base text-gray-700 mb-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{orderData.order.totalAmount}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery:</span>
          <span className="pr-4">Free</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>TOTAL AMOUNT:</span>
          <span className='text-base font-semibold text-green-600 pr-4'> ₹{orderData.order.totalAmount}</span>
        </div>
      </div>

      <div className="text-base text-gray-700 mb-4">
        <p><strong>Order updates sent to:</strong> {user?.email} | {user?.phone}</p>
      </div>

      <div className="text-base text-gray-700 mb-4">
        <p className="font-semibold">Delivering at:</p>
        <p>{user?.address}</p>
        <p>Phone: {user?.phone}</p>
      </div>

      <div className="text-base text-gray-700 mb-6">
        <p className="font-semibold">Payment Status:</p>
        <p>{orderData.order.paymentStatus}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
