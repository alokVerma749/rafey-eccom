import Order from "@/models/order_model";
import Payment from "@/models/payment_model";
import { NextRequest, NextResponse } from "next/server";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

export async function POST(req: NextRequest) {
  try {
    const webhookSignature = req.headers.get("x-razorpay-signature") || "";
    const body = await req.json();
    const isValid = await validateWebhookSignature(webhookSignature, body, process.env.RAZORPAY_WEBHOOK_SECRET || "");
    console.log(req, "Webhook received");
    if (!isValid) {
      return new NextResponse("Invalid webhook signature", { status: 400 });
    }

    const paymentDetails = body.payload.payment.entity;
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();

    if (body.event === "payment.captured") {
      const order = await Order.findOne({ razorpayOrderId: paymentDetails.order_id });
      order.paymentStatus = "captured";
      await order.save();
    }
    if (body.event === "payment.failed") {
      const order = await Order.findOne({ razorpayOrderId: paymentDetails.order_id });
      order.paymentStatus = "failed";
      await order.save();
    }
    return new NextResponse("Webhook received", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Invalid webhook signature", { status: 400 });
  }
}
