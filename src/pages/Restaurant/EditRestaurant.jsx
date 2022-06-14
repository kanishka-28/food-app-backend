import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { getUser } from "../../Redux/Features/Auth/Selector/Selector";
import { servicePost } from "../../Utils/Api/Api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantDetailsForm from "../../Components/Form/RestaurantDetails";
import { allRestaurants } from "../../Redux/Features/Restaurant/Selector/Selector";

export default function EditRestaurant({ edit }) {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const { id } = useParams();

  const [mapLocation, setmapLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const restaurants = useSelector(allRestaurants);
  const [restaurant, setrestaurant] = useState(null);
  const [restaurantDetails, setrestaurantDetails] = useState({
    user: user?._id,
    name: "",
    timing: "",
    address: "",
    image: "",
    city: "",
    contactNumber: "",
    mapLocation: mapLocation,
  });

  useEffect(() => {
    setrestaurantDetails({ ...restaurantDetails, user: user?._id })
    edit && setrestaurant(restaurants.filter(e => e._id === id)[0]);
    restaurant && setrestaurantDetails({
      ...restaurantDetails,
      name: restaurant.name,
      timing: restaurant.timing,
      address: restaurant.address,
      city: restaurant.city,
      contactNumber: restaurant.contactNumber,
      // mapLocation: restaurant.mapLocation
    })
    console.log(restaurants);
    console.log(restaurant);
  }, [user, restaurants])


  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await servicePost("restaurant/addrest", restaurantDetails);
      toast.success(`Restaurant has been added successfully`);
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <>
      <Navbar />
      <div className="lg:mx-28 shadow-lg border-2 border-dashed border-gray-200 mx-auto ">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <RestaurantDetailsForm handleSave={handleSave} mapLocation={mapLocation} setmapLocation={setmapLocation} restaurantDetails={restaurantDetails} setrestaurantDetails={setrestaurantDetails} />
        </div>
        <button onClick={handleSave} className="hover:scale-110 ease-in duration-200 py-2 px-8 text-center bg-gradient-to-r from-red-500 to-[#fc256f] text-white font-semibold rounded flex items-center justify-center gap-4 mx-auto">
          Save
        </button>
      </div>
    </>
  );
}