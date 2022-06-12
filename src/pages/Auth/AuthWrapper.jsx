import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { isAuthenticated } from "../../redux/features/auth/selector/selector";
import { setloadingFalse, setloadingTrue } from "../../redux/features/Loader/slice";
const AuthWrapper = (props) => {
  const [img, setimg] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector(isAuthenticated);
  const getImage = async () => {
    dispatch(setloadingTrue());
    try {
      const { data } = await axios.get("https://foodish-api.herokuapp.com/api");
      setimg(data.image);
    } catch (error) {
      console.log(error);
    }
    finally{
      dispatch(setloadingFalse());
    }
  };

  const navigate = useNavigate();
  const checkAuthentication = () => {
    if (auth) {
      navigate("/home/delivery");
    }
  };
  useEffect(() => {
    getImage();
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, [auth]);

  return (
    <>
            <div className="w-full flex items-center">
        <div className="w-full h-screen md:w-1/2 flex items-center bg-auth bg-no-repeat bg-cover md:bg-none ">
          <Outlet />
        </div>
        <div className="hidden md:block w-3/4 h-screen">
          <img src={img} className="w-full h-full" />
        </div>
      </div>
    </>
  );
};

export default AuthWrapper;
