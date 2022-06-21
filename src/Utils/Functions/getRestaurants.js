import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setloadingFalse, setloadingTrue } from "../../Redux/Features/Loader/Slice";
import { isReady,getUser } from "../../Redux/Features/Auth/Selector/Selector";
import { storeAllRestaurants } from "../../Redux/Features/Restaurant/Slice";
import { serviceGet } from "../Api/Api";

export const useRestaurants = () => {
  
    const ready = useSelector(isReady);
    const user = useSelector(getUser);
    const dispatch = useDispatch();
  
    const getAllRestaurants = async () => {
      dispatch(setloadingTrue())
      try {
        const { restaurants } = await serviceGet('restaurant/user',);
        dispatch(storeAllRestaurants(restaurants));
      } catch (error) {
        console.log({ error });
        toast.error(error?.response?.data?.message)
      }
      finally {
        dispatch(setloadingFalse());
      }
    }
  
    useEffect(() => {
      if (ready) {
        getAllRestaurants();
      }
    }, [ready,user])
  
  
  }