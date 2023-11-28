import { Router } from "express";
import {
  createRestaurant,
  getAllRestaurants,
  searchRestaurant,
  getRestaurantById,
  getSearchedRestaurants,
  editRestaurantInfo,
} from "../controllers/restaurant.controller.js";

import {
  addCouponToRestaurant,
  deleteCouponFromRestaurant,
} from "../controllers/coupon.controller.js";

// Import other restaurant controller functions as before

const router = Router();

// Existing routes
router.post("/create-restaurant", createRestaurant);
router.get("/get-all-restaurants", getAllRestaurants);
router.post("/search-restaurant", searchRestaurant);
router.get("/get-restaurant/:id", getRestaurantById);
router.get("/get-searched-restaurants", getSearchedRestaurants);

// New routes for coupon management and editing restaurant info
router.post("/add-coupon/:restaurantId", addCouponToRestaurant);
router.delete(
  "/delete-coupon/:restaurantId/:couponId",
  deleteCouponFromRestaurant
);
router.put("/edit-restaurant/:id", editRestaurantInfo);

export default router;
