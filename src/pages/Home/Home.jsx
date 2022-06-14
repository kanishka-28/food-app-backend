import React, { useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import RestaurantCards from "../../Components/Cards/RestaurantCards";
import toast from "react-hot-toast";
import { serviceGet } from "../../Utils/Api/Api";
import { useDispatch, useSelector } from "react-redux";
import { isReady } from "../../Redux/Features/Auth/Selector/Selector";
import { storeAllRestaurants } from "../../Redux/Features/Restaurant/Slice";
import { allRestaurants } from "../../Redux/Features/Restaurant/Selector/Selector";

const Home = () => {

  const ready = useSelector(isReady);
  const dispatch = useDispatch();
  const restaurants = useSelector(allRestaurants);

  const getAllRestaurants = async () => {
    try {
      const { restaurants } = await serviceGet('restaurant/user',);
      dispatch(storeAllRestaurants(restaurants));
    } catch (error) {
      console.log({ error });
      toast.error(error?.response?.data?.message)
    }
    finally {

    }
  }

  useEffect(() => {
    if (ready) {
      getAllRestaurants();
    }
  }, [ready])


  return (
    <>
      <Navbar />
      <div className="container mx-auto my-6 flex flex-col items-center justify-center">
        <Link to={'/restaurant/add'} className="hover:scale-110 ease-in duration-200 py-2 px-8 text-center bg-gradient-to-r from-red-500 to-[#fc256f] text-white font-semibold rounded flex items-center justify-center gap-4">
          <p>Add New Restaurant</p><IoAddOutline size={'1.5rem'} />
        </Link>
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
