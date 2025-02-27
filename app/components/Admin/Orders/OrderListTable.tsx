'use client';

import { Dispatch, SetStateAction, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Order } from "@/types/order";
import { Product } from "@/types/product_type";

function OrderListTable({ order, products, setTotalWeight }: { order: Order; products: Product[], setTotalWeight: Dispatch<SetStateAction<number>>}) {
  const discount = (order.totalAmount - order.payableAmount) || 0;

  useEffect(() => {
    const totalWeight = products.reduce((acc, product) => {
      const productOrder = order.products.find((p: any) => p.product === product[0]._id);
      console.log(productOrder);
      return acc + (product[0]?.weight || 0) * (productOrder?.quantity || 0);
    }, 0);
    setTotalWeight(totalWeight);
  }, [products, order.products, setTotalWeight]);

  return (
    <div className="p-4 shadow-md border rounded-lg m-2">
      <h2 className="font-semibold p-2 text-2xl">Order Details</h2>
      <Separator />
      <Table>
        <TableHeader>
          <TableRow className="text-base font-semibold">
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Height</TableHead>
            <TableHead>Width</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => {
              const productOrder = order.products.find((p: any) => p.product === product[0]._id);
              return (
                <TableRow key={product[0]._id}>
                  <TableCell className="font-medium">{product[0].name}</TableCell>
                  <TableCell>{productOrder?.quantity || 0}</TableCell>
                  <TableCell>{product[0]?.height || 0} cm</TableCell>
                  <TableCell>{product[0]?.width || 0} cm</TableCell>
                  <TableCell>{product[0]?.weight || 0} grams</TableCell>
                  <TableCell className="text-right">₹{(((product[0]?.price) || 0) * (productOrder?.quantity || 0)).toFixed(2)}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No products found in this order.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Price Summary Section */}
      <div className="mt-4 p-4 flex justify-end">
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Subtotal</span>
            <span>₹{order.totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span>Discount</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total Payable</span>
            <span>₹{(order.payableAmount.toFixed(2))}</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default OrderListTable;
