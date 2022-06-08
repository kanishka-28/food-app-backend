import React, { useState, useEffect } from 'react'
// import { allOrdersRes, deleteorder } from '../../services/api'


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
            <div className="flex flex-wrap lg:mx-28 container">
                <div className="w-full">
                    <ul
                        className="flex gap-10 mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                        role="tablist"
                    >
                        <li className="-mb-px last:mr-0 text-center">
                            <a
                                className={
                                    "font-serif px-4 font-bold py-3 leading-normal " +
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
                                <i className="fas fa-space-shuttle text-base mr-1"></i> Delivered
                            </a>
                        </li>
                        <li className="-mb-px last:mr-0 text-center">
                            <a
                                className={
                                    "font-serif px-4 font-bold py-3 leading-normal " +
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
                                <i className="fas fa-cog text-base mr-1"></i>  Pending
                            </a>
                        </li>
                        <li className="-mb-px last:mr-0 text-center">
                            <a
                                className={
                                    "font-serif px-4 font-bold py-3 leading-normal " +
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
                                <i className="fas fa-briefcase text-base mr-1"></i>  Cancelled
                            </a>
                        </li>
                    </ul>
                    <div className="">
                        <div className="">
                            <div className="">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    {orders.length !== 0 ? orders.map((order) => (
                                        <div key={order} className="lg:w-3/4 flex justify-between items-center border-b border-gray-200 shadow-lg p-2 align-center my-8">
                                            <div>
                                                <h4>Food Name (quantity){order.food}</h4>
                                                <p className='text-gray-600'>To - Mumbai Places, Mumbai Locality, Post Office{order.address}</p>
                                                <h4 className='font-semibold'>₹ 500 <span className='text-sm'>(2 x 250)</span>{order.price}</h4>

                                            </div>
                                            <button onClick={() => {

                                            }} className="mt-4 bg-megenta-400 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded" >
                                                Delete Order
                                            </button>
                                        </div>
                                    )) : <div className="flex justify-between items-center bg-yellow-100 border border-dashed border-gray-400 p-2 align-center">
                                        this restaurant dont have any order
                                    </div>
                                    }
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <p>
                                        Completely synergize resource taxing relationships via
                                        premier niche markets. Professionally cultivate one-to-one
                                        customer service with robust ideas.
                                        <br />
                                        <br />
                                        Dynamically innovate resource-leveling customer service for
                                        state of the art customer service.
                                    </p>
                                </div>
                                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                    <p>
                                        Efficiently unleash cross-media information without
                                        cross-media value. Quickly maximize timely deliverables for
                                        real-time schemas.
                                        <br />
                                        <br /> Dramatically maintain clicks-and-mortar solutions
                                        without functional solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AllOrders
