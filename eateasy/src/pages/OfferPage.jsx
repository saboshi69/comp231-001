import { getAllRestaurants } from "../util/Http";
import { useQuery } from "@tanstack/react-query";
import RestaurantOffer from "../components/RestaurantOffer";

const OfferPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["restaurant"],
    queryFn: () => getAllRestaurants(),
  });

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
      {data.map((restaurant, index) => (
        <RestaurantOffer key={restaurant._id} restaurant={restaurant} offer={offer} isFeatured={index === 0} />
      ))}
    </div>
  );
};

export default OfferPage;
