import React from 'react'
import toast from 'react-hot-toast'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { ImBin } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setloadingFalse, setloadingTrue } from '../../Redux/Features/Loader/Slice'
import RatingStars from '../Stars/RatingStars'
import { serviceDelete } from '../../Utils/Api/api'
import { allKitchens } from '../../Redux/Features/Kitchen/Selector/Selector'
import { storeAllKitchens } from '../../Redux/Features/Kitchen/Slice'

const KitchenCards = ({ kitchen }) => {

    const dispatch = useDispatch();
    const kitchens = useSelector(allKitchens);

    const deleteRest = async () => {
        dispatch(setloadingTrue());
        try {
            await serviceDelete(`kitchen/delete/${kitchen._id}`);
            const otherkitchens = kitchens.filter((data) => {
                return kitchen._id !== data._id
            });
            dispatch(storeAllKitchens(otherkitchens));
            toast.success(`Kitchen has been deleted`);

        } catch (error) {
            console.log({ error });
        }
        finally {
            dispatch(setloadingFalse());
        }
    }

    return (
        <div className="relative w-full flex justify-center mt-10 ">
            {/* <img className='h-28 w-28 bg-black ' src='https://w7.pngwing.com/pngs/565/647/png-transparent-chef-hat-askew-hat-white-chef-hat.png' alt='kitchen_hat'/> */}
            <div className="sm:w-full md:w-3/4 px-10 md:p-0 flex flex-col sm:flex-row rounded-lg bg-white shadow-lg justify-between relative">
                <Link to={`/kitchen/${kitchen._id}`}>
                    <img className="cursor-pointer w-full h-40 sm:h-52 object-cover sm:w-40 md:w-64 rounded-t-lg md:rounded-none md:rounded-l-lg" src={kitchen?.coverImage ? kitchen?.coverImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCuem-at-uRZQ5ft4t24y4-Y7WYTnRHdVjA&usqp=CAU'} alt="" />
                </Link>
                <div className="w-3/4 px-6 flex flex-col justify-evenly">
                    <h3 className="text-gray-900 font-semibold">{kitchen.name}</h3>
                    <div>
                        <div className='flex items-center gap-3'>
                            <p className="text-gray-700 text-base">
                                {kitchen.timing ? kitchen.timing : 'Full time'}
                            </p>
                            <RatingStars value={Math.round(kitchen?.reviews?.size == 1 && kitchen?.reviews[0]?.avgRating)} />
                        </div>
                        <p className="text-gray-500 text-base">
                            {kitchen.address}
                        </p>
                    </div>
                    <Link to={`/kitchen/${kitchen._id}`} className="w-64 bg-megenta-400 hover:bg-megenta-500 text-white font-bold py-2 my-6 px-4 rounded flex items-center gap-3 hover:scale-105 ease-in duration-200">
                        <p> Go To This kitchen</p> <HiArrowNarrowRight size={'1.5rem'} />
                    </Link>
                </div>
                <div className='mr-6 mb-3 sm:mb-0 h-fit cursor-pointer absolute right-4 top-4 md:top-12 bg-white p-2 rounded-md' onClick={deleteRest}><ImBin size={'1.5rem'} color='red' /></div>
            </div>
        </div>
    )
}

export default KitchenCards