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
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import Restaurant from "./pages/Restaurant/Restaurant";
import Cart from "./pages/Cart/Cart";
import  toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GoogleLogin from "./pages/Auth/GoogleLogin";
import { loadUser } from "./redux/features/auth/slice";
import {  useRestaurants } from "./utlis/location";
import Loader from "./components/Loader/Loader";
import { isLoading } from "./redux/features/Loader/selector";
import ScrollToTop from "./utlis/scrollToTop";
import { location } from "./redux/features/location/selector";
import { setLocation } from "./redux/features/location/slice";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const { ready } = useSelector(location);
  //to get location
  const getLocation =async ()=>{
    if (!ready) {
      toast.success("Loading Location",{
        icon:'⌛'
      })
      if (navigator.geolocation) {
        
        await navigator.geolocation.getCurrentPosition(showPos, showErr);
  
        function showPos(position) {
          toast.success("Location Found",{
            icon: '🍔'
          })
          dispatch(setLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude }))
        }
        function showErr(err) {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              toast.error("Allow Location Permission, Please")
              break;
            case err.POSITION_UNAVAILABLE:
              toast.error("Location information is unavailable.")
              break;
            case err.TIMEOUT:
              toast.error("The request to get user location timed out.")
              break;
            case err.UNKNOWN_ERROR:
              toast.error("An unknown error occurred.")
              break;
              default:
                toast.error("Something went wrong");
          }
        }
  
      }
      else {
        toast.error("Check permissions, We cant access your location");
      }
  
    }
  }
  
  
  useRestaurants();
 
  const loadUserAbout = async () => {
    await dispatch(loadUser());
  };
  
  useEffect(() => {
    loadUserAbout();
    getLocation();
  },[])


  return (
    <>
    
      <Toaster 
        position="top-center"
        reverseOrder={true}
       />
      {loading && (<Loader />)}
      <Router>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Navigate to="/home/delivery" />} />
          <Route path="/home" element={<Home />} >
            <Route index element={<Navigate to="/home/delivery" />} />
            <Route path=":type" element={<Master />} />
          </Route>
          <Route path="search/:searchString" element={<Search />} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/me" >
            <Route index element={<Navigate to="/me/orders" />} />
            <Route path=":tabId" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Route>
          <Route path="/auth" element={<AuthWrapper />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="google/:token" element={<GoogleLogin />} />
          </Route>


          <Route path="*" element={<h1>Error no page found</h1>} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
