import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import AboutUser from "../../components/Profile/AboutUser";
import EditUser from "../../components/Profile/EditUser";
import ProfileTab from "../../components/Profile/ProfileTab";
import { user } from "../../redux/features/auth/selector/selector";
const Profile = () => {
  
  const [edit, setedit] = useState(false);
  const profile = useSelector(user);
  const handleImageUpload = (e) => {
    console.log("image uploaded ?");
    console.log(e.target.files[0].name);
  };

  return (
    <div>
      <Navbar />
      <div className="justify-center flex items-center flex-wrap mx-auto my-10   bg-blue-20">
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-center lg:text-left">
            <label htmlFor="mobile-upload">
              <div
                className="block lg:hidden rounded-full shadow-xl mx-auto  h-48 w-48 bg-cover bg-center cursor-pointer hover:brightness-75"
                title="Change Profile"
                style={{
                  backgroundImage:
                    `url(${profile?.profilePic})`,
                }}
              />
            </label>
            <input
              onChange={handleImageUpload}
              type="file"
              id="mobile-upload"
              className="hidden"
            />
            {!edit ? (
              <AboutUser profile={profile} setedit={setedit} />
            ) : (
              <EditUser profile={profile} setedit={setedit} />
            )}
            <ProfileTab/>
          </div>
        </div>
        <div className="w-1/5 h-2/5">
          <label htmlFor="desktop-upload">
            <img
              title="Change Profile"
              src={profile?.profilePic}
              className="rounded-none m-auto w-72  lg:rounded-lg shadow-2xl hidden lg:block cursor-pointer hover:brightness-75"
            />
          </label>
          <input
            onChange={handleImageUpload}
            id="desktop-upload"
            className="hidden"
            type="file"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
