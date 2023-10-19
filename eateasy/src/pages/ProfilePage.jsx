import AuthForm from "../components/AuthForm";

import { useDispatch, useSelector } from "react-redux";

import { deleteUser, signOut } from "../util/Http";
import { setCurrentUser } from "../redux/feature/userSlice";

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const deleteUserHandler = () => {
    deleteUser(currentUser._id);
    dispatch(setCurrentUser(null));
  };

  const signOutHandler = () => {
    signOut();
    dispatch(setCurrentUser(null));
  };

  return (
    <>
      <AuthForm mode="update" username={currentUser.username} email={currentUser.email} />

      <div className="mx-auto mt-5 flex w-full justify-between p-3">
        <span className="cursor-pointer text-red-600" onClick={deleteUserHandler}>
          Delete Account
        </span>
        <span className="cursor-pointer text-red-600" onClick={signOutHandler}>
          Sign Out
        </span>
      </div>
    </>
  );
};

export default ProfilePage;
