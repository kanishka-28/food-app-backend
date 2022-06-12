
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLocation } from "../redux/features/location/slice";


export const GetLocation = async () => {
    const dispatch = useDispatch();
    if (navigator.geolocation) {
        toast("Finding your Location",{
            icon:'⏳',
        })
       await     navigator.geolocation.getCurrentPosition(showPos,showErr);
      
        function showPos(position) {
           
            toast.success("We have your location",{
                icon:'🍲'
            })
           dispatch(setLocation({longitude: position.coords.longitude,latitude:position.coords.latitude}))
        }
        function showErr(err){
            switch(err.code) {
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
              }
        }
        
    }
    else{
        toast.error("Check permissions, We cant access your location");
    }

}


