import React, { useContext } from 'react'
// import { orderfood, getfood } from '../../../services/api';
// import { SignupContext } from '../../../context/signup';

const FoodCards = ({ food, setOpen, settitle }) => {

    return (

        <div className="max-w-72 rounded overflow-hidden shadow-lg my-4">
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
                    <h4 className='font-bold text-gray-800'>₹ 250/~</h4>
                </div>
                <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    {food.description}</p>
            </div>

            <div className="text-center flex ml-4 flex-wrap">
                <button onClick={() => {
                    setOpen(true)
                    settitle('Edit')
                }} className="mb-4 w-28 bg-[#ffda7d] hover:bg-yellow-500 hover:scale-110 ease-in duration-200 font-bold text-sm rounded py-1 px-4">
                    Edit
                </button>
            </div>
        </div>
    )
}

export default FoodCards