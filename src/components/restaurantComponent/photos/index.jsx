import React from 'react'


export const Photo = ({ uploadedImages }) => {
  return (
    <div className="bg-white rounded flex flex-wrap justify-evenly pb-6 w-full">
      {
        uploadedImages?.map((image) => (
          <div className='flex m-1 md:m-4'>
            <div className='md:w-48 h-56 rounded shadow-md'>
              <img
                src={image.url}
                alt="Burger"
                className="w-full h-full rounded"
              />
            </div>
          </div>
        ))
      }
    </div >
  )
}


const Photos = ({ uploadedImages }) => {


  return (
    <div className="hidden md:block">
      {uploadedImages?.length !== 0 ?
        <Photo uploadedImages={uploadedImages} />
        :
        <h4 className='my-10'>No Photos Added</h4>
      }
    </div>
  )
}

export default Photos