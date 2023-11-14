import { number } from "prop-types";

const StarRating = ({ rating }) => {
    const roundedRating = Math.round(rating);

    return (
        <div className="rating">
            {[1, 2, 3, 4, 5].map((index) => (
                <input
                    key={index}
                    type="radio"
                    name={`rating-${roundedRating}`}
                    className="mask mask-star-2 bg-orange-400"
                    checked={index <= roundedRating}
                    readOnly // This makes the rating read-only
                />
            ))}
        </div>
    );
};


StarRating.propTypes = {
    rating: number.isRequired,
};

export default StarRating;