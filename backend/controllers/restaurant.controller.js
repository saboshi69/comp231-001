import Restaurant from "../models/restaurant.model.js";

export const createRestaurant = async (req, res) => {
  const {
    restaurantName,
    address,
    contactDetails: { phoneNumber, email },
    operatingHours: { opening, closing },
    ratings,
    description,
    images,
    menu,
  } = req.body;

  const newRestaurant = new Restaurant({
    restaurantName,
    address,
    contactDetails: {
      phoneNumber,
      email,
    },
    description,
    images: images, // assuming only one image is provided in the array
    menu: menu,
    operatingHours: { opening, closing },
    ratings, // assuming only one menu item is provided in the array
  });

  try {
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
