import React, { useContext } from 'react'
import { useParams } from "react-router-dom"
import { GiScooter } from 'react-icons/gi';
import { BsFillArrowRightCircleFill, BsCompass, BsClock, BsCheckCircleFill } from 'react-icons/bs'
import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { user } from '../../../redux/features/auth/selector/selector';
import OrderModal from '../../Modal/PlaceOrder';
import FoodCard from '../../Card/FoodCard';
import { setloadingFalse, setloadingTrue } from '../../../redux/features/Loader/slice';
import { serviceGet } from '../../../utlis/connection/api';
import AddToCartModal from '../../Modal/AddToCart';
import { itemTotal, orderDetails, restaurantId, status } from '../../../redux/features/cart/selector/selector';

let startOfFoods;
const Order = ({restaurant}) => {

    const profile = useSelector(user);
    startOfFoods = useRef();
    const [foods, setfoods] = useState([])
    const [foodDetails, setfoodDetails] = useState({
        _id  : '',
        name : '',
        price: '',
    });
    const { id } = useParams();
    const [open, setopen] = useState(false)
    const [openCart, setopenCart] = useState(false)

    const dispatch = useDispatch();

    const getAllFoods = async () => {
        dispatch(setloadingTrue());
        try {
            const {foods} = await serviceGet(`food/${id}`);
            setfoods(foods);
        } catch (error) {
            console.log({error});
        }
        finally{
            dispatch(setloadingFalse());
        }
    }
    const restaurant_id = useSelector(restaurantId)
    const orderDetail = useSelector(orderDetails)
    const total = useSelector(itemTotal)
    const stat = useSelector(status)
    
    useEffect(() => {
        console.log(restaurant_id);
        console.log(orderDetail);
        console.log(total);
        console.log(stat);
        getAllFoods();
    }, [])


    const LapOrder = () => {
        return (
            <>
                <h1 className="text-xl my-1">Order Food</h1>
                <div className="flex flex-col md:flex-row justify-between text-sm text-gray-500 items-center mb-3">
                    <div className='flex items-center'>
                        <BsCompass className="my-2 mr-2" />
                        <p className="mr-2">Live tracking not available</p>
                        <BsClock className="my-2 mr-2" />
                        <p className="mr-2">52 min</p>
                    </div>
                    {profile?.address &&<div className="flex bg-blue-600 text-white items-center rounded p-3 w-max">
                    <BsCheckCircleFill className="mr-2" />
                        <p>Delivering to : <strong>{profile?.address?.slice(0, 40) + '... ,'} {profile?.city}</strong></p>

                    </div>}
                </div>
                <div ref={startOfFoods} className='grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {foods.length !== 0 ? foods?.map((food) => {
                        return (
                            <FoodCard key={food._id} food={food} setopen={setopen} setopenCart={setopenCart} setfoodDetails={setfoodDetails}/>
                        )
                    })
                        : <div className="flex justify-between items-center bg-yellow-100 border border-dashed border-gray-400 p-2 align-center">
                            this restaurant have not added any dish
                        </div>
                    }
                </div>
            </>
        )
    }
    return (
        <div>
            <OrderModal restaurant={restaurant} foodDetails={foodDetails} open={open} setopen={setopen}/>
            <AddToCartModal restaurant={restaurant} foodDetails={foodDetails} open={openCart} setopen={setopenCart}/>
            <LapOrder />
        </div>
    )
}

export const MobOrder = ({ setType }) => {
    return (
        <>
            <div className="flex bg-red-400 py-4 items-center justify-evenly sm:hidden">
                <GiScooter className="w-12 h-12 text-blue-700" />
                <div>
                    <p >Order Online</p>
                    <p className="text-xs text-white bg-blue-600 w-max p-0.5">30% Off</p>
                </div>
                <div className='cursor-pointer' onClick={() => {
                    setType('order')
                    startOfFoods.current.scrollIntoView({ behavior: 'smooth' });
                }}><BsFillArrowRightCircleFill className="w-6 h-6" /></div>
            </div>
        </>
    )
}


export default Order