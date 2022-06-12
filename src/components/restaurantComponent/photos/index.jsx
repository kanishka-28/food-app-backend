import React from 'react'


export const Photo = ({restaurant}) => {
    return (
        <div className="bg-white rounded flex flex-wrap justify-evenly pb-6 w-full">
            {
              restaurant?.photos?.map((image) => (
                <div className='w-1/3 md:w-1/5 m-1 md:m-4 rounded shadow-md border border-gray-300'>
                  <img
                    src={image}
                    alt="Burger"
                    className="w-full h-full rounded"
                  />
                </div>
              ))
            }
        </div>
      )
}


const Photos = () => {
  
  
    return (
        <div className="lg:px-32 hidden md:block">
            <Photo restaurant={'requiredRestaurant'}/>
        </div>
    )
}

export default Photos