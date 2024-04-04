import React from 'react'
import RatingStars from '../Stars/RatingStars'
import { ImBin } from 'react-icons/im'
import { serviceDelete } from '../../Utils/Api/api'
import {toast} from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setloadingFalse, setloadingTrue } from '../../Redux/Features/Loader/Slice'
import { formatDate } from '../../Utils/Functions/FormatDate'

const Review = ({ e,toggle, settoggle }) => {

    const reviewId = e._id;
    const dispatch = useDispatch();
    const deleteReview = async (e) => {
        e.preventDefault();
        dispatch(setloadingTrue());
        try {
            await serviceDelete(`review/delete/${reviewId}`);
            settoggle(!toggle);
            toast.success('Review is deleted successfully');
        } catch (error) {
            console.log({error});
            toast.error('Some error occured while deleting the review');
        }
        finally{
            dispatch(setloadingFalse());
        }
    }

    return (
        <div className='flex justify-between'>
            <div className="p-2 border-b border-gray-200 ">
                <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r px-4 py-2 flex leading-normal items-center gap-4 items-center">
                    <img className="w-12 h-12 rounded-full" src={e?.user?.profilePic || e?.restaurant?.coverImage || "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"} alt="pic" />
                    <div className="w-48">
                        <div className="text-gray-900 font-semibold text-xl m-0 p-0">{e?.user?.userName || e?.restaurant?.name}</div>
                        <RatingStars value={e.rating} />
                    </div>
                </div>
                <p className='mx-4 text-gray-400'>{formatDate(new Date(e?.createdAt))}</p>
                <h4 className='mx-4 text-gray-500'>{e?.comment}</h4>
            </div>
            <div>
                <ImBin onClick={deleteReview} color='red' size={'1.5rem'} className='mt-5 cursor-pointer'/>
            </div>
        </div>
    )
}

export default Review