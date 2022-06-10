import React from "react";
import { Outlet } from "react-router-dom";
import FoodTab from "../../components/FoodTab/FoodTab";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container  mx-auto lg:px-20">
        <div className="sticky top-0 z-10">
        
        <FoodTab />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Home;
