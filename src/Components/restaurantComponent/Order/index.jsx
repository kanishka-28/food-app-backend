import React, { useContext } from 'react'
import { GiScooter } from 'react-icons/gi';
import { BsFillArrowRightCircleFill, BsCompass, BsClock, BsCheckCircleFill } from 'react-icons/bs'

import { Link } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FcGoogle } from "react-icons/fc"
import { AiOutlineClose } from "react-icons/ai";
import AddFoodModal from '../../Modal/AddFood';
import FoodCards from '../../Cards/FoodCards';
import EditFoodModal from '../../Modal/EditFood';
// import { orderfood, getfood } from '../../../services/api';
// import { SignupContext } from '../../../context/signup';

let startOfFoods;
const Order = () => {

    // let [foods, setfoods] = useState([])
    const [price, setprice] = useState()
    const [quantity, setquantity] = useState("1")
    const [foodDetails, setfoodDetails] = useState({ name: "", price: 200 })
    // const { restaurant } = useContext(SignupContext)
    const user = JSON.parse(localStorage.getItem("user"));
    startOfFoods = useRef();
    console.log(user);
    useEffect(() => {
        const id = localStorage.getItem("id");
        // Promise.resolve(getfood(id)).then((res) => {
        //     setfoods(res.data.foods)
        //     console.log(foods);
        // }).catch((e) => {
        //     console.log(e.response);
        // })
    }, [])

    const [open, setOpen] = useState(false);
    const [title, settitle] = useState('')
    const foods = [
        {
            id: 1,
            image: "https://www.holidify.com/images/cmsuploads/compressed/indian-1768906_1920_20180322173733.jpg",
            isVeg: true,
            category: 'Dosa',
        },
        {
            id: 2,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1l8RtUoV4lrpI8vBdOiHUqJ1-5mUgt9fZoA&usqp=CAU",
            isVeg: true,
            category: 'Pizza',
        },
        {
            id: 3,
            image: "https://www.skymetweather.com/themes/skymet/images/gallery/toplists/Top-Not-to-miss-food-items-in-Monsoon/4.jpg",
            isVeg: true,
            category: 'Samosa',
        },
        {
            id: 4,
            image: "https://www.hungryforever.com/wp-content/uploads/2015/11/feature-image-gulab-jamun-1280x720.jpg",
            isVeg: true,
            category: 'Sweet',
        },
        {
            id: 5,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0yMCC6pPxYN_YomP-QCmqHBuLOeQB5u90M3gOUUUbFCBc_u0tyvRdsSc-ZcfLGeqgkAI&usqp=CAU",
            isVeg: false,
            category: 'Burger',
        },
        {
            id: 6,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1l8RtUoV4lrpI8vBdOiHUqJ1-5mUgt9fZoA&usqp=CAU",
            isVeg: true,
            category: 'Pizza',
        },
        {
            id: 7,
            image: "https://www.skymetweather.com/themes/skymet/images/gallery/toplists/Top-Not-to-miss-food-items-in-Monsoon/4.jpg",
            isVeg: true,
            category: 'Samosa',
        },
    ]

    const LapOrder = () => {
        return (
            <>
                <div className='flex flex-col'>
                    {/* <button className='self-end py-2 px-10 font-semibold text-center rounded items-center bg-gradient-to-r from-red-500 to-[#fc256f]  my-6 text-white flex gap-3 hover:scale-110 ease-in duration-200' onClick={() => {
                        setOpen(true)
                        settitle('Add')
                    }
                    }><p>Add Food</p><IoAddOutline size={'1.5rem'} /></button> */}
                    <div ref={startOfFoods} className='grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {foods.length !== 0 ? foods?.map((food) => {
                            return (
                                <>
                                    <FoodCards key={food.id} food={food} setOpen={setOpen} settitle={settitle} />
                                    <EditFoodModal open={open} setOpen={setOpen} title={title} />
                                </>
                            )
                        })
                            : <div className="flex justify-between items-center bg-yellow-100 border border-dashed border-gray-400 p-2 align-center">
                                You have not added any dish
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    }
    return (
        <div>
            <LapOrder />
        </div>
    )
}

export default Order