'use client'

import { DeliveryTracker } from "@/app/components/Profile/DeliveryTracker";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
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
  products: Product[];
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
        setOrderData({ order: fetchedOrder.order, productDetails: fetchedOrder.productDetails });

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
      setUser(userAccountData)
    }

    fetchOrder();
    fetchUser();
  }, [order_id, session.data?.user?.email]);

  if (!orderData) {
    return <div><Loader /></div>;
  }

  console.log(orderData); // plesae go through the resopnse and try to render it appropriately
  const discountPercentage = orderData.productDetails[0].discount?.percentage || 0;
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <ArrowLeft className="cursor-pointer" />
          <h2 className="text-lg font-semibold"><strong>ORDER NO: </strong>{orderData.order._id} </h2>
        </div>
        <span className="text-sm text-gray-500">Estimated 24/07/2024</span>
      </div>

      <DeliveryTracker />

      <h3 className="text-md font-semibold mb-3">ORDER SUMMARY</h3>
      <div className="flex justify-between items-center border border-gray-300 rounded-lg p-4 mb-4">
        <div className="flex justify-start items-center gap-x-6">
          <Image
            src={orderData.productDetails[0]?.images?.medium}
            alt="Solitaire Diamond Ring"
            height={80}
            width={80}
            className="object-cover rounded-md"
          />
          <div className="flex-1 text-sm text-gray-700">
            <p className="font-semibold">{orderData.productDetails[0].name}</p>
            <p><strong>Category: </strong>{orderData.productDetails[0].category}</p>
            <p><strong>Colour: </strong>{orderData.productDetails[0].color}</p>
            <p><strong>Order Date: </strong>{new Date(orderData.productDetails[0].createdAt).toLocaleDateString()}</p>
            <p>{orderData.productDetails[0].description}</p>

          </div>
        </div>
        {discountPercentage > 0 && (
          <div className="flex flex-col items-start justify-start gap-x-4 font-medium">
            <p className="font-semibold text-black text-sm line-through">${orderData.productDetails[0].price}</p>
            <p className="text-green-600 text-sm">{discountPercentage} % OFF</p>
            <p className='text-base font-semibold text-green-600'> ${(orderData.productDetails[0].price - (orderData.productDetails[0].price * discountPercentage) / 100).toFixed(2)}</p>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-700 mb-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span></span>
        </div>
        <div className="flex justify-between">
          <span>Delivery:</span>
          <span className="pr-4">Free</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>TOTAL AMOUNT:</span>
          <p className='text-base font-semibold text-green-600 pr-4'> ${(orderData.productDetails[0].price - (orderData.productDetails[0].price * discountPercentage) / 100).toFixed(2)}</p>
        </div>
      </div>

      <div className="text-sm text-gray-700 mb-4">
        <p><strong>Order updates sent to:</strong> {user?.email} | {user?.phone}</p>
      </div>

      <div className="text-sm text-gray-700 mb-4">
        <p className="font-semibold">Delivering at:</p>
        <p>{user?.address}</p>
        <p>Phone: {user?.phone}</p>
      </div>

      <div className="text-sm text-gray-700 mb-6">
        <p className="font-semibold">Payment ID:</p>
        <p>{orderData.order.paymentId}</p>
      </div>

      <Button className="w-fit bg-indigo-900 text-white flex items-center gap-2 px-10">
        <Download className="w-4 h-4" />
        Download Invoice
      </Button>
    </div>
  );
};

export default OrderDetails;
