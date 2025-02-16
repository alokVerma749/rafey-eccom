import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <ShoppingCart size={80} className="text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700">Your Cart is Empty</h2>
      <p className="text-gray-500 mt-2">Looks like you haven’t added anything yet!</p>
      <Link href="/shop">
        <Button className="mt-4 px-6 py-3 text-lg">Start Shopping</Button>
      </Link>
    </div>
  );
};

export default EmptyCart;
