import { useEffect, useState } from "react";
import { getRestaurantById } from "../util/Http";
import { useParams } from "react-router-dom";

import ReviewList from "../components/ReviewList";

const RestaurantPage = () => {
  const [restaurant, setRestaurant] = useState();
  const [restaurantId, setRestaurantId] = useState();

  const id = useParams().id;

  useEffect(() => {
    const fetchRestaurant = async () => {
      const restaurantData = await getRestaurantById(id);
      setRestaurant(restaurantData);
      setRestaurantId(restaurantData._id);
    };
    fetchRestaurant();
  }, [id]);

  return (
    restaurant && (
      <div className=" flex flex-col p-6 justify-center items-center ">
        <div className="">
          {restaurant.images.map((img, index) => (
            <img key={index} src={img} alt={`Image ${index}`} className="rounded-md shadow-sm " />
          ))}
        </div>

        <h1 className="text-xl font-bold my-4">{restaurant.restaurantName}</h1>
        <p className="mb-2">
          <strong>Address:</strong> {restaurant.address}
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> {restaurant.contactDetails.phoneNumber}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {restaurant.contactDetails.email}
        </p>
        <p className="mb-2">
          <strong>Opening Hours:</strong> {restaurant.operatingHours.opening} to{" "}
          {restaurant.operatingHours.closing}
        </p>
        <p className="mb-2">
          <strong>Description:</strong> {restaurant.description}
        </p>
        <p className="mb-2">
          <strong>Ratings:</strong> {Math.round(restaurant.averageRating * 10) / 10}
        </p>

        <div className="mb-4">
          <strong>Menu:</strong>
          <ul className="list-disc pl-5">
            {restaurant.menu.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <h1 className="my-8">Review</h1>
        <ReviewList restaurantId={restaurantId} />
      </div>
    )
  );
};

export default RestaurantPage;
