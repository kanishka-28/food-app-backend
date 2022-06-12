import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import RestaurantGallery from "../../components/restaurantGallery/restaurantGallery";
import RestaurantTab from "../../components/restaurantTab";
import { allRestaurants } from "../../redux/features/restaurants/selector";
import TabComponent from "./TabComponents";

const Restaurant = () => {
  const [type,setType] = useState('order');
  const restaurants = useSelector(allRestaurants);
  const [restaurant, setrestaurant] = useState(null);
  const {id} = useParams();
  useEffect(() => {
    setrestaurant(restaurants.filter(e => e._id === id)[0]);
  }, [restaurants])
  
  return (
    <>
        <div className=" w-full mb-4  ">
          <Navbar  />
        </div>
      <div className="w-full   mx-auto lg:px-20">
        <RestaurantGallery requiredRestaurant={restaurant} setType={setType}/>
        <div className="sticky top-0 z-10">
          <RestaurantTab setType={setType} type={type}/>
        </div>
        <TabComponent type={type}/>
       
      </div>
    </>
  );
};

export default Restaurant;