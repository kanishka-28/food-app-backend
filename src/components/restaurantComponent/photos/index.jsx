import React from 'react'


export const Photo = ({ uploadedImages }) => {
  console.log(uploadedImages);
  return (
    <div className="bg-white rounded flex flex-wrap justify-evenly pb-6 w-full">
      {
        uploadedImages?.map((image) => (
          <div className='w-1/3 md:w-1/5 m-1 md:m-4 rounded shadow-md border border-gray-300'>
            <img
              src={image.url}
              alt="Burger"
              className="w-full h-full rounded"
            />
          </div>
        ))
      }
    </div>
  )
}


const Photos = ({ uploadedImages }) => {


  return (
    <div className="lg:px-32 hidden md:block">
      <Photo uploadedImages={uploadedImages} />
    </div>
  )
}

export default Photos