import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/HomePage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../src/util/Http";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import Profile from "./pages/ProfilePage";
import AuthRoutes from "./components/AuthRoutes";
import CreateRestaurant from "./pages/CreateRestaurantPage";
import Restaurant from "./pages/RestaurantPage";
import Footer from "./components/Footer";
import AdvanceSearchPage from "./pages/AdvanceSearchPage";
import OfferPage from "./pages/OfferPage";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/search" element={<AdvanceSearchPage />} />
          <Route element={<AuthRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/create-restaurant" element={<CreateRestaurant />} />
            <Route path="/offer" element={<OfferPage />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
