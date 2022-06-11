import React, { useContext } from 'react'
import { GiScooter } from 'react-icons/gi';
import { BsFillArrowRightCircleFill, BsCompass, BsClock, BsCheckCircleFill } from 'react-icons/bs'

import { Link } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FcGoogle } from "react-icons/fc"
import { AiOutlineClose } from "react-icons/ai";
import AddFoodModal from '../../../pages/AddFood/Modal';
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
                    <button className='self-end py-2 px-10 font-semibold text-center rounded items-center px-2 bg-gradient-to-r from-red-500 to-[#fc256f]  my-6 text-white flex gap-3 hover:scale-110 ease-in duration-200' onClick={() => {
                        setOpen(true)
                        settitle('Add')
                    }
                    }><p>Add Food</p><IoAddOutline size={'1.5rem'} /></button>
                    <div ref={startOfFoods} className='grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {foods.length !== 0 ? foods?.map((food) => {
                            return (
                                <div key={food.id} className="max-w-72 rounded overflow-hidden shadow-lg my-4">
                                    <img className="w-full h-56" src={food.image} alt="Sunset in the mountains" />
                                    <div className="px-6 py-4">
                                        <div className=" flex flex-wrap w-full justify-between">
                                            <div>
                                                <p className='font-bold text-xl w-4/5'>Name  {food.name}</p>
                                                <div className='flex items-center gap-3 mb-2'>
                                                    <p className="text-gray-500">{food.category}</p>
                                                    {food.isVeg ?
                                                        <img className='w-4 h-4' src='https://i.pinimg.com/originals/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.png' alt='veg' />
                                                        : <img className='w-4 h-4' src='https://image.shutterstock.com/image-vector/non-veg-illustration-vector-icon-260nw-1762664813.jpg' alt='veg' />}
                                                </div>
                                            </div>
                                            <h4 className='font-bold text-gray-800'>₹ 250/~</h4>
                                        </div>
                                        <p className="text-gray-700 text-base">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                            {food.description}</p>
                                    </div>

                                    <div className="text-center flex ml-4 flex-wrap">
                                        <button onClick={() => {
                                            setOpen(true)
                                            settitle('Edit')
                                        }} className="mb-4 w-28 bg-[#ffda7d] hover:bg-red-700 font-bold text-sm rounded py-1 px-4">
                                            Edit
                                        </button>
                                    </div>
                                </div>
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
            <AddFoodModal open={open} setOpen={setOpen} title={title}/>
        </div>
    )
}

export default Order