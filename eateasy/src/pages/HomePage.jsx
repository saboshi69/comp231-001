import { FaSearch } from "react-icons/fa";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { getAllRestaurants, searchRestaurant } from "../util/Http";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await getAllRestaurants();
      setRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const data = await searchRestaurant(searchTerm);
    urlParams.set("searchTerm", searchTerm.toString() || "");
    navigate("?" + urlParams.toString());
    setRestaurants(data);
  };

  return (
    <div className="w-5/6 mx-auto gap-4 flex flex-col">
      <form className="bg-slate-100 p-2 rounded-lg flex justify-center items-center ">
        <input
          type="text"
          className="bg-transparent outline-none w-24 sm:w-64"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="text-slate-600 cursor-pointer" onClick={handleSearch} />
      </form>
      <button>
        <Link to="/search">Advacned Search</Link>
      </button>
      <div className="my-8 mx-auto gap-4 flex flex-wrap justify-between ">
        {restaurants &&
          restaurants.map((restaurant) => (
            <Card
              key={restaurant._id}
              _id={restaurant._id}
              title={restaurant.restaurantName}
              image={restaurant.images[0]}
              address={restaurant.address}
              description={restaurant.description}
            ></Card>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
