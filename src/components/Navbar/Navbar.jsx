import React, { Fragment } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { Menu, Transition } from "@headlessui/react";

import { Link } from 'react-router-dom';
const ProfileDisclosure = () => {
    
    // const { loggedIn, setloggedIn , setuser} = useContext(SignupContext);
    
    return (
        <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    {
                            <BiUser className="w-10 h-10 rounded-full bg-red-400 text-white " />
                    }

                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                   
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                // onClick={() => {
                                //     localStorage.removeItem("token")
                                //     setloggedIn(false);
                                //     setuser({})
                                //     localStorage.removeItem("user")
                                //     history.push("/");
                                //     window.location.reload();
                                // }}
                                className={(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                Sign out
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

const MobileNav = () => {
    // const {open, setOpen,loginOpen, setLoginOpen,loggedIn} = useContext(SignupContext);
    return (

        <div className="p-4 md:hidden flex items-center justify-between w-full ">
            <Link to="/">
                <div className="w-28">
                    <img className="w-full h-full" src="https://yt3.ggpht.com/ytc/AKedOLQcjMYalW_yII-YeLIMExAZ88R58Jw6VFUOJ1lK=s900-c-k-c0x00ffffff-no-rj" alt="logo" />
                </div>
            </Link>
            <div className="flex items-center gap-3" >
            {
                // !loggedIn ?
                <div className="flex gap-5" >
                    
                {/* <button onClick={()=>(setLoginOpen(!loginOpen))} > */}
                <button  >
                    Log In

                    </button>
                {/* <button onClick={() => (setOpen(!open))}> */}
                <button  >

                    Sign Up

                    </button>


            </div>
            // :
            // <ProfileDisclosure/>
                }
            </div>
        </div>
    )

}

const LgNav = () => {
    // const {open, setOpen, loginOpen, setLoginOpen, loggedIn} = useContext(SignupContext);

    return (

        <div className="flex items-center py-1 justify-around w-full text-gray-400 hidden md:flex ">
            <div className="flex justify-around w-9/12 items-center">
                <Link to="/">
                    <div className="">
                        <img className="w-42 h-36" src="https://yt3.ggpht.com/ytc/AKedOLQcjMYalW_yII-YeLIMExAZ88R58Jw6VFUOJ1lK=s900-c-k-c0x00ffffff-no-rj" alt="logo" />
                    </div>
                </Link>
                <div className="flex bg-white items-center px-2 gap-3 shadow-md">
                    <div className="flex items-center w-36">
                        <IoLocationSharp className="text-zomato-500" />
                        <input type="text" placeholder="Enter location" name="location" id="location" className="p-2 w-full rounded-md text-md" />
                    </div>
                    <span>|</span>
                    <div className="flex items-center w-80">
                        <AiOutlineSearch />
                        <input type="text" placeholder="Search for restaurant cuisine or a dish " name="location" id="location" className="p-2 rounded-md w-full  text-md" />
                    </div>

                </div>
            </div>
            {
                // !loggedIn ?
                <div className="flex gap-5" >
                    
                {/* <button onClick={()=>(setLoginOpen(!loginOpen))} > */}
                <button  >
                    Log In

                    </button>
                {/* <button onClick={() => (setOpen(!open))}> */}
                <button >
                    Sign Up

                    </button>


            </div>
            // :
            // <ProfileDisclosure/>
                }
        </div>
        )

}
function Navbar() {
    return (
        <>
            <nav >
                <MobileNav />
                <LgNav />
                
            </nav>

        </>
    )
}

export default Navbar
