import React from 'react'
import { Link } from "react-router-dom";
const FoodCards = ({name, city, photos,id}) => {
//    console.log(about);
    return (
        <div className="w-full h-full my-4 rounded-lg shadow-lg relative ">
            <Link to={`/restaurant/${id}`}>
                <div className="rounded-lg shadow">
                    <img src={(photos && photos.length>0)? photos[0]: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLoeVu-1OtdDQVJnSFlXBXWZfOvkLG-GBAHLVJHJKZt7AtJay6gxoCBN9k8VKhy1vSaGs&usqp=CAU"} className="w-full h-full rounded-lg shadow-md" alt="card" />
                </div>
            </Link>
            <div className="text-sm text-white font-semibold absolute z-10 top-1 l-0">
                <div className="bg-pink-500 w-32 h-5 px-1 my-2">Pro extra 30% off</div>
                <div className="bg-blue-500 w-24 h-5 my-2 px-1">40% Off</div>
            </div>
            <div className="flex justify-between m-2">
                <h1 className="font-bold font-medium">{name}</h1>
                <div className="bg-green-600 rounded-lg text-white p-0.5">4.3⭐</div>
            </div>
            <div className="flex justify-between m-2">
                <div className="text-gray-600 font-small text-center">{city}</div>
                
            </div>
            <div className="flex justify-evenly m-2">
                <img src="https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png" 
                alt="uparrow" className="w-8 h-8" />
                <p className="text-gray-600 font-small">+6200 order placed from here recently</p>
                <img src="https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png" 
                alt="uparrow" className="w-16 h-8" />
            </div>
        </div>
    )
}

export default FoodCards;