import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import RestaurantGallery from "../../components/restaurantGallery/restaurantGallery";
import RestaurantTab from "../../components/restaurantTab";
import TabComponent from "./TabComponents";

const Restaurant = () => {
  const [type,setType] = useState('order');
  return (
    <>
        <div className=" w-full mb-4  ">
          <Navbar  />
        </div>
      <div className="w-full   mx-auto lg:px-20">
        <RestaurantGallery setType={setType}/>
        <div className="sticky top-20 z-10">
          <RestaurantTab setType={setType} type={type}/>
        </div>
        <TabComponent type={type}/>
       
      </div>
    </>
  );
};

export default Restaurant;