import React, { useContext, useState } from 'react'
import { RiStarLine, RiShareForwardFill, RiBookmark3Line, RiDirectionLine } from "react-icons/ri"
import { HiOutlineInformationCircle } from "react-icons/hi"
import { AiTwotoneStar } from "react-icons/ai";
import { MdArrowRightAlt } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { GiSevenPointedStar } from "react-icons/gi";
import { FiEdit } from "react-icons/fi";
import { Photo } from '../restaurantComponent/Photos';
// import { SignupContext } from '../../context/signup';
import { Link } from 'react-router-dom'
import { RWebShare } from "react-web-share";
import AddFoodModal from '../Modal/AddFood';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../Redux/Features/Food/Slice';
import { openModal } from '../../Redux/Features/Food/Selector/Selector';

const RestaurantGallery = ({ requiredRestaurant,uploadedImages }) => {

    const dispatch = useDispatch();

    return (
        <>
            <AddFoodModal/>
            <div className="w-full ">
                <img src={uploadedImages?.length > 0 ? uploadedImages[0].url : "https://b.zmtcdn.com/data/pictures/9/19227209/1f3b5f252dc37e874e8e96e82e5ed277.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*"} className="md:hidden block w-full h-full " alt="bigImage" />
                <div className="lg:m-4 flex items-center h-96 w-full ">
                    <div className="hidden md:block w-3/4 h-full overflow-hidden object-cover ">
                        <img src={uploadedImages?.length > 0 ? uploadedImages[0].url : "https://b.zmtcdn.com/data/pictures/9/19227209/1f3b5f252dc37e874e8e96e82e5ed277.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*"} className="duration-1000 transform hover:scale-110 h-full w-full" alt="bigImage" />
                    </div>
                    <div className="m-1 h-full w-1/3 hidden md:block">
                        <div className=" flex h-1/2 mb-1 w-full gap-2">
                            <div className=" w-1/2 h-full overflow-hidden ">
                                <img src={uploadedImages?.length > 1 ? uploadedImages[1].url : "https://b.zmtcdn.com/data/pictures/9/19227209/da93155e3b621000dd24fa992c107a80.jpg?output-format=webp&fit=around|300:273&crop=300:273;*,*"} className="w-full h-full duration-1000 transform hover:scale-110" alt="smallImage" />
                            </div>
                            <div className="w-1/2 overflow-hidden">
                                <img src={uploadedImages?.length > 2 ? uploadedImages[2].url : "https://b.zmtcdn.com/data/pictures/9/19227209/da93155e3b621000dd24fa992c107a80.jpg?output-format=webp&fit=around|300:273&crop=300:273;*,*"} className="w-full h-full  duration-1000 transform hover:scale-110" alt="smallImage" />
                            </div>
                        </div>
                        <div className="h-1/2 pb-1 flex w-full gap-2">
                            <div className=" w-1/2  overflow-hidden ">
                                <img src={uploadedImages?.length > 3 ? uploadedImages[3].url : "https://b.zmtcdn.com/data/pictures/9/19227209/da93155e3b621000dd24fa992c107a80.jpg?output-format=webp&fit=around|300:273&crop=300:273;*,*"} className="w-full h-full duration-1000 transform hover:scale-110" alt="smallImage" />
                            </div>
                            <div className="w-1/2 overflow-hidden">
                                <img src={uploadedImages?.length > 4 ? uploadedImages[4].url : "https://b.zmtcdn.com/data/pictures/9/19227209/da93155e3b621000dd24fa992c107a80.jpg?output-format=webp&fit=around|300:273&crop=300:273;*,*"} className="w-full  h-full  duration-1000 transform hover:scale-110" alt="smallImage" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="m-4 md:flex justify-between">
                    <div className='flex items-center gap-5 flex-wrap'><h2>{requiredRestaurant?.name}</h2>
                        <Link state={requiredRestaurant} to={`/restaurant/edit`} className='flex items-center flex-wrap gap-1 font-semibold bg-[#ffcd7d] hover:bg-yellow-500 hover:scale-110 ease-in duration-200 p-2 px-6 rounded justify-center'>
                            <FiEdit /><p>Edit</p>
                        </Link>
                    </div>
                    <div className="text-gray-500 text-sm flex justify-between">
                        <div className="w-8 h-7 text-white rou nded-md bg-gray-500 text-center flex gap-1 items-center p-1 mt-2">-<GiSevenPointedStar className="text-yellow-400" /></div>
                        <div className="mr-6">
                            <div className="text-black mx-2 font-semibold">0</div>
                            <div className="border-gray-400 border-b-2 border-dashed mx-2 ">dining reviews</div>
                        </div>
                        <div className="w-12 h-7 flex gap-1 text-white rounded bg-green-600 font-bold justify-center items-center  mt-2">3.2 <AiTwotoneStar className="text-white" /></div>
                        <div>
                            <div className="text-black mx-2 font-semibold">9000</div>
                            <div className="border-gray-400 border-b-2 border-dashed mx-2 ">delivery reviews</div>
                        </div>
                    </div>
                </div>
                <div className="m-4 font-light">
                    <h4 className='font-semibold'>{requiredRestaurant?.address}</h4>
                    <h3 className="text-gray-500">{requiredRestaurant?.city}</h3>
                    <div className="text-gray-600 my-0.5 flex gap-1 items-center">
                        <p>{requiredRestaurant?.restauarntTimings} (Today)</p>
                        <HiOutlineInformationCircle className="pt-0.5 w-5 h-5 text-gray-400" />
                    </div>
                </div>
                <div className='flex gap-4 items-center flex-wrap mx-2'>
                    <button onClick={() => dispatch(setOpen(true))} className=' py-2 px-8 font-semibold text-center rounded items-center bg-gradient-to-r from-red-500 to-[#fc256f] text-white flex gap-3 hover:scale-110 ease-in duration-200'><p>Add Food</p><IoAddOutline size={'1.5rem'} /></button>
                    <div>
                        <RWebShare
                            data={{
                                text: "Like humans, flamingos make friends for life",
                                url: "http://localhost:3000",
                                title: "Flamingos",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <div className="flex">
                                <div className="cursor-pointer w-32 h-10 text-center m-1 rounded-md border-gray-400 border py-1 bg-white text-red-500 flex justify-center items-center gap-2 font-semibold hover:scale-110 ease-in duration-200"><RiShareForwardFill className="w-5 h-5" /> <p className="text-gray-500">Share</p></div>
                            </div>
                        </RWebShare>
                    </div>
                    <Link to={'/about/orders'}>
                        <button className='cursor-pointer px-3 h-10 text-center rounded  py-1 bg-white flex justify-center items-center gap-2 hover:scale-110 ease-in duration-200 bg-gradient-to-r from-[#ff7f7f] to-[#fc5184]text-white'><p>Go To My Orders</p><MdArrowRightAlt size={'2rem'} /></button>
                    </Link>
                </div>
            </div>
        </>
    )
}




export default RestaurantGallery
