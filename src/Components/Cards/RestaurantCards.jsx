import React from 'react'
import toast from 'react-hot-toast'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { ImBin } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setloadingFalse, setloadingTrue } from '../../Redux/Features/Loader/Slice'
import { allRestaurants } from '../../Redux/Features/Restaurant/Selector/Selector'
import { storeAllRestaurants } from '../../Redux/Features/Restaurant/Slice'
import { serviceDelete } from '../../Utils/Api/Api'
import RatingStars from '../Stars/RatingStars'

const RestaurantCards = ({ restaurant }) => {

    const dispatch = useDispatch();
    const restaurants = useSelector(allRestaurants);

    const deleteRest = async () => {
        dispatch(setloadingTrue());
        try {
            await serviceDelete(`restaurant/delete/${restaurant._id}`);
            const otherRestaurants = restaurants.filter((data) => {
                return restaurant._id !== data._id
            });
            dispatch(storeAllRestaurants(otherRestaurants));
            toast.success(`Restaurant has been deleted`);

        } catch (error) {
            console.log({ error });
        }
        finally {
            dispatch(setloadingFalse());
        }
    }

    return (
        <div className="w-full flex justify-center mt-10 ">
            <div className="sm:w-full md:w-3/4 px-10 md:p-0 flex flex-col sm:flex-row rounded-lg bg-white shadow-lg justify-between relative">
                <img className="w-full h-40 sm:h-52 object-cover sm:w-40 md:w-64 rounded-t-lg md:rounded-none md:rounded-l-lg" src={restaurant?.coverImage} alt="" />
                <div className="w-2/3 px-6 flex flex-col justify-evenly">
                    <h3 className="text-gray-900 font-semibold">{restaurant.name}</h3>
                    <div>
                        <div className='flex items-center gap-3'>
                            <p className="text-gray-700 text-base">
                                {restaurant.timing}
                            </p>
                            <RatingStars value={Math.round(restaurant.reviews[0]?.avgRating)} />
                        </div>
                        <p className="text-gray-500 text-base">
                            {restaurant.address}
                        </p>
                    </div>
                    <Link to={`/restaurant/${restaurant._id}`} className="w-64 bg-megenta-400 hover:bg-megenta-500 text-white font-bold py-2 my-6 px-4 rounded flex items-center gap-3 hover:scale-105 ease-in duration-200">
                        <p> Go To This Restaurant</p> <HiArrowNarrowRight size={'1.5rem'} />
                    </Link>
                </div>
                <div className='mr-6 mb-3 sm:mb-0 h-fit cursor-pointer absolute right-4 top-4 md:top-12 bg-white p-2 rounded-md' onClick={deleteRest}><ImBin size={'1.5rem'} color='red' /></div>
            </div>
        </div>
    )
}

export default RestaurantCards