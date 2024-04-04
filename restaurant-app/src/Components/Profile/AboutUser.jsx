import React from 'react'
import { MdLocationOn } from "react-icons/md";

const AboutUser = ({ profile, setedit }) => {
  return (
    <>
      <h1 className="text-3xl font-bold pt-8 lg:pt-0">{profile?.userName ? profile?.userName : 'No name provided'}</h1>
      <div className="mx-auto lg:mx-0 w-4/5 pt-3 mb-2 border-b-2 border-megenta-400 opacity-25"></div>
      <h2 className="text-xl font-bold pt-8 lg:pt-0">{profile?.email ? profile?.email : 'No email provided'}</h2>
      <div className="mx-auto lg:mx-0 w-4/5 pt-2 border-b-2 border-megenta-400  opacity-25"></div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
            <MdLocationOn className="text-megenta-400 mr-4" />
            {profile?.city ? `city : ${profile.city} ` : 'No city available'}
          </p>
          <p className="pt-2 ml-8 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
            {profile?.address ? `address : ${profile.address} ` : 'No address available'}
          </p>
        </div>
        <div className="pt-12 pb-8">
          <button
            onClick={() => setedit(true)}
            className="bg-megenta-400 hover:bg-megenta-600 text-white font-bold py-2 px-4 rounded-full"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  )
}

export default AboutUser