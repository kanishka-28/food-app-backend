import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import RestaurantGallery from "../../components/restaurantGallery/restaurantGallery";
import RestaurantTab from "../../components/restaurantTab";
import { allRestaurants } from "../../redux/features/restaurants/selector";
import { serviceGet } from "../../utlis/api";
import TabComponent from "./TabComponents";

const Restaurant = () => {

  const {id} = useParams();

  const [type,setType] = useState('order');
  const restaurants = useSelector(allRestaurants);
  const [restaurant, setrestaurant] = useState(null);
  const [uploadedImages, setuploadedImages] = useState([]);

  const getAllPhotos = async () => {
    try {
      const { photos } = await serviceGet(`image/${id}`);
      setuploadedImages(photos.photos);
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    getAllPhotos();
    setrestaurant(restaurants.filter(e => e._id === id)[0]);
  }, [restaurants])

  return (
    <>
        <div className=" w-full mb-4  ">
          <Navbar  />
        </div>
      <div className="w-full   mx-auto lg:px-20">
        <RestaurantGallery requiredRestaurant={restaurant} setType={setType} uploadedImages={uploadedImages}/>
        <div className="sticky top-0 z-10">
          <RestaurantTab setType={setType} type={type}/>
        </div>
        <TabComponent restaurant={restaurant} type={type} uploadedImages={uploadedImages}/>
      </div>
    </>
  );
};

export default Restaurant;