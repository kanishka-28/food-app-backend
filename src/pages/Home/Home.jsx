import React from "react";
// import Navbar from "../../components/Navbar/Navbar.jsx";
import RestaurantTab from "../../Components/RestaurantTab/RestaurantTab";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="container  mx-auto lg:px-20">
        <Navbar />
        <RestaurantTab />
        {/* outlet basically lets us use children in nested routing */}
        <Outlet />
      </div>
    </>
  );
};

export default Home;
