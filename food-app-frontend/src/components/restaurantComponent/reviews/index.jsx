import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { serviceGet, servicePost } from '../../../utlis/connection/api'
import RateStars from '../../Stars/RateStarsHover'
import RatingStars from '../../Stars/RatingStars'
import { isAuthenticated, user } from '../../../redux/features/auth/selector/selector';
import toast from 'react-hot-toast';
import Review from '../../Card/Review';
import { setloadingFalse, setloadingTrue } from '../../../redux/features/Loader/slice';


const Reviews = () => {

    const [reviews, setreviews] = useState([]);
    const { id } = useParams();
    const userDetails = useSelector(user);
    const isLoggedIn = useSelector(isAuthenticated);
    const dispatch = useDispatch();
    const [details, setdetails] = useState({
        user: userDetails?._id,
        restaurant : id,
        rating: '',
        comment: '',
    })

    const [toggle, settoggle] = useState(false);
    const getAllReviews = async () => {
        dispatch(setloadingTrue());
        try {
            const { reviews } = await serviceGet(`review/rest/${id}`);
            setreviews(reviews);
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            dispatch(setloadingFalse());
        }
        
    }

    // console.log(details);
    const postReview = async (e) => {
        e.preventDefault();
        if(!isLoggedIn){
            toast.error('Login to add review');
            return;
        }
        try {
            await servicePost(`review/add`, details);
            settoggle(!toggle);
            toast.success('Review is posted successfully');
        } catch (error) {
            console.log({error});
            toast.error('Some error occured while posting your review');
        }
        finally{
            setdetails({...details,rating:"",comment:""});
        }
    }

    useEffect(() => {
        getAllReviews();
    }, [toggle])



    return (
        <div className='w-full'>
            <div className='lg:flex lg:flex-row-reverse gap-10 justify-between'>
                <div className='shadow-lg border-b border-gray-200 lg:w-2/5 h-full p-6 text-gray-600 font-serif lg:sticky top-12'>
                    <h4>Rate your experience</h4>
                    <RateStars handleChange={(e)=>{setdetails({...details, rating: e})}}/>
                    <form className="p-1 flex items-center flex-wrap">
                        <div className="flex justify-center">
                            <div className="xl:w-96">
                                <textarea
                                    className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-6 focus:outline-none"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    value={details.comment}
                                    onChange={(e)=>setdetails({...details, comment: e.target.value})}
                                    placeholder="Type Your Review Here..."
                                />
                            </div>
                        </div>
                        <button onClick={postReview} className="h-10 bg-megenta-500 hover:bg-zomato-600 text-white my-1 mx-2 rounded px-2" type="button">
                            Submit
                        </button>
                    </form>
                </div>
                <div className='lg:w-1/2'>
                    {reviews.length!==0 ? reviews.map((e) => {
                        return (
                            <Review key={e._id} e={e}/>
                        )
                    }) :
                        <div className='w-full text-gray-600 mt-10 flex justify-center items-center'>
                            <h4>No Reviews</h4>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Reviews
