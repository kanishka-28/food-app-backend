import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { serviceGet, servicePost } from '../../../utlis/api'
import RateStars from '../../Stars/RateStarsHover'
import RatingStars from '../../Stars/RatingStars'


const Reviews = () => {
    const [reviews, setreviews] = useState([]);
    const { id } = useParams();

    const getAllReviews = async () => {
        const { reviews } = await serviceGet(`review/rest/${id}`)
        setreviews(reviews);
    }

    const postReview = async () => {
        const {review} = await servicePost(`review/add/${id}`)
        console.log(review);
    }
    useEffect(() => {
        getAllReviews();
    }, [])



    return (
        <div className='w-full'>
            <div className='lg:flex lg:flex-row-reverse gap-10 justify-between'>
                <div className='shadow-lg border-b border-gray-200 lg:w-2/5 h-full p-6 text-gray-600 font-serif lg:sticky top-12'>
                    <h4>Rate your experience</h4>
                    <RateStars />
                    <form className="p-1 flex items-center flex-wrap">
                        <div className="flex justify-center">
                            <div className="xl:w-96">
                                <textarea
                                    className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-6 focus:outline-none"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    placeholder="Type Your Review Here..."
                                ></textarea>
                            </div>
                        </div>
                        <button className="h-10 bg-megenta-500 hover:bg-zomato-600 text-white my-1 mx-2 rounded px-2" type="button">
                            Submit
                        </button>
                    </form>
                </div>
                <div className='lg:w-1/2'>
                    {reviews?.map((e) => {
                        return (
                            <div key={e} className="p-2 border-b border-gray-200 ">
                                <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r px-4 py-2 flex leading-normal items-center gap-4 items-center">
                                    <img className="w-12 h-12 rounded-full" src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" alt="Avatar of Writer" />
                                    <div className="w-48">
                                        <div className="text-gray-900 font-semibold text-xl m-0 p-0">Name</div>
                                        <RatingStars value={4} />
                                    </div>
                                </div>
                                <p className='mx-4 text-gray-400'>07-06-2022</p>
                                <h4 className='mx-4 text-gray-500'>Bahut Badhiya...</h4>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Reviews
