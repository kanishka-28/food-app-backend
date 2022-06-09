import React, { useContext } from 'react'
// import { SignupContext } from '../../../context/signup';

export const Photo = ({ details }) => {
  console.log(details);
  const Images = details.photos;
  return (
    <div className="bg-white rounded flex flex-wrap justify-evenly pb-6 w-full">
      {
        Images?.map((image) => (
          <div className='w-1/3 md:w-1/5 m-1 md:m-4 rounded shadow-md border border-gray-300'>
            <img
              src={image}
              alt="Burger"
              className="w-full h-full rounded"
            />
          </div>
        ))
      }
    </div>
  )
}


const Photos = () => {

  // const {restaurant, setrestaurant} = useContext(SignupContext);
  const param = localStorage.getItem("id");
  // const requiredRestaurant= restaurant.filter((res)=>(res._id===param))[0];
  // console.log(requiredRestaurant);
  return (
    <div className="lg:px-4 hidden md:block">
      <p className="text-xl font-dark mt-6">Upload Photos</p>
      <div className="lg:w-1/4 lg:mx-12 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Upload a file</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      <Photo details={'requiredRestaurant'} />
    </div>
  )
}

export default Photos