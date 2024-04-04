import React from "react";
import { useDispatch } from "react-redux";
import { servicePut } from "../../Utils/Api/api";
import { updateUser } from "../../Redux/Features/Auth/Slice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  setloadingFalse,
  setloadingTrue,
} from "../../Redux/Features/Loader/Slice";
import { resizeFile } from "../../Utils/Functions/imageResizer";

const ProfilePicture = ({ profile }) => {
  const dispatch = useDispatch();

  const handleImageUpload = async (e) => {
    // dispatch(setloadingTrue());
    // const file = e.target.files[0];
    // console.log(file);
    // var reader = new FileReader();
    // let base64String = `data:${file.type};base64,`;
    // reader.onload = async function () {
    //   base64String += reader.result.replace("data:", "").replace(/^.+,/, "");
    //   //   console.log(base64String);
    //   const data = {
    //     _userId: profile._id,
    //     userData: {
    //       profilePic: base64String,
    //     },
    //   };
    //   try {
    //     const { user } = await servicePut("user/update", data);
    //     dispatch(updateUser(user));
    //     toast.success("Profile updated successfully", {
    //       icon: "🍕",
    //     });
    //   } catch (error) {
    //     toast.error("Sorry, try again later");
    //   }
    //   finally{
    //     dispatch(setloadingFalse());
    //   }
    // };
    // reader.readAsDataURL(file);
    dispatch(setloadingTrue());
    try {
      const file = e.target.files[0];
      if (file.size > 5000000) {
        toast("Image size should be less than 5 MB");
        return;
      }

      const image = await resizeFile(file);

      const data = {
        _userId: profile._id,
        userData: {
          profilePic: image,
        },
      };
      const { user } = await servicePut("user/update", data);
      dispatch(updateUser(user));
      toast.success("Profile updated successfully", {
        icon: "🍕",
      });
    } catch (err) {
      toast.error("Photo not updated");
    } finally {
      dispatch(setloadingFalse());
    }
  };
  return (
    <>
      <div className="block lg:hidden">
        <label htmlFor="mobile-upload">
          <div
            className="block lg:hidden rounded-full shadow-xl mx-auto  h-48 w-48 bg-cover bg-center cursor-pointer hover:brightness-75"
            title="Change Profile"
            style={{
              backgroundImage: `url(${
                profile?.profilePic
                  ? profile?.profilePic
                  : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              })`,
            }}
          />
        </label>
        <input
          onChange={handleImageUpload}
          type="file"
          id="mobile-upload"
          className="hidden"
        />
      </div>
      <div className="hidden lg:block w-full h-2/5">
        <label htmlFor="desktop-upload" className="w-full ">
          <img
            title="Change Profile"
            src={
              profile?.profilePic
                ? profile?.profilePic
                : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }
            className="rounded-none m-auto h-3/5 lg:rounded-lg shadow-2xl hidden lg:block cursor-pointer hover:brightness-75"
          />
        </label>
        <input
          onChange={handleImageUpload}
          id="desktop-upload"
          className="hidden"
          type="file"
        />
      </div>
    </>
  );
};

export default ProfilePicture;
