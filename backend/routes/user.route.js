import { Router } from "express";

import {
  updateProfile,
  getUserReviews,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/auth.js";

const router = Router();

router.put("/update/:id", verifyUser, updateProfile);
router.get("/reviews/:id", verifyUser, getUserReviews);

export default router;
