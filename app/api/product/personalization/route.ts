import connect_db from "@/config/db";
import { authOptions } from "@/lib/authOptions";
import CartModel, { CartItem } from "@/models/cart-model";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { product_id, cart_id, customization } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    await connect_db();

    const cart = await CartModel.findOne({ _id: cart_id }).exec();
    if (!cart) {
      return new Response(
        JSON.stringify({ error: 'Cart not found' }),
        { status: 404 }
      );
    }

    // Find the item in the cart and apply customization
    const productToAddCustomization = cart.items.find((item: CartItem) => item.productId.toString() === product_id);

    if (!productToAddCustomization) {
      return new Response(
        JSON.stringify({ error: 'Product not found in cart' }),
        { status: 404 }
      );
    }

    productToAddCustomization.customization = customization;
    await cart.save();

    return new Response(
      JSON.stringify({ message: 'Product personalized successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST:", error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
