import React, { useState } from 'react'
import FullImageModal from '../../Modal/Fullimage';

const Photos = ({ uploadedImages }) => {


  const [modalState, setModalState] = useState({
    open: false,
    image: '',
  })

  const Photo = ({ uploadedImages }) => {
    
    return (
      <div className="bg-white rounded flex flex-wrap justify-evenly pb-6 w-full">
        {
          uploadedImages?.map((image) => (
            <div onClick={() => setModalState({ ...modalState, open: true, image: image?.url || image })} className='cursor-pointer flex m-1 md:m-4'>
              <div className='w-48 h-56 rounded shadow-md'>
                <img
                  src={image.url}
                  alt="Burger"
                  className="w-full h-full rounded object-cover"
                />
              </div>
            </div>
          ))
        }
      </div >
    )
  }

  return (
    <div className="block">
      <FullImageModal ModalState={[modalState, setModalState]} />
      {uploadedImages?.length !== 0 ?
        <Photo uploadedImages={uploadedImages} ModalState={[modalState, setModalState]} />
        :
        <h4 className='my-10 text-center'>No Photos Added</h4>
      }
    </div>
  )
}

export default Photos