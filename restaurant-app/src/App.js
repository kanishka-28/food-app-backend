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
import SuccessTick from "./pages/Auth/Success";
import AuthWrapper from "./pages/Auth/AuthWrapper";
import ForgetPass from "./pages/Auth/ForgetPass";
import Login from "./pages/Auth/Login";
import ResetPass from "./pages/Auth/ResetPass";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home/Home";
import NotFound from "./pages/Not Found/404";
import AllOrders from "./pages/Orders/AllOrders";
import Profile from "./pages/Profile/Profile";
import EditRestaurant from "./pages/Restaurant/EditRestaurant";
import Restaurant from "./pages/Restaurant/Restaurant";
import { loadUser } from "./Redux/Features/Auth/Slice";
import { loading } from "./Redux/Features/Loader/Selector/Selector";
import { setloadingTrue } from "./Redux/Features/Loader/Slice";
import { useRestaurants } from "./Utils/Functions/getRestaurants";
import ScrollToTop from "./Utils/Functions/ScrollToTop";
import { useKitchens } from "./Utils/Functions/getKitchens";
import EditKitchen from "./pages/Kitchen/EditKitchen";
import Kitchen from "./pages/Kitchen/Kitchen";


function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(loading);
  const loadUserAbout = async () => {
    dispatch(setloadingTrue());
    await dispatch(loadUser());
  };

  useRestaurants();
  useKitchens();

  useEffect(() => {
    loadUserAbout();
  }, [])

  return (
    <>
      {isLoading && (<Loader />)}
      <div><Toaster/></div>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
          <Route path="/restaurant" >
            <Route path=":id" element={<ProtectedRoute><Restaurant /></ProtectedRoute>} />
            <Route path="add" element={<ProtectedRoute><EditRestaurant /></ProtectedRoute>} />
            <Route path="orders/:id" element={<ProtectedRoute><AllOrders /></ProtectedRoute>} />
            <Route path="edit" element={<ProtectedRoute><EditRestaurant edit={true} /></ProtectedRoute>} />
          </Route>
          <Route path="/kitchen" >
            <Route path=":id" element={<ProtectedRoute><Kitchen /></ProtectedRoute>} />
            <Route path="add" element={<ProtectedRoute><EditKitchen /></ProtectedRoute>} />
            <Route path="orders/:id" element={<ProtectedRoute><AllOrders /></ProtectedRoute>} />
            <Route path="edit" element={<ProtectedRoute><EditKitchen edit={true} /></ProtectedRoute>} />
          </Route>
          <Route path="/auth" element={<AuthWrapper />} >
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forget" element={<ForgetPass />} />
            <Route path="reset" element={<ResetPass />} />
            <Route path="success" element={<SuccessTick />} />
          </Route>
          <Route path="/about" element={<Navbar />} >
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
