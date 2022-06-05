import React from 'react'

const allReviews = [1, 2, 3, 4, 5]
const Reviews = () => {
    return (
        <div className='w-full'>
            <form class="p-2 w-1/2 flex items-center">
                <div class="flex justify-center">
                    <div class="xl:w-96">
                        <textarea
                            class=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-6 focus:outline-none"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="Type Your Review Here..."
                        ></textarea>
                    </div>
                </div>
                <button class="h-12 bg-zomato-500 hover:bg-zomato-600 text-white my-1 mx-2 rounded px-2" type="button">
                    Add Review
                </button>
            </form>
            {allReviews?.map((e) => {
                return (
                    <div class="p-2 lg:w-1/2">
                        <div class="border border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex leading-normal items-center gap-10">
                            <img class="w-20 h-20 rounded-full mr-4" src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" alt="Avatar of Writer" />
                            <div class="w-48">
                                <div class="text-gray-900 font-bold text-xl">Name</div>
                                <p class="text-gray-700 text-base">Review Pizza King Photos</p>
                                <p class="text-sm text-gray-600">Aug 18</p>
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default Reviews
