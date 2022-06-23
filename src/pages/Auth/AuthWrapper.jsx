import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { setloadingFalse, setloadingTrue } from '../../Redux/Features/Loader/Slice';
// import { isAuthenticated } from '../../redux/features/auth/selector/selector';

const AuthWrapper = (props) => {
  const [img, setimg] = useState(null);
  const dispatch= useDispatch();
  // const auth = useSelector(isAuthenticated);
  const getImage = async () => {
    dispatch(setloadingTrue());
    try {
      const { data } = await axios.get('https://foodish-api.herokuapp.com/api');
      setimg(data.image);
    } catch (error) {
      console.log(error);
    }
    finally{
      dispatch(setloadingFalse());
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getImage();
    // checkAuthentication();
  }, [])

  return (
    <>
      <div className='w-full flex items-center' >
        <div className='w-full h-screen md:w-1/2 flex items-center bg-auth bg-no-repeat bg-cover md:bg-none ' >
          {/* outlet basically lets us use children in nested routing */}
          <Outlet />
        </div>
        <div className='hidden md:block w-3/4 h-screen' >
          <img src={img} className='w-full h-full' />
        </div>
      </div>
    </>
  );
}

export default AuthWrapper;
