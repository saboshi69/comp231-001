import { useQuery } from "@tanstack/react-query";
import { getReview, deleteReview, queryClient } from "../util/Http";
import { useSelector } from "react-redux";
import ReviewForm from "./ReviewForm";
import { useState } from "react";
import PropTypes from "prop-types";
import StarRating from "./StarRating";

const ReviewList = ({ restaurantId }) => {
  ReviewList.propTypes = {
    restaurantId: PropTypes.string.isRequired,
  };

  const currentUser = useSelector((state) => state.user.currentUser);
  const [mode, setMode] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState("");
  const [reviewId, setReviewId] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["review", restaurantId],
    queryFn: () => getReview(restaurantId),
  });

  const deleteHandler = async (id) => {
    await deleteReview(id);
    queryClient.refetchQueries(["review"]);
  };

  const reviewsArray = Array.isArray(data) ? data : [data];

  return (
    <>
      {isLoading && <p>Loading...</p>}

      {data &&
        reviewsArray.map((review) => (
          <div
            key={review._id}
            className="w-full max-w-xl my-3 bg-white shadow-md rounded-lg p-4 text-center"
          >
            <div className="p-4">
              <div className="flex justify-between">
                <p className="font-semibold">{review.user?.username}</p>
                <p className="text-gray-500">{review.createdAt}</p>
                <StarRating rating={review.rating} />
              </div>
              <hr className="mt-4" />
              <p className="text-lg font-medium mt-4 break-words text-left">{review.text}</p>

              {currentUser?._id === review.user?._id && (
                <div className="flex justify-end">
                  <button
                    className="text-blue-500 hover:text-blue-600 mr-4"
                    onClick={() => {
                      setMode("update");
                      setReviewId(review._id);
                      setDesc(review.text);
                      setRating(review.rating);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => {
                      deleteHandler(review._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

      {currentUser && (
        <>
          {mode !== "create" && (
            <button onClick={() => setMode("create")} className="btn btn-secondary">
              Create a Review
            </button>
          )}

          {mode !== "" && (
            <ReviewForm mode={mode} reviewId={reviewId} desc={desc} rating={Number(rating)} />
          )}
        </>
      )}
    </>
  );
};

export default ReviewList;
