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
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content mb-24 max-w-5xl flex-col lg:flex-row-reverse">
        <div className="ml-10 text-center lg:text-left">
          <h1 className="text-5xl font-bold">{
            {
              signUp: "Sign Up",
              signIn: "Sign In",
              update: "Update Profile",
            }[mode]
          }</h1>
          <p className="py-6">Welcome! Sign in to access your personalized dashboard, manage your orders, and explore our delightful offerings. We&apos;re committed to making your experience seamless and enjoyable.</p>
          {(mode === "signUp" || mode === "signIn") && (
            <div className="mt-5">
              <p className="">{mode === "signUp" ? "Have an account?" : "Don't have an account?"}</p>
              <Link to={mode === "signUp" ? "/sign-in" : "/sign-up"} className="hover:underline">
                <span className="text-blue-400"> {mode === "signUp" ? "Sign In" : "Sign Up"}</span>
              </Link>
            </div>
          )}
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            {(mode === "signUp" || mode === "update") && (

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  {...register("username")}
                  id="username"
                  placeholder="username"
                  type="text"
                  className="input input-bordered"
                  minLength={3}
                  required
                  defaultValue={mode === "update" ? username : ""}
                />
              </div>

            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email")}
                id="email"
                placeholder="email"
                type="email"
                required
                className="input input-bordered"
                defaultValue={mode === "update" ? email : ""}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password")}
                id="password"
                placeholder="password"
                type="password"
                required
                className="input input-bordered"
                minLength={3}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`btn btn-primary mt-6 ${isLoading ? " disabled:opacity-70" : ""
                } `}
            >
              {isLoading
                ? "Loading..."
                : { signUp: "Sign Up", signIn: "Sign In", update: "Update" }[mode]}
            </button>
          </form>
          {isError && <p className="mt-4 text-2xl text-red-500">{error.message}</p>}

        </div>
      </div>
    </div>
  );
};

export default AuthForm;
