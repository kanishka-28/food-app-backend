import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
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
import { useRestaurants } from "./Utils/Functions/getRestaurants";

function App() {
  const dispatch = useDispatch();
  const loadUserAbout = async () => {
    await dispatch(loadUser());
  };

  useRestaurants();

  useEffect(() => {
   
    loadUserAbout();

  }, [])
  return (
    <>
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
