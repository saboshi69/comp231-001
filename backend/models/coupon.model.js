import mongoose from "mongoose";

// Define the coupon schema
const couponSchema = new mongoose.Schema({
  couponId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  title: {
    type: String,
    required: true,
  },
  shortDescription: String,
  longDescription: String,
});

// Create the Coupon model
const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
