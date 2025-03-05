import mongoose, { Schema } from "mongoose";

const DiscountTokenSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  percentage: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  maxUsage: {
    type: Number,
    required: true,
    default: 1,
  },
  usedCount: {
    type: Number,
    default: 0,
  },
  validFrom: {
    type: Date,
    default: Date.now,
  },
  validUntil: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  minCartValue: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: String,
    required: true,
  },
  showOnBanner: {
    type: Boolean,
    default: false,
  },
});

DiscountTokenSchema.pre('save', async function (next) {
  if (this.showOnBanner) {
    await mongoose.models.DiscountToken.updateMany(
      { showOnBanner: true },
      { showOnBanner: false }
    );
  }
  next();
});

const DiscountToken = mongoose.models.DiscountToken || mongoose.model("DiscountToken", DiscountTokenSchema);

export default DiscountToken;
