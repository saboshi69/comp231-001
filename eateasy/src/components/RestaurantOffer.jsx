import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const RestaurantOffer = ({ restaurant, offer }) => {
  const [redeemedCode, setRedeemedCode] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * offer.length);
    setSelectedOffer(offer[randomIndex]);
  }, [offer]);

  const handleRedeemClick = () => {
    setRedeemedCode(crypto.randomUUID().slice(0, 7));
  };

  return (
    <div className="flex justify-between border-2 rounded-lg p-2 items-center gap-4">
      <div className="flex-1">
        <img src={restaurant.images[0]} alt="image" className="w-full" />
        <h1 className="font-bold">{restaurant.restaurantName}</h1>
      </div>
      <p className="font-semibold w-3/5">{selectedOffer}</p>
      {!redeemedCode ? (
        <button onClick={handleRedeemClick} className="border-2 bg-slate-800 text-white p-2">
          Redeem
        </button>
      ) : (
        <p className="bg-slate-500 text-white p-2">{redeemedCode}</p>
      )}
    </div>
  );
};
RestaurantOffer.propTypes = {
  restaurant: PropTypes.object.isRequired,
  offer: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RestaurantOffer;
