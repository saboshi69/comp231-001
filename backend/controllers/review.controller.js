import Review from "../models/review.model.js";
import mongoose from "mongoose";

export const createReview = async (req, res) => {
  const { restaurant, user, text, rating, date } = req.body;

  const newReview = new Review({
    user,
    restaurant,
    text,
    rating,
    date,
  });

  try {
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "username").exec();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No review with that id");

  await Review.findByIdAndRemove(id);

  res.json({ message: "Review deleted successfully" });
};

export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { text, rating } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No review with that id");

  const updatedReview = { text, rating, _id: id };

  await Review.findByIdAndUpdate(id, updatedReview, { new: true });

  res.json(updatedReview);
};
