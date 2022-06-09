import React, { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  isAuthenticated,
  isReady,
  user,
} from "../../redux/features/auth/selector/selector";
import { logout } from "../../redux/features/auth/slice";
import { serviceGet } from "../../utlis/api";
import FoodCards from "./FoodCard";

const AllCards =({ search = false }) => {
  const ready = useSelector(isReady);
  const customer = useSelector(user);
  
  const dispatch = useDispatch();
  const { searchString } = useParams();
  const [restaurant, setrestaurant] = useState([]);
  const [location, setlocation] = useState({});
 
  const { coords } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  


  const getLocation = ()=>{
    setlocation({latitude : coords?.latitude,longitude : coords?.longitude})
  }
  useEffect(()=>{
      getLocation();
  },[coords]);

  const getRestaurent = async () => {
    try {
           // console.log(latitude,longitude);
      
        const { restaurants } = await serviceGet(`restaurant?latitude=${location?.latitude}&longitude=${location.longitude}&email=${customer?.email}`);
        // const { restaurants } = await serviceGet(`restaurant`);
        setrestaurant(restaurants);
      
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.status == 401) {
        dispatch(logout());
      }
      console.log(error);
    }
  };

  const filterRestaurant = () => {
    const arr = restaurant?.filter((e) => e.name.includes(searchString));
    setrestaurant(arr);
  };

  useEffect(() => {
    if (search) {
      filterRestaurant();
    }
  }, [searchString]);

  useEffect(() => {
    if (ready && location.latitude && location.longitude) {
      getRestaurent();
    }
  }, [ready, location]);

  return (
    <>
      {restaurant?.length !== 0 ? (
        <>
          <div className="md:hidden mb-24 ">
            {restaurant?.map((oneRestaurant) => {
              return (
                <FoodCards key={oneRestaurant._id} restaurant={oneRestaurant} />
              );
            })}
          </div>
          <div className="hidden md:block ">
            <div className="w-full flex  flex-wrap gap-3 justify-evenly ">
              {restaurant?.map((oneRestaurant) => {
                return (
                  <div key={oneRestaurant._id} className="w-1/3 lg:1/4">
                    <FoodCards restaurant={oneRestaurant} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : search ? (
        <h4 className="text-center">No Restaurants Match Your Search</h4>
      ) : (
        <h4 className="text-center">No Restaurants Found Near You</h4>
      )}
    </>
  );
};

export default AllCards;
