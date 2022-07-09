import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { decrementQuantity, incrementQuantity } from '../../redux/features/cart/slice';
import { allRestaurants } from '../../redux/features/restaurants/selector';

const Product = ({ item, id }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const restaurants = useSelector(allRestaurants);
    const [restaurant, setrestaurant] = useState(null);

    useEffect(() => {
        setrestaurant(restaurants.filter(e => e._id === id)[0]);
    }, [])


    return (
        <div className="border-2 border-gray-200 p-3 shadow-lg w-72 items-center hover:bg-gray-100 mb-2">
            <div onClick={() => navigate(`/restaurant/${id}`)} className="cursor-pointer text-red-500 text-lg">{restaurant?.name}</div>
            {item?.orderDetails?.map((data) => (
                <div className="pt-2">
                    <hr />
                    <div className="flex items-center gap-2 justify-between">
                        <span className="font-bold text-md">{data?.food?.name}</span>
                    </div>
                    <div className='flex items-center gap-2 justify-between'>
                        <div className="font-semibold text-sm">
                            {data?.quantity} x {data?.price}
                        </div>
                        <div className="font-semibold text-sm">
                            ₹ {data?.quantity * data?.price}
                        </div>
                    </div>
                </div>
            ))}
            <br />
            <hr />
            <div className='flex items-center gap-2 justify-between'>
                <div className="font-semibold text-sm">
                    Total:
                </div>
                <div className="font-semibold text-sm">
                    ₹ {item?.itemTotal}
                </div>
            </div>
        </div>
    )
}

export default Product