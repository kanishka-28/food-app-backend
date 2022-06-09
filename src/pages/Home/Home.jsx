import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import RestaurantCards from "../../Components/RestaurantCards/Cards";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container my-6 flex flex-col items-center justify-center">
        <Link to={'/edit'} className="py-2 px-8 bg-red-500 text-white font-semibold rounded">Add New Restaurant</Link>
        <RestaurantCards />
      </div>
    </>
  );
};

export default Home;
