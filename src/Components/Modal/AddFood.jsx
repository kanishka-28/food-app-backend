import { Fragment, useRef, useState, useEffect, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { SignupContext } from "../../context/signup";
import { FcGoogle } from "react-icons/fc"
import { AiOutlineClose } from "react-icons/ai";
import { IoAddOutline } from 'react-icons/io5';
import { servicePost } from '../../Utils/Api/Api';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../Redux/Features/Auth/Selector/Selector';
import noFileChosen from "../../Assets/noFileChosen.svg";
import { resizeFile } from '../../Utils/Functions/imageResizer';
import { setOpen } from '../../Redux/Features/Food/Slice';
import { openModal } from '../../Redux/Features/Food/Selector/Selector';

export default function AddFoodModal() {

    const cancelButtonRef = useRef(null)
    const user = useSelector(getUser);
    const open = useSelector(openModal);
    const dispatch = useDispatch();
    const [details, setDetails] = useState({
        user: user?._id,
        name: '',
        descript: '',
        isVeg: false,
        photo: '',
        isContainEgg: false,
        category: '',
        price: '',
        restaurant: '',
    })

    const { id } = useParams();

    const onClose=()=>{
        dispatch(setOpen(false))
    }
    const handleFile = async(e) => {
        const file = e.target.files[0];
        if(file.size>3000000){
            toast("Image size should be less than 3 MB");
            return;
        }
        const image = await resizeFile(file);
        setDetails({ ...details, photo: image });  
    };

    const handleClick = async () => {
        try {
            const res = await servicePost(`food/add/${id}`, details)
            console.log(res);
            toast.success(`${details.name} has been added`);
        } catch (error) {
            toast.error('Some error occured while adding new food')
        }
        finally {
            dispatch(setOpen(false));
        }
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={onClose}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">

                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left mb-8">
                                        <div className="flex justify-between mb-8">
                                            <Dialog.Title as="h3" className="text-2xl leading-6 font-medium text-gray-900">
                                                Add Food
                                            </Dialog.Title>
                                            <button type="button" className="text-red-500"
                                                onClick={() => dispatch(setOpen(false))}
                                                ref={cancelButtonRef}><AiOutlineClose className="w-6" /></button>
                                        </div>
                                        <div className="mt-2">
                                            <form>
                                                <input placeholder="Food Name" className="p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded" onChange={(e) => setDetails({ ...details, name: e.target.value })} />
                                                <textarea placeholder="Description" className="p-4 my-2 w-full  focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded" onChange={(e) => setDetails({ ...details, descript: e.target.value })} />
                                                <input placeholder="Category" className="p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded" onChange={(e) => setDetails({ ...details, category: e.target.value })} />
                                                <div className="flex items-center justify-evenly my-2 w-3/4">
                                                    <p>Is Veg ?</p>
                                                    <input type="checkbox" className="py-4 mx-2 text-center w-6 h-12 focus:border-none focus:outline-none border border-gray-300 rounded cursor-pointer" onClick={(e) => setDetails({ ...details, isVeg: !details.isVeg })} />
                                                    <p>Is Contain Egg ?</p>
                                                    <input type="checkbox" className="py-4 mx-2 text-center w-6 h-12 focus:border-none focus:outline-none border border-gray-300 rounded cursor-pointer" onClick={(e) => setDetails({ ...details, isContainEgg: !details.isContainEgg })} />
                                                </div>
                                                <input type={'number'} placeholder="Price in Rs" className="p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded" onChange={(e) => setDetails({ ...details, price: e.target.value })} />
                                                <div className="h-96 px-4 bg-white space-y-3 sm:p-6">
                                                    <label className="block text-gray-700 mb-2 ">Food Photo</label>
                                                    <div className="justify-center h-3/4 sm:h-full focus:border-none focus:outline-none focus:ring-1 focus:ring-black border border-gray-300 rounded mt-1 flex items-center">
                                                        <img
                                                            src={
                                                                details.photo
                                                                    ? details.photo
                                                                    : noFileChosen
                                                            }
                                                            alt="Not Found"
                                                            className={`${details.photo ? "w-full" : "w-1/2"} h-full`}
                                                        />
                                                    </div>
                                                    <div className="flex text-sm text-gray-600">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="pl-2 cursor-pointer bg-white rounded font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 flex gap-4"
                                                        >
                                                            <span>Choose Photo</span>
                                                            <input
                                                                id="file-upload"
                                                                name="file-upload"
                                                                type="file"
                                                                className="sr-only"
                                                                onChange={handleFile}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </form>
                                            <button className='mx-auto py-2 px-10 font-semibold text-center rounded items-center bg-gradient-to-r from-red-500 to-[#fc256f]  my-6 text-white flex gap-3 hover:scale-110 ease-in duration-200' onClick={handleClick}><p>Add Food</p><IoAddOutline size={'1.5rem'} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}