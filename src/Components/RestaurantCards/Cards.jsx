import React from 'react'
import {HiArrowNarrowRight} from 'react-icons/hi'
import { Link } from 'react-router-dom'

const RestaurantCards = () => {
    return (
        <div className="flex justify-center mt-10">
            <div className="flex flex-col md:flex-row  rounded-lg bg-white shadow-lg">
                <img className=" w-96 h-52 object-cover md:w-1/4 rounded-t-lg md:rounded-none md:rounded-l-lg" src="https://media.architecturaldigest.com/photos/60e33c2983afe4fd18137304/master/w_2500,h_1669,c_limit/rosemarys_0421_lizclayman_211.jpg" alt="" />
                <div className="px-6 flex flex-col justify-evenly">
                    <h3 className="text-gray-900 font-semibold">Restaurant Name</h3>
                    <div>
                    <p className="text-gray-700 text-base">
                        Timing 9am-9pm
                    </p>
                    <p className="text-gray-500 text-base">
                        Address This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                    </p>
                    </div>
                    <Link to={'/restaurant'} className="w-64 bg-zomato-300 hover:bg-zomato-500 text-white font-bold py-2 px-4 rounded flex items-center gap-3">
                       <p> Go To This Restaurant</p> <HiArrowNarrowRight size={'1.5rem'}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCards