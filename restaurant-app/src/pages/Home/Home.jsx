import React, { useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import RestaurantCards from "../../Components/Cards/RestaurantCards";
import { useSelector } from "react-redux";
import { allRestaurants } from "../../Redux/Features/Restaurant/Selector/Selector";
import KitchenCards from "../../Components/Cards/KitchenCards";
import { allKitchens } from "../../Redux/Features/Kitchen/Selector/Selector";

const Home = () => {
  const restaurants = useSelector(allRestaurants);
  const kitchens = useSelector(allKitchens);

  return (
    <div className="h-screen">
      <Navbar />
      <div className="container mx-auto my-6 flex flex-col items-center justify-center">
        <div className="flex gap-6 w-full justify-between mx-4 md:w-3/4">
          <Link
            to={"/restaurant/add"}
            className="hover:scale-110 ease-in duration-200 py-2 px-8 text-center bg-gradient-to-r from-red-500 to-[#fc256f] text-white font-semibold rounded flex items-center justify-center gap-4"
          >
            <p>Add New Restaurant</p>
            <IoAddOutline size={"1.5rem"} />
          </Link>
          <Link
            to={"/kitchen/add"}
            className="hover:scale-110 ease-in duration-200 py-2 px-8 text-center bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded flex items-center justify-center gap-4"
          >
            <p>Add New Kitchen</p>
            <IoAddOutline size={"1.5rem"} />
          </Link>
        </div>
        {restaurants.length === 0 ? (
          <h4 className="mt-10 text-2xl font-semibold">You have not added any restaurant</h4>
        ) : (
          <div className="w-full">
            {restaurants?.map((restaurant) => {
              return (
                <RestaurantCards key={restaurant._id} restaurant={restaurant} />
              );
            })}
          </div>
        )}
        {kitchens.length === 0 ? (
          <h4 className="mt-10 text-2xl font-semibold">You have not added any kitchen</h4>
        ) : (
          <div className="w-full">
            {kitchens?.map((kitchen) => {
              return (
                <KitchenCards key={kitchen._id} kitchen={kitchen} />
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;
