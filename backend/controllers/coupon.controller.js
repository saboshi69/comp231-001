import Coupon from "../models/coupon.model.js";

export const addCouponToRestaurant = async (req, res) => {
  const { restaurantId, couponData } = req.body;

  try {
    const newCoupon = new Coupon(couponData);
    await newCoupon.save();

    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.coupons.push(newCoupon);
    await restaurant.save();

    res.status(200).json({ message: "Coupon added successfully", restaurant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCouponFromRestaurant = async (req, res) => {
  const { restaurantId, couponId } = req.body;

  try {
    await Restaurant.updateOne(
      { _id: restaurantId },
      { $pull: { coupons: couponId } }
    );
    await Coupon.findByIdAndDelete(couponId);

    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
