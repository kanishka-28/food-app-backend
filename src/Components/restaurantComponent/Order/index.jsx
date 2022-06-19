import React, { useContext } from 'react'
import { GiScooter } from 'react-icons/gi';
import { BsFillArrowRightCircleFill, BsCompass, BsClock, BsCheckCircleFill } from 'react-icons/bs'

import { Link, useParams } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FcGoogle } from "react-icons/fc"
import { AiOutlineClose } from "react-icons/ai";
import AddFoodModal from '../../Modal/AddFood';
import FoodCards from '../../Cards/FoodCards';
import EditFoodModal from '../../Modal/EditFood';
import { serviceGet } from '../../../Utils/Api/Api';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../Redux/Features/Food/Selector/Selector';
import { setloadingFalse, setloadingTrue } from '../../../Redux/Features/Loader/Slice';
// import { orderfood, getfood } from '../../../services/api';
// import { SignupContext } from '../../../context/signup';

let startOfFoods;
const Order = () => {

    startOfFoods = useRef();
    const { id } = useParams();
    const open = useSelector(openModal);
    const dispatch = useDispatch();
    const [openEdit, setOpenEdit] = useState(false);
    const [foods, setFoods] = useState([])
    const [food, setFood] = useState([])

    const getAllFood = async () => {
        dispatch(setloadingTrue())
        try {
            const { foods } = await serviceGet(`food/${id}`);
            setFoods(foods);
        } catch (error) {
            console.log(error);
        }
        finally{
            dispatch(setloadingFalse())
        }
    }

    useEffect(() => {
        getAllFood();
    }, [openEdit,open])

    const LapOrder = () => {
        return (
            <>
                <div className='flex flex-col'>
                    {/* <button className='self-end py-2 px-10 font-semibold text-center rounded items-center bg-gradient-to-r from-red-500 to-[#fc256f]  my-6 text-white flex gap-3 hover:scale-110 ease-in duration-200' onClick={() => {
                        const open = se
                        setOpen(true)
                        settitle('Add')
                    }
                    }><p>Add Food</p><IoAddOutline size={'1.5rem'} /></button> */}
                    <div ref={startOfFoods} className='grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {foods.length !== 0 ? foods?.map((food) => {
                            return (
                                <>
                                    <FoodCards key={food.id} food={food} setOpenEdit={setOpenEdit} setFood={setFood} />
                                </>
                            )
                        })
                            : <div className="mt-3 flex justify-center items-center bg-yellow-100 border border-dashed border-gray-400 p-2 align-center self-center mx-auto w-96">
                                <h3>No Food Added</h3>
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    }
    return (
        <div>
            <LapOrder />
            {/* food --> as title */}
            <EditFoodModal openEdit={openEdit} setOpenEdit={setOpenEdit} food={food} />
        </div>
    )
}

export default Order