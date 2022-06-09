import React, { useState, useEffect, useContext } from 'react'
import Brands from '../../Utils/Data/Brands'
import MultiSelectDropDown from '../../Components/DropDown/MultiSelectDropDown'
import SingleSelectDropDown from '../../Components/DropDown/SingleSelectDropDown'
import Categories from '../../Utils/Data/Categories'
// import { addfood } from '../../services/api'
// import { SignupContext } from '../../context/signup'

const AddFood = () => {

  const [food, setfood] = useState("")
  const [des, setdes] = useState("")
  const [category, setcategory] = useState("")
  const [price, setprice] = useState(false)
  const [isVeg, setisVeg] = useState(false)
  const [isContainEgg, setisContainEgg] = useState(false)

  // const clickHandler=()=>{
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     console.log();
  //     Promise.resolve(addfood({
  //         name: food,
  //         descript: des,
  //         isVeg ,
  //         isContainEgg,
  //         category: category,
  //         price: price
  //     }, user._id)).then((res)=>{
  //         console.log(res);
  //         setfood("")
  //         setcategory("")
  //         setprice("")
  //         setdes("")
  //         setisContainEgg(false)
  //         setisVeg(false)
  //     }).catch((e)=>{
  //         console.log(e.response);
  //     })
  // }

  return (
    <div className="py-4 flex">
      <div className="flex flex-col items-center py-2 border-2 border border-gray-100 shadow-lg mx-auto w-full md:w-2/3 h-2/3 inner-shadow bg-yellow-100 font-semibold">
        <div className="flex items-center justify-between my-2 w-3/4">
          <p>Name : </p>
          <input value={food} className="py-4   mx-2 text-center w-3/4 h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded" onChange={(e) => {
            setfood(e.target.value)
          }} />
        </div>
        <div className="flex items-center justify-between my-2 w-3/4">
          <p>Description : </p>
          <input value={des} className="py-4 mx-2 text-center w-3/4 h-28 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded" onChange={(e) => {
            setdes(e.target.value)
          }} />
        </div>
        <div className="flex justify-between my-2 w-3/4">
          <p className='mt-6'>Category : </p>
          <div className='py-4 mx-2 text-center w-3/4  rounded'>
            <MultiSelectDropDown array={Categories}/>
          </div>
        </div>
        <div className="flex justify-between my-2 w-3/4">
          <p className='mt-6'>Brand : </p>
          <div className='py-4 mx-2 text-center w-3/4  rounded'>
            <SingleSelectDropDown array={Brands}/>
          </div>
        </div>
        <div className="flex items-center justify-between my-2 w-3/4">
          <p>Price in ₹ : </p>
          <input value={price} type="number" className="py-4 mx-2 text-center w-3/4 h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border bo der-gray-300 rounded" onChange={(e) => {
            setprice(e.target.value)
          }} />
        </div>
        <div className="flex items-center justify-between my-2 w-3/4">
          <p>Image : </p>
          <div className="py-4 mx-2 text-center w-3/4 rounded mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded">
            <div className="space-y-1 text-center">

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
        </div>
        <div className="flex items-center justify-evenly my-2 w-3/4">
          <p>isVeg</p>
          <input type="checkbox" className="py-4 mx-2 text-center w-6 h-12 focus:border-none focus:outline-none border border-gray-300 rounded cursor-pointer" onClick={(e) => {
            setisVeg(!isVeg)
          }} />
          <p>isContainEgg</p>
          <input type="checkbox" className="py-4 mx-2 text-center w-6 h-12 focus:border-none focus:outline-none border border-gray-300 rounded" onClick={(e) => {
            setisContainEgg(!isContainEgg)
          }} />
        </div>
        <div className="flex items-center justify-evenly my-2 w-3/4">
        </div>
        <button className="mt-4 w-40 bg-megenta-400 hover:bg-red-700 text-white font-bold py-2 px-8 rounded">
          Add Food
        </button>
      </div>
    </div>
  )
}

export default AddFood
