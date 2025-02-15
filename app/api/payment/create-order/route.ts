import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import getProductAction from "@/actions/get-product";
import { Product } from "@/types/product_type";
import Payment from "@/models/payment_model";
import User from "@/models/user_model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const { products, currency, userEmail, address, pincode, phone, name, finalAmount } = await req.json();

    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { message: "Invalid product data" },
        { status: 400 }
      );
    }

    let totalAmount = 0;

    // TODO: check ordered product is available in stock

    for (const { productId, quantity } of products) {
      const response: string = await getProductAction({ product_id: productId })
      const product: Product = response ? JSON.parse(response as string) : [];

      if (!product) {
        return NextResponse.json(
          { message: `Product with ID ${productId} not found` },
          { status: 404 }
        );
      }

      totalAmount += product.price * quantity;
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const user = await User.findOne({ email: userEmail });

    const options = {
      amount: finalAmount ? Number(finalAmount.toFixed(0) * 100) : totalAmount * 100,
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        name: name,
        email: userEmail,
        phone: phone,
        address: address,
        pincode: pincode,
      }
    };

    const order = await razorpay.orders.create(options);

    const payment = await Payment.create({
      userId: user?._id, //next-auth userId
      orderId: order.id,
      status: order.status,
      amount: finalAmount ?? totalAmount,
      currency: currency || "INR",
      receipt: order.receipt,
      notes: order.notes,
      address: address,
      pincode: pincode
    })

    return NextResponse.json(
      { message: 'Payment initiated', payment, totalAmount },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { message: 'Failed to create order' },
      { status: 500 }
    );
  }
}
