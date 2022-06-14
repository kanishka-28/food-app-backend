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
import AllOrders from "./pages/Orders/AllOrders";
import EditRestaurant from "./pages/Restaurant/EditRestaurant";
import Restaurant from "./pages/Restaurant/Restaurant";
import { loadUser } from "./Redux/Features/Auth/Slice";

function App() {
  const dispatch = useDispatch();
  const loadUserAbout = async () => {
    await dispatch(loadUser());
  };

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
            <Route index element={<Restaurant/> }/>
            <Route path="add" element={<EditRestaurant/>}/>
            <Route path="edit" element={<EditRestaurant edit={true}/>}/>
            </Route>   
          <Route path="/filldetails" element={<EditRestaurant />} />   
          {/* we wont be using fill details, we will use /restaurant/add or edit */}
          <Route path="/me" element={<h1>lmao</h1>}/>
          <Route path="/food" element={<Navbar />} >
            <Route path="orders" element={<AllOrders />} />
          </Route>
          <Route path="/auth" element={<AuthWrapper/>} >
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<h1>Error no page found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
