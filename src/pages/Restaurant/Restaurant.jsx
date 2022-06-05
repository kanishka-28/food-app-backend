import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import RestaurantGallery from "../../components/restaurantGallery/index";
import RestaurantTab from "../../components/restaurantTab";
import TabComponent from "./TabComponents";

const Restaurant = () => {
  const [type,setType] = useState('overview');
  return (
    <>
      <div className="container  mx-auto lg:px-20">
        <Navbar />
        <RestaurantGallery/>
        <div className="sticky top-0">
          <RestaurantTab setType={setType} type={type}/>
        </div>
        <TabComponent type={type}/>
        <Outlet />
      </div>
    </>
  );
};

export default Restaurant;