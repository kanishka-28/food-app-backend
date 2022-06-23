import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { serviceGet } from '../../../utlis/api';
import { useDispatch } from 'react-redux'
import { setloadingFalse, setloadingTrue } from '../../../redux/features/Loader/slice';

export const Photo = ({ uploadedImages }) => {
  return (
    <div className="bg-white rounded flex flex-wrap justify-evenly pb-6 w-full">
      {
        uploadedImages?.map((image) => (
          <div className='flex m-1 md:m-4'>
            <div className='w-48 h-56 rounded shadow-md'>
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


const Menu = () => {

  const { id } = useParams();

  const [uploadedImages, setuploadedImages] = useState([]);
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

  return (
    <div className="block">
      {uploadedImages?.length !== 0 ?
        <Photo uploadedImages={uploadedImages} />
        :
        <h4 className='my-10 text-center'>No Photos Added</h4>
      }
    </div>
  )
}

export default Menu
