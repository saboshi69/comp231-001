import { Router } from "express";
import {
  createReview,
  getAllReviews,
  deleteReview,
  updateReview,
  getReviewsForRestaurant,
} from "../controllers/review.controller.js";

const router = Router();

router.post("/create-review", createReview);
router.get("/get-all-reviews", getAllReviews);
router.delete("/delete-review/:id", deleteReview);
router.put("/update-review/:id", updateReview);
router.get("/get-reviews/:id", getReviewsForRestaurant);

export default router;
