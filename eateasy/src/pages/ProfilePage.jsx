import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "../util/Http";
import StarRating from "../components/StarRating";

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = currentUser && currentUser.username === "admin";

  // Fetching user reviews based on the currentUser's ID
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["userReviews", currentUser?._id],
    queryFn: () => getUserReviews(currentUser?._id),
    enabled: !!currentUser?._id, // Ensures the query only runs when a user ID is available
  });


  console.log(reviews);

  return (
    <>
      <AuthForm mode="update" username={currentUser.username} email={currentUser.email} />
      <div className="max-w-[1024px] mx-auto">
        <h3 className="text-3xl mt-12 mb-4">My Reviews</h3>
        {isLoading && <p className="my-10">Loading...</p>}
        {reviews && reviews.map((review) => (
          <div key={review._id} className="w-full max-w-xl my-3 bg-white shadow-md rounded-lg p-4 text-center">
            {/* Review content here */}
            <div className="p-4">
              <div className="flex justify-between">
                <p className="text-gray-500">{review.restaurant.restaurantName}</p>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-lg font-medium mt-4 break-words text-left">{review.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-5 flex w-full justify-between p-3 mb-10">
        {isAdmin && (
          <span className="cursor-pointer text-red-600 mx-auto">
            <Link to="/admin/create-restaurant">Create Restaurant</Link>
          </span>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
