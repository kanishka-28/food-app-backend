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
      const { data } = await axios.get('https://foodish-api.com/api/');
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
        <div style={{backgroundImage: `url(${img})`}} className='w-full h-screen flex items-center bg-auth bg-no-repeat bg-cover ' >
          {/* outlet basically lets us use children in nested routing */}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AuthWrapper;
