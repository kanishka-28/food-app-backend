import React, { Fragment, useState } from "react";
import { BiUser } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { Menu, Transition } from "@headlessui/react";
import {BsCart4} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, user } from "../../redux/features/auth/selector/selector";
import { logout } from "../../redux/features/auth/slice";

const ProfileDisclosure = () => {
  // const { loggedIn, setloggedIn , setuser} = useContext(SignupContext);
  const dispatch = useDispatch();
  const profile = useSelector(user);
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-8">
          <span className="sr-only">Open user menu</span>
          {profile?.profilePic ? <img src={profile?.profilePic} className="w-10 h-10 rounded-full object-cover" alt="profile" /> : <BiUser className="w-10 h-10 rounded-full bg-zomato-400 text-white " />}
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <Menu.Item  >
            {({ active }) => (
              <Link
               to={"/me"}
                className={
                  (active ? "bg-gray-100" : "",
                  " px-4 py-3  text-gray-700 w-full text-lg")
                }
              >
                My Profile
              </Link>
            )}
          </Menu.Item>
        <Menu.Item>
            {({ active }) => (
              <Link
               to={"/cart"}
                className={
                  (active ? "bg-gray-100" : "",
                  "block md:hidden px-4 py-3  text-gray-700 text-lg")
                }
              >
                My Cart
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => {
                  dispatch(logout());
                }}
                className={
                  (active ? "bg-gray-100" : "",
                  "block px-4 pb-1 md:pt-2 text-gray-700 text-lg")
                }
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const Nav = () => {
  // const {open, setOpen, loginOpen, setLoginOpen, loggedIn} = useContext(SignupContext);
  const auth = useSelector(isAuthenticated);
  const [searchString, setsearchString] = useState("");
  const onchange = (e) => {
    setsearchString(e.target.value);
  };
  const navigate = useNavigate();
  const onclick = () => {
    if (searchString.length>0) {
      navigate(`/search/${searchString}`);
    }
  };

  return (
    <>
      <div className="flex bg-white  items-center py-1 justify-around w-full text-gray-400 z-50  ">
        <div className="flex justify-around w-40 md:w-9/12 items-center">
          <Link to="/">
            <div className="">
              <img
                className="w-28 md:w-28 h-28"
                src="https://yt3.ggpht.com/ytc/AKedOLQcjMYalW_yII-YeLIMExAZ88R58Jw6VFUOJ1lK=s900-c-k-c0x00ffffff-no-rj"
                alt="logo"
              />
            </div>
          </Link>
          <div className="flex w-8/12 bg-white items-center px-2 gap-3 shadow-md hidden md:flex">
            <div className="flex items-center w-full">
              <AiOutlineSearch />
              <input
                type="text"
                placeholder="Search for restaurant "
                value={searchString}
                onChange={onchange}
                className="p-2 rounded w-full  text-md outline-none border-0"
              />
            </div>

            <button
              onClick={onclick}
              className=" w-28 h-10 text-center m-1 rounded border-gray-400 border py-1 bg-megenta-400 hover:bg-megenta-500 text-white "
            >
              <p> Search</p>
            </button>
          </div>
        </div>
        {
          !auth ?
          <div className="flex gap-5 mr-8">
            <Link to="/auth/login">Log In</Link> 
            <Link to="/auth/signup">Sign Up</Link> 
          </div>
          :
          <div className="flex gap-16">
            <Link className="hidden md:block" to={"/cart"} >
              <BsCart4 className="text-gray-500 text-3xl m-0"/>
            </Link>
            <ProfileDisclosure/>
          </div>
        }
      </div>
      <div className="flex  bg-white items-center px-4 gap-3 shadow-md md:hidden mx-2 ">
        <div className="flex items-center w-full focus:outline-1">
          <AiOutlineSearch />
          <input
            type="text"
            placeholder="Search for restaurant "
            value={searchString}
            onChange={onchange}
            className="p-2 rounded w-full outline-none border-0 text-md"
          />
        </div>
        
          <button onClick={onclick} className=" w-28 h-10 text-center m-1 rounded border-gray-400 border py-1 bg-megenta-400 hover:bg-megenta-500 text-white ">
            <p> Search</p>
          </button>
      </div>
    </>
  );
};
function Navbar() {
  return (
    <>
      <nav>
        <Nav  />
      </nav>
    </>
  );
}

export default Navbar;
