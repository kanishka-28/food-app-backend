import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import AuthWrapper from "./pages/Auth/AuthWrapper";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Master from "./pages/Home/Master";
import Home from "./pages/Home/Home";
import EditProfile from "./pages/Profile/EditProfile";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import Restaurant from "./pages/Restaurant/Restaurant";
import Cart from "./pages/Cart/Cart";
import toast, { Toaster } from "react-hot-toast";
import { loadUser } from "./redux/features/auth/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GoogleLogin from "./pages/Auth/GoogleLogin";

function App() {
  const dispatch = useDispatch();
  
  const user = async()=>{
         await dispatch(loadUser());
  };

  useEffect(() => {
    console.log("app.js useeffect");
   user();
  }, [])
  

  return (
    <>
    <Toaster position="top-center"/>
   
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home/delivery" />} />
          <Route path="/home" element={<Home /> } >
          {/* <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute> } > */}
            <Route index element={<Navigate to="/home/delivery" />} />
            <Route path=":type" element={<Master />} />
          </Route>
          <Route path="search/:searchString" element={<Search/>} />
            <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
        
          <Route path="/auth" element={<AuthWrapper/>}>
            <Route path="login" element={<Login/>} />
            <Route path="signup" element={<Signup/>} />
            <Route path="google/:token" element={<GoogleLogin/>} />
          </Route>
          <Route path="/restaurant/:id" element={<Restaurant />} />
           <Route path="/profile/:tabId" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="*" element={<h1>Error no page found</h1>} />
        
        </Routes>
      </Router>
    </>
  );
}

export default App;
