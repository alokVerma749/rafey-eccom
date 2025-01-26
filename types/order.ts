import { UserAccount } from "@/models/user_model";
import { Product } from "./product_type";

export interface Order {
    _id: string;
    createdAt: string;
    user: string;
    products: Product[];
    totalAmount: number;
    paymentStatus: string;
    orderStatus: string;
    paymentId: string;
    razorpayOrderId: string;
}
