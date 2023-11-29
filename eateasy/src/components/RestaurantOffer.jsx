import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const RestaurantOffer = ({ restaurant, offer, isFeatured }) => {
  const [redeemedCode, setRedeemedCode] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState("");
  const offerClass = isFeatured ? "bg-orange-300" : "bg-white"; // Example class names

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * offer.length);
    setSelectedOffer(offer[randomIndex]);
  }, [offer]);

  const handleRedeemClick = () => {
    setRedeemedCode(crypto.randomUUID().slice(0, 7));
  };

  return (
    <div className={`${offerClass} flex justify-between rounded-lg p-2 items-center gap-4`}>
      <div className="flex-1">
        <img src={restaurant.images[0]} alt="image" className="w-full" />
        <h1 className="font-bold">{restaurant.restaurantName}</h1>
      </div>
      <div className="w-3/5">
        {isFeatured && (
          <p className="font-bold underline mb-1">Featured Offer</p>
        )}
        <p className="font-semibold">{selectedOffer}</p>
      </div>
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
