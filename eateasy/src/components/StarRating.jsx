import { number } from "prop-types";

const StarRating = ({ rating }) => {
  const roundedRating = Math.round(rating);

  return (
    <div className="rating flex gap-1">
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          style={{ opacity: index <= roundedRating ? 1 : 0.2 }}
          className="star bg-red-500 text-white p-1 rounded-md w-6 h-6 flex justify-center items-center"
        >
          ★
        </span>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: number.isRequired,
};

export default StarRating;
