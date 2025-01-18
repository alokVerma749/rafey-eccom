import { NextRequest, NextResponse } from 'next/server';
import connect_db from '@/config/db';
import Cart from '@/models/cart-model';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { email, items }: { email: string; items: Array<any> } = await request.json();
    if (!email || !items) {
      return NextResponse.json(
        { error: 'Missing required fields: email and items' },
        { status: 400 }
      );
    }

    await connect_db();

    let cart = await Cart.findOne({ email }).exec();

    if (!cart) {
      cart = new Cart({ email, items });
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
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }
    const url = new URL(request.url);
    const email = url.searchParams.get('userId');

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Missing required query parameter: userId' }),
        { status: 400 }
      );
    }

    await connect_db();
    const cart = await Cart.findOne({ email }).exec();

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

// Clear Cart (DELETE)
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userEmail } = await request.json();
    const result = await Cart.deleteMany({ email: userEmail });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'No cart found for this user' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Cart cleared successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json({ message: 'Failed to clear cart' }, { status: 500 });
  }
}
