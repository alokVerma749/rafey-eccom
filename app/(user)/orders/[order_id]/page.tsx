'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/types/product_type';
import Loader from '@/app/components/Loader';

type OrderData = {
  _id: string;
  createdAt: string;
  orderStatus: string;
  products: Product[];
  totalAmount: number;
  paymentId: string;
  paymentStatus: string;
};

function Page() {
  const [orderData, setOrderData] = useState<{ order: OrderData; productDetails: Product[] } | null>(null);
  const { order_id } = useParams();

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

    fetchOrder();
  }, [order_id]);

  if (!orderData) {
    return <div><Loader /></div>;
  }

  console.log(orderData);

  return (
    <div>
      <h1>Order Details</h1>
      <div>
        <h2>Order ID: {orderData.order._id}</h2>
        <p>Order Date: {new Date(orderData.order.createdAt).toLocaleDateString()}</p>
        <p>Order Status: {orderData.order.orderStatus}</p>
        <p>Total Amount: {orderData.order.totalAmount}</p>
        <p>Payment ID: {orderData.order.paymentId}</p>
        <p>Payment Status: {orderData.order.paymentStatus}</p>

        <div>
          <h2>Products</h2>
          {orderData.productDetails.length === 0 ? (
            <p>No products found for this order.</p>
          ) : (
            orderData.productDetails.map((product) => (
              <div key={product._id}>
                <h3>{product.name}</h3>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
