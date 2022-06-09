import React, { useState, useEffect } from 'react'
// import { allOrdersRes, deleteorder } from '../../services/api'
import { GiScooter, GiCampCookingPot, GiDiamondsSmile } from 'react-icons/gi'
import { IoTrashBinSharp } from 'react-icons/io5'
import { GoSmiley } from 'react-icons/go'

const AllOrders = () => {

    const [state, setstate] = useState(false)
    const [openTab, setOpenTab] = React.useState(1);
    const color = 'megenta-500';
    // const [orders, setorders] = useState([])
    const orders = [1, 2, 3, 4]
    useEffect(() => {
        // const id = JSON.parse(localStorage.getItem("user"))._id;
        // Promise.resolve(allOrdersRes(id)).then((res)=>{
        //     console.log(res);
        //     setorders(res.data.getOrders.orderDetails)
        //     console.log(orders);
        // }).catch((e)=>{
        //     console.log(e.response);
        // })
    }, [state])

    return (
        <>
            <div className="flex flex-wrap mx-4 lg:mx-28 lg:w-3/4">
                <div className="w-full">
                    <ul
                        className="flex gap-8 md:gap-20 mb-0 text-xl pt-6 text-gray-500 overflow-x-auto no-scrollbar"
                        role="tablist"
                    >
                        <li className={`hover:text-zomato-500 text-center pb-2 ${openTab === 1 && "text-zomato-400 border-b-2 border-zomato-400"}`}>
                            <a
                                className={
                                    "" +
                                    (openTab === 1 && "text-zomato-400 border-b-2 border-zomato-400")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                <div className='flex items-center gap-4'>
                                    <GiScooter size={'1.8rem'} /><p>Delivered</p>
                                </div>
                            </a>
                        </li>
                        <li className={`hover:text-zomato-500 text-center pb-2 ${openTab === 2 && "text-zomato-400 border-b-2 border-zomato-400"}`}>
                            <a
                                className={
                                    "" +
                                    (openTab === 2 && "text-zomato-400 border-b-2 border-zomato-400")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                <div className='flex items-center gap-4'>
                                    <GiCampCookingPot size={'1.7rem'} /><p>Pending</p>
                                </div>
                            </a>
                        </li>
                        <li className={`hover:text-zomato-500 text-center pb-2 ${openTab === 3 && "text-zomato-400 border-b-2 border-zomato-400"}`}>
                            <a
                                className={
                                    "" +
                                    (openTab === 3 && "text-zomato-400 border-b-2 border-zomato-400")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(3);
                                }}
                                data-toggle="tab"
                                href="#link3"
                                role="tablist"
                            >
                                <div className='flex items-center gap-4'>
                                    <IoTrashBinSharp size={'1.5rem'} /><p>Rejected</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div className="mt-10">
                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                            {orders.length !== 0 ? orders.map((order) => (
                                <div key={order} className="bg-green-200 my-2 lg:w-3/4 flex justify-between border-b border-gray-200 shadow-lg px-2 align-center py-6">
                                    <div>
                                        <h4>Food Name (quantity){order.food}</h4>
                                        <p className='text-gray-600'>To - Mumbai Places, Mumbai Locality, Post Office{order.address}</p>
                                        <h4 className='font-semibold'>₹ 500 <span className='text-sm'>(2 x 250)</span>{order.price}</h4>
                                    </div>
                                    <GoSmiley size={'2rem'} color={'green'} className='mr-4' />
                                </div>
                            )) : <div className="flex justify-between items-center bg-yellow-100 border border-dashed border-gray-400 p-2 align-center">
                                this restaurant dont have any order
                            </div>
                            }
                        </div>
                        <div className={openTab === 2 ? "block" : "hidden"} id="link1">
                            {orders.length !== 0 ? orders.map((order) => (
                                <div key={order} className="bg-yellow-100 my-2 lg:w-3/4 flex justify-between items-center border-b border-gray-200 shadow-lg px-2 align-center py-6">
                                    <div>
                                        <h4>Food Name (quantity){order.food}</h4>
                                        <p className='text-gray-600'>To - Mumbai Places, Mumbai Locality, Post Office{order.address}</p>
                                        <h4 className='font-semibold'>₹ 500 <span className='text-sm'>(2 x 250)</span>{order.price}</h4>

                                    </div>
                                    <div className='flex gap-8'>
                                        <button onClick={() => {

                                        }} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded" >
                                            Accept Order
                                        </button>
                                        <button onClick={() => {

                                        }} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded" >
                                            Delete Order
                                        </button>
                                    </div>
                                </div>
                            )) :
                                <div className="flex justify-between items-center bg-yellow-100 border border-dashed border-gray-400 p-2 align-center">
                                    this restaurant dont have any order
                                </div>
                            }
                            <div className="lg:w-3/4 bg-red-200 flex justify-between  border-b border-gray-200 shadow-lg p-2 align-center my-8">
                                <div>
                                    <h4>Food Name (quantity)</h4>
                                    <p className='text-gray-600'>To - Mumbai Places, Mumbai Locality, Post Office</p>
                                    <h4 className='font-semibold'>₹ 500 <span className='text-sm'>(2 x 250)</span>₹400</h4>

                                </div>
                                <p className='text-red-600 font-bold'>Cancelled</p>
                            </div>
                        </div>
                        <div className={openTab === 3 ? "block" : "hidden"} id="link1">
                            {orders.length !== 0 ? orders.map((order) => (
                                <div key={order} className="bg-red-200 my-2 lg:w-3/4 flex justify-between border-b border-gray-200 shadow-lg px-2 align-center py-6">
                                    <div>
                                        <h4>Food Name (quantity){order.food}</h4>
                                        <p className='text-gray-600'>To - Mumbai Places, Mumbai Locality, Post Office{order.address}</p>
                                        <h4 className='font-semibold'>₹ 500 <span className='text-sm'>(2 x 250)</span>{order.price}</h4>
                                    </div>
                                </div>
                            )) : <div className="flex justify-between items-center bg-yellow-100 border border-dashed border-gray-400 p-2 align-center">
                                No Deleted Order
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AllOrders
