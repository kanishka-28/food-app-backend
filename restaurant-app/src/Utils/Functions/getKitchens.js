import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setloadingFalse, setloadingTrue } from "../../Redux/Features/Loader/Slice";
import { isReady,getUser, isAuthenticated } from "../../Redux/Features/Auth/Selector/Selector";
import { serviceGet } from "../Api/api";
import { storeAllKitchens } from "../../Redux/Features/Kitchen/Slice";

export const useKitchens = () => {
  
    const ready = useSelector(isReady);
    const user = useSelector(getUser);
    const dispatch = useDispatch();
  
    const getAllKitchens = async () => {
      dispatch(setloadingTrue())
      try {
        const { kitchens } = await serviceGet('kitchen/user');
        dispatch(storeAllKitchens(kitchens));
        console.log(kitchens);
      } catch (error) {
        console.log({error});
        // toast.error(error?.response?.data?.message)
      }
      finally {
        dispatch(setloadingFalse());
      }
    }
  
    useEffect(() => {
      if (ready) {
        getAllKitchens();
      }
    }, [ready,user])
  }