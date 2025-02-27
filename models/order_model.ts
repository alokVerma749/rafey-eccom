import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, //next-auth userId
    ref: 'User',
    required: true
  },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  payableAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'captured', 'failed'],
    default: 'pending'
  },
  paymentId: {
    type: String,
    unique: true
  }, // Razorpay Payment ID
  razorpayOrderId: {
    type: String,
    unique: true
  }, // Razorpay Order ID
  waybill: {
    type: String,
    default: '',
    unique: true,
    sparse: true, // Allows some orders to not have a waybill initially
  }, // Delhivery Waybill Number
  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export default Order;
