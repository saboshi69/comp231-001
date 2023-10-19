import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signUp, signIn, updateUser } from "../util/Http";
import { useMutation } from "@tanstack/react-query";
import { setCurrentUser } from "../redux/feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const AuthForm = ({ mode, username, email }) => {
  AuthForm.propTypes = {
    mode: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
  };

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser?._id;

  const mutationOptions = {
    signUp: {
      mutationFn: signUp,
      onSuccess: () => navigate("/sign-in"),
      onError: () => navigate("/sign-up"),
    },
    signIn: {
      mutationFn: signIn,
      onSuccess: (data) => {
        dispatch(setCurrentUser(data.user));
        navigate("/");
      },
      onError: () => navigate("/sign-in"),
    },
    update: {
      mutationFn: (data) => updateUser(data, userId),
      onSuccess: (data) => {
        dispatch(setCurrentUser(data.user));
        alert("Profile Updated");
      },
      onError: () => navigate("/sign-in"),
    },
  };

  const { mutate, isLoading, isError, error } = useMutation(mutationOptions[mode]);

  const onSubmit = async (data) => {
    data = { ...data, _id: userId };
    mutate(data);
  };

  return (
    <div className="mx-auto w-5/6 p-3 md:w-6/12 xl:w-2/6 ">
      <h1 className="my-12 text-center text-3xl font-semibold">
        {
          {
            signUp: "Sign Up",
            signIn: "Sign In",
            update: "Update Profile",
          }[mode]
        }
      </h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
        {(mode === "signUp" || mode === "update") && (
          <input
            {...register("username")}
            id="username"
            placeholder="username"
            type="text"
            className="rounded-lg border-2 border-solid p-2"
            minLength={3}
            required
            defaultValue={mode === "update" ? username : ""}
          />
        )}
        <input
          {...register("email")}
          id="email"
          placeholder="email"
          type="email"
          required
          className="rounded-lg border-2 border-solid p-2"
          defaultValue={mode === "update" ? email : ""}
        />
        <input
          {...register("password")}
          id="password"
          placeholder="password"
          type="password"
          required
          className="rounded-lg border-2 border-solid p-2"
          minLength={3}
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`cursor-pointer rounded-lg border-2 border-solid bg-slate-500 p-2 text-white hover:bg-slate-200 hover:text-black ${
            isLoading ? " disabled:opacity-70" : ""
          } `}
        >
          {isLoading
            ? "Loading..."
            : { signUp: "Sign Up", signIn: "Sign In", update: "Update" }[mode]}
        </button>
      </form>
      {isError && <p className="mt-4 text-2xl text-red-500">{error.message}</p>}

      {(mode === "signUp" || mode === "signIn") && (
        <div className="mt-5 flex gap-2">
          <p className="">{mode === "signUp" ? "Have an account?" : "Don't have an account?"}</p>
          <Link to={mode === "signUp" ? "/sign-in" : "/sign-up"} className="hover:underline">
            <span className="text-blue-400"> {mode === "signUp" ? "Sign In" : "Sign Up"}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
