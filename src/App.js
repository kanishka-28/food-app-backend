import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import AuthWrapper from "./pages/Auth/AuthWrapper";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Master from "./pages/Home/Deciding";
import Home from "./pages/Home/Home";
import EditProfile from "./pages/Profile/EditProfile";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import Restaurant from "./pages/Restaurant/Restaurant";
import Cart from "./pages/Cart/Cart";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster position="top-center"/>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home/delivery" />} />
          <Route path="/home" element={<Home />} >
            <Route index element={<Navigate to="/home/delivery" />} />
            <Route path=":type" element={<Master />} />
          </Route>
          <Route path="search/:searchString" element={<Search/>} />
            <Route path="/cart" element={<Cart/>} />
        
          <Route path="/auth" element={<AuthWrapper/>}>
            <Route path="login" element={<Login/>} />
            <Route path="signup" element={<Signup/>} />
          </Route>
          <Route path="/restaurant/:id" element={<Restaurant />} />
           <Route path="/profile/:tabId" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="*" element={<h1>Error no page found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
