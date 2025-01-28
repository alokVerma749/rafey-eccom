import Order from "@/models/order_model";

export const getOrders = async (userId: string) => {
  const orders = await Order.find({ user: userId });
  return JSON.stringify(orders);
};

export const getOrder = async (orderId: string) => {
  const order = await Order.findById(orderId);
  return JSON.stringify(order);
};

