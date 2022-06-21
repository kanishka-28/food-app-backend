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
        className="w-full h-full rounded object-cover"
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
    
    let file = e.target.files;
    //convert files list into array
    file = Array.from(file);
    //then use promise all to resolve each promise
    file = Promise.all(file.map(async(element,i) => {
      
      if (element.size > 3000000) {
        toast.error(`Size of ${element.name} should be less than 3 MB`);
        return;
      }
      return new Promise((resolve,reject)=>{
        resizeFile(element)
        .then(res => resolve(res));
      });
    })).then(el=>setimages(el));
    
  };
  
  
  const onSave = async () => {
    dispatch(setloadingTrue);
    try {
      const payload = images.map(img=>({url:img}));
      const res = await servicePut(`image/${id}`, { photos: payload });
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
    dispatch(setloadingTrue());
    try {
      const { photos : {photos} } = await serviceGet(`image/${id}`);
      console.log(photos);
      setuploadedImages(photos);
    } catch (error) {
      console.log({ error });
    }
    finally{
      dispatch(setloadingFalse());
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
              images?.length !== 0 &&
              images?.map((image, i) => (
                <Photo key={i} image={image} />
              ))
            }
          </div>
        </div>
        {images.length !== 0 && <button onClick={onSave} className=' py-2 px-8 font-semibold text-center rounded items-center bg-gradient-to-r from-red-500 to-[#fc256f] text-white flex gap-3 hover:scale-110 ease-in duration-200'><p>Save</p><IoCheckmarkDoneOutline size={'1.5rem'} /></button>}
      </div>
      <div className="bg-white rounded flex pb-6 w-full">
        {
              uploadedImages?.length !== 0 ?
                uploadedImages?.map((image,i) => (
                  <Photo key={i} image={image.url} />
                ))
                :
                <h4>No images uploaded</h4>
            }
      </div>
    </>
  )

}

export default Photos