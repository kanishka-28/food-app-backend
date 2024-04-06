import { Fragment, useRef, useState, useEffect, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { SignupContext } from "../../context/signup";
import { FcGoogle } from "react-icons/fc"
import { AiOutlineClose } from "react-icons/ai";
import { IoAddOutline } from 'react-icons/io5';
import { servicePost, servicePut } from '../../Utils/Api/api';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getUser } from '../../Redux/Features/Auth/Selector/Selector';
import noFileChosen from "../../Assets/noFileChosen.svg";
import { resizeFile } from '../../Utils/Functions/imageResizer';

export default function EditFoodModal({ openEdit, setOpenEdit, food }) {
    //   const {openEdit, setOpenEdit,loginopenEdit, setLoginopenEdit,loggedIn, setloggedIn,specificRestaurant, setsepecificRestaurant,setuser } = useContext(SignupContext);
    const cancelButtonRef = useRef(null)
    const user = useSelector(getUser);
    const [details, setDetails] = useState({
        user: user?._id,
        name: '',
        descript:'',
        isVeg:false,
        photo:'',
        isContainEgg:false,
        category:'',
        price:'',
        restaurant:'',
    })

    useEffect(() => {
        setDetails({
            ...details,
            name: food.name,
            descript: food?.descript,
            isVeg: food?.isVeg,
            photo: food?.photo,
            isContainEgg: food?.isContainEgg,
            category: food?.category,
            price: food?.price,
            restaurant: food?.restaurant,
        })
    }, [food,])

    const { id } = useParams();

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (file.size > 3000000) {
            toast("Image size should be less than 3 MB");
            return;
        }
        const image = await resizeFile(file);
        setDetails({ ...details, photo: image });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await servicePut(`food/edit/${food._id}`, { restaurantId: id, foodDetails: details })
            console.log(res);
            toast.success(`${details.name} has been edited`);
        } catch (error) {
            toast.error('Some error occured while editing food')
        }
        finally{
            setOpenEdit(false);
        }
    }
    return (
        <Transition.Root show={openEdit} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpenEdit}>
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
                                                Edit Food
                                            </Dialog.Title>
                                            <button type="button" className="text-red-500"
                                                onClick={() => setOpenEdit(false)}
                                                ref={cancelButtonRef}><AiOutlineClose className="w-6" /></button>
                                        </div>
                                        <div className="mt-2">
                                            <form onSubmit={handleClick}>
                                                <input required placeholder="Food Name" className="p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded" onChange={(e) => setDetails({ ...details, name: e.target.value })}
                                                    value={details.name} />
                                                <textarea required placeholder="Description" className="p-4 my-2 w-full  focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded" onChange={(e) => setDetails({ ...details, descript: e.target.value })} value={details.descript} />
                                                <input required placeholder="Category" className="p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded" onChange={(e) => setDetails({ ...details, category: e.target.value })} value={details.category} />
                                                <div className="flex items-center justify-evenly my-2 w-3/4">
                                                    <p>Is Veg ?</p>
                                                    <input type="checkbox"
                                                        checked={details.isVeg}
                                                        className="py-4 mx-2 text-center w-6 h-12 focus:border-none focus:outline-none border border-gray-300 rounded cursor-pointer" onChange={(e) => setDetails({ ...details, isVeg: !details.isVeg })} value={details.isVeg} />
                                                    <p>Is Contain Egg ?</p>
                                                    <input type="checkbox"
                                                        checked={details.isContainEgg}
                                                        className="py-4 mx-2 text-center w-6 h-12 focus:border-none focus:outline-none border border-gray-300 rounded cursor-pointer" onChange={(e) => setDetails({ ...details, isContainEgg: !details.isContainEgg })} value={details.isContainEgg} />
                                                </div>
                                                <input required type={'number'} placeholder="Price in Rs" className="p-4 my-2 w-full h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded" onChange={(e) => setDetails({ ...details, price: e.target.value })} value={details.price} />
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
                                                            <span>Change Photo</span>
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
                                            <button type='submit' className='mx-auto py-2 px-10 font-semibold text-center rounded items-center bg-gradient-to-r from-red-500 to-[#fc256f] mt-16 text-white flex gap-3 hover:scale-110 ease-in duration-200' ><p>Edit Food</p></button>
                                            </form>
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