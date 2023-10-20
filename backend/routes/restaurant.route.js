import { Router } from "express";
import { createRestaurant } from "../controllers/restaurant.controller.js";

const router = Router();

router.post("/create-restaurant", createRestaurant);

export default router;
