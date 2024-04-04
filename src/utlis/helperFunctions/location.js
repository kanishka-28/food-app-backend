
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../redux/features/auth/selector/selector";
import { logout } from "../../redux/features/auth/slice";
import { setloadingFalse, setloadingTrue } from "../../redux/features/Loader/slice";
import { location } from "../../redux/features/location/selector";
import { setLocation } from "../../redux/features/location/slice";
import { storeRestaurant } from "../../redux/features/restaurants/slice";
import { serviceGet } from "../connection/api";




export const useRestaurants = () => {
  const loc = useSelector(location);
  const profile = useSelector(user);
  const dispatch = useDispatch();
  const getRest = async () => {
    dispatch(setloadingTrue());
    try {
      const { restaurants } = await serviceGet(`restaurant?latitude=${loc?.latitude}&longitude=${loc.longitude}&email=${profile?.email}`);
     
      dispatch(storeRestaurant(restaurants));
    } catch (error) {
      toast.error(error?.response?.data.message);
      if (error.response.status === 401) {
        dispatch(logout());
      }
    }
    finally {
      dispatch(setloadingFalse());
    }
  }
  useEffect(() => {
    if ( profile?.city || loc.ready ) {
      getRest();
    }
  }, [loc, profile])

}

export const getLocation = async ( dispatch ) => {
  
  dispatch(setloadingTrue());
  toast.success("Loading Location", {
    icon: '⌛'
  })
  if (navigator.geolocation) {

    await navigator.geolocation.getCurrentPosition(showPos, showErr);

    function showPos(position) {
      toast.success("Location Found", {
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