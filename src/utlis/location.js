
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../redux/features/auth/selector/selector";
import { logout } from "../redux/features/auth/slice";
import { setloadingFalse, setloadingTrue } from "../redux/features/Loader/slice";
import { location } from "../redux/features/location/selector";
import { setLocation } from "../redux/features/location/slice";
import { storeRestaurant } from "../redux/features/restaurants/slice";
import { serviceGet } from "./api";




export const useRestaurants = () => {
  const loc = useSelector(location);
  const u = useSelector(user);
  const dispatch = useDispatch();
  const getRest = async () => {
    dispatch(setloadingTrue());
    try {
      const { restaurants } = await serviceGet(`restaurant?latitude=${loc?.latitude}&longitude=${loc.longitude}&email=${u?.email}`);
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
    if (loc.ready) {
      getRest();
    }
  }, [loc])

}