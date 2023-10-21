import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { submitReview, queryClient, updateReview } from "../util/Http";
import { useParams } from "react-router-dom";

const ReviewForm = ({ mode, reviewId, desc, rating }) => {
  ReviewForm.propTypes = {
    mode: PropTypes.string,
    reviewId: PropTypes.string,
    desc: PropTypes.string,
    rating: PropTypes.number,
  };

  const { register, handleSubmit, reset } = useForm();
  const restaurantId = useParams().id;
  const currentUser = useSelector((state) => state.user.currentUser);

  const mutationOptions = {
    create: {
      mutationFn: submitReview,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["review"] });
      },
      onError: () => {
        alert("Error submitting form");
      },
    },
    update: {
      mutationFn: (data) => updateReview(data, reviewId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["review"] });
      },
      onError: () => {
        alert("Error submitting form");
      },
    },
  };

  const { mutate, isLoading, isError } = useMutation(mutationOptions[mode]);

  const onSubmit = (data) => {
    const userId = currentUser?._id;
    data = { ...data, user: userId, restaurant: restaurantId, _id: reviewId };
    mutate(data);
    reset({ text: "", rating: "" });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 space-y-4 border rounded-md shadow-md w-full"
    >
      <div className="flex flex-col space-y-2">
        <h1 className="font-semibold text-xl text-center">
          {mode === "create" ? "Create a Review" : "Edit Review"}
        </h1>
        <label htmlFor="text" className="font-bold">
          Review:
        </label>
        <textarea
          {...register("text")}
          id="text"
          defaultValue={desc}
          className="p-2 w-full border rounded-md resize-none"
        ></textarea>
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="rating" className="font-bold">
          Rating:
        </label>
        <input
          type="number"
          {...register("rating")}
          id="rating"
          max={5}
          min={0}
          defaultValue={rating}
          className="p-2 w-full border rounded-md"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        Submit
      </button>
      {isLoading && <span className="block mt-2 text-gray-500">Loading...</span>}
      {isError && <span className="block mt-2 text-red-500">Error submitting form</span>}
    </form>
  );
};

export default ReviewForm;
