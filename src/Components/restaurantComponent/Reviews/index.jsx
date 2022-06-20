import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {useParams} from "react-router-dom"
import { serviceGet } from '../../../Utils/Api/Api';
import Review from '../../Cards/Review';
import RateStars from '../../Stars/RateStarsHover'
import RatingStars from '../../Stars/RatingStars'

const Reviews = () => {

    const [reviews, setreviews] = useState([]);
    const [toggle, settoggle] = useState(false)
    const { id } = useParams();

    const getAllReviews = async () => {
        const { reviews } = await serviceGet(`review/rest/${id}`)
        setreviews(reviews);
    }

    useEffect(() => {
        getAllReviews();
    }, [toggle])


    return (
        <div className='w-full'>
            <div className='lg:w-1/2'>
                {reviews?.map((e) => {
                    return (
                        <Review e={e} key={e._id} toggle={toggle} settoggle={settoggle}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Reviews
