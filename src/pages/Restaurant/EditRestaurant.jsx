import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/Features/Auth/Selector/Selector";
import { servicePost } from "../../Utils/Api/Api";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RestaurantDetailsForm from "../../Components/Form/RestaurantDetails";
import { allRestaurants } from "../../Redux/Features/Restaurant/Selector/Selector";
import { storeAllRestaurants } from "../../Redux/Features/Restaurant/Slice";

export default function EditRestaurant({ edit =false }) {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  

  const restaurants = useSelector(allRestaurants);
  const [restaurantDetails, setrestaurantDetails] = useState({
    user: user?._id,
    name: "",
    timing: "",
    address: "",
    image: "",
    city: "",
    contactNumber: "",
    mapLocation: "",
  });

  useEffect(() => {
    if(edit){
      const requiredRestaurant = location.state;
     setrestaurantDetails({
        ...restaurantDetails,
        name: requiredRestaurant.name,
        timing: requiredRestaurant.timing,
        address: requiredRestaurant.address,
        city: requiredRestaurant.city,
        contactNumber: requiredRestaurant.contactNumber,
        mapLocation: requiredRestaurant.mapLocation
      })
    }
  }, [])
  

 

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(restaurantDetails);
    try {
      const {restaurant: rest} = await servicePost("restaurant/addrest", restaurantDetails);
      dispatch(storeAllRestaurants([rest,...restaurants]));
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
          <RestaurantDetailsForm handleSave={handleSave}   restaurantDetails={restaurantDetails} setrestaurantDetails={setrestaurantDetails} />
        </div>
        <button onClick={handleSave} className="hover:scale-110 ease-in duration-200 py-2 px-8 text-center bg-gradient-to-r from-red-500 to-[#fc256f] text-white font-semibold rounded flex items-center justify-center gap-4 mx-auto">
          Save
        </button>
      </div>
    </>
  );
}