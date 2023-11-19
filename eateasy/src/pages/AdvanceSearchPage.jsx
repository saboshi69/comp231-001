import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getSearch } from "../util/Http";
import { useState } from "react";
import Card from "../components/Card";

const AdvanceSearchPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [searchUrl, setSearchUrl] = useState();

  const onSubmit = async (data) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", data?.search?.toString() || "");
    urlParams.set("rate", data?.rate?.toString() || "");
    urlParams.set("review", data?.review?.toString() || "");
    const url = urlParams.toString();
    setSearchUrl(url);
    navigate("/search?" + urlParams.toString());
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurant", searchUrl],
    queryFn: () => getSearch(searchUrl),

    enabled: !!searchUrl,
  });

  return (
    <div className="flex flex-col gap-8 md:flex-row ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 border-b-2 p-8 sm:border-r-2 md:min-h-screen xl:min-w-[350px]"
      >
        <div className="flex items-center gap-4">
          <label htmlFor="search">Search: </label>
          <input
            type="text"
            className="w-full rounded-md border-2 p-1"
            id="search"
            placeholder="Search.."
            {...register("search")}
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="search">Average Review Rate: </label>
          <input
            type="number"
            className="w-full rounded-md border-2 p-1"
            id="search"
            placeholder="rate"
            max={5}
            min={0}
            {...register("rate")}
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="search">Review: </label>
          <input
            type="text"
            className="w-full rounded-md border-2 p-1"
            id="search"
            placeholder="review"
            {...register("review")}
          />
        </div>

        <button className="rounded-md border-2 bg-slate-600 p-2 text-white hover:bg-red-950">
          SEARCH
        </button>
      </form>
      <div className="mx-auto w-5/6">
        <h1 className="mt-4 text-center text-2xl font-semibold">Listing Result</h1>
        <div className=" p-8 text-2xl font-semibold">
          {isLoading && <p>Loading...</p>}
          {isError && <p>{isError}</p>}
          <div className="my-8 mx-auto gap-4 flex flex-wrap justify-between ">
            {data &&
              data.map((restaurant) => (
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
      </div>
    </div>
  );
};

export default AdvanceSearchPage;
