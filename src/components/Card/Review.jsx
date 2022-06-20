import React from 'react'
import RatingStars from '../Stars/RatingStars'

const Review = ({e}) => {
    return (
        <div className="p-2 border-b border-gray-200 ">
            <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r px-4 py-2 flex leading-normal items-center gap-4 items-center">
                <img className="w-12 h-12 rounded-full" src={e.user.profilePic || e.restaurant.coverImage} alt="pic" />
                <div className="w-48">
                    <div className="text-gray-900 font-semibold text-xl m-0 p-0">{e.user.userName || e.restaurant.name}</div>
                    <RatingStars value={e.rating} />
                </div>
            </div>
            <p className='mx-4 text-gray-400'>{e.createdAt?.slice(0, 10)}</p>
            <h4 className='mx-4 text-gray-500'>{e.comment}</h4>
        </div>

    )
}

export default Review