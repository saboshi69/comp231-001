import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantById } from "../util/Http";

const Card = (props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["review", props._id],
    queryFn: () => getRestaurantById(props._id),
  });

  const roundedRating = data ? (data.averageRating !== null ? parseFloat(data.averageRating).toFixed(1) : 0) : 0;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="card card-normal w-72 glass overflow-hidden">
      <Link to={`/restaurant/${props._id}`} className="">
        <figure className="relative block w-full pb-[60%]"><img className="absolute w-full h-full top-0 left-0 object-cover" src={props.image} alt="" /></figure>
        <div className="card-body">
          <h3 className="card-title">{props.title}</h3>
          <div>
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
            <p className=""><span className="font-bold">Address:</span> {props.address}</p>
            <p className="line-clamp-3"><span className="font-bold">Detail:</span>{props.description}</p>
          </div>
        </div>
      </Link>
    </div >
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,

  _id: PropTypes.string.isRequired,
};

export default Card;
