import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
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
  description: String,
  images: [String],
  ratings: {
    type: Number,
    default: 0,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
