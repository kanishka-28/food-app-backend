import React from 'react'
import {HiArrowNarrowRight} from 'react-icons/hi'
import { Link } from 'react-router-dom'

const RestaurantCards = ({restaurant}) => {
    return (
        <div className="w-full flex justify-center mt-10">
            <div className="sm:w-3/4 px-10 md:p-0 flex flex-col sm:flex-row rounded-lg bg-white shadow-lg">
                <img className="w-full h-4/5 sm:h-52 object-cover sm:w-1/2 md:w-1/3 rounded-t-lg md:rounded-none md:rounded-l-lg" src={restaurant?.image} alt="" />
                <div className="w-1/2 px-6 flex flex-col justify-evenly">
                    <h3 className="text-gray-900 font-semibold">{restaurant.name}</h3>
                    <div>
                    <p className="text-gray-700 text-base">
                        {restaurant.timing}
                    </p>
                    <p className="text-gray-500 text-base">
                        {restaurant.address}
                    </p>
                    </div>
                    <Link to={`/restaurant/${restaurant._id}`} className="w-64 bg-megenta-400 hover:bg-megenta-500 text-white font-bold py-2 my-6 px-4 rounded flex items-center gap-3 hover:scale-105 ease-in duration-200">
                       <p> Go To This Restaurant</p> <HiArrowNarrowRight size={'1.5rem'}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCards