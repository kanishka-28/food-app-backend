import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { serviceGet } from '../../../utlis/connection/api';
import { useDispatch } from 'react-redux'
import { setloadingFalse, setloadingTrue } from '../../../redux/features/Loader/slice';
import FullImageModal from '../../Modal/Fullimage';

export const Photo = ({ uploadedImages,ModalState }) => {

  const [modalState, setModalState] = ModalState;
  
  return (
    <div className="bg-white rounded flex flex-wrap justify-evenly pb-6 w-full">
      {
        uploadedImages?.map((image) => (
          <div onClick={() => setModalState({ ...modalState, open: true, image: image?.url || image })}  className='cursor-pointer flex m-1 md:m-4'>
            <div className='w-full sm:w-48 h-56 md:w-72 rounded shadow-md'>
              <img
                src={image.url}
                alt="Burger"
                className="w-full h-full rounded object-cover"
              />
            </div>
          </div>
        ))
      }
    </div>
    // </div >
  )
}


const Menu = () => {

  const { id } = useParams();

  const [uploadedImages, setuploadedImages] = useState([]);
  const [modalState, setModalState] = useState({
    open: false,
    image: '',
  })

  const dispatch = useDispatch();

  const getMenu = async () => {
    dispatch(setloadingTrue());
    try {
      const { menu } = await serviceGet(`menu/${id}`);
      setuploadedImages(menu.menuImage);
    } catch (error) {
      console.log({ error });
    }
    finally {
      dispatch(setloadingFalse());
    }
  }

  useEffect(() => {
    getMenu();
  }, [])

  useEffect(() => {
    getMenu();
  }, [])

  return (
    <div className="block">
      <FullImageModal ModalState={[modalState, setModalState]} />
      {uploadedImages?.length !== 0 ?
        <Photo uploadedImages={uploadedImages} ModalState={[modalState, setModalState]}/>
        :
        <h4 className='my-10 text-center'>No Menu Added</h4>
      }
    </div>
  )
}

export default Menu
