import { FaSearch } from "react-icons/fa";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { getAllRestaurants, searchRestaurant } from "../util/Http";
import HeroImage from "../assets/image/hero.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [recommendedRestaurants, setrecommendedRestaurants] = useState([]);


  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await getAllRestaurants();
      setRestaurants(data);
      // Sort the restaurants based on average ratings and pick the top 5
      const sortedByRatings = [...data].sort((a, b) => b.ratings - a.ratings).slice(0, 5);
      setrecommendedRestaurants(shuffleArray(sortedByRatings.slice(0, 3)));
    };
    fetchRestaurants();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const data = await searchRestaurant(searchTerm);
    urlParams.set("searchTerm", searchTerm.toString() || "");
    navigate("?" + urlParams.toString());
    setRestaurants(data);
  };

  return (
    <div className="max-w-[1024px] mt-6 w-5/6 mx-auto gap-4 flex flex-col">
      <div
        className="hero max-w-[1024px] mx-auto min-h-[420px] rounded-md"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Discover your next favorite dining spot with us! Explore a world of flavors, find local gems, and experience the joy of gastronomy. Whether you're craving something exotic or a classic comfort dish, your culinary adventure starts here.
            </p>
            <a className="btn btn-primary" href="#searchRest">Get Started</a>
          </div>
        </div>
      </div>
      <h3 className="text-3xl">Our Top Recommendations</h3>
      <div className="recommended-restaurants my-8 mx-auto gap-4 flex flex-wrap justify-center">
        {recommendedRestaurants.map((restaurant) => (
          <Card
            key={restaurant._id}
            _id={restaurant._id}
            title={restaurant.restaurantName}
            image={restaurant.images[0]}
            address={restaurant.address}
            description={restaurant.description}
          />
        ))}
      </div>
      <h3 className="text-3xl" id="searchRest">Searching Restaurants</h3>
      <form className="bg-slate-100  max-w-[1024px] mx-auto w-full mt-5 p-2 rounded-lg flex justify-center items-center ">
        <input
          type="text"
          className="bg-transparent outline-none w-24 sm:w-64"
          placeholder="Search Something Here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="text-slate-600 cursor-pointer" onClick={handleSearch} />
      </form>
      <button className="text-xs underline">
        <Link to="/search">Click and Try Our Advanced Search!</Link>
      </button>
      <div className="my-8 mx-auto gap-4 flex flex-wrap justify-center ">
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
