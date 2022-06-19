import React from 'react'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai";

export default function OrderModal({ foodDetails, open, setopen }) {

    const cancelButtonRef = useRef(null);
    const [quantity, setquantity] = useState(1);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setopen}>
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
                                <div className="sm:flex sm:items-start items-center">

                                    <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left mb-8">
                                        <div className="flex justify-between mb-8">
                                            <Dialog.Title as="h3" className="text-2xl leading-6 font-medium text-gray-700">
                                                Restaurant Ka Name
                                            </Dialog.Title>
                                            <button type="button" className="text-red-500"
                                                onClick={() => setopen(false)}
                                                ref={cancelButtonRef}><AiOutlineClose className="w-6" /></button>
                                        </div>
                                        <div className="mt-2 text-center">
                                            <form className={`my-6`}>
                                                <div className="flex items-center justify-between my-2">
                                                    <p>Food Name - </p>
                                                    <input value={foodDetails.name} className="py-4  mx-2 text-center w-3/4 h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded" />
                                                </div>

                                                <div className="flex items-center justify-between my-2">
                                                    <p>Quantity - </p>
                                                    <div className='flex items-center justify-between'>
                                                        <div className='text-2xl'>-</div>
                                                        <input value={quantity} className="py-4 mx-2 text-center w-72 h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded" />
                                                        <div className='text-2xl mr-2 border border-gray-300 p-2 rounded-sm'>+</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between my-2">
                                                    <p>Price Total - </p>
                                                    <input value={foodDetails.price} className="py-4   mx-2 text-center w-3/4 h-12 focus:border-none focus:outline-none focus:ring-1 focus:ring-black  border border-gray-300 rounded" />
                                                </div>

                                            </form>
                                            <button className={`border border-gray-300 font-semibold w-full h-12 bg-megenta-400 text-white`}>Place Order</button>
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