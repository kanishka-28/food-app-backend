import React, { useContext, useEffect, useState } from 'react'
import { resizeFile } from '../../../Utils/Functions/imageResizer';
// import { SignupContext } from '../../../context/signup';
import { toast } from 'react-hot-toast'
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux'
import { serviceGet, servicePut } from '../../../Utils/Api/Api';
import { useParams } from 'react-router-dom';
import { setloadingFalse, setloadingTrue } from '../../../Redux/Features/Loader/Slice';

export const Photo = ({ image }) => {
  return (
    <div className='w-1/3 md:w-48 h-56 m-1 md:m-4 rounded shadow-md border border-gray-300'>
      <img
        src={image}
        alt="Burger"
        className="w-full h-full rounded"
      />
    </div>

  )
}


const Photos = () => {

  // const requiredRestaurant= restaurant.filter((res)=>(res._id===param))[0];
  const { id } = useParams();
  const dispatch = useDispatch();

  const [images, setimages] = useState([]);
  const [uploadedImages, setuploadedImages] = useState([]);
  const [toggle, settoggle] = useState(false);

  const handleFile = async (e) => {
    console.log('working');
    let file = e.target.files;
    file = Array.from(file)
    file.forEach(async(element,i) => {
      console.log('123');
      if (element.size > 3000000) {
        toast.error(`Size of ${element.name} should be less than 3 MB`);
        return;
      }
      console.log('abc');
      resizeFile(element).then((res)=>{
        // console.log(element.name);
        setimages([...images, res]);     
        // console.log(images);
      })
      console.log('xyz');
    });
  };
  
  useEffect(() => {
    console.log(images);
  }, [images])
  
  const onSave = async () => {
    dispatch(setloadingTrue);
    try {
      const res = await servicePut(`image/${id}`, { photos: images });
      console.log(res);
      toast.success('Photos has been uploaded');
      setimages([]);
      setuploadedImages();
      settoggle(!toggle);
    } catch (error) {
      console.log(error);
    }
    finally {
      dispatch(setloadingFalse);
    }
  }

  const getAllPhotos = async () => {
    try {
      const { photos } = await serviceGet(`image/${id}`);
      setuploadedImages(photos.photos);
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    getAllPhotos();
  }, [toggle])

  return (
    <>
      <div className="mb-10 lg:px-4 hidden md:block">
        <p className="text-xl font-dark mt-6">Upload Photos</p>
        <div className='flex gap-5'>
          <div className="bg-yellow-200 text-center mt-6 h-12 w-44 px-4 flex text-sm text-gray-600 flex justify-center items-center rounded">
            <label
              htmlFor="file-upload" className="relative cursor-pointer "
            >
              <span className='font-semibold'>Upload Photos +</span>
              <input multiple id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFile} />
            </label>
          </div>
          <div className="bg-white rounded flex flex-wrap justify-evenly pb-6 w-full">
            {
              images.length !== 0 &&
              images.map((image, i) => (
                <Photo key={i} image={image} />
              ))
            }
          </div>
        </div>
        {images.length !== 0 && <button onClick={onSave} className=' py-2 px-8 font-semibold text-center rounded items-center bg-gradient-to-r from-red-500 to-[#fc256f] text-white flex gap-3 hover:scale-110 ease-in duration-200'><p>Save</p><IoCheckmarkDoneOutline size={'1.5rem'} /></button>}
      </div>
      <div className="bg-white rounded flex pb-6 w-full">
        {/* {
              uploadedImages.length !== 0 ?
                uploadedImages.map((image) => (
                  <Photo image={image} />
                ))
                :
                <h4>No images uploaded</h4>
            } */}
      </div>
    </>
  )

}

export default Photos