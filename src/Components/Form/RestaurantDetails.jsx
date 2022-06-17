import { useEffect } from "react";
import noFileChosen from "../../Assets/noFileChosen.svg";
import Brands from "../../Utils/Data/Brands";
import SingleSelectDropDown from '../DropDown/SingleSelectDropDown'

export default function RestaurantDetailsForm({ handleSave, restaurantDetails, setrestaurantDetails }) {

    // console.log('====================================');
    // console.log(restaurantDetails);
    // console.log('====================================');
    const handleFile = (e) => {
        let file = e.target.files[0];
        console.log("====================================");
        console.log(e.target.files[0]);
        console.log("====================================");
        // formData.append('image', e.target.files[0]);
        let baseURL = "";
        // Make new FileReader
        let reader = new FileReader();
        // Convert the file to base64 text
        reader.readAsDataURL(file);
        // on reader load somthing...
        reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;
            console.log("Base", baseURL);
            setrestaurantDetails({ ...restaurantDetails, coverImage: baseURL });
        };
    };

    return (
        <>
            <form onSubmit={handleSave}>
                <div className=" sm:rounded sm:overflow-hidden flex flex-col-reverse sm:flex-row justify-evenly">
                    <div className="sm:w-1/2 px-4 py-5 bg-white space-y-1 sm:p-6">
                        <div className="">
                            <label
                                htmlFor="company-website"
                                className="block text-gray-700"
                            >
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
                            <label
                                htmlFor="company-website"
                                className="block text-gray-700"
                            >
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
                            <label
                                htmlFor="company-website"
                                className="block text-gray-700"
                            >
                                Brand
                            </label>
                            <div className="mt-1 flex rounded shadow-sm">
                                <SingleSelectDropDown array={Brands} title='Brand' value={restaurantDetails.brand} handleChange={(e) => {
                                    setrestaurantDetails({
                                        ...restaurantDetails,
                                        brand: e.target.value,
                                    })
                                }} />
                                {console.log(restaurantDetails.brand)}
                            </div>
                        </div>
                        <div className="col-span-3 sm:col-span-2">
                            <label
                                htmlFor="company-website"
                                className="block text-gray-700"
                            >
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
                        <div className="col-span-3 sm:col-span-2 flex gap-10">
                            <div className="w-1/4">
                                <label
                                    htmlFor="company-website"
                                    className="block text-gray-700"
                                >
                                    Latitude
                                </label>
                                <div className="mt-1 flex rounded shadow-sm">
                                    <input
                                        required
                                        type="tel"
                                        placeholder="ex- 22.76"
                                        className="p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded"
                                        value={restaurantDetails.mapLocation.latitude}
                                        onChange={(e) => {
                                            setrestaurantDetails({
                                                ...restaurantDetails,
                                                mapLocation: {
                                                    ...restaurantDetails.mapLocation,
                                                    latitude: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="w-1/4">
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
                                                    longitude: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </div>
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
                            <label
                                htmlFor="company-website"
                                className="block text-gray-700"
                            >
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
                                className={`${restaurantDetails.coverImage ? "w-full" : "w-1/2"
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
