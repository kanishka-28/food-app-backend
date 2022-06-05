import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

const Profile = () => {
    return (
        <div>
            <Navbar />
            <div className="justify-center flex items-center flex-wrap mx-auto my-32 lg:my-0 bg-blue-20">
                <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
                    <div className="p-4 md:p-12 text-center lg:text-left">
                        <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"></div>
                        <div className='flex justify-between'>
                            <h1 className="text-3xl font-bold pt-8 lg:pt-0">Your Name</h1>
                            <button className='bg-zomato-500 rounded-md p-2 text-white text-sm'>Edit Profile</button>
                        </div>
                        <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-zomato-400 opacity-25"></div>
                        <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg className="h-4 fill-current text-zomato-500 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" /></svg> email</p>
                        <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start"><svg className="h-4 fill-current text-zomato-500 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" /></svg> Your Location - 25.0000° N, 71.0000° W</p>
                        {/* 
                        <div className="pt-12 pb-8">
                            <button className="bg-zomato-500 hover:bg-zomato-700 text-white font-bold py-2 px-4 rounded-full">
                                Get In Touch
                            </button>
                        </div> */}
                        <div class="flex items-start">
                            <ul class="nav nav-tabs flex flex-col flex-wrap list-none border-b-0 pl-0 mr-4" id="tabs-tabVertical"
                                role="tablist">
                                <li class="nav-item flex-grow" role="presentation">
                                    <a href="#tabs-homeVertical" className=" nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active" id="tabs-home-tabVertical" data-bs-toggle="pill" data-bs-target="#tabs-homeVertical" role="tab"
                                        aria-controls="tabs-homeVertical" aria-selected="true">Reviews</a>
                                </li>
                                <li class="nav-item flex-grow" role="presentation">
                                    <a href="#tabs-profileVertical" className=" nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent" id="tabs-profile-tabVertical" data-bs-toggle="pill" data-bs-target="#tabs-profileVertical" role="tab"
                                        aria-controls="tabs-profileVertical" aria-selected="false">My Addresses</a>
                                </li>
                                <li class="nav-item flex-grow" role="presentation">
                                    <a href="#tabs-messagesVertical" className=" nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-200 focus:border-transparent " id="tabs-messages-tabVertical" data-bs-toggle="pill" data-bs-target="#tabs-messagesVertical" role="tab"
                                        aria-controls="tabs-messagesVertical" aria-selected="false">My Orders</a>
                                </li>
                            </ul>
                            <div class="tab-content" id="tabs-tabContentVertical">
                                <div class="tab-pane fade show active" id="tabs-homeVertical" role="tabpanel"
                                    aria-labelledby="tabs-home-tabVertical">
                                    Tab 1 content vertical
                                </div>
                                <div class="tab-pane fade" id="tabs-profileVertical" role="tabpanel" aria-labelledby="tabs-profile-tabVertical">
                                    Tab 2 content vertical
                                </div>
                                <div class="tab-pane fade" id="tabs-messagesVertical" role="tabpanel"
                                    aria-labelledby="tabs-profile-tabVertical">
                                    Tab 3 content vertical
                                </div>
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