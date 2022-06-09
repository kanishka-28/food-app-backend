import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../redux/features/auth/selector/selector";
const AuthWrapper = (props) => {
  const [img, setimg] = useState(null);
  const auth = useSelector(isAuthenticated);
  const getImage = async () => {
    try {
      const { data } = await axios.get("https://foodish-api.herokuapp.com/api");
      setimg(data.image);
    } catch (error) {
      console.log(error);
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
          {/* outlet basically lets us use children in nested routing */}
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
