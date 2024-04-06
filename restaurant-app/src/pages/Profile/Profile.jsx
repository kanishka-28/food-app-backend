import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AboutUser from "../../Components/Profile/AboutUser";
import EditUser from "../../Components/Profile/EditUser";
import ProfilePicture from "../../Components/Profile/ProfilePicture";
import { getUser } from "../../Redux/Features/Auth/Selector/Selector";

const Profile = () => {

   
    const [edit, setedit] = useState(false);
    
    const profile = useSelector(getUser);

    return (
        <div>
            <div className="justify-center flex items-center flex-wrap mx-auto my-10   bg-blue-20">
                <div
                    id="profile"
                    className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
                >
                    <div className="p-4 md:p-12 text-center lg:text-left">
                        <div className="lg:hidden">
                            <ProfilePicture profile={profile} />
                        </div>
                        {!edit ? (
                            <AboutUser profile={profile} setedit={setedit} />
                        ) : (
                            <EditUser profile={profile} setedit={setedit} />
                        )}
                    
                    </div>
                </div>
                <div className="hidden lg:block w-1/5">
                    <ProfilePicture profile={profile} />
                </div>
            </div>
        </div>
    );
};

export default Profile;