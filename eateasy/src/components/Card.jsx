import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
      <h1 className="text-xl">{props.title}</h1>
      <Link to={`/restaurant/${props._id}`}>
        <img src={props.image} alt="" className="my-4 h-[300px]" />
      </Link>
      <p className="">Rating: {props.ratings}</p>
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
  ratings: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
};

export default Card;
