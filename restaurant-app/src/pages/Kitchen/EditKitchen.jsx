import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/Features/Auth/Selector/Selector";
import { servicePost, servicePut } from "../../Utils/Api/api";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setloadingFalse, setloadingTrue } from "../../Redux/Features/Loader/Slice";
import { allKitchens } from "../../Redux/Features/Kitchen/Selector/Selector";
import { storeAllKitchens } from "../../Redux/Features/Kitchen/Slice";
import KitchenDetailsForm from "../../Components/Form/kitchenDetails";

export default function EditKitchen({ edit = false }) {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const kitchens = useSelector(allKitchens);
  const [kitchenDetails, setkitchenDetails] = useState({
    user: user?._id,
    name: "",
    timing: "",
    address: "",
    coverImage: "",
    city: "",
    contactNumber: "",
    mapLocation: {
      latitude: "",
      longitude: ""
    }
  });

  const requiredKitchen = location.state;
  useEffect(() => {
    console.log(requiredKitchen);
    if (edit) {
      setkitchenDetails({
        ...kitchenDetails,
        name: requiredKitchen.name,
        timing: requiredKitchen.timing,
        address: requiredKitchen.address,
        city: requiredKitchen.city,
        contactNumber: requiredKitchen.contactNumber,
        mapLocation: requiredKitchen.mapLocation,
        coverImage: requiredKitchen.coverImage
      })
    }
  }, [])

  const handleSave = async (e) => {
    e.preventDefault();
    dispatch(setloadingTrue());
    try {
      if (edit) {
        const { updatedKitchen: rest } = await servicePut(`kitchen/update/${requiredKitchen._id}`, kitchenDetails);
        const otherKitchens = kitchens.filter((kitchen)=>{
          return kitchen._id!==requiredKitchen._id
        });
        dispatch(storeAllKitchens([rest, ...otherKitchens]));
        toast.success(`Kitchen has been updated successfully`);
      }
      else {
        const { kitchen: rest } = await servicePost("kitchen/addkitchen", kitchenDetails);
        dispatch(storeAllKitchens([rest, ...kitchens]));
        toast.success(`Kitchen has been added successfully`);
      }
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message)
    }
    finally{
      dispatch(setloadingFalse());
    }
  };

  return (
    <>
      <Navbar />
      <div className="lg:mx-28 shadow-lg border-2 border-dashed border-gray-200 mx-auto ">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <KitchenDetailsForm handleSave={handleSave} kitchenDetails={kitchenDetails} setkitchenDetails={setkitchenDetails} />
        </div>
        <button onClick={handleSave} className="hover:scale-110 ease-in duration-200 py-2 px-8 text-center bg-gradient-to-r from-red-500 to-[#fc256f] text-white font-semibold rounded flex items-center justify-center gap-4 mx-auto">
          Save
        </button>
      </div>
    </>
  );
}