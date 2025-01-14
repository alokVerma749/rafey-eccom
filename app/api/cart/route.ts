import { NextRequest, NextResponse } from 'next/server';
import connect_db from '@/config/db';
import Cart from '@/models/cart-model';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { userId, items }: { userId: string; items: Array<any> } = await request.json();

    if (!userId || !items) {
      return NextResponse.json(
        { error: 'Missing required fields: userId and items' },
        { status: 400 }
      );
    }

    await connect_db();

    let cart = await Cart.findOne({ userId }).exec();

    if (!cart) {
      cart = new Cart({ userId, items });
      await cart.save();
      return NextResponse.json(
        { message: 'Cart created', cart },
        { status: 201 }
      );
    }

    // TODO: need to filter duplicate products
    cart.items = items;
    cart.totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = items.reduce((total, item) => total + item.total, 0);
    await cart.save();

    return NextResponse.json(
      { message: 'Cart updated', cart },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error handling cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required query parameter: userId' }),
        { status: 400 }
      );
    }

    await connect_db();

    const cart = await Cart.findOne({ userId }).exec();
    if (!cart) {
      return new Response(
        JSON.stringify({ error: 'Cart not found for the given userId.' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Cart retrieved successfully', cart }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching cart:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
