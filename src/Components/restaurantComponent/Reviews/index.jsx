import React from 'react'
import RateStars from '../../Stars/RateStarsHover'
import RatingStars from '../../Stars/RatingStars'

const allReviews = [1, 2, 3, 4, 5, 6, 7]
const Reviews = () => {
    return (
        <div className='w-full'>
            <div className='lg:w-1/2'>
                {allReviews?.map((e) => {
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
    )
}

export default Reviews
