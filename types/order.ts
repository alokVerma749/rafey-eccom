import { Product } from "./product_type";

export interface Order {
    _id: string;
    createdAt: string;
    user: string;
    products: Product[];
    totalAmount: number;
    payableAmount: number;
    paymentStatus: string;
    orderStatus: string;
    paymentId: string;
    razorpayOrderId: string;
}
