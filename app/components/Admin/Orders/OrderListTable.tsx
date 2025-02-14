import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Order } from "@/types/order";
import { Product } from "@/types/product_type";

function OrderListTable({ order, products }: { order: Order; products: Product[] }) {
  // Calculate subtotal
  const subtotal = order.products.reduce((sum, product) => {
    const productOrder = order.products.find((p: any) => p.product[0]._id === product._id);
    return sum + (productOrder?.totalPrice || 0);
  }, 0); // TODO: fix this

  const taxRate = 0.2; // 20%
  const taxAmount = subtotal * taxRate;
  const discount = 0; // Assuming no discount for now
  const shippingRate = 0; // Assuming free shipping for now
  const total = subtotal + taxAmount - discount + shippingRate;

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
                  <TableCell className="text-right">₹{(product[0]?.price || 0).toFixed(2)}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
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
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span>Tax (20%)</span>
            <span>₹{taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span>Discount</span>
            <span>₹{discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span>Shipping Rate</span>
            <span>₹{shippingRate.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default OrderListTable;
