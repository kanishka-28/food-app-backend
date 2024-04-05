import React from 'react'
import {  RiShareForwardFill } from "react-icons/ri"
import { HiOutlineInformationCircle } from "react-icons/hi"
import { AiTwotoneStar } from "react-icons/ai";
import { MdArrowRightAlt } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
// import { SignupContext } from '../../context/signup';
import { Link } from 'react-router-dom'
import { RWebShare } from "react-web-share";
import AddFoodModal from '../Modal/AddFood';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../Redux/Features/Food/Slice';

const KitchenGallery = ({ requiredKitchen }) => {

    const dispatch = useDispatch();

    return (
        <>
            <AddFoodModal/>
            <div className="w-full ">
                <div className="m-4 md:flex justify-between">
                    <div className='flex items-center gap-5 flex-wrap'><h2>{requiredKitchen?.name}</h2>
                        <Link state={requiredKitchen} to={`/kitchen/edit`} className='flex items-center flex-wrap gap-1 font-semibold bg-[#ffcd7d] hover:bg-yellow-500 hover:scale-110 ease-in duration-200 p-2 px-6 rounded justify-center'>
                            <FiEdit /><p>Edit</p>
                        </Link>
                    </div>
                    <div className="text-gray-500 text-sm flex justify-between">
                        <div className="w-12 h-7 flex gap-1 text-white rounded bg-green-600 font-bold justify-center items-center  mt-2">{Number(requiredKitchen?.reviews[0]?.avgRating.toFixed(1))}<AiTwotoneStar className="text-white" /></div>
                        <div>
                            <div className="text-black mx-2 font-semibold">{requiredKitchen?.reviews[0]?.totalRatings}</div>
                            <div className="border-gray-400 border-b-2 border-dashed mx-2 ">delivery reviews</div>
                        </div>
                    </div>
                </div>
                <div className="m-4 font-light">
                    <h4 className='font-semibold'>{requiredKitchen?.address}</h4>
                    <h3 className="text-gray-500">{requiredKitchen?.city}</h3>
                    <div className="text-gray-600 my-0.5 flex gap-1 items-center">
                        <p>{requiredKitchen?.restauarntTimings} (Today)</p>
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
                    <Link state={{requiredKitchen}} to={`/kitchen/orders/${requiredKitchen?._id}`}>
                        <button className='cursor-pointer px-3 h-10 text-center rounded  py-1 bg-white flex justify-center items-center gap-2 hover:scale-110 ease-in duration-200 bg-gradient-to-r from-[#ff7f7f] to-[#fc5184]text-white'><p>Go To My Orders</p><MdArrowRightAlt size={'2rem'} /></button>
                    </Link>
                </div>
            </div>
        </>
    )
}




export default KitchenGallery
