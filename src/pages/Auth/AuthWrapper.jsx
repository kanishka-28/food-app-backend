import React from 'react';
import { Outlet } from 'react-router-dom';
const AuthWrapper = (props) => {
  return (
    <>
      
          <div className='w-full flex items-center' >
            <div className='w-full  md:w-1/2' >
              {/* outlet basically lets us use children in nested routing */}
             <Outlet/>
            </div>
            <div className='hidden md:block w-3/4 h-screen' >
              <img src="https://picsum.photos/700" alt="wrapper" className='w-full h-full' />
            </div>
          </div>

     


    </>
  );
}

export default AuthWrapper;
