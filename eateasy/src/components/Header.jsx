import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../util/Http";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/feature/userSlice";


const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOutHandler = () => {
    signOut();
    dispatch(setCurrentUser(null));
    navigate("/sign-in");
  };


  return (
    <header className="bg-neutral text-neutral-content">
      <div className="flex justify-between mx-auto w-5/6 items-center p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex-wrap">EatEasy</h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden md:inline hover:underline cursor-pointer">Home</li>
          </Link>
          <Link to="/offer">
            <li className="md:inline hover:underline cursor-pointer">Offer</li>
          </Link>
          {currentUser ? (
            <>
              <Link to="profile">{currentUser.username ? currentUser.username : ""}</Link>
              <span className="cursor-pointer hover:underline" onClick={signOutHandler}>
                Logout
              </span>
            </>
          ) : (
            <Link to="sign-in">
              <li className=" hover:underline cursor-pointer">Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
