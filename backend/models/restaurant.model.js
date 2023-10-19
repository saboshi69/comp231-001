import mongoose from "mongoose";

const restaurantSchema = new Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactDetails: {
    phoneNumber: String,
    email: String,
  },
  operatingHours: {
    opening: String,
    closing: String,
  },
  menu: [String],
  images: [String],
  ratings: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
