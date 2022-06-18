import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Loader from "./Components/Loader/Loader";
import Navbar from "./Components/Navbar/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AuthWrapper from "./pages/Auth/AuthWrapper";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home/Home";
import NotFound from "./pages/Not Found/404";
import AllOrders from "./pages/Orders/AllOrders";
import Profile from "./pages/Profile/Profile";
import EditRestaurant from "./pages/Restaurant/EditRestaurant";
import Restaurant from "./pages/Restaurant/Restaurant";
import { loadUser } from "./Redux/Features/Auth/Slice";
import { loading } from "./Redux/Features/Loader/Selector/Selector";
import { setloadingFalse, setloadingTrue } from "./Redux/Features/Loader/Slice";
import { useRestaurants } from "./Utils/Functions/getRestaurants";
import ScrollToTop from "./Utils/Functions/ScrollToTop";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(loading);
  const loadUserAbout = async () => {
    dispatch(setloadingTrue());
    await dispatch(loadUser());
  };

  useRestaurants();

  useEffect(() => {

    loadUserAbout();

  }, [])
  return (
    <>
      {isLoading && (<Loader />)}
      <div><Toaster /></div>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
          <Route path="/restaurant" >
            <Route path=":id" element={<ProtectedRoute><Restaurant /></ProtectedRoute>} />
            <Route path="add" element={<ProtectedRoute><EditRestaurant /></ProtectedRoute>} />
            <Route path="edit" element={<ProtectedRoute><EditRestaurant edit={true} /></ProtectedRoute>} />
          </Route>
          <Route path="/auth" element={<AuthWrapper />} >
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/about" element={<Navbar />} >
            <Route path="orders" element={<ProtectedRoute><AllOrders /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Router>
    </>
  );
}

export default App;
