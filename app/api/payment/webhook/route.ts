import Order from "@/models/order_model";
import Payment from "@/models/payment_model";
import { NextRequest, NextResponse } from "next/server";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

export async function POST(req: NextRequest) {
  try {
    const webhookSignature = req.headers.get("X-Razorpay-Signature") || "";
    const body = await req.json();
    const isValid = await validateWebhookSignature(JSON.stringify(body), webhookSignature, process.env.RAZORPAY_WEBHOOK_SECRET as string);

    if (!isValid) {
      return new NextResponse("Invalid webhook signature", { status: 400 });
    }

    const paymentDetails = body.payload.payment.entity;

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();

    if (body.event === "payment.captured") {
      const order = await Order.findOne({ razorpayOrderId: paymentDetails.order_id });

      if (!order) {
        return new NextResponse("Order not found", { status: 404 });
      }

      order.paymentStatus = "captured";
      await order.save();
    }

    if (body.event === "payment.failed") {
      const order = await Order.findOne({ razorpayOrderId: paymentDetails.order_id });
      if (!order) {
        return new NextResponse("Order not found", { status: 404 });
      }

      order.paymentStatus = "failed";
      await order.save();
    }

    return new NextResponse("Webhook received", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid webhook signature", { status: 400 });
  }
}
