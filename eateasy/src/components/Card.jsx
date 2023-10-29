import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantById } from "../util/Http";

const Card = (props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["review", props._id],
    queryFn: () => getRestaurantById(props._id),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center w-[500px]">
      <h1 className="text-xl">{props.title}</h1>
      <Link to={`/restaurant/${props._id}`} className="">
        <img src={props.image} alt="" className="my-4 " />
      </Link>

      <p className="">
        Rating:{" "}
        {data ? (data.averageRating !== null ? parseFloat(data.averageRating).toFixed(1) : 0) : 0}
      </p>
      <p className="">Address: {props.address}</p>
      <p className="">{props.description}</p>
    </div>
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
