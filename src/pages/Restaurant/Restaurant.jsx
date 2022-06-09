import React, { useState } from "react";
import FoodTab from "../../Components/FoodTab";
import Navbar from "../../Components/Navbar/Navbar";
import RestaurantGallery from "../../Components/RestaurantGallery/RestaurantGallery";
import RestaurantTab from "../../Components/RestaurantTab/RestaurantTab";
import TabComponent from "./TabComponents";

const Restaurant = () => {
  const [type,setType] = useState('order');
  return (
    <>
        <div className="sticky w-full  top-0 z-10">
         <Navbar/>
        </div>
      <div className="w-full mx-auto lg:px-20">
        <RestaurantTab/>
        <RestaurantGallery/>
        <div className="sticky top-20 z-10">
          <FoodTab type={type} setType={setType}/>
        </div>
        <TabComponent type={type}/>
       
      </div>
    </>
  );
};

export default Restaurant;