import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const updateProfile = async (req, res) => {
  if (req.userId !== req.params.id) {
    return res
      .status(401)
      .json({ message: "You can only update your profile" });
  }

  let { username, email, password } = req.body;

  if (password) {
    try {
      password = await bcrypt.hash(password, 12);
    } catch (err) {
      return res.status(500).json({ error: "Error hashing password." });
    }
  }

  try {
    const updatedFields = {
      ...(username && { username }),
      ...(email && { email }),
      ...(password && { password }),
    };

    const updatedProfile = await User.findByIdAndUpdate(
      req.userId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedProfile) {
      throw new Error("User not found.");
    }

    const { password: userPassword, ...user } = updatedProfile._doc;
    return res
      .status(200)
      .json({ message: "User updated successfully!", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserReviews = async (req, res) => {
  const userId = req.params.id;

  try {
    const userWithReviews = await User.findById(userId).populate({
      path: "reviews",
      populate: {
        path: "restaurant",
        select: "restaurantName", // Only include the restaurant's name
      },
    });

    if (!userWithReviews) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(userWithReviews.reviews);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
