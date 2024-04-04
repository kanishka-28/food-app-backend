import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../../redux/features/auth/selector/selector';
import {toast} from 'react-hot-toast'

const FoodCard = ({ food, setopen,setopenCart, setfoodDetails }) => {
    
    const [text, settext] = useState('');
    const isAuth = useSelector(isAuthenticated);
    return (
        <div key={food.id} className="flex flex-col justify-between max-w-72 rounded overflow-hidden shadow-lg my-4">
            <img className="w-full h-56" src={food.photo ? food.photo : 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80'} alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className=" flex w-full justify-between">
                    <div>
                        <p className='font-bold text-xl w-4/5'>{food.name}</p>
                    </div>
                    <div className='flex w-32 justify-end'>
                        <h3>₹ {food.price}/~</h3>
                    </div>
                </div>
                <div className='flex items-center gap-3 mb-2'>
                    <p className="text-gray-500">{food.category}</p>
                    {food.isVeg ?
                        <img className='w-4 h-4' src='https://i.pinimg.com/originals/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.png' alt='veg' />
                        : <img className='w-4 h-4' src='https://image.shutterstock.com/image-vector/non-veg-illustration-vector-icon-260nw-1762664813.jpg' alt='veg' />}
                </div>
                <p className="text-gray-700 text-base">
                    {food.descript}</p>
            </div>
                <div className="flex justify-evenly flex-wrap">
                    <button onClick={() => {
                        if(!isAuth){
                            toast.error('Login to add item to the cart');
                            return;
                        }
                        setopenCart(true)
                        setfoodDetails({
                            _id: food._id,
                            name: food.name,
                            price: food.price,
                            photo: food?.photo,
                        })
                    }} className="hover:scale-110 ease-in duration-200 mb-4 w-28 bg-megenta-400 hover:bg-red-700 text-white font-bold text-sm rounded py-1 px-4">
                        Add To Cart
                    </button>
                    <button onClick={() => {
                        if(!isAuth){
                            toast.error('Login to place order');
                            return;
                        }
                        setopen(true)
                        setfoodDetails({
                            _id: food._id,
                            name: food.name,
                            price: food.price
                        })
                    }} className="hover:scale-110 ease-in duration-200 mb-4 w-28 bg-megenta-400 hover:bg-red-700 text-white font-bold text-sm rounded py-1 px-4">
                        Place Order
                    </button>
            </div>
        </div>
    )
}

export default FoodCard