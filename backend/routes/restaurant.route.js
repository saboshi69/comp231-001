import { Router } from "express";
import {
  createRestaurant,
  getAllRestaurants,
  searchRestaurant,
  getRestaurantById,
  getSearchedRestaurants,
} from "../controllers/restaurant.controller.js";

const router = Router();

router.post("/create-restaurant", createRestaurant);
router.get("/get-all-restaurants", getAllRestaurants);
router.post("/search-restaurant", searchRestaurant);
router.get("/get-restaurant/:id", getRestaurantById);
router.get("/get", getSearchedRestaurants);

export default router;
