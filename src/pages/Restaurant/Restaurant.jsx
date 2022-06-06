import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import RestaurantGallery from "../../components/restaurantGallery/restaurantGallery";
import RestaurantTab from "../../components/restaurantTab";
import TabComponent from "./TabComponents";

const Restaurant = () => {
  const [type,setType] = useState('overview');
  return (
    <>
      <div className="container  mx-auto lg:px-20">
        <Navbar />
        <RestaurantGallery setType={setType}/>
        <div className="sticky top-0">
          <RestaurantTab setType={setType} type={type}/>
        </div>
        <TabComponent type={type}/>
       
      </div>
    </>
  );
};

export default Restaurant;