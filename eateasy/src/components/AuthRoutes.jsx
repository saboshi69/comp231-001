import { useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const AuthRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = currentUser && currentUser.username === "admin";

  useEffect(() => {
    if (!currentUser) {
      navigate("/sign-in");
    } else if (location.pathname.startsWith("/admin") && !isAdmin) {
      navigate("/sign-in");
    }
  }, [currentUser, isAdmin, navigate, location]);

  return <Outlet />;
};

export default AuthRoutes;
