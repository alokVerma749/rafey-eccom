'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/types/product_type';

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
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { order_id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/order?orderId=${order_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order data.');
        }
        const fetchedOrder: {message: string, order: OrderData} = await response.json();
        setOrderData(fetchedOrder.order);


        // Fetch products for the order
        const productResponses = await Promise.all(
          fetchedOrder.order.products.map((product: any) =>
            fetch(`/api/product?productId=${product.product}`)
          )
        );

        const productData = await Promise.all(productResponses.map((res) => res.json()));
        setProducts(productData.map((data) => data.product));

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Order Details</h1>
      <div>
        <h2>Order ID: {orderData._id}</h2>
        <p>Order Date: {new Date(orderData.createdAt).toLocaleDateString()}</p>
        <p>Order Status: {orderData.orderStatus}</p>
        <p>Total Amount: {orderData.totalAmount}</p>
        <p>Payment ID: {orderData.paymentId}</p>
        <p>Payment Status: {orderData.paymentStatus}</p>

        <div>
          <h2>Products</h2>
          {products.length === 0 ? (
            <p>No products found for this order.</p>
          ) : (
            products.map((product) => (
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
