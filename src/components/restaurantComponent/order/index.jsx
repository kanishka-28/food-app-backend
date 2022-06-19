import React, { useContext } from 'react'
import { useParams } from "react-router-dom"
import { GiScooter } from 'react-icons/gi';
import { BsFillArrowRightCircleFill, BsCompass, BsClock, BsCheckCircleFill } from 'react-icons/bs'

import { Link } from 'react-router-dom';

import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FcGoogle } from "react-icons/fc"
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import { user } from '../../../redux/features/auth/selector/selector';
import OrderModal from '../../Modal/PlaceOrder';
import FoodCard from '../../Card/FoodCard';
import { setloadingFalse, setloadingTrue } from '../../../redux/features/Loader/slice';
import { serviceGet } from '../../../utlis/api';
// import { orderfood, getfood } from '../../../services/api';
// import { SignupContext } from '../../../context/signup';

let startOfFoods;
const Order = () => {

    const profile = useSelector(user);
    startOfFoods = useRef();
    const [foods, setfoods] = useState([])
    const [foodDetails, setfoodDetails] = useState([]);
    const { id } = useParams();
    const [open, setopen] = useState(false)

    const dispatch = useDispatch();

    const getAllFoods = async () => {
        try {
            const {foods} = await serviceGet(`food/${id}`);
            setfoods(foods);
        } catch (error) {
            console.log({error});
        }
        finally{
            dispatch(setloadingFalse());
        }
    }
    
    useEffect(() => {
        dispatch(setloadingTrue);
        getAllFoods();
    }, [])


    const LapOrder = () => {
        return (
            <>
                <h1 className="text-xl my-1">Order Food</h1>
                <div className="flex flex-col md:flex-row justify-between text-sm text-gray-500 items-center mb-3">
                    <div className='flex items-center'>
                        <BsCompass className="my-2 mr-2" />
                        <p className="mr-2">Live tracking not available</p>
                        <BsClock className="my-2 mr-2" />
                        <p className="mr-2">52 min</p>
                    </div>
                    {profile?.address &&<div className="flex bg-blue-600 text-white items-center rounded p-3 w-max">
                    <BsCheckCircleFill className="mr-2" />
                        <p>Delivering to : <strong>{profile?.address?.slice(0, 40) + '... ,'} {profile?.city}</strong></p>

                    </div>}
                </div>
                <div ref={startOfFoods} className='grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {foods.length !== 0 ? foods?.map((food) => {
                        return (
                            <FoodCard key={food._id} food={food} setopen={setopen} setfoodDetails={setfoodDetails}/>
                        )
                    })
                        : <div className="flex justify-between items-center bg-yellow-100 border border-dashed border-gray-400 p-2 align-center">
                            this restaurant have not added any dish
                        </div>
                    }
                </div>
            </>
        )
    }
    return (
        <div>
            <LapOrder />
            <OrderModal foodDetails={foodDetails} open={open} setopen={setopen}/>
        </div>
    )
}

export const MobOrder = ({ setType }) => {
    return (
        <>
            <div className="flex bg-red-400 py-4 items-center justify-evenly sm:hidden">
                <GiScooter className="w-12 h-12 text-blue-700" />
                <div>
                    <p >Order Online</p>
                    <p className="text-xs text-white bg-blue-600 w-max p-0.5">30% Off</p>
                </div>
                <div className='cursor-pointer' onClick={() => {
                    setType('order')
                    startOfFoods.current.scrollIntoView({ behavior: 'smooth' });
                }}><BsFillArrowRightCircleFill className="w-6 h-6" /></div>
            </div>
        </>
    )
}


export default Order