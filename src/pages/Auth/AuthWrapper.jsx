import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
const AuthWrapper = (props) => {
  const [img, setimg] = useState(null)
  const getImage =async ()=>{
    try {
      const {data} = await axios.get('https://foodish-api.herokuapp.com/api');
      setimg(data.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImage();
  }, [])
  
  return (
    <>
      
          <div className='w-full flex items-center' >
            <div className='w-full  md:w-1/2' >
              {/* outlet basically lets us use children in nested routing */}
             <Outlet/>
            </div>
            <div className='hidden md:block w-3/4 h-screen' >
              <img src={img}  className='w-full h-full' />
            </div>
          </div>

     


    </>
  );
}

export default AuthWrapper;
