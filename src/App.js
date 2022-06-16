import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Loader from "./Components/Loader/Loader";
import Navbar from "./Components/Navbar/Navbar";
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

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(loading);
  const loadUserAbout = async () => {
    dispatch(setloadingTrue());
    await dispatch(loadUser());
    // dispatch(setloadingFalse());
  };

  useRestaurants();

  useEffect(() => {
    
    loadUserAbout();

  }, [])
  return (
    <>
    {isLoading && (<Loader/>)}
    <div><Toaster/></div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />   
          <Route path="/restaurant" >
            <Route path=":id" element={<Restaurant/> }/>
            <Route path="add" element={<EditRestaurant/>}/>
            <Route path="edit" element={<EditRestaurant edit={true}/>}/>
            </Route>     
          <Route path="/about" element={<Navbar />} >
            <Route path="orders" element={<AllOrders />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/auth" element={<AuthWrapper/>} >
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
