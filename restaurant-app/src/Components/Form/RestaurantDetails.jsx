import toast from "react-hot-toast";
import noFileChosen from "../../Assets/noFileChosen.svg";
import Brands from "../../Utils/Data/Brands";
import SingleSelectDropDown from "../DropDown/SingleSelectDropDown";
import { resizeFile } from "../../Utils/Functions/imageResizer";
import { setloadingFalse, setloadingTrue } from "../../Redux/Features/Loader/Slice";
import { useDispatch } from "react-redux";
export default function RestaurantDetailsForm({
  handleSave,
  restaurantDetails,
  setrestaurantDetails,
}) {
  const handleFile = async (e) => {
    //my style
    const file = e.target.files[0];
    if (file.size > 5000000) {
      toast("Image size should be less than 5 MB");
      return;
    }

    const image = await resizeFile(file);
    setrestaurantDetails({ ...restaurantDetails, coverImage: image });
  };

  const dispatch = useDispatch();
  const getLocation = async (e) => {
    e.preventDefault();
    toast.success("Loading Location", {
      icon: '⌛'
    })
    if (navigator.geolocation) {
    dispatch(setloadingTrue());
      await navigator.geolocation.getCurrentPosition(showPos, showErr);
      function showPos(position) {
        toast.success("Location Found", {
          icon: '🍔'
        })
        setrestaurantDetails({...restaurantDetails , 
            mapLocation: {
                ...restaurantDetails.mapLocation,
                longitude: position.coords.longitude,
                latitude: position.coords.latitude 
              },
        })
    dispatch(setloadingFalse());

        // dispatch(setLocation({ longitude: position.coords.longitude, latitude: position.coords.latitude }))
      }
      function showErr(err) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            toast.error("Allow Location Permission, Please")
            break;
          case err.POSITION_UNAVAILABLE:
            toast.error("Location information is unavailable.")
            break;
          case err.TIMEOUT:
            toast.error("The request to get user location timed out.")
            break;
          case err.UNKNOWN_ERROR:
            toast.error("An unknown error occurred.")
            break;
          default:
            toast.error("Something went wrong");
        }
      }
  
    }
    else {
      toast.error("Check permissions, We cant access your location");
    }
  }


  return (
    <>
      <form onSubmit={handleSave}>
        <div className=" sm:rounded sm:overflow-hidden flex flex-col-reverse sm:flex-row justify-evenly">
          <div className="sm:w-1/2 px-4 py-5 bg-white space-y-1 sm:p-6">
            <div className="">
              <label htmlFor="company-website" className="block text-gray-700">
                Name
              </label>
              <div className="mt-1 flex rounded shadow-sm">
                <input
                  required
                  type="text"
                  placeholder="Name"
                  className="p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded"
                  value={restaurantDetails.name}
                  onChange={(e) =>
                    setrestaurantDetails({
                      ...restaurantDetails,
                      name: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-span-3 sm:col-span-2">
              <label htmlFor="company-website" className="block text-gray-700">
                Timings
              </label>
              <div className="mt-1 flex rounded shadow-sm">
                <input
                  required
                  type="text"
                  placeholder="ex- 9am-9pm"
                  className="p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded"
                  value={restaurantDetails.timing}
                  onChange={(e) =>
                    setrestaurantDetails({
                      ...restaurantDetails,
                      timing: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-span-3 sm:col-span-2">
              <label htmlFor="company-website" className="block text-gray-700">
                Brand
              </label>
              <div className="mt-1 flex rounded shadow-sm">
                <SingleSelectDropDown
                  array={Brands}
                  title="Brand"
                  value={restaurantDetails.brand}
                  handleChange={(e) => {
                    setrestaurantDetails({
                      ...restaurantDetails,
                      brand: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="col-span-3 sm:col-span-2">
              <label htmlFor="company-website" className="block text-gray-700">
                Contact Number
              </label>
              <div className="mt-1 flex rounded shadow-sm">
                <input
                  required
                  type="tel"
                  placeholder="Contact "
                  className="p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded"
                  value={restaurantDetails.contactNumber}
                  onChange={(e) =>
                    setrestaurantDetails({
                      ...restaurantDetails,
                      contactNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-span-3 sm:col-span-2 flex flex-col md:flex-row gap-10 items-center">
              <div className="w-full md:w-1/4">
                <label
                  htmlFor="company-website"
                  className="block text-gray-700"
                >
                  Latitude
                </label>
                <div className="mt-1 flex rounded shadow-sm">
                  <input
                    required
                    type="number"
                    placeholder="ex- 22.76"
                    className="p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded"
                    value={restaurantDetails.mapLocation.latitude}
                    onChange={(e) => {
                      setrestaurantDetails({
                        ...restaurantDetails,
                        mapLocation: {
                          ...restaurantDetails.mapLocation,
                          latitude: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/4">
                <label
                  htmlFor="company-website"
                  className="block text-gray-700"
                >
                  Longitude
                </label>
                <div className="mt-1 flex rounded shadow-sm">
                  <input
                    required
                    type="number"
                    placeholder="ex- 77.78"
                    className="p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded"
                    value={restaurantDetails.mapLocation.longitude}
                    onChange={(e) => {
                      setrestaurantDetails({
                        ...restaurantDetails,
                        mapLocation: {
                          ...restaurantDetails.mapLocation,
                          longitude: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              </div>
              <div className="w-full  md:w-1/4 md:mt-7">
                <button onClick={getLocation} className="hover:scale-110 ease-in duration-200 py-2 px-4 text-center bg-gradient-to-r from-red-500 to-[#fc256f] text-white font-semibold rounded ">
                  Get Location
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="about" className="block text-gray-700">
                Address
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="p-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded"
                  placeholder="Address"
                  value={restaurantDetails.address}
                  onChange={(e) =>
                    setrestaurantDetails({
                      ...restaurantDetails,
                      address: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-span-3 sm:col-span-2">
              <label htmlFor="company-website" className="block text-gray-700">
                City
              </label>
              <div className="mt-1 flex rounded shadow-sm">
                <input
                  required
                  type="text"
                  placeholder="City"
                  className="p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded"
                  value={restaurantDetails.city}
                  onChange={(e) =>
                    setrestaurantDetails({
                      ...restaurantDetails,
                      city: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="sm:w-1/3 h-96 px-4 bg-white space-y-3 sm:p-6">
            <label className="block text-gray-700 mb-2">Cover Photo</label>
            <div className="justify-center h-3/4 sm:h-full focus:border-none focus:outline-none focus:ring-1 focus:ring-black border border-gray-300 rounded mt-1 flex items-center">
              <img
                src={
                  restaurantDetails.coverImage
                    ? restaurantDetails.coverImage
                    : noFileChosen
                }
                alt="Not Found"
                className={`${
                  restaurantDetails.coverImage ? "w-full" : "w-1/2"
                } h-full`}
              />
            </div>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="pl-2 cursor-pointer bg-white rounded font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 flex gap-4"
              >
                <span>Choose Photo</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFile}
                />
              </label>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
