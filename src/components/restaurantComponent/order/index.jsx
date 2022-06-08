import React, { useContext } from 'react'
import { GiScooter } from 'react-icons/gi';
import { BsFillArrowRightCircleFill, BsCompass, BsClock, BsCheckCircleFill } from 'react-icons/bs'

import { Link } from 'react-router-dom';

import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FcGoogle } from "react-icons/fc"
import { AiOutlineClose } from "react-icons/ai";
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

    const placeOrder = () => {

        const id = user._id

        const orderDetails = {
            restaurant: localStorage.getItem("id"),
            food: "618f40f84ec908776bb129fd",
            quantity: 1,
            itemTotal: 1,
        }
        // Promise.resolve(orderfood(orderDetails, id)).then((res) => {
        //     console.log(res);
        //     setopen(false)
        // }).catch((e) => {
        //     console.log(e.response);
        // })
    }
    const onChangeHandler = (e) => {
        setopen(true)
        setquantity(e.target.value)
    }
    const [open, setopen] = useState(false)

    function OrderModal() {
        const cancelButtonRef = useRef(null)

        return (
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setopen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start items-center">

                                        <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left mb-8">
                                            <div className="flex justify-between mb-8">
                                                <Dialog.Title as="h3" className="text-2xl leading-6 font-medium text-gray-700">
                                                    Restaurant Ka Name
                                                </Dialog.Title>
                                                <button type="button" className="text-red-500"
                                                    onClick={() => setopen(false)}
                                                    ref={cancelButtonRef}><AiOutlineClose className="w-6" /></button>
                                            </div>
                                            <div className="mt-2 text-center">
                                                <form className={`my-6`}>
                                                    <div className="flex items-center justify-between my-2">
                                                        <p>Food Name - </p>
                                                        <input value={foodDetails.name} className="py-4  mx-2 text-center w-3/4 h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded-md" />
                                                    </div>

                                                    <div className="flex items-center justify-between my-2">
                                                        <p>Quantity - </p>
                                                        <input value={quantity} className="py-4   mx-2 text-center w-3/4 h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded-md" onChange={onChangeHandler} />
                                                    </div>
                                                    <div className="flex items-center justify-between my-2">
                                                        <p>Price Total - </p>
                                                        <input value={foodDetails.price} className="py-4   mx-2 text-center w-3/4 h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded-md" />
                                                    </div>

                                                </form>
                                                <button className={`border border-gray-300 font-semibold w-full h-12 bg-megenta-400 text-white`} onClick={placeOrder}>Place Order</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        )
    }
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
                <h1 className="text-xl my-1">Order Food</h1>
                <div className="flex text-sm text-gray-500 items-center mb-3">
                    <BsCompass className="my-2 mr-2" />
                    <p className="mr-2">Live tracking not available</p>
                    <BsClock className="my-2 mr-2" />
                    <p className="mr-2">52 min</p>
                </div>
                <div className="flex bg-blue-600 text-white items-center rounded-md p-3 w-max">
                    <BsCheckCircleFill className="mr-2" />
                    <p>Delivering to : <strong>{user?.address} {user?.city}</strong></p>
                    <div className="pl-36">Change</div>
                </div>
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
                                        <h3>₹ 250/~</h3>
                                    </div>
                                    <p className="text-gray-700 text-base">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                        {food.description}</p>
                                </div>

                                <div className="flex justify-evenly flex-wrap">
                                    <button onClick={() => {
                                        setopen(true)
                                        setfoodDetails({
                                            name: food.name,
                                            price: food.price
                                        })
                                    }} className="mb-4 w-28 bg-megenta-400 hover:bg-red-700 text-white font-bold text-sm rounded py-1 px-4">
                                        Add To Cart
                                    </button>
                                    <button onClick={() => {
                                        setopen(true)
                                        setfoodDetails({
                                            name: food.name,
                                            price: food.price
                                        })
                                    }} className="mb-4 w-28 bg-megenta-400 hover:bg-red-700 text-white font-bold text-sm rounded py-1 px-4">
                                        Place Order
                                    </button>
                                </div>
                            </div>
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
            {(setopen) && <OrderModal />}
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