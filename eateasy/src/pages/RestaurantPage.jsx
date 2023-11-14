import { useEffect, useState } from "react";
import { getRestaurantById } from "../util/Http";
import { useParams } from "react-router-dom";

import ReviewList from "../components/ReviewList";
import StarRating from "../components/StarRating";

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
      <div className=" flex flex-col p-6 justify-center items-center container mx-auto">
        <div className="carousel w-full max-w-xl mx-auto">
          {restaurant.images.map((img, index) => (
            <div key={index} id={`slide${index}`} className="carousel-item relative w-full">
              <img src={img} alt={`slide ${index}`} className="carousel-item relative w-full" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`#slide${index == 0 ? restaurant.images.length - index - 1 : index - 1}`} className="btn btn-circle">❮</a>
                <a href={`#slide${index == restaurant.images.length - 1 ? 0 : index + 1}`} className="btn btn-circle">❯</a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center"><h1 className="text-xl font-bold my-4 mx-2">{restaurant.restaurantName}</h1><StarRating rating={Math.round(restaurant.averageRating * 10) / 10} /></div>
        <div className="flex flex-col w-full max-w-xl">
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
          <div className="mb-4">
            <strong>Menu:</strong>
            <ul className="list-disc pl-5">
              {restaurant.menu.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <h1 className="mt-7 font-bold block text-left w-full max-w-xl">Review</h1>
        <ReviewList restaurantId={restaurantId} />
      </div>
    )
  );
};

export default RestaurantPage;
