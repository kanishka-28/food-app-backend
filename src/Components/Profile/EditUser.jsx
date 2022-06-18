import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../Redux/Features/Auth/Slice';
import { setloadingFalse, setloadingTrue } from '../../Redux/Features/Loader/Slice';
import { servicePut } from '../../Utils/Api/Api';

const EditUser = ({ profile, setedit }) => {

  const [newProfile, setnewProfile] = useState(profile);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setloadingTrue());
    const data = {
      _userId: newProfile._id,
      userData: newProfile
    }
    try {
      const { user } = await servicePut('user/update', data);
      dispatch(updateUser(user));
      toast.success("Profile updated successfully", {
        icon: '🍕'
      })
    } catch (error) {
      toast.error("Sorry, try again later");
    }
    finally {
      dispatch(setloadingFalse());
      setedit(false);
    }

  };
  return (
    <>
      <form onSubmit={handleSubmit} >
        <input required value={newProfile?.userName} onChange={(e) => setnewProfile({ ...profile, userName: e.target.value })} placeholder="Name" type="text" className="outline-none text-3xl  mt-8 ml-24 lg:pt-0 lg:ml-0 bg-mainContainer" />
        <div className="mx-auto lg:mx-0 w-4/5 pt-3 mb-2 border-b-2 border-megenta-400 opacity-25"></div>
        <input required value={newProfile?.email} onChange={(e) => setnewProfile({ ...profile, email: e.target.value })} placeholder="Email" type="email" className="outline-none w-full text-xl  pt-8 lg:pt-0 bg-mainContainer" />
        <div className="mx-auto lg:mx-0 w-4/5 pt-3 mb-2 border-b-2 border-megenta-400  opacity-25"></div>

        <input required value={newProfile?.city} onChange={(e) => setnewProfile({ ...profile, city: e.target.value })} placeholder="City" type="text" className=" outline-none text-xl  pt-8 lg:pt-0 bg-mainContainer" />
        <div className="mx-auto lg:mx-0 w-4/5 pt-3 mb-2 border-b-2 border-megenta-400 opacity-25"></div>

        <input required value={newProfile?.address} onChange={(e) => setnewProfile({ ...profile, address: e.target.value })} placeholder="Address" type="text" className=" outline-none text-xl  pt-8 lg:pt-0 bg-mainContainer" />
        <div className="mx-auto lg:mx-0 w-4/5 pt-3 mb-2 border-b-2 border-megenta-400 opacity-25"></div>
        <div className="pt-12 pb-8">
          <div className="flex mt-5 justify-between w-full">
            <button
              type='button'
              onClick={() => setedit(false)}
              className="bg-gray-800 w-28 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full"
            >
              Cancel
            </button>
            <button type="submit" className="bg-megenta-400 w-28 hover:bg-megenta-600 text-white font-bold py-2 px-4 rounded-full">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default EditUser