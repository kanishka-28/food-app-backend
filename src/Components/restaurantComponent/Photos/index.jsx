import React, { useContext, useEffect, useState } from 'react'
import { resizeFile } from '../../../Utils/Functions/imageResizer';
import { toast } from 'react-hot-toast'
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { GiTireIronCross } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { servicePut } from '../../../Utils/Api/Api';
import { useParams } from 'react-router-dom';
import { setloadingFalse, setloadingTrue } from '../../../Redux/Features/Loader/Slice';
import { ImBin } from 'react-icons/im';


export const Photo = ({ image, uploaded, state }) => {

  const [toggle, settoggle] = state;
  const { id } = useParams();
  const dispatch = useDispatch();

  const deletePhoto = async () => {
    dispatch(setloadingTrue());
    try {
      const res = await servicePut(`image/delete/${image._id}`, { _id: id });
      console.log(res);
      toast.success('Deleted successfully');
      settoggle(!toggle)
    } catch (error) {
      console.log(error);
    }
    finally {
      dispatch(setloadingFalse());
    }
  }

  return (
    <div className='m-4'>
      <div className='w-48 h-56 rounded shadow-md'>
        <img
          src={image?.url || image}
          alt="Burger"
          className="w-full h-full rounded object-cover"
        />
      </div>
      {uploaded && <ImBin onClick={deletePhoto} className='cursor-pointer relative left-40 bg-white rounded-md -top-56 p-2 text-4xl' color='red' />}
    </div>
  )
}


const Photos = ({ uploadedImages, state }) => {

  // const requiredRestaurant= restaurant.filter((res)=>(res._id===param))[0];
  const { id } = useParams();
  const dispatch = useDispatch();

  const [images, setimages] = useState([]);
  const [toggle, settoggle] = state;

  const handleFile = async (e) => {

    let file = e.target.files;
    //convert files list into array
    file = Array.from(file);
    //then use promise all to resolve each promise
    file = Promise.all(file.map(async (element, i) => {

      if (element.size > 3000000) {
        toast.error(`Size of ${element.name} should be less than 3 MB`);
        return;
      }
      return new Promise((resolve, reject) => {
        resizeFile(element)
          .then(res => resolve(res));
      });
    })).then(el => setimages(el));

  };

  const onSave = async () => {
    dispatch(setloadingTrue());
    try {
      const payload = images.map(img => ({ url: img }));
      const res = await servicePut(`image/${id}`, { photos: payload });
      console.log(res);
      toast.success('Photos has been uploaded');
      setimages([]);
      settoggle(!toggle);
    } catch (error) {
      console.log(error);
    }
    finally {
      dispatch(setloadingFalse());
    }
  }

  const onCancel = async () => {
    setimages([]);
  }


  return (
    <>
      <div className="mb-10">
        <p className="text-xl font-dark mt-6">Upload Photos</p>
        {/* <div className='flex gap-5'>
          <div className="bg-yellow-200 text-center mt-6 h-12 w-44 px-4 flex text-sm text-gray-600 flex justify-center items-center rounded">
            <label
              htmlFor="file-upload" className="relative cursor-pointer "
            >
              <span className='font-semibold'>Upload Photos +</span>
              <input multiple id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFile} />
            </label>
          </div>
        </div> */}
        <div className='block sm:flex gap-4'>
          <div className="lg:w-1/4 lg:mx-12 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded h-fit mt-6 ">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input multiple id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFile} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          <div className="bg-white rounded flex flex-wrap justify-center pb-6 w-full overflow-x-auto ">
          {
            images?.length !== 0 &&
            images?.map((image, i) => (
              <Photo key={i} image={image} uploaded={false} state={[toggle,settoggle]}/>
            ))
          }
        </div>
        </div>
        {images.length !== 0 &&
          <div className='flex items-center gap-3'>
            <button onClick={onSave} className=' py-2 px-8 font-semibold text-center rounded items-center bg-gradient-to-r from-red-500 to-[#fc256f] text-white flex gap-3 hover:scale-110 ease-in duration-200'><p>Save</p><IoCheckmarkDoneOutline size={'1.5rem'} /></button>
            <button onClick={onCancel} className=' py-2 px-8 font-semibold text-center rounded items-center border border-gray-500 text-gray-500 flex gap-3 hover:scale-110 ease-in duration-200'><p>Cancel</p><GiTireIronCross color='red' size={'1.2rem'} /></button>
          </div>
        }
      </div>
      {
        uploadedImages?.length !== 0 ?
          <div className="bg-white rounded flex pb-6 w-full flex-wrap">
            {uploadedImages?.map((image, i) => (
              <Photo key={i} image={image} uploaded={true} state={state} />
            ))}
          </div>
          :
          <h4 className='text-center'>No images uploaded</h4>
      }
    </>
  )

}

export default Photos