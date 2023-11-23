import { useState } from "react";
import { getAllRestaurants } from "../util/Http";
import { useQuery } from "@tanstack/react-query";

const OfferPage = () => {
  const [redeemedCodes, setRedeemedCodes] = useState({});
  const { data, isLoading } = useQuery({
    queryKey: ["restaurant"],
    queryFn: () => getAllRestaurants(),
  });

  const handleRedeemClick = (id) => {
    setRedeemedCodes((prevCodes) => ({
      ...prevCodes,
      [id]: crypto.randomUUID().slice(0, 7),
    }));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const offer = [
    `GET UP TO ${Math.round(Math.random() * (50 - 20) + 20)}% OFF`,
    `Celebrate your special day with us and let us add some extra sweetness to your celebration`,
    "Enjoy 2-for-1 deals on selected drinks and appetizers from 5 PM to 7 PM every weekday",
    "Bring your family for a delightful dinner at our restaurant and kids eat for free",
    "Visit us between 4 PM and 6 PM and enjoy a 15% discount",
    "Every Monday, we spotlight our vegetarian and vegan dishes. Enjoy a 10% discount on all plant-based menu items",
  ];

  return (
    <div className="lg:w-3/5 w-4/5 mx-auto flex flex-col gap-4 my-8">
      {data.map((restaurant) => (
        <div
          key={restaurant._id}
          className="flex justify-between border-2 rounded-lg p-2 items-center gap-4"
        >
          <div className="flex-1">
            <img src={restaurant.images[0]} alt="image" className="w-full" />
            <h1 className="font-bold">{restaurant.restaurantName}</h1>
          </div>
          <p className="font-semibold w-3/5">
            {offer[Math.round(Math.random() * (offer.length - 1))]}
          </p>
          {!redeemedCodes[restaurant._id] ? (
            <button
              onClick={() => handleRedeemClick(restaurant._id)}
              className="border-2 bg-slate-800 text-white p-2"
            >
              Redeem
            </button>
          ) : (
            <p className="bg-slate-500 text-white p-2">{redeemedCodes[restaurant._id]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default OfferPage;
