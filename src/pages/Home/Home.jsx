import React from "react";
// import Navbar from "../../components/Navbar/Navbar.jsx";
import RestaurantTab from "../../Components/RestaurantTab/RestaurantTab";
import Navbar from "../../Components/Navbar/Navbar";

const Home = () => {
  return (
    <>
      <div className="container  mx-auto lg:px-20">
        <Navbar />
        <RestaurantTab />
        
      </div>
    </>
  );
};

export default Home;
