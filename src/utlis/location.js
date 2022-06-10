import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";

export const GetLocation = async ()=>{
    console.log("ye?");
    const [location, setlocation] = useState({});
    const { coords, isGeolocationEnabled } = await
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });
    useEffect(() => {
      
        setlocation({lat : coords?.latitude,long : coords?.longitude})
     
    }, [coords])
    
   return location;
      
   

   
}