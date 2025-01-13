import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  paymentId: { type: String, required: true },
  status: { type: String, enum: ['created', 'successful', 'failed'], required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
export default Payment;
