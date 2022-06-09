import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'

const Profile = () => {
    const params = useParams();
    const tabId = params.tabId;
    return (
        <div>
            <Navbar />
            <div className="justify-center flex items-center flex-wrap mx-auto my-32 lg:my-0 bg-blue-20">
                <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
                    <div className="p-4 md:p-12 text-center lg:text-left">
                        <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"></div>
                        <div className='flex justify-between'>
                            <h1 className="text-3xl font-bold pt-8 lg:pt-0">Your Name</h1>
                            <Link to={'/editprofile'}>
                                <button className='bg-megenta-500 hover:bg-megenta-600  rounded p-2 text-white text-sm'>Edit Profile</button>
                            </Link>
                        </div>
                        <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-zomato-400 opacity-25"></div>
                        <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start pb-4"><svg className="h-4 fill-current text-zomato-500 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" /></svg> email</p>
                        <div className="flex items-start">
                            <ul className="nav nav-tabs flex flex-col flex-wrap list-none border-b-0 pl-0 mr-4" id="tabs-tabVertical"
                                role="tablist">
                                <li className="nav-item flex-grow" role="presentation">
                                    <Link to={"/profile/reviews"} className={` ${tabId == 'reviews' && 'bg-megenta-100 hover:bg-megenta-100 border-l-4 border-b-0 border-megenta-400 shadow-lg'} nav-link block font-medium leading-tight uppercase border-x-0 border-t-0 border-b-2  px-6 py-3 my-2  hover:bg-gray-200 active`}
                                        id="tabs-home-tabVertical" data-bs-toggle="pill" data-bs-target="#tabs-homeVertical" role="tab"
                                        aria-controls="tabs-homeVertical" aria-selected="true">Reviews</Link>    </li>
                                <li className="nav-item flex-grow" role="presentation">
                                    <Link to={"/profile/address"} className={`
                                    ${tabId == 'address' && 'bg-megenta-100 hover:bg-megenta-100 border-l-4 border-b-0 border-megenta-400 shadow-lg'} nav-link block font-medium leading-tight uppercase border-x-0 border-t-0 border-b-2  px-6 py-3 my-2 hover:bg-gray-200 `} id="tabs-profile-tabVertical" data-bs-toggle="pill" data-bs-target="#tabs-profileVertical" role="tab"

                                        aria-controls="tabs-profileVertical" aria-selected="false">My Addresses</Link>     </li>
                                <li className="nav-item flex-grow" role="presentation">
                                    <Link to={"/profile/orders"} className={` ${tabId == 'orders' && 'bg-megenta-100 hover:bg-megenta-100 border-l-4 border-b-0 border-megenta-400 shadow-lg'} nav-link block font-medium text-md leading-tight uppercase border-x-0 border-t-0 border-b-2  px-6 py-3 my-2  hover:bg-gray-200 `} id="tabs-messages-tabVertical" data-bs-toggle="pill" data-bs-target="#tabs-messagesVertical" role="tab"
                                        aria-controls="tabs-messagesVertical" aria-selected="false">My Orders</Link>
                                </li>
                            </ul>
                            <div className="tab-content p-4" id="tabs-tabContentVertical">
                                {tabId == 'reviews' && <div className="tab-pane fade show active" id="tabs-homeVertical" role="tabpanel"
                                    aria-labelledby="tabs-home-tabVertical">
                                    My Reviews
                                </div>}
                                {tabId == 'address' && <div className="tab-pane fade show active" id="tabs-homeVertical" role="tabpanel"
                                    aria-labelledby="tabs-home-tabVertical">
                                    Addresses
                                </div>}
                                {tabId == 'orders' && <div className="tab-pane fade show active" id="tabs-homeVertical" role="tabpanel"
                                    aria-labelledby="tabs-home-tabVertical">
                                    My Orders
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/5 h-2/5">
                    <img src="https://source.unsplash.com/MP0IUfwrn0A" className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" />
                </div>
            </div>
        </div>
    )
}

export default Profile