import React from 'react'
import { Link } from "react-router-dom";
import { capitalize } from '../../utlis/helperFunctions/Capitalise';
import { useEffect } from 'react';
import { useState } from 'react';

const FoodCards = ({restaurant}) => {
    
    useEffect(() => {
        setorders(Math.floor(Math.random() * (1000 - 100 + 1)) + 100);
    }, [])
    
    const [orders, setorders] = useState()

    const {name, city, coverImage,_id:id,review} = restaurant;
    return (
        <div className="w-full  h-auto my-4 rounded-lg shadow-lg relative pb-2 md:pb-0 ">
            <Link to={`/restaurant/${id}`}>
                <div className="rounded-lg shadow w-full h-56">
                    <img src={(coverImage)? coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLoeVu-1OtdDQVJnSFlXBXWZfOvkLG-GBAHLVJHJKZt7AtJay6gxoCBN9k8VKhy1vSaGs&usqp=CAU"} className="w-full h-full rounded-lg shadow-md object-cover" alt="card" />
                </div>
            </Link>
            <div className="text-sm text-white font-semibold  z-0 top-1 l-0">
                <div className="bg-pink-500 w-32 h-5 px-1 my-2">Pro extra 30% off</div>
                <div className="bg-blue-500 w-24 h-5 my-2 px-1">40% Off</div>
            </div>
            <div className="flex justify-between m-2 items-center">
                <Link to={`/restaurant/${id}`} className="text-3xl font-bold font-medium hidden md:block lg:hidden">{name.length > 14 ? capitalize(name.slice(0, 10)) + "..." : capitalize(name)}</Link>
                <Link to={`/restaurant/${id}`} className="text-3xl font-bold font-medium md:hidden lg:block">{name.length > 25 ? capitalize(name.slice(0, 25)) + "..." : capitalize(name)}</Link>
                {review[0]?.avgRating &&  <div className="bg-green-600 h-7 rounded-lg text-white p-0.5">{Math.round((review[0]?.avgRating)*100)/100}⭐</div>   }
               
            </div>
            <div className="flex justify-between m-2">
                <div className="text-gray-600 font-small text-center">{capitalize(city)}</div>

            </div>
            <div className="flex justify-evenly m-2 pb-2">
                <img src="https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png"
                    alt="uparrow" className="w-8 h-8" />
                <p className="text-gray-600 font-small">+{orders} order placed from here recently</p>
                <img src="https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png"
                    alt="uparrow" className="w-16 h-8" />
            </div>
        </div>
    )
}

export default FoodCards;