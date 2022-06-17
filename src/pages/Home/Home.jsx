import React, { useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import RestaurantCards from "../../Components/Cards/RestaurantCards";

import { useSelector } from "react-redux";
import { allRestaurants } from "../../Redux/Features/Restaurant/Selector/Selector";

const Home = () => {

  const restaurants = useSelector(allRestaurants);

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-6 flex flex-col items-center justify-center">
        <Link to={'/restaurant/add'} className="hover:scale-110 ease-in duration-200 py-2 px-8 text-center bg-gradient-to-r from-red-500 to-[#fc256f] text-white font-semibold rounded flex items-center justify-center gap-4">
          <p>Add New Restaurant</p><IoAddOutline size={'1.5rem'} />
        </Link>
        {restaurants.length===0 && <h3 className="mt-20">You have not added any restaurant</h3>}
        <div className="w-full">
          {
            restaurants?.map((restaurant) => {
              return (
                <RestaurantCards key={restaurant._id} restaurant={restaurant} />
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default Home;
