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
    images: images,
    menu: menu,
    operatingHours: { opening, closing },
    ratings,
  });

  try {
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchRestaurant = async (req, res) => {
  const searchQuery = req.body.searchQuery;
  try {
    const restaurants = await Restaurant.find({
      $or: [
        { restaurantName: { $regex: searchQuery, $options: "i" } },
        { address: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ],
    });

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
