import AuthForm from "../components/AuthForm";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "../util/Http";
import { setCurrentUser } from "../redux/feature/userSlice";

const ProfilePage = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const isAdmin = currentUser && currentUser.username === "admin";

  const signOutHandler = () => {
    signOut();
    dispatch(setCurrentUser(null));
    navigate("/sign-in");
  };

  return (
    <>
      <AuthForm mode="update" username={currentUser.username} email={currentUser.email} />

      <div className="mx-auto mt-5 flex w-full justify-between p-3">
        {isAdmin && (
          <span className="cursor-pointer text-red-600 mx-auto">
            <Link to="/admin/create-restaurant">Create Restaurant</Link>
          </span>
        )}
        <span className="cursor-pointer text-red-600 mx-auto" onClick={signOutHandler}>
          Sign Out
        </span>
      </div>
    </>
  );
};

export default ProfilePage;
