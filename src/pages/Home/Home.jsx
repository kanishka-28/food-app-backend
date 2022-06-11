import React from "react";
import { IoAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import RestaurantCards from "../../Components/RestaurantCards/Cards";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-6 flex flex-col items-center justify-center">
        <Link to={'/filldetails'} className="py-2 px-8 text-center bg-gradient-to-r from-red-500 to-[#fc256f] hover:from-megenta-500 hover:to-[#ffa51a] text-white font-semibold rounded flex items-center justify-center gap-4">
          <p>Add New Restaurant</p><IoAddOutline size={'1.5rem'} />
        </Link>
        <RestaurantCards />
      </div>
    </>
  );
};

export default Home;
