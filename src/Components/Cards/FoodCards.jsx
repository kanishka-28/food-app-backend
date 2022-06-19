import React, { useContext } from 'react'
// import { orderfood, getfood } from '../../../services/api';
// import { SignupContext } from '../../../context/signup';

const FoodCards = ({ food, setOpenEdit, setFood }) => {

    return (
        <div className="max-w-72 rounded overflow-hidden shadow-lg my-4">
            <img className="w-full h-56" src={food.photo ? food.photo : 'https://t4.ftcdn.net/jpg/02/95/34/73/360_F_295347352_UM7SC7xVxLyQIUV2nJc8rNOsNKZK8M6S.jpg'} alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className=" flex w-full justify-between">
                    <div>
                        <p className='font-bold text-xl w-full'>{food.name}</p>
                        <div className='flex items-center gap-3 mb-2'>
                            <p className="text-gray-500">{food.category}</p>
                            {food.isVeg ?
                                <img className='w-4 h-4' src='https://i.pinimg.com/originals/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.png' alt='veg' />
                                : <img className='w-4 h-4' src='https://image.shutterstock.com/image-vector/non-veg-illustration-vector-icon-260nw-1762664813.jpg' alt='veg' />}
                        </div>
                    </div>
                    <div>
                        <h4 className='w-20 font-bold text-gray-800'>₹ {food.price}/~</h4>
                    </div>
                </div>
                <p className="text-gray-700 text-base">
                    {food.descript}</p>
            </div>
            <div className="text-center flex ml-4 flex-wrap">
                <button onClick={() => {
                    setOpenEdit(true)
                    setFood(food)
                }} className="mb-4 w-28 bg-[#ffda7d] hover:bg-yellow-500 hover:scale-110 ease-in duration-200 font-bold text-sm rounded py-1 px-4">
                    Edit
                </button>
            </div>
        </div>
    )
}

export default FoodCards