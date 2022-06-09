import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import AddFood from "./pages/AddFood/AddFood";
import AuthWrapper from "./pages/Auth/AuthWrapper";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home/Home";
import AllOrders from "./pages/Orders/AllOrders";
import EditRestaurant from "./pages/Restaurant/EditRestaurant";
import Restaurant from "./pages/Restaurant/Restaurant";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />   
          <Route path="/restaurant" element={<Restaurant />} />   
          <Route path="/edit" element={<EditRestaurant />} />   
          <Route path="/food" element={<Navbar />} >
            <Route path="add" element={<AddFood />} />
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
