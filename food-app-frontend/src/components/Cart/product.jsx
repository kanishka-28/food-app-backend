import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { decrementQuantity, deleteFromCart, incrementQuantity } from '../../redux/features/cart/slice';
import { allRestaurants } from '../../redux/features/restaurants/selector';
import { ImBin } from 'react-icons/im';

const Product = ({ item, id }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const restaurants = useSelector(allRestaurants);
    const [restaurant, setrestaurant] = useState(null);

    useEffect(() => {
        setrestaurant(restaurants.filter(e => e._id === id)[0]);
    }, [])

    const onIncrement = () => {
        dispatch(incrementQuantity(item.food._id));
    }
    const onDecrement = () => {
        dispatch(decrementQuantity(item.food._id));
    }
    const deleteItem = () => {
        dispatch(deleteFromCart(item));
    }
    
    return (
        <div className="flex items-center hover:bg-gray-100  py-5">
            <div className="flex w-2/5">
                {/* <!-- product --> */}
                <div className="w-20">
                    <img
                        className="h-24 rounded"
                        src={item?.food?.photo ? item?.food?.photo : 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80'}
                        alt=""
                    />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-md m-0 p-0">{item?.food?.name}</span>
                    <span onClick={() => navigate(`/restaurant/${id}`)} className="p-0 m-0 cursor-pointer text-blue-500 text-sm">{restaurant?.name}</span>
                    <ImBin onClick={deleteItem} color='red' className='cursor-pointer mb-1' />
                </div>
            </div>
            <div className="flex justify-center w-1/5">
                <svg
                    onClick={onDecrement}
                    className="cursor-pointer fill-current text-gray-600 w-3"
                    viewBox="0 0 448 512"
                >
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>

                <div
                    className="mx-2 border text-center w-8"
                    type="text"
                >{item?.quantity}</div>

                <svg
                    onClick={onIncrement}
                    className="cursor-pointer fill-current text-gray-600 w-3"
                    viewBox="0 0 448 512"
                >
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
            </div>
            <span className="text-center w-1/5 font-semibold text-sm">
                {item?.price}
            </span>
            <span className="text-center w-1/5 font-semibold text-sm">
                {item?.quantity * item?.price}
            </span>
        </div>
    )
}

export default Product